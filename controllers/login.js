const schemas = require('../models/schemas.js')
const bcrypt = require('bcrypt')

exports.getLogin = (req, res) => {
    res.render('login', {title: 'Login', loggedIn: false, error: null})
}

exports.getSignup = (req, res) => {
    res.render('new-acct', {title: 'New Account', loggedIn: false, error: null})
}

exports.getLogout = (req, res) => {
    req.session.destroy()
    res.render('/')
}

exports.postLogin = async (req, res) => {
    let email = req.body.emailInput;
    let pass = req.body.pwdInput;
    let loginSuccess = false;
    let sesh = req.session;
    sesh.loggedIn = false;

    let users = schemas.users;
    let qry = {email: email};

        //looking in database to find matching email address , if found, take password entered and checks it against password stored
    if(email != '' && pass != '') {
        let usersResult = await users.findOne(qry)
        .then(async(data) => {
            console.log(data)
            if (data) {
                let passResult = await bcrypt.compare(pass, data.pwd)
                .then((isMatch) => {
                    if(isMatch) {
                        sesh.loggedIn = true;
                        loginSuccess = true;
                    }
                    
                })
            }
        })
    }
    if (loginSuccess === true) {
        res.redirect('/')
    } else {
        res.render('login', {title: 'Login', loggedIn: false, error:'Invalid Login!'})
    }
}

    exports.postSignup = async(req, res) => {
        let email = req.body.emailInput;
        let pass = req.body.pwdInput;
      
        if (email != '' && pass != '') {
          let users = schemas.users;
          let qry = {email:email};
      
          let userSearch = await users.findOne(qry).then( async(data) => {
            if (!data) {
              // password encryption
              let saltRounds = 10;
              let passSalt = await bcrypt.genSalt(saltRounds, async(err, salt) => {
                let passHash = await bcrypt.hash(pass, salt, async(err, hash) => {
                  let acct = {email:email, pwd:hash, level:'admin'};
                  let newUser = new schemas.users(acct);
                  let saveUser = await newUser.save();
                });
              });
            }
          });
    
          res.render('login', {title:'Login', loggedIn:false, error:'Please login with your new account'});
        } else {
          res.render('new-acct', {title:'New Account', loggedIn:false, error:'All fields are required. Please check and try again.'});
        }
    }