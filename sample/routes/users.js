var express = require('express');
var router = express.Router();
var User = require('../models/user');
var session = require('../controllers/sessionController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},(err,data)=>{
    console.log(data);
    if(err) console.log(err);
    res.render('users.ejs', {user:data})
  })
});
// Adding the content page
// router.get('/content',session.isUserLogged, function(req,res,next) {
//   User.find({}, (err,data)=> {
//     if (err) console.log(err);
//     res.render('content.ejs', {user:data})
//   })
// })
router.get('/content', session.isUserLogged, function(req, res, next) {
  console.log(req.loggedUser)
  res.send('content');

});
// Handing Adding a article form
router.get('/createarticle', function(req,res,next) {
  res.render('createarticle.ejs')
})
// Submitting the article
router.post('createarticle', function(req,res,next) {
})
// Adding a user form
router.get('/register', function(req,res, next) {
  res.render('register.ejs')
})
// Submitting the form
router.post('/register', function(req,res, next) {

  User.create(req.body,(err,data) => {
    
    if (err) console.log(err);
    res.render('users.ejs', {user:data})
  })
})
// Login page
router.get('/login', function(req,res,next) {
  res.render('login')
})
router.post('/login', function(req,res,next) {
 var email = req.body.email
 var password = req.body.password;
 console.log(email, password);
 User.findOne({email:email}, (err,user)=> {
   if (err) return next(err);
   if (!user) return res.render('incorrectdetails');
  console.log(user.verifyPassword(password))
   if (user.verifyPassword(password)) {
     req.session.userid = user.id;
     console.log(req.session.userid)
     res.render('loginpost')
   } else {
     console.log(password)
    res.render('incorrectdetails')
  }
})
})
// Logout Route
router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});
// router.post('/login', function(req,res,next) {
//   User.findOne({email:req.body.email, password:req.body.password},(err,data) => {
//     if (err) next(err);
//     console.log(data);
//     res.render('loginpost')
//   })
// })

module.exports = router;
