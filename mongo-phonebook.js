const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.lds4bgh.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)


mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (process.argv.length === 3){
      Phone.find({}).then(result => { console.log('PhoneBook:')
        result.forEach(phone => {
          console.log(phone.name, phone.number)
        })
        mongoose.connection.close()
      })
    } else{
      const phone = new Phone({
        name: name,
        number: number,
      })

      return phone.save()
        .then(() => {
          console.log(`Added ${name} number ${number} to phonebook!`)
          return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
    }
  })


