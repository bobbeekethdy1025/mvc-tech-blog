// code was made with the help of my peers
const router = require('express').Router();
const {User} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const blogUserData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.userId = blogUserData.id;
            req.session.loggedIn = true;

            res.status(200).json(blogUserData);
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {username: req.body.username}});

        if(!userData) {
            res
                .status(400)
                .json({message: 'The email and/or password you have entered was invaild, please try again!'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res
                .status(400)
                .json({message: 'The email and/or password you have entered was invaild, please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({user: userData, message: 'Log in successful!'});
        });

    } catch(err) {
        res.status(400).json(err);
    }
});

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
