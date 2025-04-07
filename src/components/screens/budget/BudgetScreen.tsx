import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { Budget, useBudget } from './BudgetContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { budgetScreenStyles as styles } from './BudgetScreenStyles';
import { getFirestore, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from './../../../../firebaseConfig';
import Categories from './Categories'; // Import Categories component

type BudgetScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BudgetScreen'
>;

const BudgetScreen: React.FC = () => {
  const navigation = useNavigation<BudgetScreenNavigationProp>();
  const { budgets, updateBudget, deleteBudget } = useBudget();

  // State for search, sort, and editing
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'amount' | 'date'>('amount');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isSortDropdownVisible, setIsSortDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const db = getFirestore(app);

  // Format date utility
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Filter and sort budgets with sortDirection toggle
  const filteredBudgets = budgets
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.amount.toString().includes(searchQuery)
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortOption === 'amount') {
        comparison = b.amount - a.amount; // Default descending
      } else {
        comparison =
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      return sortDirection === 'asc' ? -comparison : comparison;
    });

  // Toggle sort dropdown (custom)
  const toggleSortDropdown = () => {
    setIsSortDropdownVisible(!isSortDropdownVisible);
  };

  // Handle sort option selection:
  // If the same option is selected, toggle sortDirection; otherwise, set new option and reset direction.
  const selectSortOption = (option: 'amount' | 'date') => {
    if (option === sortOption) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortDirection('desc');
    }
    setIsSortDropdownVisible(false);
  };

  // Open Edit Modal
  const openEditModal = (budget: Budget) => {
    setSelectedBudget(budget);
    setEditTitle(budget.title);
    setEditAmount(budget.amount.toString());
    setModalVisible(true);
  };

  // Save Edited Budget
  const handleSaveEdit = async () => {
    if (!selectedBudget) return;
    const updatedBudget: Budget = {
      ...selectedBudget,
      title: editTitle,
      amount: parseFloat(editAmount),
    };
    try {
      const budgetDoc = doc(db, 'budgets', selectedBudget.id);
      await updateDoc(budgetDoc, {
        title: updatedBudget.title,
        amount: updatedBudget.amount,
      });
      updateBudget(updatedBudget);
      Alert.alert('Updated', 'Budget updated successfully.');
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating budget: ', error);
      Alert.alert('Error', 'Failed to update budget.');
    }
  };

  // Handle delete budget
  const handleDelete = async () => {
    if (!selectedBudget) return;
    try {
      await deleteDoc(doc(db, 'budgets', selectedBudget.id));
      deleteBudget(selectedBudget.id);
      Alert.alert('Deleted', 'Budget deleted successfully.');
    } catch (error) {
      console.error('Error deleting budget: ', error);
      Alert.alert('Error', 'Failed to delete budget.');
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Budget</Text>
      </View>

      {/* Subtext */}
      <Text style={styles.subtext}>
        {filteredBudgets.length === 0
          ? 'Take control of your finances. Start planning your budget today!'
          : 'Start tracking your expenses to gain valuable insights into your spending habits.'}
      </Text>

      {/* Search & Custom Sort Dropdown Container */}
      <View style={styles.searchSortContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Amount or Title"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        {/* Custom Dropdown */}
        <View style={customStyles.dropdownContainer}>
          <TouchableOpacity onPress={toggleSortDropdown} style={customStyles.dropdownButton}>
            <Text style={customStyles.dropdownButtonText}>
              {sortOption === 'amount' ? 'Sort by Amount' : 'Sort by Date'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          {isSortDropdownVisible && (
            <View style={customStyles.dropdownOptions}>
              <TouchableOpacity onPress={() => selectSortOption('amount')} style={customStyles.option}>
                <Text style={customStyles.optionText}>Sort by Amount</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectSortOption('date')} style={customStyles.option}>
                <Text style={customStyles.optionText}>Sort by Date</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* If no budgets exist */}
      {filteredBudgets.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('../../../assets/images/piggy-bank.png')}
            style={styles.piggyBankImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyMessage}>
            Your budget plans will appear here. Tap the button below to get started.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.totalCount}>
            {filteredBudgets.length} budget {filteredBudgets.length > 1 ? 'plans' : 'plan'}
          </Text>

          <FlatList
            data={filteredBudgets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.budgetItem}>
                {/* First row: Title on left, Amount on right */}
                <View style={styles.rowBetween}>
                  <Text style={styles.budgetTitle}>{item.title}</Text>
                  <Text style={styles.budgetAmount}>${item.amount.toFixed(2)}</Text>
                </View>
                {/* Second row: Date on left */}
                <View style={styles.rowBetween}>
                  <Text style={styles.budgetDate}>
                    {formatDate(new Date(item.startDate))} - {formatDate(new Date(item.endDate))}
                  </Text>
                </View>
                {/* Edit Icon at bottom-right */}
                <TouchableOpacity
                  onPress={() => openEditModal(item)}
                  style={styles.editIconContainer}
                >
                  <MaterialIcons name="mode-edit-outline" size={20} color="#000000" />
                </TouchableOpacity>
                {/* Categories Bar */}
                <Categories />
              </View>
            )}
          />
        </>
      )}

      {/* Floating Add Budget Button */}
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('AddBudget')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Edit Budget Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Top-right cancel icon */}
            <TouchableOpacity
              style={styles.cancelIcon}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Budget</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Amount"
              keyboardType="numeric"
              value={editAmount}
              onChangeText={setEditAmount}
            />
            <View style={styles.modalButtonRow}>
              {/* Save/Edit Button */}
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              {/* Delete Button */}
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const customStyles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745', // same as sort button color
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  dropdownOptions: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    zIndex: 1000,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default BudgetScreen;