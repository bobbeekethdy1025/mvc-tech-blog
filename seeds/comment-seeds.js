const {Comment} = require('../models');

const commentData = [{
    body: "You are right!",
    user_id: 1,
    post_id: 1
},
{
    body: "I think so too!",
    user_id: 2,
    post_id: 2
},
{
    body: "I never thought I could learn so much!",
    user_id: 3,
    post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
