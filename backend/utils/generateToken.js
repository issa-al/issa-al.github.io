import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const tkn = process.env.JWT_SECRET || 'abc123'

const generateToken = (id) => {
  return jwt.sign({ id }, tkn, {
    expiresIn: '30d',
  })
}

export default generateToken
