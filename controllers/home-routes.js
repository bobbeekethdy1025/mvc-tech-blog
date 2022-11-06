const router = require("express").Router();
const {Post, Comment, User} = require("../models");

const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User}],
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render("all-posts", {
            posts,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/post/:id", async (req, res) => {
    if(!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ["username"],
                    },
                    {
                        model: Comment,
                        include: [User],
                    },
                ],
            });
            const post = postData.get({plain: true});
            res.render("single-post", {post, loggedIn: req.session.loggedIn});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{model: Post}]
        });
        console.log(userData);
        const user = userData.get({plain: true});
        console.log(user);
        res.render("dashboard", {user, loggedIn: req.session.loggedIn});
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get("/dashboard/new", (req, res) => {
    res.render("new-post", {loggedIn: req.session.loggedIn});
});

router.get("/signup", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    } else {
        res.render("signup");
    }
});

router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    } else {
        res.render("login");
    }
});

module.exports = router;
