const express = require('express')
const router = express.Router()

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const pool = require('../../database')

const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

var transporter = nodemailer.createTransport( new SMTPTransport ({
    host: 'babysos.pe',
    secure: true,
    port: 465,
    auth: {
        user: 'no-responder@babysos.pe',
        pass: '37BYIjdZ'
    },
    tls: {
        rejectUnauthorized: false
    }
}))

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve (__dirname, 'template'),
        defaultLayout: false,
    },
    viewPath: path.resolve (__dirname, 'template'),
    extName: '.handlebars'
};

transporter.use('compile', hbs(handlebarOptions))

router.post('/admin/correo/nuevo/password', async (req, res) => {
    const { correo } = req.body

    const usuarios = await pool.query ('SELECT * FROM admins JOIN usersadmins ON usersadmins.usuario = admins.usuario WHERE admins.correo = ?', [correo])
    if (usuarios.length === 1){
        var mailOptions = {
            from: '"Baby SOS" <no-responder@babysos.pe>', // sender address
            to: usuarios[0].correo, // list of receivers
            subject: 'Olvide mi contraseña Baby SOS',
            template: 'olvidepassword', // the name of the template file i.e email.handlebars
            context:{
                nombres: usuarios[0].nombres // replace {{name}} with Adebola
            }
        }
    
        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.json ({
                    message: 'error: ' + error
                })
            }
            
            return res.json ({
                message: info
            })
        });        
    }else{
        return res.json ({
            message: '1'
        })
    }
})

module.exports = router