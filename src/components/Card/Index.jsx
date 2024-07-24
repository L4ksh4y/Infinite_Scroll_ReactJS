import React from 'react'

const Card = ({item}) => {
   
  return ( 
    <div  className=" rounded" >
    <img src={item.imageUrl} alt={item.title} className=" w-full  object-cover" />
    <h3 className="font-semibold">{item.title}</h3>
    <p>{item.body}</p>
  </div>
  )
}

export default Card
