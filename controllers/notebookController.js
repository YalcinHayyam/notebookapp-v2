
const express = require('express')
const router = express.Router();
const fs = require('fs');
const path = require("path")
const uuid = require('uuid')

var dir = path.join(path.dirname(require.main.filename), "notebooks")

router.get('/', (req, res) => {
    var docsAndContents = [];
    var docs = fs.readdirSync(dir)
    docs.map(doc => {
        var content = fs.readFileSync(path.join(dir, doc), 'utf-8')
        docsAndContents.push({ id: uuid.v4(), doc, content })
    })
    res.send(docsAndContents)
})

router.post('/', (req, res, next) => {
    var { noteList } = req.body
    if (noteList != null) {
        console.log("fonksiyon içi", noteList)
        noteList.map(note => {
            fs.writeFileSync(path.join(dir, note.doc), note.content, 'utf-8')
        })
    }
    res.status(200).end()
})


module.exports = router
