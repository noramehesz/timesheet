"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost/timesheet', { useNewUrlParser: true });
const db = mongoose_1.default.connection;
exports.default = db;
