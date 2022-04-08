import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import tours from './data/tours.js'
import User from './models/userModel.js'
import Tour from './models/tourModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Tour.deleteMany()
    await User.deleteMany()

    const createdUser = await User.insertMany(users)

    const adminUser = createdUser[0]._id

    const sampleTours = tours.map((tour) => {
      return { ...tour, user: adminUser }
    })

    await Tour.insertMany(sampleTours)

    console.log('Data Imported')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Tour.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
