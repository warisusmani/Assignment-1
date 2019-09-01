module.exports = function(app,fs){
    //Route to manage user logins
    
      app.post('/api/deletegroup', (req, res) => {
        
        // localhost:3000/api/auth?username=Terry
          var groups = req.body.group;
          var userObj;
    
          fs.readFile('authdata.json', 'utf8', function(err, data){
              if (err) {
                  console.log(err);
                  //Some error happended opening the file. No Success
                  res.send({group:'',success:false});
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                  for(let j=0;j<userObj[i].group.length;j++) {
                if (userObj[i].group[j] == groups){
                  
                    var a = userObj[i].group.indexOf(groups);
                   
                    userObj[i].group.splice(a,1);
                  
                  //find first instance of user name and success
                }
               
            }
            
              }
              
              var newdata = JSON.stringify(userObj);
             
             fs.writeFile('authdata.json',newdata,'utf-8',function(err2){
               if (err2) throw err2;
               //Send response that registration was successfull.
              // res.send({group:groups,success:true});
              
              });
              //no username was found that matched
              
              fs.readFile('channeldata.json','utf8', function(err3, data2) {
                if (err3) throw err3;
                //Send response that registration was successfull.
                userObj2 = JSON.parse(data2);
                
               for (let i=0;i<userObj2.length;i++){
                   
                   if (userObj2[i].group == groups){
                      //find first instance of user name and success
                  
           
                   userObj2.splice(userObj2.indexOf(userObj2[i].group),1);
                  
                
                    }
                 
                
                  }
                  var newdata2 = JSON.stringify(userObj2);
                  fs.writeFile('channeldata.json',newdata2,'utf-8',function(err4){
                    if (err4) throw err4;
                    //Send response that registration was successfull.
                    res.send({group:groups,success:true});
                   });
                 
            });
          }
        });

        });
    
    
    
        app.post('/api/deletechannel', (req, res) => {
        
          // localhost:3000/api/auth?username=Terry
            var channel = req.body.channel;
            var userObj;
      
            fs.readFile('channeldata.json', 'utf8', function(err, data){
                if (err) {
                    console.log(err);
                    //Some error happended opening the file. No Success
                    res.send({group:'',success:false});
                } else {
                userObj = JSON.parse(data);
                for (let i=0;i<userObj.length;i++){
                    for(let j=0;j<userObj[i].channels.length;j++) {
                  if (userObj[i].channels[j] == channel){
                    
                      var a = userObj[i].channels.indexOf(channel);
                     
                      userObj[i].channels.splice(a,1);
                    
                    //find first instance of user name and success
                  }
                 
              }
              
                }
                var newdata = JSON.stringify(userObj);
                fs.writeFile('channeldata.json',newdata,'utf-8',function(err){
                  if (err) throw err;
                  //Send response that registration was successfull.
                  // res.send({channel:channel,success:true});
                 });

                 ////////////Removing from userchanneldata aswell
                
                 var userObj2;
               
                 fs.readFile('userchanneldata.json', 'utf8', function(err2, data2){
                     if (err2) {
                         console.log(err2);
                         //Some error happended opening the file. No Success
                         res.send({channel:'',success:false});
                     } else {
                     userObj2 = JSON.parse(data2);
                     
                     for (let i=0;i<userObj2.length;i++){
                         for(let j=0;j<userObj2[i].channels.length;j++) {
                          
                       if (userObj2[i].channels[j] == channel){
                       
                           var a = userObj2[i].channels.indexOf(channel);
                          
                           userObj2[i].channels.splice(a,1);
                         
                         //find first instance of user name and success
                       }
                      
                   }
                   
                     }
                     var newdata2 = JSON.stringify(userObj2);
                     fs.writeFile('userchanneldata.json',newdata2,'utf-8',function(err){
                       if (err) throw err;
                       //Send response that registration was successfull.
                       res.send({channel:channel,success:true});
                      });
                
                
                }
                });
              }
            });
          });
    
    
    
    
    
      }
    