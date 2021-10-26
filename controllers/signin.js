const handleSignIn = (req, res, db, bcrypt) => {
   const { email, password} = req.body;

   if(!email || !password){
      return res.status(400).json('Incorrect form submission')
   }
    //thiis code iss selecting the email and hash store in the logins table data base
  db.select('email', 'hash').from('logins')
  .where('email', '=', email)
  .then(data => {
      //this code is using bcypt to compare the users password
     const isValid = bcrypt.compareSync(password, data[0].hash)
     if (isValid){
         return db.select('*').from('users')
         .where('email', '=', email)
         .then(user => {
            res.json(user[0]) 
         })
         //this code tells if there is no user of credentials entered
        .catch(err => res.status(400).json('Unable to get user'));
     }else{
        //if the IF clause is not valid this code returns an else statement 
        //invalid credentials. 
        res.status(400).json('Invalid credentials');
     }
    
  })
  .catch(err => res.status(400).json('Wrong Details'))
}


module.exports = {
   handleSignIn : handleSignIn
}