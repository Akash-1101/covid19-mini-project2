import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {navStatus: false}

  onclickNavIcon = () => {
    this.setState(prevState => ({navStatus: !prevState.navStatus}))
  }

  render() {
    const {navStatus} = this.state
    return (
      <div>
        <div className="header-container">
          <div className="con1">
            <Link to="/" className="main-heading">
              COVID19INDIA
            </Link>
            <img
              onClick={this.onclickNavIcon}
              className="nav-img"
              src="https://res.cloudinary.com/donspddar/image/upload/v1710387947/add-to-queue_1_qcj93l.png"
            />
            <div className="lg-screen-nav">
              <ul className="nav-bar-items">
                <Link to="/">
                  <li className="list-item1">Home</li>
                </Link>
                <Link to="/about">
                  <li className="list-item1">About</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        {navStatus ? (
          <div className="nav-items-main-container">
            <ul className="nav-bar-items">
              <Link to="/">
                <li className="list-item1">Home</li>
              </Link>
              <Link to="/about">
                <li className="list-item1">About</li>
              </Link>
              <li onClick={this.onclickNavIcon} className="nav-close-btn">
                X{' '}
              </li>
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Header
