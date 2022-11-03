// Write your code here

const SimilarProductItem = props => {
  const {content} = props
  const {title, brand, rating, price} = content
  const imageUrl = content.image_url

  //   const moreProducts = content({
  //     cardId: content.id,
  //     cardImageUrl: content.image_url,
  //     cardTitle: content.title,
  //     cardStyle: content.style,
  //     cardPrice: content.price,
  //     cardDescription: content.description,
  //     cardBrand: content.brand,
  //     cardTotalReviews: content.total_reviews,
  //     cardRating: content.rating,
  //     cardAvailability: content.availability,
  //   })

  return (
    <li className="product-item">
      <img src={imageUrl} alt="similar product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">by {price}</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
