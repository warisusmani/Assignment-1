module.exports = function(app,fs){
    //Route to manage user logins
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
      next();
     });
      app.post('/api/deletegroup', (req, res) => {
    
        // localhost:3000/api/auth?username=Terry
          var groups = req.body.group;
          var userObj;
    
          fs.readFile('authdata.json', 'utf8', function(err, data){
              if (err) {
                  console.log(err);
                  //Some error happended opening the file. No Success
                  res.send({'group':'','success':false});
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                  for(let j=0;i<userObj.length;j++) {
                if (userObj[i].group[j] == groups){
                    var a = userObj[i].group[j];
                    userObj.splice(userObj.indexOf(groups));
                  //find first instance of user name and success
                }
            }
              }
              var newdata = JSON.stringify(userObj);
         
             fs.writeFile('authdata.json',newdata,'utf-8',function(err){
               if (err) throw err;
               //Send response that registration was successfull.
               res.send({'group':groups,'success':true});
              });
              //no username was found that matched
              
    
          }});
    
    
    
    
    
    
        });
    }
    