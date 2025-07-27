  import bcrypt from "bcrypt"
export const generataHash = ({plainText="" , saltRound = process.env.SALT} = {})=>{
  const hash = bcrypt.hashSync(plainText , parseInt(saltRound))
  return hash
}
export const compareHash = ({plainText="" , hashValue=""} = {})=>{
  const compareHash = bcrypt.compareSync(plainText , hashValue)
  return compareHash
}