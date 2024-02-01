const router = require('express').Router();
const fs = require('fs');
const uuidv1 = require('uuid');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then((response) => {
      res.json(JSON.parse(response));
    })
  });

router.post('/notes', (req, res) => {
    const { title, text, id } = req.body;

    if (!title || !text) {
      throw new Error("Please enter a title and text.");
    }

    const newNote = { title, text, id: uuidv1() };

    readFileAsync('./db/db.json', 'utf8').then((response) => {
      const listNotes = JSON.parse(response);
      listNotes.push(newNote);
      writeFileAsync('./db/db.json', JSON.stringify(listNotes), (error) => {
        if(error) {
          console.log(error)
        }
      })
    })
})

module.exports = router

