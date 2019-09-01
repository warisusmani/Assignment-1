module.exports = function(app,fs){
    //Route to manage user logins
      app.post('/api/creategroup', (req, res) => {
    
          var isGroup = 0;
          var userObj;
          var groupObj;
          //localhost:3000/api/reg?username=abcdefg
          var group = req.body.group;
    
          fs.readFile('channeldata.json','utf-8', function(err, data){
              if (err){
                  console.log(err);
              } else {
              userObj = JSON.parse(data);
              for (let i=0;i<userObj.length;i++){
                if (userObj[i].group == group){
                  //Check for duplicates
                  isGroup = 1;
                }
              }
              if (isGroup > 0){
                //Name already exists in the file
                 res.send({'newgroup':'','success':false});
               }else{
                 //Add name to list of names
                 userObj.push({'group':group})
                 //Prepare data for writing (convert to a string)
                 var newdata = JSON.stringify(userObj);
                 fs.writeFile('channeldata.json',newdata,'utf-8',function(err){
                   if (err) throw err;
                   //Send response that registration was successfull.
                   res.send({'newgroup':group,'success':true});
                  });
               }
             }
          })
        
          fs.readFile('groupdata.json','utf-8', function(err, data){
            if (err){
                console.log(err);
            } else {
            groupObj = JSON.parse(data);
            for (let i=0;i<groupObj.length;i++){
              if (groupObj[i].group == group){
                //Check for duplicates
                isGroup = 1;
              }
            }
            if (isGroup > 0){
              //Name already exists in the file
               res.send({'newgroup':'','success':false});
             }else{
               //Add name to list of names
               for(let i=0;i<groupObj.length;i++) {
               groupObj[i].group.push(group);
               }
               //Prepare data for writing (convert to a string)
               var newdata2 = JSON.stringify(groupObj);
               fs.writeFile('groupdata.json',newdata2,'utf-8',function(err){
                 if (err) throw err;
                 //Send response that registration was successfull.
                 res.send({'newgroup':group,'success':true});
                });
             }
           }
        }) 


        })
        }
    