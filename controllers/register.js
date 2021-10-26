const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
       return res.status(400).json('Incorrect form submission')
    }
    const hash = bcrypt.hashSync(password, 5)
        db.transaction(trx => {
            trx.insert({
                email : email,
                hash  : hash
            })
            .into('logins')
            .returning('email')
            .then(loginEmail => {
                 trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                 })
                .then(user => {
                 res.json(user[0])
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
         .catch(err => res.status(400).json('Unabe to register'));
        })
}

module.exports = {
    handleRegister: handleRegister
}