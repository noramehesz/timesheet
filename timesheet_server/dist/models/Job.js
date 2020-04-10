"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const User_1 = tslib_1.__importDefault(require("./User"));
const JobSchema = new mongoose_1.default.Schema({
    ownerCompany: { type: User_1.default, required: true },
    rule: { tye: String, required: true },
    description: { type: String },
});
const JobModel = mongoose_1.default.model('Job', JobSchema);
class Job extends mongoose_1.default.Document {
    static createJob(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const job = new JobModel({
                ownerCompany: data.ownerCompany,
                rule: data.rule,
                description: data.description,
            });
            yield job.save((error, document) => {
                console.log(`created a new job with id: ${job.id}`);
            });
            return { createdJob: job };
        });
    }
    static getJobs() {
        return JobModel.find((error, document) => {
            console.log('get all jobs');
            return document;
        });
    }
    static getJobById(id) {
        return JobModel.findById(id, (error, document) => {
            console.log(`get a job with id: ${id}`);
            return document;
        });
    }
    static deleteJobById(id) {
        return JobModel.findByIdAndDelete(id, (error, document) => {
            console.log(`deleted a job with id: ${id}`);
            return document;
        });
    }
    static updateJobById(id, data) {
        return JobModel.findByIdAndUpdate(id, data, (error, document) => {
            console.log(`updated a job with id ${id}`);
        });
    }
}
exports.default = Job;
