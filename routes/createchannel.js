module.exports = function(app,fs){
    //Route to manage user logins
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
      next();
     });
      app.get('/api/createchannel', (req, res) => {
          
          var group;
          var userObj;
    
          fs.readFile('groupdata.json', 'utf8', function(err, data){
              if (err) {
                  console.log(err);
                  //Some error happended opening the file. No Success
                  res.send({'group':'','success':false});
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                  
                   group = (userObj[i].group);
                  
                  //find first instance of user name and success
                  res.send({'group':group,'success':true});
                  return;
                
              }
              //no username was found that matched
              res.send({'group':group,'success':false});
    
          }});
        });

        app.post('/api/createchannel', (req, res) => {
            var isChannel = 0;
            var userObj;
            var channelObj;
            //localhost:3000/api/reg?username=abcdefg
            var groups = req.body.chosengroup;
            var channelname = req.body.channelname;
            fs.readFile('channeldata.json','utf-8', function(err, data){
                if (err){
                    console.log(err);
                } else {
                userObj = JSON.parse(data);
                for (let i=0;i<userObj.length;i++){
                  if (userObj[i].group == groups){
                    //Check for duplicates
                    for(let j=0;j<userObj.length;j++) {
                    if(userObj[i].channels[j] == channelname) {
                    isChannel = 1;
                    }
                }
                  }
                }
                if (isChannel > 0){
                  //Name already exists in the file
                   res.send({'newchannel':'','success':false});
                 }else{
                  for (let i=0;i<userObj.length;i++){
                    if(userObj[i].group == groups) {
                        userObj[i].channels.push(channelname);                   
                         
                    }
                  }
                   //Add name to list of names
                   //userObj.push({'newchannel':group})
                   //Prepare data for writing (convert to a string)
                   var newdata = JSON.stringify(userObj);
                   fs.writeFile('channeldata.json',newdata,'utf-8',function(err){
                     if (err) throw err;
                     //Send response that registration was successfull.
                     res.send({'newchannel':channelname,'success':true});
                    });
                 }
               }
            })
        //Writting to another file 'channels.json':


        fs.readFile('channels.json','utf-8', function(err, data){
            if (err){
                console.log(err);
            } else {
            channelObj = JSON.parse(data);
            for (let i=0;i<userObj.length;i++){
              if (userObj[i].group == groups){
                //Check for duplicates
                for(let j=0;j<userObj.length;j++) {
                if(userObj[i].channels[j] == channelname) {
                isChannel = 1;
                }
            }
              }
            }
            if (isChannel > 0){
              //Name already exists in the file
               res.send({'newchannel':'','success':false});
             }else{
              for (let i=0;i<channelObj.length;i++){
                
                    channelObj[i].channels.push(channelname);                   
                     
                
              }
               //Add name to list of names
               //userObj.push({'newchannel':group})
               //Prepare data for writing (convert to a string)
               var newdata2 = JSON.stringify(channelObj);
               fs.writeFile('channels.json',newdata2,'utf-8',function(err){
                 if (err) throw err;
                 //Send response that registration was successfull.
                 res.send({'newchannel':channelname,'success':true});
                });
             }
           }
        })


          })
    }
    