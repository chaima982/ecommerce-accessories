
const express = require('express');
const database = require("./database");
const app = express();
const port = 8060
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const axios = require('axios');

async function fetchData() {
  try {
   
    const response = await axios.post('http://localhost:8060/product/add', data);

    console.log(response.data);
  } catch (error) {
    
    console.error('Erreur lors de la requête:', error.message);

  }
}

fetchData();

let corsOptions={
    origin:['http://localhost:3000']
}
app.use(cors(corsOptions))

app.get("/", function (req, res) {
    res.send("Welcome to Home page");
});

app.get("/homepage", (req, res) => {
    res.send("Welcome to the homepage (Client)");
});


app.get("/dashboard", (req, res) => {
    res.send("Welcome to the dashboard (Admin)");
});


  



const AuthRoute = require('./Router/AuthRouter');
const { authUser, authRole } = require('./Controller/AuthController');
const categorieRoute = require("./Router/categorieRouter");
const productRoute=require("./Router/ProductRouter");
const PanierRoute=require("./Router/PanierRouter");
const OrderRoute=require("./Router/orderRouter");
app.use('/categorie',categorieRoute)
app.use('/product', productRoute)
app.use('/panier', PanierRoute)
app.use('/api', AuthRoute);
app.use('/order', OrderRoute)



   
  
  
app.get("/getImage/:img", function(req, res){
    res.sendFile(__dirname + "/storage/" + req.params.img)
})



app.listen(port, function() {
    console.log(`listen http://localhost:${port}`)
})