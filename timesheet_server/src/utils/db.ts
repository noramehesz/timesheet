import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/timesheet', {useNewUrlParser: true});

const db = mongoose.connection;

export default db;