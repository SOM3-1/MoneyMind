import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Modal,
    Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';
import { deleteTransaction, updateTransaction } from '@services/apiService';

interface RouteParams {
    item: {
        amount: number;
        description: string;
        category: string;
        date: string;
        paidTo?: string;
        id: string;
    };
}

export const EditExpenseScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params as RouteParams;
    const [amount, setAmount] = useState(item?.amount?.toString());
    const [description, setDescription] = useState(item?.description || '');
    const [category, setCategory] = useState(item?.category || '');
    const [date, setDate] = useState(new Date(item?.date || new Date()));
    const [paidTo, setPaidTo] = useState(item?.paidTo || '');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const categoryMapping: Record<string, string> = {
        "FOOD_AND_DRINK": "Food & Entertainment",
        "GENERAL_MERCHANDISE": "Shopping",
        "HEALTHCARE": "Health & Wellness",
        "RENT_AND_UTILITIES": "Essentials",
        "BANK_FEES": "Financial",
        "TRANSFER_IN": "Transfers",
        "INCOME": "Income",
        "OTHER": "Other",
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Expense",
            "Are you sure you want to delete this expense?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        // Handle delete logic here
                        
                        const payload = {
                            transactionId:item?.id
                        }
                        deleteTransaction(payload)
                        setTimeout(() => {
                            navigation.goBack();
                        }, 1000);
                    },
                    style: 'destructive'
                }
            ],
            { cancelable: true }
        );
    };

    useEffect(() => {
        if (item?.amount) {
            setAmount(Math.abs(item.amount).toFixed(0));
        }
        setDescription(item?.description || '');
        setCategory(item?.category || '');
        setDate(new Date(item?.date || new Date()));
        setPaidTo(item?.paidTo || '');
    }, [item]);

    const handleAmountChange = (text: string) => {
        // Remove any non-numeric characters except decimal point
        const numericValue = text.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = numericValue.split('.');
        if (parts.length > 2) {
            return;
        }
        
        // Limit to 2 decimal places
        if (parts[1] && parts[1].length > 2) {
            return;
        }
        
        setAmount(numericValue);
    };

    const handleSave = () => {
        console.log("save")
        const payload = {
            transactionId:item?.id,
            amount:amount,
            description:description,
            category:category,
            date:date,
            paid_to:paidTo,
        }   
        updateTransaction(payload)
        setTimeout(() => {
            navigation.goBack();
        }, 1000);
    }

    const handleDisabledFieldPress = (fieldName: string) => {
        Alert.alert(
            "Field Disabled",
            `The ${fieldName} field is disabled and cannot be edited.`,
            [{ text: "OK", style: "default" }]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    {/* @ts-ignore */}
                    <Icon name="arrow-left" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Expense</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    {/* @ts-ignore */}
                    <Icon name="trash-can-outline" size={24} color="#000000" />
                </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.form}>
                {/* Amount Field */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity 
                        onPress={() => handleDisabledFieldPress("amount")}
                        activeOpacity={0.7}
                    >
                        <TextInput
                            label="Amount"
                            value={amount}
                            onChangeText={handleAmountChange}
                            keyboardType="decimal-pad"
                            style={styles.input}
                            mode="outlined"
                            outlineColor="#E0E0E0"
                            activeOutlineColor="#04950A"
                            left={<TextInput.Affix text="$ " />}
                            disabled={true}
                        />
                    </TouchableOpacity>
                </View>

                {/* Description Field */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity 
                        onPress={() => handleDisabledFieldPress("description")}
                        activeOpacity={0.7}
                    >
                        <TextInput
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                            mode="outlined"
                            outlineColor="#E0E0E0"
                            activeOutlineColor="#04950A"
                            disabled={true}
                        />
                    </TouchableOpacity>
                </View>

                {/* Category Field */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity 
                        onPress={() => setShowCategoryModal(true)}
                        style={styles.categoryInput}
                    >
                        <Text style={styles.categoryText}>{category}</Text>
                        {/* @ts-ignore */}
                        <Icon name="chevron-down" size={24} color="#000000" />
                    </TouchableOpacity>
                </View>

                {/* Date Field */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity 
                        onPress={() => handleDisabledFieldPress("date")}
                        activeOpacity={0.7}
                    >
                        <TextInput
                            label="Date"
                            value={date.toLocaleDateString()}
                            style={styles.input}
                            mode="outlined"
                            outlineColor="#E0E0E0"
                            activeOutlineColor="#04950A"
                            disabled={true}
                        />
                    </TouchableOpacity>
                </View>

                {/* Paid to Field */}
                {/* <View style={styles.inputContainer}>
                    <TextInput
                        label="Paid to"
                        value={paidTo}
                        onChangeText={setPaidTo}
                        style={styles.textInput}
                        mode="outlined"
                        outlineColor="#E0E0E0"
                        activeOutlineColor="#04950A"
                        disabled={false}
                    />
                </View> */}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            {/* Category Modal */}
            <Modal
                visible={showCategoryModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowCategoryModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Category</Text>
                        {Object.entries(categoryMapping).map(([key, value], index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.categoryItem}
                                onPress={() => {
                                    setCategory(value);
                                    setShowCategoryModal(false);
                                }}
                            >
                                <Text style={[
                                    styles.categoryItemText,
                                    value === category && styles.selectedCategoryText
                                ]}>{value}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setShowCategoryModal(false)}
                        >
                            <Text style={styles.modalCloseText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        paddingBottom: 20,
    },
    backButton: {
        paddingVertical: 8,
    },
    headerTitle: {
        fontSize: 19,
        fontFamily: 'Montserrat-Bold',
        color: '#212121',
    },
    deleteButton: {
        padding: 8,
    },
    form: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 8,
        fontFamily: 'Montserrat-Medium',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    },
    categoryInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    categoryText: {
        fontSize: 16,
        color: '#212121',
        fontFamily: 'Montserrat-Regular',
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 4,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    dateText: {
        fontSize: 16,
        color: '#212121',
        fontFamily: 'Montserrat-Regular',
    },
    saveButton: {
        backgroundColor: '#04950A',
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 30,
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
    },
    saveButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: '#212121',
        marginBottom: 16,
        textAlign: 'center',
    },
    categoryItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    categoryItemText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        color: '#212121',
    },
    selectedCategoryText: {
        color: '#04950A',
        fontFamily: 'Montserrat-Bold',
    },
    modalCloseButton: {
        marginTop: 16,
        paddingVertical: 12,
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#757575',
    },
    input: { 
        marginBottom: 16,
        backgroundColor: 'white',
        color: '#212121'
      },
});
