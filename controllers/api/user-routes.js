// code was made with the help of my peers
const router = require('express').Router();
const {User} = require('../../models');

//Route for new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            // req.session.loggedInId = userData.dataValues.id;
            
            res.status(200).json(userData);
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route for login
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(!userData) {
            res
                .status(400)
                .json({message: 'Incorrect email or password.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect email or password.'});
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            // req.session.loggedInId = userData.dataValues.id;

            res
                .status(200)
                .json({user: userData, message: 'You are logged in!'});
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route for logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
