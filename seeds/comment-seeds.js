const { Comment } = require('../models');

const commentData = [
    {
        comment_body: 'This is terrible pls fix',
        user_id: 4,
        post_id: 1
    },
    {
        comment_body: 'This is amazing pls dont fix',
        user_id: 3,
        post_id: 1
    },
    {
        comment_body: 'I cant read latin and refuse to use google translate',
        user_id: 1,
        post_id: 2
    },
    {
        comment_body: 'First!',
        user_id: 4,
        post_id: 3
    },
    {
        comment_body: 'Lame',
        user_id: 1,
        post_id: 3
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;