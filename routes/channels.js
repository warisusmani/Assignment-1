module.exports = function(app,fs){
  //Route to manage user logins
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
    next();
   });
    app.get('/api/channels', (req, res) => {
  
      // localhost:3000/api/auth?username=Terry
        var uname = req.query.username;
        var userObj;
        var channelObj;
        var group;
        var channels=[];
  
        fs.readFile('authdata.json', 'utf8', function(err, data){
            if (err) {
                console.log(err);
                //Some error happended opening the file. No Success
                res.send({'username':'','success':false});
            } else {
            userObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
              if (userObj[i].name == uname){
                //find first instance of user name and success
                group = userObj[i].group;
                return;
              }
            }
          }
        });
       //reading channels file:
       
       fs.readFile('channeldata.json', 'utf8', function(err, data){
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({'username':'','success':false});
          } else {
          channelObj = JSON.parse(data);
          for (let i=0;i<channelObj.length;i++){
            if (channelObj[i].group == group){
              //find first instance of user name and success
                channels = channelObj[i].channels;
                res.send({'channels':channels,'success':true});
              return;
            }
          }

            //no channels found
            res.send({'channels':channels,'success':false});
  
        }});

      });
  }
  