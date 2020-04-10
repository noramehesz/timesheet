"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Timesheet_1 = tslib_1.__importDefault(require("../models/Timesheet"));
const createTimeSheet = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    res.send(yield Timesheet_1.default.createTimeSheet(req.body));
});
const getTimeSheetById = (req, res) => {
    Timesheet_1.default.getTimeSheetById(req.body.id).then(get => res.send(get));
};
const getAllTimeSheets = (req, res) => {
    Timesheet_1.default.getAllTimeSheets().then(timeSheets => res.send(timeSheets));
};
const updateTimeSheetById = (req, res) => {
    Timesheet_1.default.updateTimeSheetDaysById(req.body).then(update => { res.statusCode = 200; res.send(update); });
};
const deleteTimeSheetById = (req, res) => {
    Timesheet_1.default.deleteTimeSheetById(req.params.id).then(del => res.send(del));
};
exports.default = {
    createTimeSheet,
    deleteTimeSheetById,
    getAllTimeSheets,
    getTimeSheetById,
    updateTimeSheetById
};
