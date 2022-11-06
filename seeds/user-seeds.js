
const {User} = require('../models');

const userData = [{
    username: 'MonkeyD',
    password: '12345'

},
{
    username: 'AndyC',
    password: '67890'
},
{
    username: 'JohnK',
    password: '123123'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
