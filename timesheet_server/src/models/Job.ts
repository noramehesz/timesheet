import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    ownerCompany: {type: mongoose.Types.ObjectId, required: true},
    rule: {type: String, required: true},
    description: {type: String},
});

const JobModel = mongoose.model('Job', JobSchema);

class Job extends mongoose.Document {

    static async createJob(data: any) {
        const job = new JobModel({
            ownerCompany: data.ownerCompany,
            rule: data.rule,
            description: data.description,
        });

        await job.save((error, document) => {
            console.log(`created a new job with id: ${job.id}`);
        });

        return {createdJob: job};
    }

    static getJobs() {
        return JobModel.find((error, document) => {
            console.log('get all jobs');
            return document;
        });
    }

    static getJobById(id: string) {
        return JobModel.findById(id, (error, document) => {
            console.log(`get a job with id: ${id}`);
            return document;
        });
    }

    static deleteJobById(id: string) {
        return JobModel.findByIdAndDelete(id, (error, document) => {
            console.log(`deleted a job with id: ${id}`);
            return document;
        });
    }

    static updateJobById(id: string, data: any) {
        return JobModel.findByIdAndUpdate(id, data, (error, document) => {
            console.log(`updated a job with id ${id}`);
        });
    }
}

export default Job;