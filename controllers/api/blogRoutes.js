const router = require('express').Router();
const { Blog } = require('../../models');

//get all blogs
router.get("/", async (req, res) => {
  try {
      const commentData = await Blog.findAll({
      });
      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});


//create a blog post
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);

  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// edit a blog post 
router.put('/:id', async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
        id: req.params.id,
        },
      }
    );

    if (!blogData) {
      res.status(404).json({ message: 'No Blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
