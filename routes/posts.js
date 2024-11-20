const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts');

router.post('/posts',
  [auth, [check('title', 'Title is required').not().isEmpty(), check('description', 'Description is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: 'Invalid inputs'});
    }
   
    try {
 
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id
      });

      await post.save();


      res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;