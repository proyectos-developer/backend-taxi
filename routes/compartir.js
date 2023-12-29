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

router.post ('/app/compartir/usado/:codigo', async (req, res) => {
    const {codigo} = req.params
    const {usado} = req.body

    try {
        const updateUsado = {
            usado
        }

        await pool.query ('UPDATE app_compartida set ? WHERE codigo = ?', [updateUsado, codigo])
        const compartido = await pool.query ('SELECT * FROM app_compartida WHERE codigo = ?', [codigo])

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

router.get ('/app/compartir/codigo/:codigo', async (req, res) => {
    const {codigo} = req.params

    try {
        const compartido = await pool.query ('SELECT * FROM app_compartida WHERE codigo = ? AND usado = 1', [codigo])
        if (compartido.length > 0){
            return res.json ({
                message: 'El código ya a sido usado',
                success: true
            })
        }else{
            const compartido = await pool.query ('SELECT * FROM app_compartida WHERE codigo = ?', [codigo])
            if (compartido.length > 0){
                return res.json ({
                    message: '1', /**puede usarlo */
                    success: true
                })
            }else{
                return res.json ({
                    message: '0', /**no existe el código */
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