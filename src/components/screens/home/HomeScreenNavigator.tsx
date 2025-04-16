import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, Linking, Platform, FlatList, TextInput } from "react-native";
import Link from "../../../assets/icons/link.svg"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
// import { Icon } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons';
import {
    LinkExit,
    LinkEvent,
    LinkLogLevel,
    LinkSuccess,
    dismissLink,
    LinkOpenProps,
    usePlaidEmitter,
    LinkIOSPresentationStyle,
    LinkTokenConfiguration,
    create,
    open,
    submit,
    SubmissionData,
} from 'react-native-plaid-link-sdk';
import { createLinkToken, getTransactionToken, getUsserTransactions, pubicTokenApi } from "@services/apiService";
import { NativeEventEmitter } from "react-native";

export const HomeScreenNavigator: React.FC = () => {


    const navigation: any = useNavigation();
    const user = useSelector((state: any) => state.user);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [token, setToken] = useState<any>()
    const [transactionToken, setTransactionToken] = useState<any>()
    const [searchAmount, setSearchAmount] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [showSortOptions, setShowSortOptions] = useState(false);
    function isValidString(str: string): boolean {
        if (str && str.trim() !== '') {
            return true;
        }
        return false;
    }
    console.log("user", user)
    function createLinkTokenConfiguration(
        token: any,
        noLoadingState: boolean = false,
    ): LinkTokenConfiguration {
        console.log(`token: ${JSON.stringify(token)}`);
        return {
            token: token,
            // Hides native activity indicator if true.
            noLoadingState: noLoadingState,
        };
    }
    useFocusEffect(
        React.useCallback(() => {
            const fetchTransactions = async () => {
                if (user?.uid) {
                    const payload = {
                        userId: "user123",
                    };
                    const transactions = await getUsserTransactions(payload);
                    console.log("transactions", transactions);
                    setTransactionToken(transactions);
                }
            };

            fetchTransactions();
        }, [user])
    );
    useEffect(() => {
        const fetchLinkToken = async () => {
            if (user?.uid) {
                const payload = {
                    userId: user.uid
                }
                const linkToken = await createLinkToken(payload);
                setToken(linkToken?.link_token)
                if (isValidString(linkToken?.link_token)) {
                    const tokenConfiguration = createLinkTokenConfiguration(linkToken?.link_token);
                    create(tokenConfiguration);
                    setDisabled(false);
                }
            }
        };
        fetchLinkToken();
    }, [user]);
    function createLinkOpenProps(): LinkOpenProps {
        return {
            onSuccess: async (success: LinkSuccess) => {
                console.log("success", success)
                const data = await pubicTokenApi(success)
                console.log("datatatattattttattatatta", data)
                const payload = {
                    access_token: data.access_token,
                    userId: "user123"
                }
                console.log("payload", payload)
                const transactionToken = await getTransactionToken(payload)
                setTransactionToken(transactionToken.transactions)
                const transactions = await getUsserTransactions({
                    userId: "user123",
                });
                setTransactionToken(transactions);

                // Use the correct scheme that matches AndroidManifest.xml

            },
            onExit: (linkExit: LinkExit) => {
                console.log('Exit: ', linkExit);
                dismissLink();

                if (linkExit.error) {
                    const errorDeepLink = `moneymind://plaid-redirect?status=error&error=${linkExit.error.errorCode}`;
                    Linking.openURL(errorDeepLink).catch(() => {
                        navigation.navigate('Home');
                    });
                } else {
                    navigation.navigate('Home');
                }
            },
            // Add token configuration
            // token: linkToken,
            // Specify redirect URI that matches your AndroidManifest.xml
            iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
            logLevel: LinkLogLevel.ERROR,
        };
    }
    const openPlaidLink = () => {

        const openProps: LinkOpenProps = {
            onSuccess: async (success: LinkSuccess) => {
                console.log('Success:', success);
                // send public_token to server
                success.metadata.accounts.forEach(it => console.log('accounts', it))

            },
            onExit: (exit: LinkExit) => {
                console.log('Exit:', exit);
                dismissLink();
            },
            iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
            logLevel: LinkLogLevel.ERROR
        };

        open(openProps);
    };

    const filteredAndSortedTransactions = React.useMemo(() => {
        let filtered = [...(transactionToken?.transactions || [])];

        // Apply search filter
        if (searchAmount) {
            filtered = filtered.filter(transaction =>
                Math.abs(transaction.amount).toFixed(2).includes(searchAmount)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const amountA = Math.abs(a.amount);
            const amountB = Math.abs(b.amount);
            return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
        });

        return filtered;
    }, [transactionToken?.transactions, searchAmount, sortOrder]);

    return (
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 40, backgroundColor: "#FAFAFA" }}>
            {/* Greeting Text */}
            <Text style={{ fontSize: 23, fontFamily: "Montserrat-Bold", color: "#212121" }}>
                Hello, {user?.email?.split('@')[0] || 'User'}!
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Montserrat-Regular", color: "#212121", marginTop: 8 }}>
                Start tracking your expenses to gain valuable insights into your spending habits.
            </Text>

            {/* Empty State with Receipt Icon */}
            {transactionToken?.transactions && transactionToken?.transactions?.length > 0 ? (
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#F5F5F5',
                            padding: 12,
                            borderRadius: 25,
                            flex: 1,
                            marginRight: 10
                        }}>
                            <Icon name="search" size={20} color="#757575" />
                            <TextInput
                                style={{ color: '#757575', marginLeft: 8, flex: 1 }}
                                placeholder="Search by Amount"
                                value={searchAmount}
                                onChangeText={setSearchAmount}
                                keyboardType="numeric"
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F5F5F5',
                                padding: 12,
                                borderRadius: 25,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                            onPress={() => setShowSortOptions(!showSortOptions)}
                        >
                            <Text style={{ color: '#212121', marginRight: 8 }}>Sort by</Text>
                            <Icon name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} size={16} color="#212121" />
                        </TouchableOpacity>
                    </View>

                    {showSortOptions && (
                        <View style={{
                            position: 'absolute',
                            top: 120,
                            right: 24,
                            backgroundColor: 'white',
                            borderRadius: 12,
                            padding: 8,
                            zIndex: 1000,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}>
                            <TouchableOpacity
                                style={{ padding: 8 }}
                                onPress={() => {
                                    setSortOrder('asc');
                                    setShowSortOptions(false);
                                }}
                            >
                                <Text style={{ color: sortOrder === 'asc' ? '#0047CC' : '#212121' }}>Low to High</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 8 }}
                                onPress={() => {
                                    setSortOrder('desc');
                                    setShowSortOptions(false);
                                }}
                            >
                                <Text style={{ color: sortOrder === 'desc' ? '#0047CC' : '#212121' }}>High to Low</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={{
                        fontSize: 16,
                        fontFamily: "Montserrat-Bold",
                        color: "#000000",
                        marginBottom: 15
                    }}>
                        {filteredAndSortedTransactions.length} Expenses Added
                    </Text>

                    <FlatList
                        data={filteredAndSortedTransactions}
                        renderItem={({ item }) => {
                            // Convert date string to Date object
                            const date = new Date(item.date);
                            const month = date.toLocaleString('default', { month: 'short' });
                            const day = date.getDate();

                            return (
                                <View style={{
                                    backgroundColor: 'white', padding: 16,
                                    borderRadius: 12,
                                    marginBottom: 12,
                                    borderWidth: 1,
                                    borderColor: "#E0E0E0"
                                }}>
                                    <View style={{


                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        {/* Date Column */}
                                        <View style={{ width: 60, alignItems: 'center' }}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: '#616161',
                                                fontFamily: "Montserrat-Bold",
                                            }}>{month}</Text>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#616161',
                                                fontFamily: "Montserrat-Bold"
                                            }}>{day}</Text>
                                        </View>

                                        {/* Transaction Details */}
                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: '#212121',
                                                fontFamily: "Montserrat-Bold",
                                                marginBottom: 4
                                            }}>{item?.category}</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image source={{ uri: item?.logo }} style={{ width: 20, height: 20 }} />
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#212121',
                                                    fontFamily: "Montserrat-Medium",
                                                    marginLeft: 4,
                                                    paddingTop: 3
                                                }}>{item?.description}</Text>
                                            </View>
                                        </View>

                                        {/* Amount and Edit Button */}
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{
                                                fontSize: 18,
                                                color: '#0047CC',
                                                fontFamily: "Montserrat-Bold",
                                                marginRight: 12,
                                                paddingTop: 12
                                            }}>${Math.abs(item.amount).toFixed(2)}</Text>


                                        </View>

                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            padding: 8,
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                        }}
                                        onPress={() => {
                                            navigation.navigate('EditExpenseScreen', { item: item });
                                        }}
                                    >
                                        {/* @ts-ignore */}
                                        <Icon name="pencil" size={20} color="#616161" />
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image
                        source={require("../../../assets/gif/transactions.gif")}
                        style={{ width: 200, height: 230 }}
                    />
                    <Text style={{
                        fontSize: 18,
                        fontFamily: "Montserrat-Medium",
                        color: "#757575",
                        textAlign: "center",
                        marginTop: 16,
                        marginHorizontal: 24
                    }}>
                        Your expenses will appear here.
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: "Montserrat-Medium",
                        color: "#757575",
                        textAlign: "center"
                    }}>
                        Tap the button below to get started.
                    </Text>
                </View>
            )}
            {/* Floating Action Button */}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    backgroundColor: "#04950A",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={() => {
                    const openProps = createLinkOpenProps();
                    open(openProps);
                    if (!disabled) {
                        setDisabled(true); // Prevent double-press
                    }
                }}
            >
                <Link />
            </TouchableOpacity>
        </View>
    );
};
