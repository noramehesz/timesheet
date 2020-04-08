import User from '../models/User';
import {Request, Response} from 'express';

const createUser = async (req: Request, res: Response) => {
    res.send(await User.createUser(req.body));
}

const getUsers = (req: Request, res: Response) => {
    User.getUsers().then(getAll => {res.send(getAll); console.log(getAll)});
}

const getUserById = (req: Request, res: Response) => {
    User.getUserById(req.params.id).then(user => {res.send(user)});
}

const deleteUserById = (req: Request, res: Response) => {
    User.deleteUserById(req.params.id).then(deletedUser => {res.send(deletedUser)});
}

const updateUser = (req: Request, res: Response) => {
    User.updateUserById(req.body.id, req.body).then(updated => {res.send(updated)});
}

export default {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUser,
};