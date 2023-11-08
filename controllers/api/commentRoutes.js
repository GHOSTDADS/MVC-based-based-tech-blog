const router = require("express").Router();
const { Blog, Comment, User } = require("../../models");

//create a comment
router.post("/", async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id || req.body.user_id,
      });
  
      res.status(200).json(newComment);

    } catch (err) {
      res.status(500).json(err);
    }
});

//get all comments
router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
          include: [
            {
              model: User,
              attributes: ["name"],
            },
            {
              model: Blog,
              attributes: ["id"],
            },
          ],
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});



//edit a comment
router.put("/:id", async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
    
        if (!commentData[0]) {
          res.status(400).json({ message: "No comment found with that id!" });
          return;
        }
    
  
        res.status(200).json(commentData);
  
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
  
//delete comment
router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Comment.destroy({
          where: {
            id: req.params.id,
          },
        });
  
        if (!commentData) {
          res.status(404).json({ message: "No comment found with that id!" });
          return;
        }
  
        res.status(200).json(commentData);
  
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;