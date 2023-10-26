const express = require ('express')
const router = express.Router ()

const pool = require('../database')

const helpers = require('../lib/helpers')
const bcrypt = require('bcryptjs')

const passport = require('passport')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')

router.post('/signup', function(req, res, next){
    passport.authenticate('local.signup', function (err, user, info) {
        if (err) { return res.json({ success: false }) }
        if (!user) { return res.json({ message: info, success: false }) }
        if (user) { return res.json({ success: true, user: user }) }
})(req, res, next)
})

router.post('/signin', function(req, res, next) {
    passport.authenticate('local.signin', function (err, user, info) {
        if (err) { return res.json({ success: false }) }
        if (!user) { return res.json({ message: info, success: false }) }
        if (user) {
            return res.json({
                success: true,
                user: user
            })
        }
    }) (req, res, next) 
})

router.post('/viajero/signup', function(req, res, next){
    passport.authenticate('viajero.signup', function (err, user, info) {
        if (err) { return res.json({ success: false }) }
        if (!user) { return res.json({ message: info, success: false }) }
        if (user) { return res.json({ success: true, user: user }) }
})(req, res, next)
})

router.post('/viajero/signin', function(req, res, next) {
    passport.authenticate('viajero.signin', function (err, user, info) {
        if (err) { return res.json({ success: false }) }
        if (!user) { return res.json({ message: info, success: false }) }
        if (user) {
            return res.json({
                success: true,
                user: user
            })
        }
    }) (req, res, next) 
})

router.post('/conductor/signup', function(req, res, next){
    passport.authenticate('conductor.signup', function (err, user, info) {
        if (err) { return res.json({ success: false }) }
        if (!user) { return res.json({ message: info, success: false }) }
        if (user) { return res.json({ success: true, user: user }) }
})(req, res, next)
})

router.post('/conductor/signin', function(req, res, next) {
    passport.authenticate('conductor.signin', function (err, user, info) {
        if (err) { return res.json({ success: false }) }
        if (!user) { return res.json({ message: info, success: false }) }
        if (user) {
            return res.json({
                success: true,
                user: user
            })
        }
    }) (req, res, next) 
})

router.get('/user/:usuario', async (req, res) => {
    const { usuario } = req.params

    const users = await pool.query('SELECT * FROM users WHERE usuario = ?', [usuario])
    return res.json({ user: users[0] })
})

router.post(`/user/update/correo/:usuario`, async (req, res) => {
    const { usuario } = req.params
    const { correo } = req.body

    const nuevoDato = {
        correo,
        usuario
    }

    nuevoDato.usuario = correo.split('@')[0]

    await pool.query('UPDATE users set ? WHERE usuario = ?', [nuevoDato, usuario])
    const users = await pool.query('SELECT * from users WHERE usuario = ?', [nuevoDato.usuario])
    return res.json({ user: users[0] })
})

router.post(`/update/password/:usuario`, async (req, res) => {
    const { usuario } = req.params
    const { password } = req.body
    try {
        const usuarios = await pool.query('SELECT * FROM users WHERE usuario = ?', [usuario])
        const oldcontrasenia = usuarios[0].password
    
        const validate = await bcrypt.compare(password, oldcontrasenia)
        if (validate) {
            return res.json({ message: '0' })
        } else {
            const new_password = await helpers.encryptPassword(password)
            const nuevoDato = {
                password: new_password
            }
    
            await pool.query('UPDATE users set ? WHERE usuario = ?', [nuevoDato, usuario])
            const users = await pool.query('SELECT * from users WHERE usuario = ?', [usuario])
            return res.json({ 
                user: users[0],
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post(`/viajero/update/password/:usuario`, async (req, res) => {
    const { usuario } = req.params
    const { password } = req.body
    try {
        const usuarios = await pool.query('SELECT * FROM viajeros WHERE usuario = ?', [usuario])
        const oldcontrasenia = usuarios[0].password
    
        const validate = await bcrypt.compare(password, oldcontrasenia)
        if (validate) {
            return res.json({ message: '0' })
        } else {
            const new_password = await helpers.encryptPassword(password)
            const nuevoDato = {
                password: new_password
            }
    
            await pool.query('UPDATE users set ? WHERE usuario = ?', [nuevoDato, usuario])
            const users = await pool.query('SELECT * from users WHERE usuario = ?', [usuario])
            return res.json({ 
                user: users[0],
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post(`/conductor/update/password/:usuario`, async (req, res) => {
    const { usuario } = req.params
    const { password } = req.body
    try {
        const usuarios = await pool.query('SELECT * FROM usuario_conductores WHERE usuario = ?', [usuario])
        const oldcontrasenia = usuarios[0].password
    
        const validate = await bcrypt.compare(password, oldcontrasenia)
        if (validate) {
            return res.json({ message: '0' })
        } else {
            const new_password = await helpers.encryptPassword(password)
            const nuevoDato = {
                password: new_password
            }
    
            await pool.query('UPDATE usuario_conductores set ? WHERE usuario = ?', [nuevoDato, usuario])
            const users = await pool.query('SELECT * from usuario_conductores WHERE usuario = ?', [usuario])
            return res.json({ 
                user: users[0],
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get('/logout', async(req, res) => {
    console.log ('entra 2')
    req.logout(function(err) {
        if (err) return next(err)
        else{
            return res.json ({
                success: true
            })
        }
    })
})

router.get('/viajero/logout', async(req, res) => {
    console.log ('entra 2')
    req.logout(function(err) {
        if (err) return next(err)
        else{
            return res.json ({
                success: true
            })
        }
    })
})

router.get('/sessions', async (req, res) => {
    try {
        const sesiones = await pool.query('SELECT * FROM sessions')
        return res.json({
             session: sesiones[sesiones.length - 1] ,
             success: true
        })
    } catch (error) {
        return res.json({
             session: {} ,
             success: true
        })
    }
})

router.get('/viajero/sessions', async (req, res) => {
    try {
        const sesiones = await pool.query('SELECT * FROM sessions')
        return res.json({
             session: sesiones[sesiones.length - 1] ,
             success: true
        })
    } catch (error) {
        return res.json({
             session: {} ,
             success: true
        })
    }
})

router.get('/session/:session_id', async (req, res) => {
    const {session_id} = req.params
    try {
        const sesiones = await pool.query('SELECT * FROM sessions WHERE session_id = ?', [session_id])
        return res.json({ 
            session: sesiones[0],
            success: true
        })
    } catch (error) {
        return res.json({ 
            session: {},
            success: false
        })        
    }
})

router.get('/viajero/session/:session_id', async (req, res) => {
    const {session_id} = req.params
    try {
        const sesiones = await pool.query('SELECT * FROM sessions WHERE session_id = ?', [session_id])
        return res.json({ 
            session: sesiones[0],
            success: true
        })
    } catch (error) {
        return res.json({ 
            session: {},
            success: false
        })        
    }
})

router.get('/session/delete/:session_id', async (req, res) => {
    const { session_id } = req.params
    try {
        await pool.query('DELETE FROM sessions WHERE session_id = ?', [session_id])
        return res.json({ 
            success: true
        })
    } catch (error) {
        return res.json({ 
            success: false
        })
    }
})

router.get('/viajero/session/delete/:session_id', async (req, res) => {
    const { session_id } = req.params
    try {
        await pool.query('DELETE FROM sessions WHERE session_id = ?', [session_id])
        return res.json({ 
            success: true
        })
    } catch (error) {
        return res.json({ 
            success: false
        })
    }
})

module.exports = router;