// Main submodule:
import { addDays, format } from "date-fns";

// Set up the dates and their corresponding types for Menu component
export type Dates = {
    today: Date,
    tomorrow: Date,
    targetMonthAsString: string
}

// Helper function, designed to set up the required dates for the extension to work
export const getDates = (now = new Date()): Dates => {
    
    // We have TODAY'S date, in the preferred format that we want
    const today =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

    // We also have TOMORROW'S date
    const tomorrow = addDays(today, 1);

    // This is for detecting the TARGET MONTH
    const targetMonth =
        new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

    return {
        today,
        tomorrow,
        targetMonthAsString:
            format(
                targetMonth,
                "MM-yyyy"
            )
    };
};