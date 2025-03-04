import React from 'react'
import { useParams } from 'react-router-dom'

function Detail() {
  const { id } = useParams();

  console.log("param id:", id);
  
  return (
    <div>

    </div>
  )
}

export default Detail
