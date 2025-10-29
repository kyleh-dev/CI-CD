// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://kyle:${password}@cluster117.yaa9ruv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster117`

// mongoose.set('strictQuery', false)

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// // const note = new Note({
// //   content: 'HTML is easy',
// //   important: true,
// // })

// // note.save().then(result => {
// //   console.log('note saved!');
// //   mongoose.connection.close()
// // })

// //Fetching objects from mongodb
// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   })
//   mongoose.connection.close()
// })

//------------------------------Exercise 3.12---------------------------------------------------------------------

const showAllCollection = async (modelObj) => {
  const result = await modelObj.find({});
  result.forEach(element => console.log(element));
  mongoose.connection.close();
  process.exit(0)
};

const postToCollection = async (modelObj) => { 
  const name = process.argv[3]
  const number = process.argv[4]

  try {
    const entries = await modelObj.find({})
    const isExist = entries.find(entry => entry.name === name)
    if (isExist) {
      console.log(`Entry with ${name} already exists`);
    }
    else {      
      const newId = entries[entries.length - 1].id + 1
      const newEntry = new modelObj({
        id: newId,
        name: name,
        number: number
      });
      
      await newEntry.save();
      console.log(`Adding new entry: ${newEntry.name} ${newEntry.number}`);
    }
  }
  catch(error){
    console.error("Error interacting with database: ", error)
  }
  finally {
    mongoose.connection.close()
    process.exit(0)
  }
}

const main = async () => {
  const password = process.argv[2]
  const url = `mongodb+srv://kyle:${password}@cluster117.yaa9ruv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster117`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  const entrySchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
  })

  const Entry = mongoose.model('ContactEntry', entrySchema)

  // const entry = new Entry({
  //   id: 1,
  //   name: 'Amanda',
  //   number: '444-112-5012'
  // })

  // entry.save().then( (result) => {
  //   console.log('entry was saved');
  //   mongoose.connection.close()
  // })

  if (process.argv.length < 4) {
    await showAllCollection(Entry)
  } 
  else if (process.argv.length < 5) {
    console.log("Number wasn't given, please try again");
    process.exit(1)
  } 
  else {
    await postToCollection(Entry)
  }

}

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give a password as an argument');
  process.exit(1)
}

main()