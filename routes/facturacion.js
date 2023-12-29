const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/app/factura', async(req, res) => {
    const {tipo, nombres, tipo_documento, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura, usuario} = req.body

    try {
        const newFactura = {tipo, nombres, tipo_documento, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura, usuario}
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
    const {tipo, nombres, tipo_documento, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura} = req.body
    const {usuario} = req.params

    try {
        const updateFactura = {tipo, nombres, tipo_documento, nro_documento, direccion_boleta, correo_boleta, razon_social, nro_ruc, direccion_factura, correo_factura}
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

router.post ('/app/documento', async (req, res) => {
    const {tipo, monto, fecha, usuario, id_viaje} = req.body
    try {
        const boletas = await pool.query ('SELECT * FROM boleta_factura WHERE tipo = ?', [tipo])
        let nro_boleta = ''
        let nro_factura = ''
        if (tipo === 'boleta'){
            nro_boleta =  boletas.length + 1 < 10 ? `0000${boletas.length + 1}` : boletas.length + 1 < 100 ? `$000{boletas.length + 1}`: boletas.length + 1 < 1000 ? 
                         `00${boletas.length + 1}` : boletas.length + 1 < 10000 ? `0${boletas.length + 1}`: boletas.length + 1 < 100000 ? `${boletas.length + 1}` : ``
        }else if(tipo === 'factura'){
            nro_factura =  boletas.length + 1 < 10 ? `0000${boletas.length + 1}` : boletas.length + 1 < 100 ? `$000{boletas.length + 1}`: boletas.length + 1 < 1000 ? 
                         `00${boletas.length + 1}` : boletas.length + 1 < 10000 ? `0${boletas.length + 1}`: boletas.length + 1 < 100000 ? `${boletas.length + 1}` : ``
        }
        const newDoc = {
            tipo,
            nro_boleta,
            nro_factura,
            monto,
            fecha,
            id_viaje,
            usuario
        }

        const nuevo_doc = await pool.query ('INSERT INTO boleta_factura set ?', [newDoc])
        const documento = await pool.query ('SELECT * FROM boleta_factura WHERE id = ?', nuevo_doc.insertId)
        return res.json ({
            documento: documento[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            documento: {},
            success: false
        })        
    }
})

router.get ('/app/numero/documentos/:tipo', async (req, res) => {
    const {tipo} = req.params
    try {
        const documentos = await pool.query ('SELECT * FROM boleta_factura WHERE tipo = ?', [tipo])
        return res.json ({
            nro_documento: documentos.length,
            success: true
        })
    } catch (error) {
        return res.json ({
            nro_documento: documentos.length,
            success: false
        })        
    }
})

router.get ('/app/documento/:id_viaje', async (req, res) => {
    const {id_viaje} = req.params

    try {
        const documento = await pool.query ('SELECT * FROM boleta_factura WHERE id_viaje = ?', [id_viaje])
        return res.json({
            documento: documento [0],
            success: false
        })
    } catch (error) {
        return res.json({
            documento: {},
            success: false
        })
    }
})

module.exports = router