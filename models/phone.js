const mongoose = require('mongoose')

const url = process.env.MONGOPHONEDB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to Mongo PhoneBook DB')
  })
  .catch((error) => {
    console.log('error connecting to Mongo PhoneBook DB:', error.message)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number:  {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{5,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)