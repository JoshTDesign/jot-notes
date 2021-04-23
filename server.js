//required packages
const { RSA_NO_PADDING } = require("constants");
const express = require("express");
const app = express();
const fs = require('fs');
const uniqid = require('uniqid');
const util = require("util");
let newNote = {};
let updateArray;

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


//note object definition
class Note {
    constructor(title,text){
        this.title = title;
        this.text = text;
    }
}


//function for reading json file
const readFile = async ()=>{
    let data = await readFilePromise("./db/db.json", "utf8" )
    return JSON.parse(data);
}


//function for writing new content to json file
const writeFile = async (data)=>{
    data = JSON.stringify(data, null, 2);
    await writeFilePromise("./db/db.json", data)
}


//get noteArray data and populate the note page 
app.get("/api/notes", async(req,res)=>{
    let data = await readFile()
    res.json(data)
})


//handles delete request from site
app.delete("/api/notes/:id", async(req,res)=>{
    const delNote = req.params.id;
    let noteArray = await readFile();
    console.log('note deleted');
    for (let i = 0; i < noteArray.length; i++) {
        if (delNote === noteArray[i].id) {
            noteArray.splice(i,1);
            let data = await writeFile(noteArray);
            res.json('deleted note ' + data);
        }
    }
})


//handles post request from site
app.post("/api/notes", async (req,res)=>{
    const newNote = req.body;
    newNote.id = uniqid.time();
    console.log(newNote);
    // const noteArray = await readFilePromise("./db/db.json", "utf8" )
    let noteArray = await readFile();
    await writeFile([...noteArray, newNote])
    res.send(newNote);
})


//handles routing for notes.html
app.get("/notes", (req,res)=>{
    res.sendFile(__dirname + "/public/notes.html");
})


// handles routing for index page
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})


//listener command for server
app.listen(PORT,()=>{
    console.log("listening on port " + PORT)
});