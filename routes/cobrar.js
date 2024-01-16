const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/cobrar/conductor', async (req, res) => {
    const {usuario, medio_pago, nro_yape, nro_plin, nombre_banco, nro_cuenta, cuenta_interbancaria} = req.body

    try {
        const cobrar = await pool.query ('SELECT * FROM cobrar_conductor WHERE usuario = ?', [usuario])

        if (cobrar.length > 0){
            const updateCobrar = {medio_pago, nro_yape, nro_plin, nombre_banco, nro_cuenta, cuenta_interbancaria}

            await pool.query ('UPDATE cobrar_conductor set ? WHERE usuario = ?', [updateCobrar, usuario])
            const cobrar = await pool.query ('SELECT * FROM cobrar_conductor WHERE usuario = ?', [usuario])

            return res.json ({
                cobrar: cobrar[0],
                success: true
            })
        }else{
            const newCobrar = {usuario, medio_pago, nro_yape, nro_plin, nombre_banco, nro_cuenta, cuenta_interbancaria}

            const new_cobrar = await pool.query ('INSERT INTO cobrar_conductor set ?', [newCobrar])
            const cobrar = await pool.query ('SELECT * FROM cobrar_conductor WHERE id = ?', [new_cobrar.insertId])

            return res.json ({
                cobrar: cobrar[0],
                success: true
            })
        }

    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/cobrar/conductor/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const cobrar = await pool.query ('SELECT * FROM cobrar_conductor WHERE usuario = ?', [usuario])

        return res.json ({
            cobrar: cobrar[0],
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