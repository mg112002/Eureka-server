const { mongoose, Schema } = require('mongoose')
const notify = require('../services/sendMail')
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    category: {
        type: String,
        enum: [
            'C',
            'C++',
            'Python',
            'Java',
            'JavaScript',
            'C#',
            'Ruby'
        ]
    },
    description: {
        type: String,
        required: true,
        maxLength: 4096
    },
    tags: [{
        type: String,
        required: true,
        enum: [
            'Array',
            'Hashmap',
            'Tree',
            'LinkedList',
            'Queue',
            'Stack',
            'Graph',
            'DynamicProgramming'
        ]
    }],
    postedBy: {
        required: true,
        type: String
    },
    upvotedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    time: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String,
        default: 'https://careforlifecharitabletrust.org/wp-content/uploads/2020/02/blog2-1.png'
    }
})

blogSchema.post("save", async function () {
    try {
        await notify(this)
    } catch (error) {
        console.log(error)
        return
    }
})

mongoose.model('Blog', blogSchema)