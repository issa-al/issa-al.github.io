import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Tour = ({ tour }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/tour/${tour._id}`}>
        <Card.Img src={tour.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/tour/${tour._id}`}>
          <Card.Title as='div'>
            <strong>{tour.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={tour.rating} text={`${tour.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3'>${tour.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Tour
