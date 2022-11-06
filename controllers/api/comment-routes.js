const router = require("express").Router();
const {Comment} = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {id: req.params.id}
        });
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newCom = await Comment.create({
            ...req.body,
            user_id: req.session.userId,
            post_id: req.session.postId
        });
        res.json(newCom);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!commentData) {
            res.status(404).json({message: 'Comment could not be deleted'});
            return;
        }
        res.status(200).json(commentData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
