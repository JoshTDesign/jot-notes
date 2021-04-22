const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname,"../views/index.html"));
});

router.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views/notes.html"));
});


module.exports = router;