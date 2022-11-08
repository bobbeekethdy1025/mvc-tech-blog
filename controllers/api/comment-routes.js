const router = require("express").Router();
const {Comment} = require("../../models");
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const commentData = await Comment.create({
        ...req.body,
        userId: req.session.userId,
    });
    res.json(commentData);
    console.log(commentData.get({plain: true}));
});

module.exports = router

