import React, { useEffect } from 'react'
import Tour from '../components/Tour'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listTours } from '../actions/tourActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const tourList = useSelector((state) => state.tourList)
  const { loading, error, tours } = tourList

  useEffect(() => {
    dispatch(listTours())
  }, [dispatch])

  return (
    <>
      <h1>Lastest Trips</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {tours.map((tour) => (
            <Col key={tour._id} sm={12} md={6} lg={4} xl={3}>
              <Tour tour={tour} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
