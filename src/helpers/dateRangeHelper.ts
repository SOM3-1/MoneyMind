import { DateTime } from "luxon";

/**
 * Calculates the start and end dates based on the selected date range.
 * @param dateRange - The selected date range.
 * @returns { startDate: string, endDate: string, days: number }
 */
export const getDateRangeDays = (dateRange: string) => {
    const today = DateTime.local().startOf("day"); 
    let startDate;
    let endDate = today.endOf("day");

  switch (dateRange) {
    case "this_month":
      startDate = today.startOf("month");
      break;
    case "past_month":
      startDate = today.minus({ months: 1 }).startOf("month");
      endDate = today.minus({ months: 1 }).endOf("month");
      break;
    case "past_3_months":
      startDate = today.minus({ months: 3 }).startOf("month");
      break;
    case "past_6_months":
      startDate = today.minus({ months: 6 }).startOf("month");
      break;
    case "past_year":
      startDate = today.minus({ years: 1 }).startOf("year");
      break;
    default:
      startDate = today.startOf("month");
  }

  return {
    startDate: startDate.toFormat("yyyy-MM-dd"),
    endDate: endDate.toFormat("yyyy-MM-dd"),
    days: Math.ceil(endDate.diff(startDate, "days").days),
  };
};
