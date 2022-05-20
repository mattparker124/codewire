const { Post } = require('../models');

const postData = [
    {
        title: 'Lorem ipsum dolor',
        tag: 'put',
        post_body: 'sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: 1
        
    },
    {
        title: 'Ut enim ad minim veniam',
        tag: 'get',
        post_body: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        user_id: 2
    },
    {
        title: 'Duis aute irure dolor',
        tag: 'delete',
        post_body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
        user_id: 1
    },
    {
        title: 'Excepteur sint occaecat cupidatat non proident',
        tag: 'post',
        post_body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: 3
    },
    {
        title: 'Nunc mattis augue a tellus lobortis',
        tag: 'put',
        post_body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: 4
    },
    {
        title: 'Maecenas gravida non massa non tincidunt',
        tag: 'delete',
        post_body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        user_id: 2
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;