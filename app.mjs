import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';



const app = express()
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;
console.log("get .env uri:", uri);

app.use(express.urlencoded({ extended: true })); // Parse form data 
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Keep the connection open for our CRUD operations
let db;
async function connectDB(){
  try{
    await client.connect();
    db = client.db("school"); // Database Name
    console.log("Connect to MongoDB!");
  } catch (error){
    console.error("Failed to connect to MongoDB:", error);
  }
}
connectDB;

app.get('/', (req, res) => {
  res.send('Hello Express from Render. <a href="/olivia">olivia</a> <a href="/traditional-forms">Traditional Forms</a>')
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

app.get('/api/query', (req, res) => {
  //console.log("client request with query param:", req.query.name);
  const name = req.query.name;
  res.json({"message": `Hi, ${name}. How are you?`});
})

app.get('/api/url/:id', (req, res) => {
  console.log("client request with URL param:", req.params.id);
  // const name = req.query.name;
  // res.json({"message": `Hi, ${name}. How are you?`});
})

app.get('/api/body', (req, res) => {
  console.log("client request with POST body:", req.query);
  // console.log("client request with POST body:", req.body.name);
  // const name = req.body.name;
  // res.json({"message": `Hi, ${name}. How are you?`});
})

app.post('/api/body', (req, res) => {
  // console.log("client request with POST body:", req.query);
  console.log("client request with POST body:", req.body.name);
  const name = req.body.name;
  res.json({"message": `Hi, ${name}. How are you?`});
})




// TRADITIONAL FORM ENDPOINTS - SIMPLIFIED
// These handle regular HTML form submissions and redirect back

// Traditional Form - Add Student (POST with form data)
app.post('/api/students/form', async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    
    // Simple validation
    if (!name || !age || !grade) {
      console.log('❌ Form validation failed: Missing required fields');
      return res.redirect('/traditional-forms.html?error=missing-fields');
    }

    const student = { name, age: parseInt(age), grade };
    const result = await db.collection('students').insertOne(student);
    
    console.log(`✅ Student added: ${name} (ID: ${result.insertedId})`);
    res.redirect('/traditional-forms.html?success=student-added');
  } catch (error) {
    console.error('❌ Error adding student:', error.message);
    res.redirect('/traditional-forms.html?error=database-error');
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

