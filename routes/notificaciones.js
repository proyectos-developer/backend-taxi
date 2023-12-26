const express = require('express')
const router = express.Router()

const admin = require ('firebase-admin')

router.post('/app/push_notification', async (req, res) => {
    const {token, title, body, imageUrl, pantalla, id_viaje, viajero, conductor, user_token} = req.body
    console.log(token, title, body, imageUrl, pantalla, id_viaje, viajero, conductor, user_token)
    try {
        
        await admin.messaging().sendMulticast({
            tokens: [
                token
            ], // ['token_1', 'token_2', ...]
            android: {
                notification: {
                    title: title,
                    body: body,
                    imageUrl: imageUrl,
                    sound: 'default'
                },
                data: {
                    screen: pantalla,
                    id_viaje: id_viaje,
                    viajero: viajero,
                    conductor: conductor,
                    user_token: user_token
                }
            }
        });

        return res.json({
            success: true
        })
        
    } catch (error) {
        console.log (error)
        return res.json({
            success: false
        })
    }
    
})

module.exports = router