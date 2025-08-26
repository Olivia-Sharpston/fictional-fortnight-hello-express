import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Express from Render')
})

// endpoints...middlewares...apis?
// send to an html file

// app.listen(3000)
// TODO: refactor to use env port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
