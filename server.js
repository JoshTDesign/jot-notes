const { RSA_NO_PADDING } = require("constants");
const express = require("express");
const app = express();
const fs = require('fs');
const uniqid = require('uniqid');
// const Note = require("/models/Note");

const PORT = process.env.PORT || 3000
let newNote = {};
let updateArray;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

class Note {
    constructor(title,text){
        this.title = title;
        this.text = text;
    }
}

const util = require("util");


const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const readFile = async ()=>{
    let data = await readFilePromise("./db/db.json", "utf8" )
    return JSON.parse(data);
}


const writeFile = async (data)=>{
    data = JSON.stringify(data, null, 2);
    await writeFilePromise("./db/db.json", data)
}


//get noteArray data and populate the note page 
app.get("/api/notes", async(req,res)=>{
    let data = await readFile()
    console.log(data)
    res.json(data)
})

app.delete("/api/notes/:id", async(req,res)=>{
    const delNote = req.params.id;
    let noteArray = await readFile();
    console.log('note deleted');
    // res.send('worked' + delNote);
    for (let i = 0; i < noteArray.length; i++) {
        if (delNote === noteArray[i].id) {
            noteArray.splice(i,1);
            let data = await writeFile(noteArray);
            res.json(data);
        }
    }
})

app.post("/api/notes", async (req,res)=>{
    const newNote = req.body;
    newNote.id = uniqid.time();
    console.log(newNote);
    // const noteArray = await readFilePromise("./db/db.json", "utf8" )
    let noteArray = await readFile();
    await writeFile([...noteArray, newNote])
    res.send(newNote);
})

app.get("/notes", (req,res)=>{
    res.sendFile(__dirname + "/public/notes.html");
    // res.send('/note.html should be here')
})

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
})



app.listen(PORT,()=>{
    console.log("listening on port " + PORT)
});