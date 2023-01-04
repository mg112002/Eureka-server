// const path = require('path')
const BlogsService = require('../services/blogs.services')
const { Errors } = require('../constants')

const getBlogs = async (req, res) => {
    const blogs = await BlogsService.getBlogs()
    res.json({
        status: 'success',
        data: blogs
    })
}

const postBlog = async (req, res, next) => {
    try {
        const blog = await BlogsService.addBlog(req.body)

        res.status(201).json({
            status: 'success',
            data: blog
        })
    } catch (error) {
        next(error)
    }
}

const getBlogById = async (req, res, next) => {
    const { id } = req.params

    try {
        const match = await BlogsService.getBlogById(id)


        if (!match) {
            const error = new Error(`A workshop with id = ${id} does not exist`)
            error.name = Errors.NotFound;

            next(error);
            return;
        }

        res.json({
            status: 'success',
            data: match
        });
    } catch (error) {
        next(error);
    }
}

const getBlogByTag = async (req, res, next) => {
    const { tag } = req.params
    try {
        const blogs = await BlogsService.getBlogByTag(tag)
        res.json({
            status: 'success',
            data: blogs
        })
    } catch (error) {
        next(error);
    }
}

const deleteBlog = async (req, res, next) => {
    const { id } = req.params

    try {
        const deletedBlog = await BlogsService.deleteBlog(id);

        if (deletedBlog === null) {
            const error = new Error(`A workshop with id = ${id} does not exist`);
            error.name = Errors.NotFound;
            return next(error);
        }
        res.json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
}

const updateBlog = async (req, res, next) => {
    const { id } = req.params

    try {
        const updatedBlog = await BlogsService.updateBlog(id, req.body)

        if (updatedBlog === null) {
            const error = new Error(`A workshop with id = ${id} does not exist`);
            error.name = Errors.NotFound;

            return next(error);
        }

        res.json({
            status: 'success',
            data: updatedBlog
        })
    } catch (error) {
        next(error)
    }
}

const getBlogByCategory = async (req, res, next) => {

    let { category } = req.params
    if (category === 'CS') {
        category = 'C#'
    }
    try {
        const blogs = await BlogsService.getBlogsByCategory(category)

        res.json({
            status: 'success',
            data: blogs
        })
    } catch (error) {
        next(error)
    }
}

const voteBlog = async (req, res, next) => {
    const { id } = req.params

    try {
        const blog = await BlogsService.updateVotes(id, req.query)

        res.json({
            status: 'success',
            data: blog
        })
    } catch (error) {
        next(error)
    }
}

const searchBlogs = async (req, res, next) => {
    try {
        const blogs = await BlogsService.searchBlogs(req.query.keyWord)

        res.json({
            status: 'success',
            data: blogs
        })
    } catch (error) {
        next(error)
    }
}

const getByEmail = async (req, res, next) => {
    const { email } = req.params
    try {
        const blogs = await BlogsService.findByEmail(email)

        res.json({
            status: 'success',
            data: blogs
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBlogs,
    postBlog,
    getBlogById,
    getBlogByTag,
    deleteBlog,
    updateBlog,
    getBlogByCategory,
    voteBlog,
    searchBlogs,
    getByEmail
}