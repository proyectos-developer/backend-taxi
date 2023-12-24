const express = require('express')
const router = express.Router()

const admin = require ('firebase-admin')

router.post('/app/push_notification', async (req, res) => {
    const {token, title, body, imageUrl} = req.body
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
                    sound: 'default',
                    default_sound: true,
                    default_vibrate_timings: true,
                    default_light_settings: true
                }
            },
            options: {
                
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