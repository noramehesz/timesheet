"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Job_1 = tslib_1.__importDefault(require("../models/Job"));
const createJob = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send(yield Job_1.default.createJob(req.body));
});
const getAllJobs = (req, res) => {
    Job_1.default.getJobs().then(allJobs => res.send(allJobs));
};
const getJobById = (req, res) => {
    Job_1.default.getJobById(req.params.id).then(job => res.send(job));
};
const deleteJob = (req, res) => {
    Job_1.default.deleteJobById(req.params.id).then(deleted => res.send(deleted));
};
const updateJob = (req, res) => {
    Job_1.default.updateJobById(req.body.id, req.body).then(updated => res.send(updated));
};
exports.default = {
    createJob,
    getAllJobs,
    getJobById,
    deleteJob,
    updateJob,
};
