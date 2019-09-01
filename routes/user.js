module.exports = function(app,fs){
    //Route to manage user logins
  
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
                  res.send({users:user,success:true});
                  return;
                
              }
              //no username was found that matched
               res.send({'users':user,'success':false});
    
          }});
        });
   
        app.post('/api/deleteuser', (req, res) => {
            var user = req.body.user;
            var userObj;
      
            fs.readFile('userdata.json', 'utf8', function(err, data){
                if (err) {
                    console.log(err);
                    //Some error happended opening the file. No Success
                    res.send({'users':'','success':false});
                } else {
                userObj = JSON.parse(data);
                for (var i=0;i<userObj.length;i++){
                    for(var j=0;j<userObj[i].name.length;j++) {
                        if(user == userObj[i].name[j]) {
                            var index = userObj[i].name.indexOf(user);
                            userObj[i].name.splice(index,1);
                        }
                    }
                    
                    //find first instance of user name and success
                   // res.send({'users':user,'success':true});
                    //return;
                }
                //no username was found that matched
                 //res.send({'users':user,'success':false});
                 var newdata = JSON.stringify(userObj);
                 fs.writeFile('userdata.json',newdata,'utf-8',function(err){
                   if (err) throw err;
                   //Send response that registration was successfull.
                   //res.send({channel:channel,success:true});
                  });

                  fs.readFile('authdata.json', 'utf8', function(err2,data2) {
                    if (err2) {
                        console.log(err2);
                        //Some error happended opening the file. No Success
                        res.send({'users':'',success:false});
                    } else {
                    
                        userObj2 = JSON.parse(data2);
                        for (var i=0;i<userObj2.length;i++){
                           
                                if(user == userObj2[i].name) {
                                    var index = userObj2[i].name.indexOf(user);
                                  
                                    userObj2.splice(index,1);
                                }
                        }
                   
                         var newdata2 = JSON.stringify(userObj2);
                      
                          fs.writeFile('authdata.json',newdata2,'utf-8',function(err){
                           if (err) throw err;
                       
                          });
                    
                    }

                    fs.readFile('userchanneldata.json', 'utf8', function(err3,data3) {
                        if (err3) {
                            console.log(err3);
                            //Some error happended opening the file. No Success
                            res.send({'users':'',success:false});
                        } else {
                        
                            userObj3 = JSON.parse(data3);
                            for (var i=0;i<userObj3.length;i++){
                               
                                    if(user == userObj3[i].name) {
                                        var index = userObj3[i].name.indexOf(user);
                                      
                                        userObj3.splice(index,1);
                                    }
                            }
                       
                             var newdata3 = JSON.stringify(userObj3);
                          
                              fs.writeFile('userchanneldata.json',newdata3,'utf-8',function(err){
                               if (err) throw err;
                           
                              });
                        
                        }
                        res.send({user:user,success:true});
                    });


                  });

            }});
          });
   
   
    }