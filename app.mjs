import express from 'express'
// commented out
// import path from 'path';
// import {dirname} from 'node:path';

const app = express()
// commented out
// const path = require('path');
const PORT = process.env.PORT || 3000;

// app.use(express.static(__dirname + 'public'));



app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/olivia">olivia</a>')
})
// endpoints...middlewares...apis?
// send to an html file

app.get('/olivia', (req, res) => {
  //res.send('olivia. <a href="/">home</a>')

  // commented out
  // res.sendFile('olivia.html');
})



// app.listen(3000)
// TODO: refactor to use env port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
