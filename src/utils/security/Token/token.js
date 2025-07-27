  import jwt from "jsonwebtoken"
  export const generataToken = ({payload={} , signature = process.env.TokenSignature, options = {}} = {})=>{
  const token = jwt.sign(payload , signature , options )
  return token
}
export const verifyToken = ({token="" , signature = process.env.TokenSignature} = {})=>{
  const decodedToken = jwt.verify(token ,signature )
  return decodedToken
}