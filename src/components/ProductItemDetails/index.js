// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    count: 1,
    status: 'IN_PROGRESS',
    details: {},
  }

  componentDidMount() {
    this.getCardDetails()
  }

  getCardDetails = async () => {
    const {match} = this.props
    const {url} = match
    // const {id} = params

    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in${url}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)

    if (response.ok === true) {
      const convertedData = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        description: data.description,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProducts: data.similar_products,
      }

      const {similarProducts} = convertedData
      console.log('convertedData', similarProducts)

      this.setState({
        status: 'SUCCESS',
        details: convertedData,
      })
    } else {
      this.setState({details: {}, status: 'FAILURE'})
    }
  }

  decrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
  }

  increase = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  renderCardDetails = () => {
    const {details, count} = this.state
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = details

    return (
      <div className="main-container">
        <Header />
        <div className="details">
          <img src={imageUrl} alt="product" className="image" />
          <div className="details-container">
            <h1 className="heading">{title}</h1>
            <p className="price">Rs {price}/- </p>
            <div className="rating-holder">
              <div className="rating">
                <p className="para">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-img"
                />
              </div>
              <p className="review">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="review">
              <span className="bold">Available: </span>
              {availability}
            </p>
            <p className="review">
              <span className="bold">Brand: </span>
              {brand}
            </p>
            <hr />
            <div className="quantity-container">
              <button
                className="button"
                testid="minus"
                type="button"
                onClick={this.decrease}
              >
                <BsDashSquare />
              </button>
              <p className="number">{count}</p>
              <button
                className="button"
                testid="plus"
                type="button"
                onClick={this.increase}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-button" type="button">
              Add to Cart
            </button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Products</h1>
        <ul className="listed">
          {similarProducts.map(each => (
            <SimilarProductItem content={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failure-container">
      <Header />
      <div className="no-result">
        <div className="failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
            className="failure-img"
            alt="failure view"
          />
          <h1 className="failure-heading">Product Not Found</h1>
          <button
            type="submit"
            className="continue-shopping"
            onClick={this.continueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" width="50" height="50" />
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      case 'SUCCESS':
        return this.renderCardDetails()
      default:
        return this.renderFailureView()
    }
  }
}

export default ProductItemDetails
