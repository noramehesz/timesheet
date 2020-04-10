"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Timesheet_1 = tslib_1.__importDefault(require("./Timesheet"));
var UserType;
(function (UserType) {
    UserType["student"] = "student";
    UserType["studentClub"] = "studentClub";
    UserType["company"] = "company";
})(UserType || (UserType = {}));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    school: { type: String, required: false },
    timesheets: { type: [Timesheet_1.default], required: false },
    students: { type: [{ student: this, job: String }], required: false },
    companies: { type: [this], required: false },
    employees: { type: [this], required: false },
    role: { type: UserType, required: true },
});
const UserModel = mongoose_1.default.model('User', UserSchema);
class User extends mongoose_1.default.Document {
    static createUser(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = new UserModel({
                email: data.email,
                name: data.name,
                username: data.username,
                school: data.school,
                timesheets: data.timesheets,
                students: data.students,
                companies: data.companies,
                employees: data.employees,
                role: data.role,
            });
            yield user.save((error, document) => {
                console.log(`create a user with id: ${user.id}`);
            });
            return { message: `creat a user witn id: ${user.id}`, createdUser: user };
        });
    }
    static getUsers() {
        return UserModel.find((error, document) => {
            console.log(`get all users`);
            return document;
        });
    }
    static getUserById(id) {
        return UserModel.findById(id, (error, document) => {
            console.log(`get user with id: ${id}`);
            return document;
        });
    }
    static deleteUserById(id) {
        return UserModel.findByIdAndDelete(id, (error, document) => {
            console.log(`delet a uder with id: ${id}`);
            return document;
        });
    }
    static updateUserById(id, data) {
        return UserModel.findByIdAndUpdate(id, data, (error, document) => {
            console.log(`update a user with id: ${id}`);
        });
    }
}
exports.default = User;
