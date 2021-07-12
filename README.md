2 files containing two different redis client implementations in node.js

## redis-cache-api folder
Returns number of public git hub repos of a github username. 
  - takes Github username as parameter
  - if user data already cached in redis, it returns cached data
  - else it requests data from github's api, returns and saves in redis
  
## redis-restful-api folder
  implements simple user management apis
  - sets and read and delete user data from redis 
