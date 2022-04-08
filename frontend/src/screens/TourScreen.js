import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listTourDetails } from '../actions/tourActions'
import { useNavigate } from 'react-router'

const TourScreen = ({ history }) => {
  const [qty, setQty] = useState(1)

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tourDetails = useSelector((state) => state.tourDetails)
  const { loading, error, tour } = tourDetails

  useEffect(() => {
    dispatch(listTourDetails(params.id))
  }, [dispatch, params.id])

  const addToCardHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={tour.image} alt={tour.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{tour.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={tour.rating}
                  text={`${tour.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${tour.price}</ListGroup.Item>
              <ListGroup.Item>Description: {tour.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${tour.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Staus:</Col>
                    <Col>
                      {tour.available > 0 ? 'Available' : 'Not Available'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {tour.available > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>QTY</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(tour.available).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCardHandler}
                    className='btn-block'
                    type='button'
                    disabled={tour.available === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default TourScreen
