module.exports = function(app,fs){
  //Route to manage user logins
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
    next();
   });
    app.post('/api/channels', (req, res) => {
  
      // localhost:3000/api/auth?username=Terry
        var group = req.body.chosengroup;
        var userObj;
        var channels=[];
  
        fs.readFile('channeldata.json', 'utf8', function(err, data){
            if (err) {
                console.log(err);
                //Some error happended opening the file. No Success
                res.send({'channels':'','success':false});
            } else {
            userObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
              if (userObj[i].group == group){
                //find first instance of user name and success
                channels = userObj[i].channels;
                res.send({'channels':channels,'success':true});
                return;
              }
            }
            res.send({'channels':channels,'success':false});
          }
        });
       //reading channels file:
      });
  }
  