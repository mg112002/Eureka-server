const mongoose = require('mongoose')

const Blog = mongoose.model('Blog')
const User = mongoose.model('User')

const getBlogs = () => {
    return Blog.find()
}

const addBlog = async (BlogInfo) => {
    const blogObj = await Blog.create(BlogInfo)
    const blog = blogObj.toJSON()
    if (blog.name === BlogInfo.name) {
        User.updateOne({ email: blog.postedBy }, {
            $addToSet: {
                blogsPosted: blog._id
            }
        }).exec()
    }
    return blogObj
}

const deleteBlog = async (id) => {
    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (deletedBlog._id.toString() === id) {
        User.updateOne({ email: deletedBlog.postedBy }, {
            $pull: {
                blogsPosted: id
            }
        }).exec()
    }
}

const updateBlog = (id, updateInfo) => {
    return Blog.findByIdAndUpdate(id, updateInfo, { new: true })
}

const getBlogById = (id) => {
    return Blog.findById(id)
}

const getBlogByTag = (tag) => {
    return Blog.find({ tags: tag })
}

const getBlogsByCategory = (category) => {
    return Blog.find({ category })
}

const updateVotes = async (blogId, options) => {
    const { action, userId } = options
    if (action === "upvote") {
        const query = Blog.updateOne({ _id: blogId }, {
            $pull: {
                downvotedBy: userId
            },
            $addToSet: {
                upvotedBy: userId
            }
        })
        await query.exec()
    }

    if (action === "downvote") {
        const query = Blog.updateOne({ _id: blogId }, {
            $pull: {
                upvotedBy: userId
            },
            $addToSet: {
                downvotedBy: userId
            }
        })
        await query.exec()
    }
    return Blog.findById(blogId)
}

const searchBlogs = (keyWord = 'a') => {
    return Blog.find({
        $or: [
            {
                name: {
                    $regex: keyWord,
                    $options: 'i'
                }
            },
            {
                description: {
                    $regex: keyWord,
                    $options: 'i'
                }
            },
            {
                category: {
                    $regex: keyWord,
                    $options: 'i'
                }
            },
            {
                tags: {
                    $regex: keyWord,
                    $options: 'i'
                }
            },
            {
                postedBy: {
                    $regex: keyWord,
                    $options: 'i'
                }
            }
        ]
    }).exec()
}

const findByEmail = (email) => {
    return Blog.find({ postedBy: email }).exec()
}

module.exports = {
    getBlogs,
    addBlog,
    deleteBlog,
    updateBlog,
    getBlogById,
    getBlogByTag,
    getBlogsByCategory,
    updateVotes,
    searchBlogs,
    findByEmail
}