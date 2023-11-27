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

module.exports = router