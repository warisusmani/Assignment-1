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
    }
    