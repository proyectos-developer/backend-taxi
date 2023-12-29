const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get ('/compartir/link/app', async (req, res) => {
    try {
        const link = await pool.query ('SELECT * FROM compartir')
        return res.json ({
            link: link[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            link: {},
            success: false
        })
    }
})

router.post ('/app/compartir/usuario', async (req, res) => {
    const {usuario, codigo, usado} = req.body

    const newCompartir = {
        usuario, codigo, usado
    }

    try {
        const new_compartir = await pool.query ('INSERT INTO app_compartida set ?', [newCompartir])
        const compartido = await pool.query ('SELECT * FROM app_compartida WHERE id = ?', [new_compartir.insertId])
        return res.json ({
            compartido: compartido[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })        
    }
})

router.post ('/app/compartir/usado/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {usado, codigo} = req.body

    try {
        const updateUsado = {
            usado
        }

        await pool.query ('UPDATE app_compartida set ? WHERE usuario = ? AND codigo = ?', [updateUsado, usuario, codigo])
        const compartido = await pool.query ('SELECT * FROM app_compartida WHERE usuario = ? AND codigo = ?', [usuario, codigo])

        if (compartido.length === 0){
            return res.json({
                message: 'El código no existe, intentelo nuevamente',
                success: true,
            })            
        }else{
            return res.json({
                compartido: compartido[0],
                success: true,
            })
        }
    } catch (error) {
        console.log (error)
        return res.json({
            success: false
        })
    }
})

router.get ('/app/compartir/codigo/:usuario/:codigo', async (req, res) => {
    const {usuario, codigo} = req.params

    try {
        const compartido = await pool.query ('SELECT * FROM app_compartida WHERE usuario = ? AND codigo = ? AND usado = 1', [usuario, codigo])
        if (compartido.length > 0){
            return res.json ({
                message: 'El código ya a sido usado',
                success: true
            })
        }else{
            const compartido = await pool.query ('SELECT * FROM app_compartida WHERE codigo = ? AND usuario = ?', [codigo, usuario])
            if (compartido.length > 0){
                return res.json ({
                    message: '1',
                    success: true
                })
            }else{
                return res.json ({
                    message: '0',
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

module.exports = router