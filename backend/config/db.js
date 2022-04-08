import mongoose from 'mongoose'

const URI =
  process.env.MONGO_URI ||
  'mongodb+srv://issa-al:7012019283A@firstcluster.fn1vd.mongodb.net/webproject?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDb Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
