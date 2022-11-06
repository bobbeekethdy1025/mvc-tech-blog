const {Post} = require('../models');

const postData = [{
    title: 'I really really like coding',
    body: 'I was afraid at first, but know I really enjoy coding!',
    user_id: 1

},
{
    title: 'Bootcamps are FAST',
    body: 'Coding bootcamps are no joke! Time flies and I need to stay caught up!',
    user_id: 2
},
{
    title: 'I love javascript!',
    body: 'I always thought I was a Python kind of person, but as of recent, I love javascript!',
    user_id: 3
}
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
