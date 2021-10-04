const db = require('../db/db.json');
const fs = require('fs');
const randNum = () => Math.floor(Math.random() * 123456789);
const updateDb = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./db/db.json', JSON.stringify(data), (err) => {
      err ? reject((err) => err) : resolve(console.log('sucess!'));
    });
  });
};
module.exports = (app) => {
  app.get('/api/notes', (req, res) => res.json(db));
  app.post('/api/notes', (req, res) => {
    const id = randNum();
    req.body.id = id;
    db.push(req.body);
    updateDb(db).catch((err) => console.log(err));
    res.json(db);
  });
  app.delete('/api/notes/:id', (req, res) => {
    const myId = parseInt(req.params.id);
    const getIndex = () => {
      for (let i = 0; i < db.length; i++) {
        if (myId == db[i].id) {
          return i;
        }
      }
    };
    const myIndex = getIndex();
    db.splice(myIndex, 1);
    updateDb(db).catch((err) => console.log(err));
    res.json(db);
  });
};
