import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateSpecific extends Component {
  state = {
    specifiStateapiStatus: 'Initial',
    Specificontent: [],
    timelineData: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    const keyNames = Object.keys(data)
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name:
            statesList.find(state => state.state_code === keyName)
              ?.state_name || 'Unknown',
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    this.setState({specifiStateapiStatus: 'Loading'})
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const url2 = `https://apis.ccbp.in/covid19-timelines-data/${params.stateCode}`
    const response = await fetch(url)
    const response2 = await fetch(url2)
    if (response.ok === true && response2.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const data2 = await response2.json()

      console.log(data2)
      const listFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod(
        data,
      )
      this.setState({
        specifiStateapiStatus: 'success',
        Specificontent: listFormattedDataUsingForInMethod,
        timelineData: data2,
      })
    } else {
      this.setState({specifiStateapiStatus: 'failure'})
    }
  }

  renderSpecificStateDetailsSuccessView = () => {
    const {match} = this.props
    const {params} = match
    const {Specificontent, timelineData} = this.state
    const filterData1 = Specificontent.filter(
      each => each.stateCode === params.stateCode,
    )
    const filterData = filterData1[0]
    const {stateCode} = timelineData
    const {districts} = stateCode

    return (
      <>
        <div className="state-name-container">
          <div>
            <p>{filterData.name}</p>
            <p>Last update on march 28th 2021.</p>
          </div>
          <div>
            <p>Tested</p>
            <p>{filterData.tested}</p>
          </div>
        </div>
        <div className="specific-state-container">
          <div className="main-4-details-container">
            <div
              data-testid="stateSpecificConfirmedCasesContainer"
              className="confirmed-container confirmed"
            >
              <p>Confirmed</p>
              <img
                alt="state specific confirmed cases pic"
                className="confirmed-img"
                src="https://tse2.mm.bing.net/th?id=OIP.0AyZ_LX3ogv9r7m8Z_1_JQAAAA&pid=Api&P=0&h=180"
              />
              <p>{filterData.confirmed}</p>
            </div>
            <div
              data-testid="stateSpecificActiveCasesContainer"
              className="confirmed-container active"
            >
              <p>Active</p>
              <img
                alt="state specific active cases pic"
                className="confirmed-img"
                src="https://tse1.mm.bing.net/th?id=OIP.C3O7__xTwpPgjROLxkdWZwHaHa&pid=Api&P=0&h=180"
              />
              <p>{filterData.active}</p>
            </div>
            <div
              data-testid="stateSpecificRecoveredCasesContainer"
              className="confirmed-container recovered"
            >
              <p>Recovered</p>
              <img
                className="confirmed-img"
                alt="state specific recovered cases pic"
                src="https://tse4.mm.bing.net/th?id=OIP.I37cCSePi-Si_x8-pZiIAQHaHa&pid=Api&P=0&h=180"
              />
              <p>{filterData.recovered}</p>
            </div>
            <div
              data-testid="stateSpecificDeceasedCasesContainer"
              className="confirmed-container"
            >
              <p>Deceased</p>
              <img
                className="confirmed-img"
                alt="state specific deceased cases pic"
                src="https://tse4.mm.bing.net/th?id=OIP.EhfnJaDqTZmHbhMu5ynm9AHaHa&pid=Api&P=0&h=180"
              />
              <p>{filterData.deceased}</p>
            </div>
          </div>
        </div>
        <div className="districts-container">
          <h1>Top Districts</h1>
          <ul>hi</ul>
        </div>
      </>
    )
  }

  SpecificStateLoadingView = () => (
    <div className="loader-container">
      <div data-testid="stateDetailsLoader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  renderSpecificStateDetails = () => {
    const {specifiStateapiStatus} = this.state
    switch (specifiStateapiStatus) {
      case 'Loading':
        return this.SpecificStateLoadingView()
      case 'success':
        return this.renderSpecificStateDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderSpecificStateDetails()}
        <Footer />
      </div>
    )
  }
}

export default StateSpecific
