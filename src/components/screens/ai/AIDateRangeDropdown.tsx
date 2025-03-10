import { DATE_RANGE_OPTIONS } from "@constants/dateRange";
import { DateRange } from "@ourtypes/Ai";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-paper-dropdown";
import { theme } from "src/utils/theme";

interface AIDateRangeDropdownProps {
  selectedRange: DateRange;
  onChange: (value: DateRange) => void;
}

export const AIDateRangeDropdown: React.FC<AIDateRangeDropdownProps> = ({ selectedRange, onChange }) => {

  return (
    <View style={styles.container}>
      <Dropdown
        mode="outlined"
        value={selectedRange}
        onSelect={(value) => onChange(value as DateRange)}
        options={DATE_RANGE_OPTIONS}
        error={false}
        disabled={false}
        menuContentStyle={styles.dropdownMenu}
        hideMenuHeader={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: 354,
    height: 36,
  },
  dropdown: {
    width: 354,
    backgroundColor: theme.colors.background,
    height: 36,
  },
  dropdownMenu: {
    backgroundColor: theme.colors.background,
    width: 354,
  },
});

export default AIDateRangeDropdown;
