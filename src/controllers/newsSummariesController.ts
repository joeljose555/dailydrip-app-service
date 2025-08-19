import { Request, Response } from "express";
import { getNewsSummaryById, getAllNewsSummaries } from "../services/newsSummariesService";
import { HttpStatus } from '../constants/httpStatus';

export const getNewsSummaryByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const newsSummary = await getNewsSummaryById(id);
        res.status(HttpStatus.OK).json(newsSummary);
    } catch (error) {
        console.log(error);
        if ((error as Error).message === "News summary not found") {
            res.status(HttpStatus.NOT_FOUND).json({ message: "News summary not found" });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}

export const getAllNewsSummariesController = async (req: Request, res: Response) => {
    try {
        const newsSummaries = await getAllNewsSummaries();
        res.status(HttpStatus.OK).json(newsSummaries);
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
} 