import express from 'express'
const router = express.Router()
import {
  getTours,
  getTourByID,
  deleteTour,
  updateTour,
  createTour,
} from '../controllers/tourController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getTours).post(protect, admin, createTour)
router
  .route('/:id')
  .get(getTourByID)
  .delete(protect, admin, deleteTour)
  .put(protect, admin, updateTour)

export default router
