import { addDays, format, getDaysInMonth } from "date-fns";

export type Dates = {
    today: Date,
    tomorrow: Date,
    currentMonthMaxDate: number,
    targetMonthAsString: string
}

// Helper function, designed to set up the required dates for the extension to work
export const getDates = (now = new Date()): Dates => {
    
    const today =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

    const tomorrow = addDays(today, 1);

    const targetMonth =
        new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );
    
    const currentMonthMaxDate = getDaysInMonth(today);

    return {
        today,
        tomorrow,
        currentMonthMaxDate,
        targetMonthAsString:
            format(
                targetMonth,
                "MM-yyyy"
            )
    };
};

