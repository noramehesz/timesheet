"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const User_1 = tslib_1.__importDefault(require("../models/User"));
const TimeSheetSchema = new mongoose_1.default.Schema({
    owner: { type: User_1.default, required: true },
    job: String,
    timeSheetDate: Date,
    days: [],
});
const TimeSheetModel = mongoose_1.default.model('TimeSheet', TimeSheetSchema);
class TimeSheet extends mongoose_1.default.Document {
    static createTimeSheet(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const timeSheet = new TimeSheetModel({
                owner: data.owner,
                job: data.job,
                timeSheetDate: data.timesheetDate,
                days: [],
            });
            let errorMeesage;
            yield timeSheet.save((error, document) => {
                if (error) {
                    errorMeesage = error;
                }
                console.log(`create new TimeSheet, id: ${timeSheet.id}`);
            });
            return { message: 'Timesheet created', id: timeSheet.id, error: errorMeesage, createdTimeSheet: timeSheet };
        });
    }
    static getTimeSheetById(id) {
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
    static updateTimeSheetDaysById(data) {
        return TimeSheetModel.findByIdAndUpdate(data.id, data, (error, document) => {
            console.log(`a timesheet id: ${data.id} was updated with the following datas: ${data.days}`);
        });
    }
    static deleteTimeSheetById(id) {
        return TimeSheetModel.findOneAndDelete(id, (error, document) => {
            console.log(`deleted a timesheet, id: ${id}`);
            return document;
        });
    }
}
exports.default = TimeSheet;
