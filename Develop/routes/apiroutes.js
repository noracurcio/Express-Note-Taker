const router = require("express").Router()
const notes = require("../db/notesclass")

router.get("/api/notes", function(req, res){
   notes.getNotes()
   .then((data) => {
       return res.json(data)
   }).catch(err => {
       return res.json(err)
   })
})

router.post("/api/notes", function(req, res){
    notes.addNotes(req.body)
    .then((data) => {
        return res.json(data)
    }).catch(err => {
        return res.json(err)
    })
 })

 router.delete("/api/notes/:id", function(req, res){
    notes.deletedNotes(req.params.id)
    .then(() => {
        return res.json({
            ok: true
        })
    }).catch(err => {
        return res.json(err)
    })
 })


 
 module.exports = router