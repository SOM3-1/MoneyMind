import { Budget } from "@ourtypes/Budget";
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Menu, Button, Divider, Text } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "src/utils/theme";

interface Props {
  budgets: Budget[];
  onUpdate: (filteredBudgets: Budget[]) => void;
}

export const SearchSortControls: React.FC<Props> = ({ budgets, onUpdate }) => {
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
    let filtered = budgets.filter((budget) =>
      budget.title.toLowerCase().includes(query.toLowerCase())
    );
  
    if (sortOption === "date") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.fromDate).getTime();
        const dateB = new Date(b.fromDate).getTime();
        return dateB - dateA; 
      });
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
          placeholder="Search Budgets"
          placeholderTextColor={theme.colors.darkText}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)} style={styles.sortButton}>
            <View style={styles.sortButtonContent}>
              <MaterialIcons name="sort" size={20} color={theme.colors.darkText} />
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
    width: 232,
    height: 42,
    paddingHorizontal: 12,
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
    borderWidth: 0.5,
    borderColor: theme.colors.subtitle,
    borderRadius: 8,
    width: 116,
    height: 42,
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  sortButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontFamily: "Montserrat-Regular",
    marginLeft: 8,
    fontSize: 12,
    color: theme.colors.secondarySort,
  },
});

export default SearchSortControls;
