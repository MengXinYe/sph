import { v4 as uuidv4 } from 'uuid'

export const UUID = () => {
  let uuidToken = sessionStorage.getItem('u_token')
  if (!uuidToken) {
    uuidToken = uuidv4()
    sessionStorage.setItem('u_token', uuidToken)
  }
  return uuidToken
}
