import { DATE_RANGE_OPTIONS } from "@constants/dateRange";
import { DateRange } from "@ourtypes/Ai";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "src/utils/theme";
import DropDownPicker from "react-native-dropdown-picker";
import { aiScreenStyles } from "./aiScreenStyles";

interface AIDateRangeDropdownProps {
  selectedRange: DateRange;
  onChange: (value: DateRange) => void;
}

export const AIDateRangeDropdown: React.FC<AIDateRangeDropdownProps> = ({ selectedRange, onChange }) => {
const [open, setOpen] = useState(false);

  return (
    <View style={aiScreenStyles.dropDownContainer}>
     <DropDownPicker
        open={open}
        value={selectedRange}
        setOpen={setOpen}
        setValue={(callback) => onChange(callback(selectedRange))}
        items={DATE_RANGE_OPTIONS}
        style={aiScreenStyles.dropdown}
        dropDownContainerStyle={aiScreenStyles.dropdownMenu}
        textStyle={aiScreenStyles.dropDownText}
        placeholder=""
        showArrowIcon={true}
        showTickIcon={false}
        listMode="SCROLLVIEW"
      />
    </View>
  );
};


export default AIDateRangeDropdown;
