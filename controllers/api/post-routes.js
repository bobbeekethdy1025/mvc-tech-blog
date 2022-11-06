const router = require("express").Router();
const {Post, Comment} = require("../../models");

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/comment', async (req, res) => {
    const commentData = await Comment.create({
        text: req.body.text,
        post_id: req.body.id
    });
    console.log(commentData.get({plain: true}));
});


module.exports = router;
