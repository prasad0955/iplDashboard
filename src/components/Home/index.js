import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.getFetchDetails()
  }

  getFetchDetails = async () => {
    const data = await fetch('https://apis.ccbp.in/ipl')
    const response = await data.json()
    const {teams} = response
    const updatedTeams = teams.map(item => ({
      name: item.name,
      id: item.id,
      teamImageUrl: item.team_image_url,
    }))
    this.setState({teams: updatedTeams, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    return (
      <div className="home-container">
        {isLoading ? (
          <Loader test-id="loader" type="Oval" color="#ffffff" height={50} />
        ) : (
          <div className="home-bg-container">
            <div className="home-heading-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="cricket-logo-dimensions"
              />
              <h1 className="ipl-heading">IPL Dashboard</h1>
            </div>
            <ul className="teamcard-component-containner">
              {teams.map(item => (
                <TeamCard item={item} key={item.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default Home
