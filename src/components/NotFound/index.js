import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="bg-nt-found-main-container">
    <div className="notfound-container">
      <img
        src="https://res.cloudinary.com/donspddar/image/upload/v1710395209/Group_7485_fhcd7o.png"
        alt="not-found-pic"
      />
      <h1>PAGE NOT FOUND</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button className="Home-btn">Home</button>
      </Link>
    </div>
  </div>
)

export default NotFound
