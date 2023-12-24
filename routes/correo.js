const express = require('express')
const router = express.Router()

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const pool = require('../database')

const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

var transporter = nodemailer.createTransport( new SMTPTransport ({
    host: 'taxi-huaraz.com',
    secure: true,
    port: 465,
    auth: {
        user: 'no-reply@taxi-huaraz.com',
        pass: '7RwC:cr.T34Vm!q'
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
    const { correo, codigo, tipo } = req.body

        const datos = await pool.query (`SELECT * FROM ${tipo === 'viajero' ? 'usuarios_viajeros' : 'conductores'} WHERE correo = ?`, [correo])
        var mailOptions = {
            from: '"Taxi 24/7" <no-replay@taxi-huaraz.com>', // sender address
            to: correo, // list of receivers
            subject: 'Olvide mi contraseña Taxi 24/7',
            template: 'olvidepassword', // the name of the template file i.e email.handlebars
            context:{
                nombres: datos[0].nombres, // replace {{name}} with Adebola
                codigo: codigo,
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
})

module.exports = router