const router = require('express').Router();
const { Comment } = require('../../models');

//GET ALL USERS
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //GET ONE COMMENT
  router.get('/:id', (req,res) => {
      Comment.findOne({
          where: {
              id: req.params.id
          }
      }).then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //POST A COMMENT
  router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        comment_body: req.body.comment_body,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
  
  //DELETE A COMMENT
  router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;