const fetch = require('node-fetch')

//Create redis client
const client = require('redis').createClient();
client.on('connect', ()=>{
  console.log('Connected to Redis...');
});
client.on('error', err => {
  console.log('Error connecting to redis ' + err);
});

const helpers = {}

// Set response
const setResponse = (username, repos)=> {
    return `<h2>${username} has ${repos} Public Github repos</h2>`;
  }

// Make request to Github for user's repos
helpers.get_repos = async(req, res, next) => {
    try {
      console.log("Fetching User's data from GitHub...");
      const { username } = req.params;
      const url = `https://api.github.com/users/${username}`
      const response = await fetch(url);
      const data = await response.json();
      const repos = data.public_repos;
      console.log("Fetching User's repos from github data...");
  
      // Set data to Redis
      client.set(username, repos);
     //send repos as response
      res.send(setResponse(username, repos));
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }

  //cache middleware
helpers.cache = (req, res, next)=>{
    const { username } = req.params;
    client.get(username, (err, repos) => {
      if (err) return res.send(err);
  
      if (repos !== null) {
        console.log("Fetching User's repos from redis cache...");
        res.send(setResponse(username, repos));
      } else {
        next();
      }
    });
  }
  


module.exports = helpers