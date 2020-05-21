import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/timesheet', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

export default db;