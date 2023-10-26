const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/token/usuario', async (req, res) => {
    const {usuario, token_usuario, tipo_usuario} = req.body

    try {
        const nuevoDispositivo = {
            usuario, tipo_usuario, token_usuario
        }

        const device = await pool.query ('INSERT INTO tokens_usuarios set ?', [nuevoDispositivo])
        const nuevo_dispositivo = await pool.query ('SELECT * FROM tokens_usuarios WHERE id = ?', [device.insertId])

        return res.json ({
            nuevo_dispositivo: nuevo_dispositivo[0],
            success: true
        })
    } catch (error) {
        console.log ('error', error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/token/usuario/:usuario/:tipo_usuario', async (req, res) => {
    const {usuario, tipo_usuario} = req.params

    try {
        const user_token = await pool.query ('SELECT * FROM tokens_usuarios WHERE usuario = ? AND tipo_usuario = ?', [usuario, tipo_usuario])

        return res.json ({
            user_token: user_token[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/token/usuarios/:tipo_usuario', async (req, res) => {
    const {tipo_usuario} = req.params

    try {
        const users_tokens = await pool.query ('SELECT * FROM tokens_usuarios WHERE tipo_usuario = ?', [tipo_usuario])

        return res.json ({
            users_tokens: users_tokens,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

module.exports = router