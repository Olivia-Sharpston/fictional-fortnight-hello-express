import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express()
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/olivia">olivia</a>')
})
// endpoints...middlewares...apis?

// send to an html file
app.get('/olivia', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'olivia.html')) 
})

app.get('/api/olivia', (req, res) => {
  // res.send('olivia. <a href="/">home</a>')
  const myVar = 'Hello from server!';
  res.json({ myVar });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

