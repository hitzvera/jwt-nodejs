import express from 'express'
import pool from '../db.js'
import bcrypt from 'bcrypt'
import { authenticateUser } from '../middleware/authorization.js'


const userRoute = express.Router()

userRoute.get('/', authenticateUser,async(_,res)=>{
    
    try {
        const users = await pool.query("select * from users;")
        return res.json({
            error: false,
            users: users.rows
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            error: true,
            message: err,
        })
    }
})

userRoute.post('/', async(req,res) => {
    const { name, email } = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try{
        const newUser = await pool.query("insert into users(name, email, password) values($1,$2,$3) RETURNING *;",
        [name, email, hashedPassword]
        )
        return res.json({error: false, message: 'user craeted', user: newUser.rows[0]})
    } catch(err) {
        console.log(err)
        return res.status(400).json({
            error: true,
            message: err
        })
    }
    

})
export default userRoute