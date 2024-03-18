import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {apiStatus: 'Initial', content: []}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: 'Loading'})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({apiStatus: 'success', content: data.faq})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  faqLoadingView = () => (
    <div className="loader-container">
      <div testid="aboutRouteLoader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  faqSuccessView = () => {
    const {content} = this.state
    console.log(content)
    return (
      <ul testid="faqsUnorderedList">
        {content.map(each => (
          <li key={each.qno}>
            <p> {each.question}</p>
            <p>{each.answer}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderFaqs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'Loading':
        return this.faqLoadingView()
      case 'success':
        return this.faqSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="About-content-container">
          <div>
            <h1>About</h1>
            <p>Last update on march 28th 2021.</p>
            <p>COVID-19 vaccines be ready for distribution</p>
            {this.renderFaqs()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
