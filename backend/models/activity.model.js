const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema ({
    activityStart: {type: Date, required: true},
    activityFinish: {type: Date, required: true},
    distance: {type: Number, required: true},
    activityType: {type: Boolean, required: true}, //false - running, true - riding
});
    //timestamps: true

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;