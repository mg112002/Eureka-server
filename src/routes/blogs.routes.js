const { Router } = require('express')
const BlogCtrl = require('../controllers/blogs.controllers')
const { authenticate } = require('../middleware/auth')
const router = Router()

router.get('/', BlogCtrl.getBlogs)
router.post('/', authenticate, BlogCtrl.postBlog)
router.get('/:id', BlogCtrl.getBlogById)
router.get('/tags/:tag', BlogCtrl.getBlogByTag)
router.delete('/:id', authenticate, BlogCtrl.deleteBlog)
router.patch('/:id', authenticate, BlogCtrl.updateBlog)
router.get('/categories/:category', BlogCtrl.getBlogByCategory)
router.patch('/vote/:id', authenticate, BlogCtrl.voteBlog)
router.get('/search/all', BlogCtrl.searchBlogs)
router.get('/email/:id', BlogCtrl.getByEmail)

module.exports = router