const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/app/factura', async(req, res) => {
    const {tipo, nombres, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura, usuario} = req.body

    try {
        const newFactura = {tipo, nombres, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura, usuario}
        const nuevos_datos = await pool.query(`INSERT INTO facturacion set ?`, [newFactura])
        const datos = await pool.query (`SELECT * FROM facturacion WHERE id = ?`, [nuevos_datos.insertId])
        
        return res.json ({
            facturacion: datos[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/app/factura/:usuario', async(req, res) => {
    const {tipo, nombres, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura} = req.body
    const {usuario} = req.params

    try {
        const updateFactura = {tipo, nombres, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura}
        await pool.query(`UPDATE facturacion set ? WHERE usuario = ?`, [updateFactura, usuario])
        const datos = await pool.query (`SELECT * FROM facturacion WHERE usuario = ?`, [usuario])
        
        return res.json ({
            facturacion: datos[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/app/factura/:usuario', async(req, res) => {
    const {usuario} = req.params

    try {
        const datos = await pool.query (`SELECT * FROM facturacion WHERE usuario = ?`, [usuario])
        
        return res.json ({
            facturacion: datos[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

module.exports = router