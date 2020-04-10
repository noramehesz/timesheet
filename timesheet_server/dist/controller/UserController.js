"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = tslib_1.__importDefault(require("../models/User"));
const createUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send(yield User_1.default.createUser(req.body));
});
const getUsers = (req, res) => {
    User_1.default.getUsers().then(getAll => { res.send(getAll); console.log(getAll); });
};
const getUserById = (req, res) => {
    User_1.default.getUserById(req.params.id).then(user => { res.send(user); });
};
const deleteUserById = (req, res) => {
    User_1.default.deleteUserById(req.params.id).then(deletedUser => { res.send(deletedUser); });
};
const updateUser = (req, res) => {
    User_1.default.updateUserById(req.body.id, req.body).then(updated => { res.send(updated); });
};
exports.default = {
    createUser,
    getUsers,
    getUserById,
    deleteUserById,
    updateUser,
};
