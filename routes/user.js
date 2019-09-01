module.exports = function(app,fs){
    //Route to manage user logins
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
      next();
     });
      app.get('/api/user', (req, res) => {
          var user = [];
          var group;
          var userObj;
    
          fs.readFile('userdata.json', 'utf8', function(err, data){
              if (err) {
                  console.log(err);
                  //Some error happended opening the file. No Success
                  res.send({'users':'','success':false});
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                   
                   user = userObj[i].name;
                  
                  //find first instance of user name and success
                  res.send({'users':user,'success':true});
                  return;
                
              }
              //no username was found that matched
               res.send({'users':user,'success':false});
    
          }});
        });
    }