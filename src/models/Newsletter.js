const { mongoose, Schema } = require('mongoose')

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    interests: [{
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
            'Dynamic Programming',
            'C',
            'C++',
            'Python',
            'Java',
            'JavaScript',
            'C#',
            'Ruby'
        ]
    }]
})

mongoose.model('Newsletter', newsletterSchema)