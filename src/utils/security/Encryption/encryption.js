import CryptoJs from "crypto-js";
export const genrateEncryption = ({plainText="" , signature = process.env.EncryptionSignature} = {})=>{
  const encryption = CryptoJs.AES.encrypt(plainText ,signature)
  return encryption
}
export const genrateDecryption = ({cipherText = "" , signature = process.env.EncryptionSignature} = {})=>{
  const decryption = CryptoJs.AES.decrypt(cipherText ,signature)
  return decryption
}