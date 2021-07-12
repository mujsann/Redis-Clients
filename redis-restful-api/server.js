//Initialize app
const express = require('express');
const app = express();
require('dotenv').config();



// //Use methodOverride
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));

//Call routes
const routes = require('./routes');
app.use(routes);


const port = process.env.PORT || 5000;
app.listen(port,() =>{
  console.log(`server started on port ${port}`);
});
