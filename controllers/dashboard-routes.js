const router = require("express").Router();
const {Post} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(postData => {
            const posts = postData.map(post => post.get({plain: true}));
            res.render('dashboard', {posts, loggedIn: true});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
