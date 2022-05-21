const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models')


router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'tag',
      'post_body',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      //get full list of posts
      const rawPosts = dbPostData.map(post => post.get({ plain: true }));
      //reverse the posts, so that the newest posts display first
      const posts = rawPosts.reverse();
      //render the homepage
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
});

module.exports = router;