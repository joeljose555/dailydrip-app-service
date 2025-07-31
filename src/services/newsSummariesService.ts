import NewsSummaries from "../models/newsSummaries";

export const getNewsSummaryById = async (id: string) => {
    try {
        const newsSummary = await NewsSummaries.findById(id);
        if (!newsSummary) {
            throw new Error("News summary not found");
        }
        return newsSummary;
    } catch (error) {
        throw error;
    }
}

export const getAllNewsSummaries = async () => {
    try {
        const newsSummaries = await NewsSummaries.find().sort({ createdAt: -1 });
        return newsSummaries;
    } catch (error) {
        throw error;
    }
} 