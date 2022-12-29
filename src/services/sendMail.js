async function sendEmail(blog) {
    const mongoose = require('mongoose')
    const mailer = require('nodemailer')
    const Newsletter = mongoose.model('Newsletter')
    const tags = blog.tags
    const transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "my.tempacc.122022@gmail.com",
            pass: "uzgnzsoftfudfifw"
        }
    })

    const users = await Newsletter.find({
        interests: {
            $in: tags
        }
    }, {
        email: 1
    }).exec()

    users.forEach(user => {
        const options = {
            from: "my.tempacc.122022@gmail.com",
            to: user.email,
            subject: "Notification of New Blog",
            html: `<h2>Check out new blog of your interest posted right now.<br>
            <a href='https://eureka-kotk.onrender.com/blogs/${blog._id}'>Go to Blog</a><h2>`
        }
        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err)
            }
            return info
        })
    })

}
module.exports = sendEmail