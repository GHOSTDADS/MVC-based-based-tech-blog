const router = require('express').Router();
const { User,Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//gets all blogs with user data and comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
     include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Comment,
        attributes: ["content"],
      },
     ]    });

    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//gets blog by id with user data and comments
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id,{
     include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Comment,
        include: [User],
      }
     ]    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//profile page for user for their blogs
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,{
     attributes: {exclude:['password']},
     include: [
      {
        model: Blog
      },
      {
        model: Comment
      }
    ]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to create new blog post
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("create", {
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route for editing a blog post
router.get("/create/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    if (req.session.logged_in) {
      res.render("edit", {
        ...blog,
        logged_in: req.session.logged_in,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
