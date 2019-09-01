module.exports = function(app,fs){
    //Route to manage user logins
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
      next();
     });
      app.get('/api/roles', (req, res) => {
    
        // localhost:3000/api/auth?username=Terry
          var uname = req.query.username;
          var userObj;
          var role;
    
          fs.readFile('authdata.json', 'utf8', function(err, data){
              if (err) {
                  console.log(err);
                  //Some error happended opening the file. No Success
                  res.send({'username':'','success':false});
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                if (userObj[i].name == uname){
                    role = userObj[i].role;
                  //find first instance of user name and success
                  res.send({'role':role,'success':true});
                  return;
                }
              }
              //no username was found that matched
              res.send({'role':role,'success':false});
    
          }});
 
    
        });

        app.post('/api/roles', (req, res) => {
    
          var isUser = 0;
          var userObj;
          var user = req.body.user;
          var roles = req.body.role;
          //localhost:3000/api/reg?username=abcdefg
          
    
          fs.readFile('authdata.json','utf-8', function(err, data){
              if (err){
                  console.log(err);
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                if (userObj[i].name == user){
                  for(let j=0;j<userObj.length;j++) {
                  if(userObj[i].role[j] == roles) {
                  //Check for duplicates
                  isUser = 1;
                  }
                }
                }
              }
              if (isUser > 0){
                //Name already exists in the file
                 res.send({'username':'','roles':'','success':false});
               }else{
                 //Add name to list of names
                 for(let i=0;i<userObj.length;i++) {
                  if(userObj[i].name == user) {
                     userObj[i].role.push(roles);
                  }
                 }
                 //Prepare data for writing (convert to a string)
                 var newdata = JSON.stringify(userObj);
                 fs.writeFile('authdata.json',newdata,'utf-8',function(err){
                   if (err) throw err;
                   //Send response that registration was successfull.
                   res.send({'username':user,'roles':roles,'success':true});
                  });
               }
             }
          })
  })
    }
    