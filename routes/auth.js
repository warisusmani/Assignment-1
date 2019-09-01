module.exports = function(app,fs){
//Route to manage user logins
  app.get('/api/auth', (req, res) => {

    // localhost:3000/api/auth?usename=Terry
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
