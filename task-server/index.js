const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 2000;
const store_id = process.env.store_id
const store_passwd = process.env.store_passwd


app.use(cors());
app.use(express.json());



//db connect 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyj8wdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// jwt function

const verifyJwt = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unAuthorize access')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })

}


const run = async () => {
    try {

         //db table 
         const usersCollection = client.db(`${process.env.DB_USER}`).collection('users');
         const employCollection = client.db(`${process.env.DB_USER}`).collection('employ');


         // jwt api
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
                return res.send({ accessToken: token });
            }
            return res.status(403).send({ accessToken: '' })


        });

         // check admin user 
        app.get('/user/admins/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query)
            res.send({ isAdmin: user?.role === 'Admin' })

        });


        //create user
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result);
        });



        //get items
        app.get('/employ', async(req, res)=>{
            const query ={ };
            const items = await employCollection.find(query).toArray();
            res.send(items);
        });



        //get admin
        app.get('/allUser/:role', async (req, res) => {
            const role = req.params.role
            const query = {
                role: role
            }
            const result = await usersCollection.find(query).toArray();
            res.send(result)
        });
        // delete user 

        app.delete('/user/delete/:id', verifyJwt, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail }
            const user = await usersCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send({ message: 'forbidden access 403' })
            }

            const id = req.params.id;
            const userQuery = {
                _id: ObjectId(id)
            }

            const result = await usersCollection.deleteOne(userQuery);
            res.send(result);
        });
              






    

    }
    finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('simple server is running');
});



app.listen(port, () => {
    console.log(`simple server running on prot ${port}`);
});

