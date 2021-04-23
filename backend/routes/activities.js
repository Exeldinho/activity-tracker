const router = require('express').Router()
const Activity = require('../models/activity.model')

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/').post((req, res) => {
    const activityStart = Date.parse(req.body.activityStart)
    const activityFinish = Date.parse(req.body.activityFinish)
    const distance = Number(req.body.distance)
    const activityType = req.body.activityType

    const newActivity = new Activity({
        activityStart,
        activityFinish,
        distance,
        activityType,
    });

    newActivity.save()
        .then(() => res.json('Activity added'))
        .catch(err => res.status(400).json('Error: '+ err))
})

module.exports = router