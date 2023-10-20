import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {

    const {itemId} = useParams();
    const [product, setProduct] = useState();

    console.log(useParams())



    useEffect( () =>{
        const url = `https://intra-deco.onrender.com/incidents/${itemId}`
        fetch(url)
          .then((res) => res.json())
          .then((data) => setProduct(data));
      }, [itemId]);
  return (
    <div>
      <p>{product.location}</p>
    </div>
  )
}

export default ProductDetail
