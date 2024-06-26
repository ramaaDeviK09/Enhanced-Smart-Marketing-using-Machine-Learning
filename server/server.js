require('dotenv').config()
const stripe = require('stripe')('sk_test_51OEuRtSAkX312llgNPDrxiKFRYa2xExiYl9N2zhN2uKa72Y8oRBvaigkllMAVAh1qpbb0YGXDAmuKPNd0rP3WHIZ00kOHEP140');
const express = require('express')
const {PythonShell} = require('python-shell')
const http = require('http')
const app = express()
const cors = require('cors')
const server = http.createServer(app)

//db
require('./connection')
const {Server} =  require('socket.io')
const io = new Server(server, {
    cors: '*',
    origin: '*'
})

const User = require('./models/User');
const Product = require('./models/Products')
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products')
const imageRoutes = require('./routes/images')
const orderRoutes = require('./routes/orders');

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use('/orders',orderRoutes)
app.use('/images',imageRoutes)

app.post('/create-payment', async(req, res)=> {
    let {amount} = req.body;
    amount*=100
    console.log(amount);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'inr',
        payment_method_types: ['card']
      });
      res.status(200).json(paymentIntent)
    } catch (e) {
      console.log(e.message);
      res.status(400).json(e.message);
     }
  })
  
  app.post('/recommendation/crop', (req,res) => {
    console.log(req.body);
    let r={}
    let options = {
      mode: 'text',
      // pythonPath: 'path/to/python',
      pythonOptions: ['-u'], // get print results in real-time
      // scriptPath: 'path/to/my/scripts',
      args: [...req.body["p"]]
    };
    
    PythonShell.run('crops.py', options).then(results=>{
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
      res.status(200).json(results)
    });
  })

  app.post('/recommendation/fertilizer', (req,res) => {
    console.log(req.body);
    let r= {}
    let options = {
      mode: 'text',
      // pythonPath: 'path/to/python',
      pythonOptions: ['-u'], // get print results in real-time
      // scriptPath: 'path/to/my/scripts',
      args: [...req.body["p"]]
    };
    
    PythonShell.run('fertilizer.py', options).then(results=>{
      // results is an array consisting of messages collected during execution
      console.log('results: %j', results);
      res.status(200).json(results)
    });
  })


server.listen(4000,() => {
   console.log("server is running on port 4000"); 
})