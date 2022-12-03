import jwt from 'jsonwebtoken'


function jwtTokenUsers({user_id, name, email}) {
    const user = {
        user_id, 
        name, 
        email
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '60m'})

    return ({accessToken, refreshToken})
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}


export {
    jwtTokenUsers,
    parseJwt
}