const mongoose = require('mongoose')

const url = process.env.MONGOPHONEDB_URI
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to Mongo PhoneBook DB')  
    })  
    .catch((error) => {
        console.log('error connecting to Mongo PhoneBook DB:', error.message)  
    })

    const phoneSchema = new mongoose.Schema({
        name: String,
        number: Number,
      })

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)