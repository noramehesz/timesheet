import TimeSheet from '../models/Timesheet';
import {Request, Response} from 'express';

const createTimeSheet = async (req: Request, res: Response) => {
    console.log(req.body);
   res.send(await TimeSheet.createTimeSheet(req.body));
}

const getTimeSheetById = (req: Request, res: Response) => {
    TimeSheet.getTimeSheetById(req.body.id).then(get => res.send(get));
}

const getAllTimeSheets = (req: Request, res: Response) => {
    TimeSheet.getAllTimeSheets().then(timeSheets => res.send(timeSheets));
}

const updateTimeSheetById = (req: Request, res: Response) => {
    TimeSheet.updateTimeSheetDaysById(req.body).then(update => { res.statusCode = 200; res.send(update) });
}

const deleteTimeSheetById = (req: Request, res: Response) => {
    TimeSheet.deleteTimeSheetById(req.params.id).then(del => res.send(del));
}

export default {
    createTimeSheet,
    deleteTimeSheetById,
    getAllTimeSheets,
    getTimeSheetById,
    updateTimeSheetById
};
