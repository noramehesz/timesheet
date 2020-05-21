import mongoose from 'mongoose';
import TimeSheetModel from './Timesheet';

enum UserType {
    student = 'student',
    studentClub = 'studentClub',
    company = 'company',
}

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: false},
    password: {type: String, required: true},
    username: {type: String, required: true},
    school: {type: String, required: false},
    timesheets: {type: Array<any>(), required: false},
    students: {type: [{student: this, job: String}], required: false},
    companies: {type: [this], required: false},
    employees: {type: [this], required: false},
    role: {type: UserType, required: true},
});

const UserModel = mongoose.model('User', UserSchema);

class User extends mongoose.Document {

    static async createUser(data: any) {
        const user = new UserModel({
            email: data.email,
            name: data.name,
            username: data.username,
            password: data.password,
            school: data.school,
            timesheets: data.timesheets,
            students: data.students,
            companies: data.companies,
            employees: data.employees,
            role: data.role,
        });

        let errorMessage: string = '';

        await user.save((error, document) => {
            if (error) {
                errorMessage = error;
            }
            console.log(`create a user with id: ${user.id}`);
        });

        return {message: `creat a user witn id: ${user.id}`, createdUser: user, error: errorMessage}; // -pw
    }

    static getUsers() {
        return UserModel.find((error, document) => {
            console.log(`get all users`);
            return document;
        });
    }

    static getUserById(id: string)  {
        return UserModel.findById(id, (error, document) => {
            console.log(`get user with id: ${id}`);
            return document;
        });
    }

    static login(username: string, password: string) {
        let errorMessage: any = null;
        return UserModel.findOne({password, username}, (error, document) => {
            if (error) {
               errorMessage = error;
            }
            console.log(`try to get user, username: ${username}`);
            return {doc: document, error: errorMessage};
        })
    }

    static deleteUserById(id: string) {
        return UserModel.findByIdAndDelete(id, (error, document) => {
            console.log(`delet a user with id: ${id}`);
            return document;
        })
    }

    static updateUserById(id: string, data: any) {
        return UserModel.findByIdAndUpdate(id, data, (error, document) => {
            if (error) {
                console.log(error);
            }
            console.log(`update a user with id: ${id}`);
        })
    }
}

export default User;