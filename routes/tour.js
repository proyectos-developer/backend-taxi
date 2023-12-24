const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get ('/api/tour/categorias', async(req, res) => {
    try {
        const categorias_tours = await pool.query ('SELECT * FROM categoria_tours')

        return res.json({
            categorias_tours: categorias_tours,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json({
            catgorias_tours: [],
            success: false
        })
    }
})

router.get ('/api/tours/regiones', async (req, res) => {
    try {
        const regiones = await pool.query ('SELECT DISTINCT region FROM tours')

        return res.json ({
            regiones: regiones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            regiones: [],
            success: false
        })
    }
})

router.get ('/api/provincias/region/:region', async (req, res) => {
    const {region} = req.params
    try {
        const provincias = await pool.query ('SELECT DISTINCT provincia FROM tours WHERE region = ?', [region])
        const coordenadas = await pool.query ('SELECT latitud, longitud FROM regiones WHERE region = ?', [region])

        return res.json ({
            coordenadas: coordenadas[0],
            provincias: provincias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            provincias: [],
            success: false
        })
    }
})

router.get ('/api/buscar/region/:region/provincia/:provincia/search/:buscar/categoria/:categoria', async(req, res) => {
    const {region, provincia, buscar, categoria} = req.params
    console.log ('params', region, provincia, buscar, categoria)
    try {
        console.log ('entra')
        if (region !== '0' && provincia === '0' && buscar !== '0' && categoria === '0'){
            const lugares = await pool.query (`SELECT * FROM tours WHERE region = ? AND (provincia LIKE '%${buscar}%' OR 
                    nombre_recurso LIKE '%${buscar}%' OR categoria LIKE '%${buscar}%' OR tipo_categoria LIKE '%${buscar}%'
                    OR tipo_sub_categoria LIKE '%${buscar}%') ORDER BY nombre_recurso ASC`, [region] )
            return res.json({
                lugares: lugares,
                success: true
            })
        }else if (region !== '0' && provincia !== '0' && buscar !== '0' && categoria === '0'){
            const lugares = await pool.query (`SELECT * FROM tours WHERE region = ? AND provincia = ? AND ( 
                    nombre_recurso LIKE '%${buscar}%' OR categoria LIKE '%${buscar}%' OR tipo_categoria LIKE '%${buscar}%'
                    OR tipo_sub_categoria LIKE '%${buscar}%') ORDER BY nombre_recurso ASC`, [region, provincia] )
            return res.json({
                lugares: lugares,
                success: true
            })
        }else if (region !== '0' && provincia === '0' && buscar === '0' && categoria !== '0'){
            const lugares = await pool.query (`SELECT * FROM tours WHERE region = ? AND (provincia LIKE '%${categoria}%' OR 
                    nombre_recurso LIKE '%${categoria}%' OR categoria LIKE '%${categoria}%' OR tipo_categoria LIKE '%${categoria}%'
                    OR tipo_sub_categoria LIKE '%${categoria}%') ORDER BY nombre_recurso ASC`, [region] )
            return res.json({
                lugares: lugares,
                success: true
            })
        }else if (region !== '0' && provincia !== '0' && buscar === '0' && categoria !== '0'){
            console.log ('entra 3')
            const lugares = await pool.query (`SELECT * FROM tours WHERE region = ? AND provincia = ? AND ( 
                    nombre_recurso LIKE '%${categoria}%' OR categoria LIKE '%${categoria}%' OR tipo_categoria LIKE '%${categoria}%'
                    OR tipo_sub_categoria LIKE '%${categoria}%') ORDER BY nombre_recurso ASC`, [region, provincia] )
            return res.json({
                lugares: lugares,
                success: true
            })
        }else if (region !== '0' && provincia !== '0' && buscar === '0' && categoria === '0'){
            const lugares = await pool.query (`SELECT * FROM tours WHERE region = ? AND provincia = ?
                                                 ORDER BY nombre_recurso ASC`, [region, provincia] )
            return res.json({
                lugares: lugares,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json({
            lugares: [],
            success: false
        })
    }
})

router.post('/api/tour/update', async (req, res) => {
    const {latitud, longitud, codigo_recurso} = req.body
    try {
        const updateData = {latitud, longitud}

        await pool.query ('UPDATE tours set ? WHERE codigo_recurso = ?', [updateData, codigo_recurso])
        const lugar = await pool.query ('SELECT * FROM tours WHERE codigo_recurso = ?', [codigo_recurso])
        return res.json({
            lugar: lugar[0],
            success: true
        })
    } catch (error) {
        return res.json({
            success: false
        })
    }
})

module.exports = router