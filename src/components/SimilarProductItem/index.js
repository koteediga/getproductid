const SimilarProductItem = props => {
  const {products} = props
  const formattedlist = {
    image_url: products.image_url,
    brand: products.brand,
    price: products.price,
    rating: products.rating,
    totalReviews: products.total_reviews,
    title: products.title,
  }
  return (
    <li>
      <img src={formattedlist.image_url} alt="similarproduct" />
      <p>{formattedlist.title}</p>
      <p>{formattedlist.brand}</p>
      <p>{formattedlist.price}</p>
      <p>{formattedlist.rating}</p>
      <p>{formattedlist.totalReviews}</p>
    </li>
  )
}

export default SimilarProductItem
