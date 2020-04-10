"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const JobController_1 = tslib_1.__importDefault(require("../controller/JobController"));
const router = express_1.Router();
router.post('/', JobController_1.default.createJob);
router.get('/', JobController_1.default.getAllJobs);
router.get('/:id', JobController_1.default.getJobById);
router.delete('/:id', JobController_1.default.deleteJob);
router.put('/', JobController_1.default.updateJob);
exports.default = router;