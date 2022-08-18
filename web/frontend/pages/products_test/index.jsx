import React, { useState } from 'react'

function ProductsPage(props) {
  console.log('props :>> ', props)
  const { actions, notiy, loading } = props

  const [products, setProducts] = useState(null)
  return <div>product page nhes</div>
}

export default ProductsPage
