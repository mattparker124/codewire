const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Post, User } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'tag',
            'post_body',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET a single post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET all posts by tag
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this tag' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET all posts by user id
router.get('/user/:user_id', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.params.user_id
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this tag' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST a new post
router.post('/', (req, res) => {
    // expects {title: 'Update a comment', tag: 'PUT', user_id: 1}
    Post.create({
        title: req.body.title,
        user_id: req.body.user_id,
        post_body: req.body.post_body,
        tag: req.body.tag
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.json(500).json(err);
    });
});

// Update a post by id
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete post by id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;