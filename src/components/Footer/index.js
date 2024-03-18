import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  const a = 'A'
  return (
    <div className="footer-section-container">
      <h1>COVID19INDIA</h1>
      <p>we stand with everyone fighting on the front lines</p>
      <div className="footer-icons-sections">
        <VscGithubAlt />
        <FiInstagram />
        <FaTwitter />
      </div>
    </div>
  )
}

export default Footer
