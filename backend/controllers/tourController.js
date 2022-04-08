import asyncHandler from 'express-async-handler'
import Tour from '../models/tourModel.js'

// @desc Fetch all tours
// @route GET /api/tours
// @access Public
const getTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find({})

  res.json(tours)
})

// @desc Fetch singele tour
// @route GET /api/tours:id
// @access Public
const getTourByID = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id)

  if (tour) {
    res.json(tour)
  } else {
    res.status(404)
    throw new Error('Tour not found')
  }
})

// @desc delete a tour
// @route DELETE /api/tours/:id
// @access Private/Admin
const deleteTour = asyncHandler(async (req, res) => {
  const tour = await Tour.findById(req.params.id)

  if (tour) {
    await tour.remove()
    res.json({ message: 'Tour removed' })
  } else {
    res.status(404)
    throw new Error('Tour not found')
  }
})

// @desc create a tour
// @route POST /api/tours/
// @access Private/Admin
const createTour = asyncHandler(async (req, res) => {
  const tour = new Tour({
    name: 'Sample name',
    price: 0,
    city: 'Sample',
    user: req.user._id,
    image: '/images/berlin.jpg',
    available: 0,
    numReviews: 0,
    description: 'Sample Desc',
  })

  const createdTour = await tour.save()
  res.status(201).json(createdTour)
})

// @desc update a tour
// @route PUT /api/tours/:id
// @access Private/Admin
const updateTour = asyncHandler(async (req, res) => {
  const { name, price, description, image, available, numReviews } = req.body

  const tour = await Tour.findById(req.params.id)

  if (tour) {
    tour.name = name
    tour.price = price
    tour.description = description
    tour.image = image
    tour.numReviews = numReviews
    tour.available = available

    const updatedTour = await tour.save()
    res.json(updatedTour)
  } else {
    res.status(404)
    throw new Error('Tour not found')
  }
})

export { getTours, getTourByID, deleteTour, createTour, updateTour }
