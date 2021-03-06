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
      res.render('homepage', { 
        posts,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/tag/:tag', (req, res) => {
  Post.findAll({
      where: {
          tag: req.params.tag
      },
      attributes: [
          'id',
          'title',
          'tag',
          'post_body',
          'created_at'
      ],
      include: [
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
    res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn
     });
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

router.get('/edit/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'tag',
      'post_body',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('edit', { post, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;