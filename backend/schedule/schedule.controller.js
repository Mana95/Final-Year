const express = require('express');
const router = express.Router();
var path = require('path');
var mime = require('mime');
var fs = require('fs');

const scheduleService = require('./schedule.service');

module.exports = router;



router.post('/RejectRecord' , RejectRecord);
router.post('/createSchedule' , createSchedule);
router.post('/createScheduleAndDiet' , createScheduleAndDiet);
router.post('/insertData' , insertData);
router.post('/updateRecord' , updateRecord);
router.post('/saveExercise' , saveExercise);

router.get('/getAllSchedule' , getAllSchedule);
router.get('/DietPlangetById/:id' , DietPlangetById);
router.get('/getMySchedule/:id' , getMySchedule);
router.get('/getPendings' , getPendings);
router.get('/getAcceptedSchedule' , getAcceptedSchedule);
router.get('/loadById/:id' , loadById);
router.get('/loadInstrucotrData/:id' , loadInstrucotrData);
router.get('/checkAvalibility/:id', checkDateAvl);
router.get('/getById/:id' ,getById);
router.get('/loadInstructor' ,loadInstructor);
router.get('/loadSchedule/:id' ,loadSchedule);
router.get('/getmembershipDetais/:id' ,getmembershipDetais);
router.get('/getmembershipcheckEmailAvailable/:id' ,getmembershipcheckEmailAvailable);
router.get('/getmembershipcheckUsernameAvailable/:id' ,getmembershipcheckUsernameAvailable);
router.get('/getDietMyPlanID' , getDietMyPlanID);
router.get('/getAllExercise/:name' , getAllExercise);

function getAllExercise(req ,res, next){
    scheduleService.getAllExercise(req.params.name)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function saveExercise(req ,res, next){
    scheduleService.saveExercise(req.body)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getDietMyPlanID(req ,res, next){
    
    scheduleService.getDietMyPlanID(req.query)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}




function DietPlangetById(req ,res, next){
    scheduleService.DietPlangetById(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function createScheduleAndDiet(req ,res ,next){
    scheduleService.createScheduleAndDiet(req.body)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function loadSchedule(req ,res ,next){
    scheduleService.loadSchedule(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getmembershipcheckUsernameAvailable (req ,res , next){
    const username = req.params.id;
    scheduleService.getmembershipcheckUsernameAvailable(username)
    .then(email => res.json(email))
    .catch(err => next(err));
}
function getmembershipcheckEmailAvailable(req ,res ,next) {
    console.log('HI')
    const email = req.params.id;
    scheduleService.getmembershipcheckEmailAvailable(email)
    .then(email => res.json(email))
    .catch(err => next(err));
}




function getmembershipDetais(req , res ,next){
    const id = req.params.id;
    scheduleService.getmembershipDetais(id)
    .then(id => res.json(id))
    .catch(err => next(err));
}


function checkDateAvl (req ,res ,next){
    const id = req.params.id;
    scheduleService.checkAvl(id)
    .then(id => res.json(id))
    .catch(err => next(err));
}

function loadInstructor(req ,res, next){
    scheduleService.loadInstructor()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}


function getById(req ,res, next){
    scheduleService.getById(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}



function createSchedule(req ,res ,next){
    
    scheduleService.createSchedule(req.body)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}
function loadInstrucotrData(req ,res ,next){
    scheduleService.loadInstrucotrData(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function loadById(req,res,next){
    //console.log(req.params.id);
    scheduleService.loadById(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));


}

function getAcceptedSchedule(req,res ,next){
    scheduleService.getAcceptedSchedule()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}



function RejectRecord(req ,res ,next){
    let data = {
        _id:req.body.id,
        status:2
    }
    scheduleService.RejectRecord(data)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}
function updateRecord(req ,res , next){
    console.log(req.body)
    let data = {
        _id:req.body._id,
        status:3
    }
    scheduleService.updateRecord(data)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getPendings(req ,res ,next){
    scheduleService.PendingSchedule()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getMySchedule(req ,res , next){
    scheduleService.getByMySchedule(req.params.id)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function insertData(req,res, next){
    scheduleService.insertSchData(req.body)
    .then(sch => res.json(sch))
    .catch(err => next(err));
}

function getAllSchedule(req ,res ,next){
    scheduleService.getByName()
    .then(sch => res.json(sch))
    .catch(err => next(err));
}