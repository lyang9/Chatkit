const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:566b995c-0276-46fe-8b2f-1e69e0893135',
  key: '421c720e-dc3f-4bc1-bbcf-54534b06290a:fpGqd1hDobmKdCk0DEQpRxDyf4JHe0ebOn2wXiWS88k=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})



const PORT = 8000
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log( `Running on port ${PORT}`)
  }
})