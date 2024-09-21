import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {
    updatedlist: {},
    count: 1,
    loadstatus: true,
  }

  componentDidMount() {
    this.getProduct()
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getProduct = async () => {
    const {id} = this.props.match.params
    console.log('kote')
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiurl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log('kote2')
      console.log(data)
      const updatedData = {
        title: data.title,
        brand: data.brand,
        description: data.description,
        price: data.price,
        id: data.id,
        image_url: data.image_url,
        rating: data.rating,
        similarProducts: data.similar_products,
        availability: data.availability,
        totalReviews: data.total_reviews,
      }
      this.setState({
        updatedlist: updatedData,
        loadstatus: false,
      })
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  onDecrease = () => {
    this.setState(prevState => ({
      count: prevState.count > 1 ? prevState.count - 1 : 1,
    }))
  }

  render() {
    const {updatedlist, count, loadstatus} = this.state
    const {
      title,
      totalReviews,
      description,
      brand,
      image_url,
      rating,
      price,
      availability,
      similarProducts = [],
    } = updatedlist
    return (
      <>
        <Header />
        {loadstatus ? (
          this.renderLoadingView()
        ) : (
          <li>
            <h1 className="product-item">{title}</h1>
            <img src={image_url} alt="product" />
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
            <p>{totalReviews}</p>
            <p>Price :{price}</p>
            <p>{description}</p>
            <p>Availability: {availability}</p>
            <p>Brand:{brand}</p>
            <button onClick={this.onDecrease} data-testid="minus">
              <BsDashSquare />
            </button>
            <p>{count}</p>
            <p>{rating}</p>
            <button data-testid="plus">
              <BsPlusSquare onClick={this.onIncrease} />
            </button>
            <button>Add to Cart</button>
          </li>
        )}
        <div>
          <h1>Similar Products</h1>
          <ul>
            {similarProducts.map(each => (
              <SimilarProductItem products={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default ProductItemDetails
