module.exports = function(app,fs){
    //Route to manage user logins
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
      next();
     });
      app.get('/api/listchannels', (req, res) => {
    
        // localhost:3000/api/auth?username=Terr
          var userObj;
          var channels=[];
    
          fs.readFile('channels.json', 'utf8', function(err, data){
              if (err) {
                  console.log(err);
                  //Some error happended opening the file. No Success
                  res.send({'channels':'','success':false});
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                  //find first instance of user name and success
                  channels = userObj[i].channels;
                  res.send({'channels':channels,'success':true});
                  return;
                
              }
              res.send({'channels':channels,'success':false});
            }
          });
         //reading channels file:
        });


        app.post('/api/listchannels', (req, res) => {
    
            var isUser = 0;
            var userObj;
            var user = req.body.user;
            var channel = req.body.channel;
            //localhost:3000/api/reg?username=abcdefg
            
      
            fs.readFile('userchanneldata.json','utf-8', function(err, data){
                if (err){
                    console.log(err);
                } else {
                userObj = JSON.parse(data);
                for (let i=0;i<userObj.length;i++){
                  if (userObj[i].name == user){
                    for(let j=0;j<userObj.length;j++) {
                    if(userObj[i].channels[j] == channel) {
                    //Check for duplicates
                    isUser = 1;
                    }
                  }
                  }
                }
                if (isUser > 0){
                  //Name already exists in the file
                   res.send({'username':'','channels':'','success':false});
                 }else{
                   //Add name to list of names
                   for(let i=0;i<userObj.length;i++) {
                    if(userObj[i].name == user) {
                    userObj[i].channels.push(channel);
                    }
                   }
                   //Prepare data for writing (convert to a string)
                   var newdata = JSON.stringify(userObj);
                   fs.writeFile('userchanneldata.json',newdata,'utf-8',function(err){
                     if (err) throw err;
                     //Send response that registration was successfull.
                     res.send({'username':user,'channels':channel,'success':true});
                    });
                 }
               }
            })
    })
  } 