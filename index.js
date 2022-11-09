const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


// middleware
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
   res.send('Node mongodb crud server running')
})

//user: dbuser2
//pass: NpQrPiT3q65nRLER

// dbuser info
const uri =
  "mongodb+srv://dbuser2:NpQrPiT3q65nRLER@cluster0.ozga6sm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    const userCollection2 = client.db('nodeMongoCrud').collection('users');

    // get data from db
    app.get('/users', async(req, res) => {
        const query = {};
        const cursor = userCollection2.find(query);
        const users = await cursor.toArray();
        res.send(users);
    })

    //get user by id
    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const user = await userCollection2.findOne(query)
        res.send(user)
    })

    // add data to db
    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await userCollection2.insertOne(user)
        res.send(result)
    }) 

    //update existing user in db
    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const user = req.body;
        const updatedUser = {
            $set: {
                name: user.name,
                address: user.address,
                email: user.email
            }
        }
        const options = { upsert: true }
        
        const result = await userCollection2.updateOne(filter, updatedUser, options)
        console.log(result)
        res.send(result)

    })

    // delete from db
    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) }
        const result = await userCollection2.deleteOne(query);
        res.send(result)
    })

}
run().catch(err => {console.log(err)})




app.listen(port, () => {
    console.log(`Node mongo crud server running on port: ${port}`)
})