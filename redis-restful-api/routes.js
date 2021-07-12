const router = require('express').Router()

//Create redis client
const client = require('redis').createClient();
client.on('connect', ()=>{
  console.log('Connected to Redis...');
});
client.on('error', err => {
  console.log('Error connecting to redis ' + err);
});


  //Add user information
  router.post('api/user/:id', async(req, res)=>{
    const id = req.params.id;
    const {id,first_name, last_name, email, phone} = req.body
    client.hmset(id, [
      'first_name', first_name,
      'last_name', last_name,
      'email', email,
      'phone', phone
    ], (err, response)=>{
      if(err){
        res.status(500).json({err:true, err});
      }
      res.status(201).json({err:false, response});
    });
  });
  
  //Search user
  router.get('api/user/:id', async(req, res)=>{
    const id = req.params.id;

    client.hgetall(id, (err, user)=>{
      if(!user){
        res.status(404).json({ err: 'User data does not exist'});
      } else {
        obj.id = id;
        res.json({user: obj});
      }
    });
  });
  
  
  // Delete user information
  router.delete('/user/delete/:id',  (req, res)=>{
    client.del(req.params.id);
    res.send('successfully deleted');
  });






module.exports = router
