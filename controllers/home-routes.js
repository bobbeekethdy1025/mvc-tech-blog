const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: 
                [User]
        });
        const posts = postData.map((post) =>
            post.get({plain: true})
        );

        // for(var idx = 0; idx < posts.length; idx++) {
        //     posts[idx].dateStringForPost = posts[idx].createdAt.toLocaleTimeString();
        // }
        res.render('all-posts', {
            posts,
            loggedIn: req.session.loggedIn,
            pageDescription: 'The Tech Blog'
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get("/post/:id", async (req, res) => {
    try {
        
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
                
                if(postData) {
                    const post = postData.get({plain: true});

                    res.render("single-post", {post});
                } else {
                    res.status(404).end();
                };
        } catch (err){
            res.status(500).json(err);
        };
});



module.exports = router;
