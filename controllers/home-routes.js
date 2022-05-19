const router = require('express').Router();
const sequelize = require('../config/connection');


router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res) => {
  res.render('signup');
})

module.exports = router;