import mongoose from 'mongoose';
import User from '../models/User';

const TimeSheetSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    job: String,
    timeSheetDate: Date,
    days: [],
});

type Time = {
    hour: number,
    minute: number,
}

type Day =  {
    dayOfMoth: number,
    arrive: Time,
    leave: Time,
    workingHours: number,
}


const TimeSheetModel = mongoose.model('TimeSheet', TimeSheetSchema);

class TimeSheet extends mongoose.Document {

    static async createTimeSheet(data: any) {
        const timeSheet = new TimeSheetModel({
            owner: data.owner,
            job: data.job,
            timeSheetDate: data.timesheetDate,
            days: [],
        });

        let errorMeesage;

        await timeSheet.save((error, document) => {
            if (error) {
                errorMeesage = error;
            }
            console.log(`create new TimeSheet, id: ${timeSheet.id}`);
        });
        return {message: 'Timesheet created', id: timeSheet.id, error: errorMeesage};

    }

    static getTimeSheetById(id: any) {
        return TimeSheetModel.findById(id, (error, document) => {
            console.log(`get TimeSheet by Id: ${id}`);
            return document;
        });
    }

    static getAllTimeSheets() {
        return TimeSheetModel.find((error, document) => {
           console.log(`get all sheets`);
           return document;
        });
    }

    static updateTimeSheetDaysById(data: any) {
        return TimeSheetModel.findByIdAndUpdate(data.id, data, (error, document) => {
            console.log(`a timesheet id: ${data.id} was updated with the following datas: ${data.days}`);
        });
    }

    static deleteTimeSheetById(id: any) {
        return TimeSheetModel.findOneAndDelete(id, (error, document) => {
            console.log(`deleted a timesheet, id: ${id}`);
            return document;
        })
    }
}

export default TimeSheet;