module.exports = function(app,fs){
//Route to manage user logins
  app.get('/api/reg', (req, res) => {

      var isUser = 0;
      var userObj;
      //localhost:3000/api/reg?username=abcdefg
      var uname = req.query.username;

      fs.readFile('authdata.json','utf-8', function(err, data){
          if (err){
              console.log(err);
          } else {
          userObj = JSON.parse(data);
          for (let i=0;i<userObj.length;i++){
            if (userObj[i].name == uname){
              //Check for duplicates
              isUser = 1;
            }
          }
          if (isUser > 0){
            //Name already exists in the file
             res.send({'username':'','success':false});
           }else{
             //Add name to list of names
             userObj.push({'name':uname})
             //Prepare data for writing (convert to a string)
             var newdata = JSON.stringify(userObj);
             fs.writeFile('authdata.json',newdata,'utf-8',function(err){
               if (err) throw err;
               //Send response that registration was successfull.
               res.send({'username':uname,'success':true});
              });
           }
         }
      })
    })
    }
