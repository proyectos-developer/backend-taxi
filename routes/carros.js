const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/marca/carro', async (req, res) => {
    const {marca} = req.body

    try {
        const newMarca = {marca}
        const new_marca = await pool.query ('INSERT INTO marcas_carros set ?', [newMarca])
        const marca_carro = await pool.query ('SELECT * FROM marcas_carros WHERE id = ?', [new_marca.insertId])

        return res.json ({
            marca: marca_carro[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/modelo/carro', async (req, res) => {
    const {id_marca, modelo} = req.body

    try {
        const newModelo = {id_marca, modelo}
        const new_modelo = await pool.query ('INSERT INTO modelos_carros set ?', [newModelo])
        const modelo_carro = await pool.query ('SELECT * FROM modelos_carros WHERE id = ?', [new_modelo.insertId])

        return res.json ({
            modelo: modelo_carro[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/marcas/carros', async (req, res) => {
    try {
        const marcas = await pool.query (`SELECT * FROM marcas_carros ORDER BY marca`)
        
        return res.json ({
            marcas: marcas, 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/marca/carros/buscar/:search', async (req, res) => {
    const {search} = req.params

    try {
        const marcas = await pool.query (`SELECT * FROM marcas_carros WHERE marca LIKE '%${search}%' ORDER BY marca ASC`)

        return res.json ({
            marcas: marcas,
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/modelo/carros/marca/:id_marca', async (req, res) => {
    const {id_marca} = req.params

    try {
        const modelos = await pool.query (`SELECT * FROM modelos_carros WHERE id_marca = ? ORDER BY modelo`, [id_marca])
        
        return res.json ({
            modelos: modelos,
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/modelo/carros/marca/:id_marca/buscar/:search', async (req, res) => {
    const {search, id_marca} = req.params
    try {
        const modelos = await pool.query (`SELECT * FROM modelos_carros WHERE id_marca = ? AND  
                modelo LIKE '%${search}%' ORDER BY modelo ASC`, id_marca)

        return res.json ({
            modelos: modelos,
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