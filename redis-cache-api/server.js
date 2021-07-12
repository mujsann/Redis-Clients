//Initialize app
const express = require('express');
const app = express();
require('dotenv').config();
 
//Call routes
const routes = require('./routes')
app.use(routes )

 //Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
