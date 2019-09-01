module.exports = function(app,fs){
  //Route to manage user logins
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
  
  
 

  app.post('/api/groupchannels', (req, res) => {
    
    // localhost:3000/api/auth?username=Terry
      var user = req.body.user;
      var userObj;
      var userObj2;
      var channels=[];
      var groups = [];

      fs.readFile('authdata.json', 'utf8', function(err, data){
          if (err) {
              console.log(err);
              //Some error happended opening the file. No Success
              res.send({channels:'',success:false});
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if(userObj[i].name == user) {
              for(let j=0; j<userObj[i].group.length;j++) {
                  //find first instance of user name and success
                  groups.push(userObj[i].group[j]);
                  // res.send({'channels':channels,'success':true});
                  // return;
              }
            }
          }
          fs.readFile('channeldata.json', 'utf8', function(err2, data2) {
            if(err2) throw err2;
            else {
              userObj2 = JSON.parse(data2);
              for(var i=0;i<userObj2.length;i++) {
                for(var j=0;j<groups.length;j++) {
                  if(groups[j] == userObj2[i].group) {
                    for(var k=0;k<userObj2[i].channels.length;k++)
                    channels.push(userObj2[i].channels[k]);
                  }
                }
              }
            
              res.send({channels:channels, success: true});
            }

          });
        }
      });
     //reading channels file:
    });

    
    app.post('/api/userchannels', (req, res) => { 

       // localhost:3000/api/auth?username=Terry
       var user = req.body.user;
       var userObj;
       var channels=[];
 
       fs.readFile('userchanneldata.json', 'utf8', function(err, data){
        userObj = JSON.parse(data);
        if(err) throw err;
        else {
      for(var i=0;i<userObj.length;i++) {
        if(userObj[i].name == user) {
          for(var j=0; j<userObj[i].channels.length;j++) {
            channels.push(userObj[i].channels[j]);
          }
        }
      }
     res.send({channels: channels,success:true}); 
    }
      
      });


    });



}
