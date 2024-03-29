import React from 'react'

const Card = (props) => {
  return (
    <div className='card'>
        <p>{props.name}</p>
        <img src={props.image} alt={props.imgText}/>
    </div>
  )
}

export default Card