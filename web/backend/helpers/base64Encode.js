import fs from 'fs'

function base64Encode(file) {
  try {
    console.log('test')
    var body = fs.readFileSync(file)
    console.log('body', body)
    return body.toString('base64')
  } catch (error) {
    console.log('loi', error)
  }
}

export default base64Encode
