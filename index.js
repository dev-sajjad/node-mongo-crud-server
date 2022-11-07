const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");


// middleware
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
   res.send('Node mongodb crud server running')
})

//user: dbuser2
//pass: NpQrPiT3q65nRLER


const uri =
  "mongodb+srv://dbuser2:NpQrPiT3q65nRLER@cluster0.ozga6sm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    const userCollection2 = client.db('nodeMongoCrud').collection('users');
    // add data to db
    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await userCollection2.insertOne(user)
        console.log(result)
        res.send(result)
    }) 

}
run().catch(err => {console.log(err)})




app.listen(port, () => {
    console.log(`Node mongo crud server running on port: ${port}`)
})