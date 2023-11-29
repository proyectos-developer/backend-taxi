const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Nuevo viajero */
router.post ('/app/viajero', async (req, res) => {
    const {nombres, fecha_nacimiento, tipo_documento, nro_documento, nro_telefono, correo, habilitado, direccion_principal, foto, longitud, latitud, usuario} = req.body
    console.log ('entra 8')
    const newViajero = {nombres, fecha_nacimiento, tipo_documento, nro_documento, nro_telefono, correo, habilitado, direccion_principal, foto, longitud, latitud, usuario}
    try{
        await pool.query ('INSERT INTO usuarios_viajeros set ?', [newViajero])
        const viajero = await pool.query ('SELECT * FROM usuarios_viajeros WHERE usuario = ?', [usuario])

        return res.json ({
            viajero: viajero[0],
            success: true
        })
    }catch (err) {
        console.log(err)
        return res.json ({
            viajero: {},
            success: false
        })
    }
})

/**Actualizar estado conductor*/
router.post ('/admin/viajero/estado/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {habilitado} = req.body

    const updateEstado = {habilitado}

    try{
        await pool.query ('UPDATE usuarios_viajeros set ? WHERE usuario = ?', [updateEstado, usuario])

        return res.json ({
            success: true
        })
    }catch (err) {
        console.log (err)
        return res.json ({
            success: false
        })
    }
})

/**Actualizar viajero*/
router.post ('/app/viajero/:usuario', async (req, res) => {
    const {nombres, fecha_nacimiento, tipo_documento, nro_documento, nro_telefono, direccion_principal, foto, longitud, latitud} = req.body
    const {usuario} = req.params

    const updateViajero = {nombres, fecha_nacimiento, tipo_documento, nro_documento, nro_telefono, direccion_principal, foto, longitud, latitud}
    try{
        await pool.query ('UPDATE usuarios_viajeros set ? WHERE usuario = ?', [updateViajero, usuario])
        const viajero = await pool.query ('SELECT * FROM usuarios_viajeros WHERE usuario = ?', [usuario])
        return res.json ({
            viajero: viajero[0],
            success: true
        })
    }catch (err) {
        return res.json ({
            success: false
        })
    }
})

/**Obtener viajero */
router.get ('/app/viajero/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const viajero = await pool.query ('SELECT * FROM usuarios_viajeros WHERE usuario = ?', [usuario])

        return res.json ({
            viajero: viajero[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            success: false
        })
    }
})

/**Obtener viajero y viaje *****************/
router.get ('/app/viajero/viaje/:usuario/:id_viaje', async (req, res) => {
    const {usuario, id_viaje} = req.params
    
    try {
        const viajero = await pool.query (`SELECT * FROM usuarios_viajeros JOIN viajes ON viajes.viajero = usuarios_viajeros.usuario 
                                            WHERE usuarios_viajeros.usuario = ? AND viajes.id = ?`, [usuario, id_viaje])

        return res.json ({
            viajero: viajero[0],
            success: true
        })
    } catch (error) {
        
        return res.json ({
            success: false
        })
    }
})

/**Borrar viajero */
router.get ('/admin/delete/viajero/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const viajero = await pool.query ('DELETE FROM usuarios_viajeros WHERE usuario = ?', [usuario])

        return res.json ({
            viajero: viajero[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            success: false
        })
    }
})

module.exports = router