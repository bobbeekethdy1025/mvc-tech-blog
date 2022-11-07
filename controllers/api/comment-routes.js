const router = require("express").Router();
const {Comment} = require("../../models");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const commentData = await Comment.create({
        text: req.body.text,
        post_id: req.body.id
    });
    console.log(commentData.get({plain: true}));
});

module.exports = router

