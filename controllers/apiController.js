const express = require("express");

//const Custonmer = require("../models/Customer");

const router = express.Router();

// const {tables} = require("../data/tables")
// const {waitlist} = require("../data/waitlist")

router.get("/tables",(req,res)=>{
    res.json(tables)
});

//retrieve users on the waitlist
// router.get("/waitlist",(req,res)=>{
//     res.json(waitlist)
// })
//reserve a table if there is space, otherwiise waitlist

