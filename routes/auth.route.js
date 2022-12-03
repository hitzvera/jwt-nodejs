import express from 'express'
import pool from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtTokenUsers, parseJwt } from '../utils/jwt.tokens.js'

const authRoute = express.Router()

authRoute.post('/login', async(req,res)=>{
    const { email, password } = req.body
    try{
        const user = await pool.query("select * from users where email=$1", [email])
        if(user.rows.length === 0) return res.json({error: true, message: 'email is not registered'})
        const validatePassword = await bcrypt.compare(password, user.rows[0].password)
        if(!validatePassword) return res.json({error: true, message: 'password is incorrect'})

        let tokens = jwtTokenUsers(user.rows[0])
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly:true})
        return res.json({
            message: 'welcome',
            user: user.rows[0],
            token: tokens.accessToken
        })
    } catch(err){
        console.log(err)
        return res.json({error: true, message: err})
    }
})

authRoute.get('/token' , (req,res)=>{
    if(req.cookies?.refresh_token){
        const refreshToken = req.cookies.refresh_token
        // return res.json({decode: refreshToken})
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err) return res.json({error: err.message})
            const accessToken = jwt.sign(
                parseJwt(refreshToken), process.env.ACCESS_TOKEN_SECRET
            )
            return res.json({accessToken})
        })
        
    }
})

export default authRoute