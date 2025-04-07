import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useBudget } from './BudgetContext';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './../../../../firebaseConfig';

const AddBudget: React.FC = () => {
  const navigation = useNavigation();
  const { addBudget } = useBudget();
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');

  // Firestore reference
  const db = getFirestore(app);

  const validateAmount = (value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setAmountError('Only numbers are allowed');
    } else {
      setAmountError('');
    }
    setAmount(value);
  };

  const validateEndDate = (date: Date) => {
    if (date < startDate) {
      setDateError('End date cannot be before start date');
    } else {
      setDateError('');
    }
    setEndDate(date);
  };

  const handleSave = async () => {
    if (!amount || !title) {
      Alert.alert('Error', 'Please fill all fields before saving.');
      return;
    }

    const newBudget = {
      title,
      amount: parseFloat(amount),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, 'budgets'), newBudget);
      console.log('Budget added with ID: ', docRef.id);

      addBudget({
        id: docRef.id,
        ...newBudget,
        startDate: new Date(newBudget.startDate),
        endDate: new Date(newBudget.endDate),
      });

      Alert.alert('Success', 'Budget added successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding budget: ', error);
      Alert.alert('Error', 'Failed to add budget. Please try again.');
    }
  };

  const isFormValid = title && amount && !amountError && !dateError;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#007BFF" />
      </TouchableOpacity>

      <Text style={styles.heading}>Add Budget</Text>
      <Text style={styles.subtext}>Enter the details below to add an entry</Text>

      {/* Amount Input */}
      <Text style={styles.label}>Amount</Text>
      <View style={[styles.inputContainer, amountError ? styles.inputError : null]}>
        <MaterialIcons name="attach-money" size={22} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter budget amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={validateAmount}
        />
      </View>
      {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}

      {/* Budget Title */}
      <Text style={styles.label}>Budget Title</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter a title to briefly describe"
        value={title}
        onChangeText={setTitle}
      />

      {/* Start Date */}
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowStartPicker(true)}>
        <Text>{startDate.toDateString()}</Text>
        <Ionicons name="calendar" size={20} color="#555" />
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {/* End Date */}
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity style={[styles.datePicker, dateError ? styles.inputError : null]} onPress={() => setShowEndPicker(true)}>
        <Text>{endDate.toDateString()}</Text>
        <Ionicons name="calendar" size={20} color="#555" />
      </TouchableOpacity>
      {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) validateEndDate(date);
          }}
        />
      )}

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton, !isFormValid && styles.disabledButton]} onPress={handleSave} disabled={!isFormValid}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, 
    paddingHorizontal: 15, 
    height: 50, 
    backgroundColor: '#F8F9FA', 
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    textAlignVertical: 'center',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, 
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#F8F9FA',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddBudget;
