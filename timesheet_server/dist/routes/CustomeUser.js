"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const UserController_1 = tslib_1.__importDefault(require("../controller/UserController"));
const router = express_1.Router();
router.post('/', UserController_1.default.createUser);
router.get('/:id', UserController_1.default.getUserById);
router.get('/', UserController_1.default.getUsers);
router.delete('/:id', UserController_1.default.deleteUserById);
router.put('/', UserController_1.default.updateUser);
exports.default = router;
