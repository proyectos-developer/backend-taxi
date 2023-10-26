const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/viaje', async (req, res) => {
    const {latitude_origen, latitude_destino, longitude_origen, longitude_destino, direccion_origen, direccion_destino, viajero, conductor,
            medio_pago, cobraron, pago} = req.body

    try { 
        const newViaje = {latitude_origen, latitude_destino, longitude_origen, longitude_destino, direccion_origen, direccion_destino, viajero, conductor,
                medio_pago, cobraron, pago}
        const new_viaje = await pool.query ('INSERT INTO viajes set ?', [newViaje])
        const viaje = await pool.query ('SELECT * FROM viajes WHERE id = ?', [new_viaje.insertId])

        return res.json ({
            viaje: viaje[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/viaje/:viajero/:id_viaje', async (req, res) => {
    const {conductor} = req.body
    const {viajero, id_viaje} = req.params

    try { 
        const updateViaje = {conductor}
        await pool.query ('UPDATE viajes set ? WHERE viajero = ? AND id = ?', [updateViaje, viajero, id_viaje])
        const viaje = await pool.query ('SELECT * FROM viajes WHERE id = ?', [id_viaje])

        return res.json ({
            viaje: viaje[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/viaje/viajero/pago/:id_viaje', async (req, res) => {
    const {medio_pago, conductor, cobraron} = req.body
    const {id_viaje} = req.params
    console.log ('entra 8')
    try { 
        const updateViaje = {
            medio_pago, 
            conductor,
            cobraron
        }
        await pool.query ('UPDATE viajes set ? WHERE id = ?', [updateViaje, id_viaje])
        const viaje = await pool.query ('SELECT * FROM viajes WHERE id = ?', [id_viaje])

        return res.json ({
            viaje: viaje[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/viaje/viajero/estado/pago/:id_viaje', async (req, res) => {
    const {pago} = req.body
    const {id_viaje} = req.params
    console.log ('entra 8')
    try { 
        const updateViaje = {
            pago
        }
        await pool.query ('UPDATE viajes set ? WHERE id = ?', [updateViaje, id_viaje])
        const viaje = await pool.query ('SELECT * FROM viajes WHERE id = ?', [id_viaje])

        return res.json ({
            viaje: viaje[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/viaje/viajero/:viajero/:id_viaje', async (req, res) => {
    const {viajero, id_viaje} = req.params
    try {
        const viaje = await pool.query (`SELECT * FROM viajes WHERE id = ? AND viajero = ?`, [id_viaje, viajero])
        
        return res.json ({
            viaje: viaje[0], 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/viaje/conductor/:conductor/:id_viaje', async (req, res) => {
    const {conductor, id_viaje} = req.params
    try {
        const viaje = await pool.query (`SELECT * FROM viajes WHERE id = ? AND conductor = ?`, [id_viaje, conductor])
        
        return res.json ({
            viaje: viaje[0], 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/viajes/viajero/:viajero', async (req, res) => {
    const {viajero} = req.params
    try {
        const viajes = await pool.query (`SELECT * FROM viajes WHERE viajero = ?`, [viajero])
        
        return res.json ({
            viajes: viajes, 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/viajes/conductor/:conductor', async (req, res) => {
    const {conductor} = req.params
    try {
        const viajes = await pool.query (`SELECT * FROM viajes WHERE conductor = ?`, [conductor])
        
        return res.json ({
            viajes: viajes, 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/viaje/delete/:viajero/:id_viaje', async (req, res) => {
    const {viajero, id_viaje} = req.params
    try {
        await pool.query (`DELETE FROM viajes WHERE viajero = ? AND id = ?`, [viajero, id_viaje])
        
        return res.json ({
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/viajes/direcciones/viajero/:viajero', async (req, res) => {
    const{viajero} = req.params
    console.log ('entra 4')
    try {
        const destino = await pool.query (`SELECT DISTINCT direccion_destino FROM viajes WHERE viajero = ?`, [viajero])
        const origen = await pool.query (`SELECT DISTINCT direccion_origen FROM viajes WHERE viajero = ?`, [viajero])

        destino.map ((dir_destino, index) => {
            guardar_destinos(dir_destino.direccion_destino, dir_destino.created_at)
            if (index === destino.length - 1){
                origen.map ((dir_origen, indice) => {
                    guardar_destinos(dir_origen.direccion_origen, dir_destino.created_at)
                    if (indice === origen.length - 1){
                        obtener_direcciones(res)
                    }
                })
            }
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }

})

obtener_direcciones = async (res) => {
    try {
        const direcciones = await pool.query (`SELECT DISTINCT direccion FROM direcciones_guardadas`)
        return res.json ({
            direcciones: direcciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
}

guardar_destinos = async (direccion, fecha) => {
    try {
        const newDireccion = {direccion, fecha}
        await pool.query ('INSERT INTO direcciones_guardadas set ?', [newDireccion])
    } catch (error) {
        console.log (error)        
    }
}

module.exports = router