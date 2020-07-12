﻿require('rootpath')();
const cors = require('cors');
const cron = require("node-cron");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var moment = require('moment');

const jwt = require('_helpers/jwt');
const path = require('path');
const shell = require('shelljs');
const db = require('_helpers/db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));

//http  every controller 
app.use('/users', require('./users/users.controller'));
app.use('/catagory', require('./catagory/catagory.controller'));
app.use('/order', require('./orders/order.controller'));
app.use('/shedule', require('./schedule/schedule.controller'));

app.use('/uplds', require('./uplds/upload.controller'));
app.use('/jobs', require('./jobs/jobs.controller'));
app.use('/comments', require('./comments/comment.controller'));
app.use('/roles', require('./users/roles/role.controller'));

/** Serving from the same express Server
No cors required */
app.use(express.static('../client'));

//define the membership collection 
const Membership = db.Membership;
const User = db.User;

var currentDate = moment();
var arraylength = 0;

var storage = multer.diskStorage({ //multers disk storage settings
    //Pass function that will generate destination path
    destination: function (req, file, cb) {
        //initial upload path
        //  console.log("Methnain thamai patha eka hadenne"+ req.params.uniqueId);
        let destination = path.join(__dirname, '../frontend/src/assets/exercise/'); //uploading
        shell.mkdir('-p', '../frontend/src/assets/exercise/' + req.params.uniqueId);
        destination = path.join(destination, '', req.params.uniqueId);
        cb(null, destination);
    },
  filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
app.post('/upload/:uniqueId', function (req, res) {
    upload(req, res, function (err) {
        //console.log("This is the api file uploaf" + JSON.stringify(req.file));
        console.log(req.params.uniqueId);
        // console.log(req.path);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        } else {
            var fileDetails = req.file;
            return res.json(req.file);
        }
    });
});

// schedule tasks to be run on the server   
cron.schedule("* * * * *", function () {
    var today = new Date(); 
    //console.log(today); 
   // 2020-07-10T15:57:37.009Z
    Membership.updateMany({"endDate":{$lt:today}}, { $set:{"status":"false"}},function(error , result){
    
    });
    var updateData = {
        "membershipStatus":false,
        "role":"Member"  
    }
    //User.updateMany({"createdDate":{$lt:today}},{$set:updateData} ,function(error , result){
      
    // });
    
});
app.listen('4000', function () {
    console.log('running on 4000...');
});
