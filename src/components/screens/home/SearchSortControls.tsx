import { Transaction } from "@ourtypes/Transaction";
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Menu, Button, Divider, Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "src/utils/theme";

interface Props {
  transactions: Transaction[];
  onUpdate: (filteredTransactions: Transaction[]) => void;
}

export const SearchSortControls: React.FC<Props> = ({ transactions, onUpdate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterAndSort(query, sortOption);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
    filterAndSort(searchQuery, option);
    setMenuVisible(false);
  };

  const filterAndSort = (query: string, sortOption: string) => {
    let filtered = transactions.filter((txn) =>
      txn.description.toLowerCase().includes(query.toLowerCase())
    );

    if (sortOption === "date") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOption === "amount") {
      filtered.sort((a, b) => b.amount - a.amount);
    }

    onUpdate(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={theme.colors.darkText} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search Transactions"
          placeholderTextColor={theme.colors.darkText}
          value={searchQuery}
          onChangeText={handleSearch}
          keyboardType="numeric"
        />
      </View>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.sortButton}>
            <View style={styles.sortButtonContent}>
              <MaterialIcons name="sort" size={20} color={theme.colors.darkText} style={styles.searchIcon}/>
              <Text style={styles.sortText}>
                {sortOption === "date" ? "Date" : "Amount"}
              </Text>
            </View>
          </Button>
        }
      >
        <Menu.Item onPress={() => handleSort("date")} title="Sort by Date" />
        <Divider />
        <Menu.Item onPress={() => handleSort("amount")} title="Sort by Amount" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: theme.colors.subtitle,
    flex: 1,
    height: 42,
    paddingHorizontal: 12,
    minWidth: 150,
    maxWidth: "65%",
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    fontFamily: "Montserrat-Regular",
    flex: 1,
    fontSize: 12,
    color: theme.colors.secondarySearch,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 0.5,
    borderColor: theme.colors.subtitle,
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 0,
    justifyContent: 'space-evenly',
    minWidth: 100, 
    maxWidth: "30%"
  },
  sortButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sortText: {
    fontFamily: "Montserrat-Regular",
    marginLeft: 8,
    fontSize: 12,
    color: theme.colors.secondarySort,
  },
});

export default SearchSortControls;
