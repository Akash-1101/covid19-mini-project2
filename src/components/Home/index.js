import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'
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

class Home extends Component {
  state = {HomeapiStatus: 'Initial', Homecontent: [], searchInput: ''}

  componentDidMount() {
    this.getDetails()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    const keyNames = Object.keys(data)

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
    this.setState({HomeapiStatus: 'Loading'})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const listFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod(
        data,
      )

      this.setState({
        HomeapiStatus: 'success',
        Homecontent: listFormattedDataUsingForInMethod,
      })
    } else {
      this.setState({HomeapiStatus: 'failure'})
    }
  }

  HomeLoadingView = () => (
    <div className="loader-container">
      <div testid="homeRouteLoader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  sortInAsc = () => {
    const {Homecontent} = this.state
    const sortedData = [...Homecontent].sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return nameA.localeCompare(nameB)
    })
    this.setState({Homecontent: sortedData})
  }

  sortInDesc = () => {
    const {Homecontent} = this.state
    const sortedData = [...Homecontent].sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      return nameB.localeCompare(nameA)
    })
    this.setState({Homecontent: sortedData})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderDefaultHomePage = () => {
    const {Homecontent} = this.state
    const TotalAllStatesDetails = Homecontent.reduce(
      (acc, stateData) => {
        acc.confirmed1 += stateData.confirmed
        acc.deceased1 += stateData.deceased
        acc.recovered1 += stateData.recovered
        acc.active1 += stateData.active
        return acc
      },
      {confirmed1: 0, deceased1: 0, recovered1: 0, active1: 0},
    )
    return (
      <>
        <div className="main-4-details-container">
          <div
            testid="countryWideConfirmedCases"
            className="confirmed-container confirmed"
          >
            <p>Confirmed</p>
            <img
              alt="country wide confirmed cases pic"
              className="confirmed-img"
              src="https://tse2.mm.bing.net/th?id=OIP.0AyZ_LX3ogv9r7m8Z_1_JQAAAA&pid=Api&P=0&h=180"
            />
            <p>{TotalAllStatesDetails.confirmed1}</p>
          </div>
          <div
            testid="countryWideActiveCases"
            className="confirmed-container active"
          >
            <p>Active</p>
            <img
              alt="country wide active cases pic"
              className="confirmed-img"
              src="https://tse1.mm.bing.net/th?id=OIP.C3O7__xTwpPgjROLxkdWZwHaHa&pid=Api&P=0&h=180"
            />
            <p>{TotalAllStatesDetails.active1}</p>
          </div>
          <div
            testid="countryWideRecoveredCases"
            className="confirmed-container recovered"
          >
            <p>Recovered</p>
            <img
              className="confirmed-img"
              alt="country wide recovered cases pic"
              src="https://tse4.mm.bing.net/th?id=OIP.I37cCSePi-Si_x8-pZiIAQHaHa&pid=Api&P=0&h=180"
            />
            <p>{TotalAllStatesDetails.recovered1}</p>
          </div>
          <div
            testid="countryWideDeceasedCases"
            className="confirmed-container"
          >
            <p>Deceased</p>
            <img
              className="confirmed-img"
              alt="country wide deceased cases pic"
              src="https://tse4.mm.bing.net/th?id=OIP.EhfnJaDqTZmHbhMu5ynm9AHaHa&pid=Api&P=0&h=180"
            />
            <p>{TotalAllStatesDetails.deceased1}</p>
          </div>
        </div>
        <div className="table-container">
          <table testid="stateWiseCovidDataTable">
            <thead>
              <tr>
                <th>
                  <div className="state-heading-column">
                    <p>States/UT</p>
                    <button
                      onClick={this.sortInAsc}
                      className="asc-btn"
                      testid="ascendingSort"
                    >
                      <FcGenericSortingAsc className="asc-icon" />
                    </button>
                    <button
                      onClick={this.sortInDesc}
                      className="asc-btn"
                      testid="descendingSort"
                    >
                      <FcGenericSortingDesc className="asc-icon" />
                    </button>
                  </div>
                </th>
                <th>
                  <p>Confirmed</p>
                </th>
                <th>
                  <p>Active</p>
                </th>
                <th>
                  <p>Recovered</p>
                </th>
                <th>
                  <p>Deceased</p>
                </th>
                <th>
                  <p>Population</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <ul>
                {Homecontent.map(stateData => (
                  <li key={stateData.stateCode}>
                    <tr>
                      <td>{stateData.name}</td>
                      <td className="confirmed">{stateData.confirmed}</td>
                      <td className="active">{stateData.active}</td>
                      <td className="recovered">{stateData.recovered}</td>
                      <td>{stateData.deceased}</td>
                      <td>{stateData.population}</td>
                    </tr>
                  </li>
                ))}
              </ul>
            </tbody>
          </table>
        </div>
      </>
    )
  }

  renderSearchresults = () => {
    const {searchInput} = this.state
    const filteredData = statesList.filter(stateData =>
      stateData.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div>
        <ul testid="searchResultsUnorderedList">
          {filteredData.map(each => (
            <Link
              key={each.stateCode}
              to={`state/${each.state_code}`}
              className="linkEl"
            >
              <li className="search-result-list-item">
                <p>{each.state_name}</p>
                <div className="srli-right-part-container">
                  <p>{each.state_code}</p>
                  <BiChevronRightSquare className="rightsqure-icon" />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderHomePageSuccessView = () => {
    const {searchInput} = this.state

    return (
      <div className="Home-page-main-bg-container">
        <div className="search-container">
          <BsSearch />
          <input
            className="inputElSearch"
            placeholder="Enter the State"
            type="search"
            onChange={this.onSearchInput}
            value={searchInput}
          />
        </div>
        {searchInput === '' ? (
          <>{this.renderDefaultHomePage()}</>
        ) : (
          <>{this.renderSearchresults()}</>
        )}
      </div>
    )
  }

  renderHomePage = () => {
    const {HomeapiStatus} = this.state
    switch (HomeapiStatus) {
      case 'Loading':
        return this.HomeLoadingView()
      case 'success':
        return this.renderHomePageSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderHomePage()}</div>
        <Footer />
      </div>
    )
  }
}

export default Home
