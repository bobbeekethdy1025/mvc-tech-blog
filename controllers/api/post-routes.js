const router = require("express").Router();
const {Post} = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body
        });
        res.status(200).json(postData);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!postData) {
            res.status(404).json({message: 'Post could not be deleted'});
            return;
        }
        res.status(200).json(postData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
