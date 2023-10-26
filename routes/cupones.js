const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Nuevo cupón */
router.post ('/cupon/viajero', async (req, res) => {
    const {viajero, cupon, disponible, descuento} = req.body

    try {
        const newCupon = {viajero, cupon, disponible, descuento}
        const new_cupon = await pool.query ('INSERT INTO cupones set ?', [newCupon])

        const nuevo_cupon = await pool.query ('SELECT * FROM cupones WHERE id = ?', [new_cupon.insertId])

        return res.json ({
            cupon: nuevo_cupon [0],
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

/**Obtener cupones */
router.get ('/cupones/viajero/:viajero', async (req, res) => {
    const {viajero} = req.params

    try {
        const cupones = await pool.query ('SELECT * FROM cupones WHERE viajero = ?', [viajero])

        return res.json ({
            cupones: cupones,
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

/**Verificar si existey y disponible cupón */
router.get ('/cupon/viajero/:viajero/:codigo', async (req, res) => {
    const {viajero, codigo} = req.params
    try {
        const resultado = await pool.query ('SELECT * FROM cupones WHERE viajero = ? AND cupon = ?', [viajero, codigo])
        if (resultado.length === 0){
            return res.json ({
                message: '¡No existe el cupón o a ingresado uno incorrecto!',
                success: true
            })
        }else{
            if (resultado[0].disponible === 0){
                return res.json ({
                    message: '¡Ya a usado el cupon anteriormente!',
                    success: true
                })
            }else{
                const cupon = await pool.query ('SELECT * FROM cupones WHERE viajero = ? AND cupon = ?', [viajero, codigo])
                return res.json ({
                    cupon: cupon[0],
                    success: true
                })
            }
        }
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

/**Actualizar disponibildad de cupón */
router.post ('/cupon/viajero/:viajero/:codigo', async (req, res) => {
    const {viajero, codigo} = req.params
    const {disponible} = req.body
    console.log ('entra 20')
    try {
        const updateCupon = {disponible}
        await pool.query ('UPDATE cupones set ? WHERE viajero = ? AND cupon = ?', [updateCupon, viajero, codigo])

        const cupon = await pool.query ('SELECT * FROM cupones WHERE viajero = ? AND cupon = ?', [viajero, codigo])
        return res.json ({
            cupon: cupon[0],
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