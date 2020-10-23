const fs = require("fs")
const util = require("util")
let id = 0
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Notes {
    readNotes(){
        return readFileAsync("db/db.json", "utf8")
    }
    writeNotes(data){
        return writeFileAsync("db/db.json", JSON.stringify(data))
    }
    getNotes(){
        return this.readNotes()
        .then(data => {
            let notes;


            try{
                notes = [].concat(JSON.parse(data))
                
            }
            catch(err){
                notes = [];
            }
            return notes
        })
    }
    addNotes(data){
        const {title,text} = data
        if(!title || !text){
            throw new Error("You must have title and text!")

        }
        const completedNote = { title, text, id:id++ }

        return this.getNotes()
        .then(data => {
            return [...data,completedNote]
        }).then(data => {
            return this.writeNotes(data)
    
        }).then(() => {
            return completedNote
        })


    }

    deletedNotes(id){
        return this.getNotes()
        .then(data => {
            return data.filter( notes => notes.id !== id)
        }).then(data => {
            return this.writeNotes(data)
        })
    }
}

module.exports = new Notes();