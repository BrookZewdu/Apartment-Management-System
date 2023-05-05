import { Request,Response } from "express";
import Visitor,{IVisitor} from '../models/addVisitor';
// accept visitor request
export const acceptVisitor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const visitor = await Visitor.findByIdAndUpdate(id, { status: "accepted" });
        if (!visitor) {
        return res.status(404).json({ message: "Visitor not found" });
        }
        return res.status(200).json({ message: "Visitor accepted" });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
    }
// reject visitor request
export const rejectVisitor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const visitor = await Visitor.findByIdAndUpdate(id, { status: "rejected" });
        if (!visitor) {
        return res.status(404).json({ message: "Visitor not found" });
        }
        return res.status(200).json({ message: "Visitor rejected" });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
    }

