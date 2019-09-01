module.exports = function(app,fs){
//Route to manage user logins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS"); 
  next();
 });
  app.get('/api/auth', (req, res) => {

    // localhost:3000/api/auth?username=Terry
      var uname = req.query.username;
      var userObj;
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
              res.send({'username':uname,'success':true});
              return;
            }
          }
          //no username was found that matched
          res.send({'username':uname,'success':false});

      }});






    });
}
