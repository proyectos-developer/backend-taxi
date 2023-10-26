const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/calificacion', async (req, res) => {
    const {calificacion, comentarios, conductor, viajero, id_viaje} = req.body
    console.log ('entra 4')
    try {
        const nuevaCalificacion = {calificacion, comentarios, conductor, viajero, id_viaje}
        const nueva = await pool.query ('INSERT INTO calificaciones set ?', [nuevaCalificacion])

        const califica = await pool.query ('SELECT * FROM calificaciones WHERE id = ?', [nueva.insertId])

        return res.json ({
            calificacion: califica[0],
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

router.get ('/calificaciones/conductor/:conductor', async (req, res) => {
    const {conductor} = req.params
    console.log ('entra 4')
    try {
        const calificaciones = await pool.query ('SELECT * FROM calificaciones WHERE conductor = ?', [conductor])

        return res.json ({
            calificaciones: calificaciones,
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

router.get ('/calificacion/conductor/:id_calificacion', async (req, res) => {
    const {id_calificacion} = req.params
    console.log ('entra 4')
    try {
        const calificaciones = await pool.query ('SELECT * FROM calificaciones WHERE id = ?', [id_calificacion])

        return res.json ({
            calificaciones: calificaciones,
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