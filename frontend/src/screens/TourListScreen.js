import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { listTours, deleteTour, createTour } from '../actions/tourActions'
import { TOUR_CREATE_RESET } from '../constants/tourConstants'

const TourListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList

  const tourDelete = useSelector((state) => state.tourDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tourDelete

  const tourCreate = useSelector((state) => state.tourCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    tour: createdTour,
  } = tourCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: TOUR_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
    } else {
      dispatch(listTours())
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdTour])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteTour(id))
    }
  }

  const createTourHandler = () => {
    dispatch(createTour())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Tours</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createTourHandler}>
            <i className='fa fa-plus'></i> Create Tour
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td>{tour._id}</td>
                <td>{tour.name}</td>
                <td>${tour.price}</td>
                <td>{tour.category}</td>
                <td>{tour.brand}</td>
                <td>
                  <LinkContainer to={`/admin/tour/${tour._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(tour._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default TourListScreen
