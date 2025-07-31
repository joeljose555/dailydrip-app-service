import { Request, Response } from "express";
import { getNewsSummaryById, getAllNewsSummaries } from "../services/newsSummariesService";

export const getNewsSummaryByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newsSummary = await getNewsSummaryById(id);
        res.status(200).json(newsSummary);
    } catch (error) {
        console.log(error);
        if (error.message === "News summary not found") {
            res.status(404).json({ message: "News summary not found" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const getAllNewsSummariesController = async (req: Request, res: Response) => {
    try {
        const newsSummaries = await getAllNewsSummaries();
        res.status(200).json(newsSummaries);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
} 