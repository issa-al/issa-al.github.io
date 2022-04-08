import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listTourDetails, updateTour } from '../actions/tourActions'
import { TOUR_UPDATE_RESET } from '../constants/tourConstants'
import axios from 'axios'

const TourEditScreen = ({ history }) => {
  const params = useParams()

  const tourId = params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [available, setAvailable] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const tourDetails = useSelector((state) => state.tourDetails)
  const { loading, error, tour } = tourDetails

  const tourUpdate = useSelector((state) => state.tourUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tourUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TOUR_UPDATE_RESET })
      // history.push('/admin/tourlist')
    } else {
      if (!tour.name || tour._id !== tourId) {
        dispatch(listTourDetails(tourId))
      } else {
        setName(tour.name)
        setPrice(tour.price)
        setImage(tour.image)
        setDescription(tour.description)
        setAvailable(tour.available)
      }
    }
  }, [tour, history, dispatch, tourId, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateTour({
        _id: tourId,
        name,
        price,
        available,
        description,
        image,
      })
    )
  }

  return (
    <>
      <Link to='/admin/tourlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Tour</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>price Adress</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                // id='image-file'
                type='file'
                label='Choose File'
                // custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='available'>
              <Form.Label>Available</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter available'
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default TourEditScreen
