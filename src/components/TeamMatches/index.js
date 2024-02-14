import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: '',
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getFetchData()
  }

  getFetchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const fetchdata = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const response = await fetchdata.json()
    const updatedteamBannerUrl = response.team_banner_url
    const updatedlatestMatchDetails = {
      umpires: response.latest_match_details.umpires,
      result: response.latest_match_details.result,
      manOfTheMatch: response.latest_match_details.man_of_the_match,
      id: response.latest_match_details.id,
      date: response.latest_match_details.date,
      venue: response.latest_match_details.venue,
      competingTeam: response.latest_match_details.competing_team,
      competingTeamLogo: response.latest_match_details.competing_team_logo,
      firstInnings: response.latest_match_details.first_innings,
      secondInnings: response.latest_match_details.second_innings,
      matchStatus: response.latest_match_details.match_status,
    }
    const updatedrecentMatches = response.recent_matches.map(item => ({
      umpires: item.umpires,
      result: item.result,
      manOfTheMatch: item.man_of_the_match,
      id: item.id,
      date: item.date,
      venue: item.venue,
      competingTeam: item.competing_team,
      competingTeamLogo: item.competing_team_logo,
      firstInnings: item.first_innings,
      secondInnings: item.second_innings,
      matchStatus: item.match_status,
    }))
    this.setState({
      teamBannerUrl: updatedteamBannerUrl,
      latestMatchDetails: updatedlatestMatchDetails,
      recentMatches: updatedrecentMatches,
      isLoading: false,
    })
  }

  render() {
    const {
      teamBannerUrl,
      latestMatchDetails,
      recentMatches,
      isLoading,
    } = this.state
    return (
      <div>
        {isLoading ? (
          <Loader
            test-id="loader"
            type="Oval"
            color="#ffffff"
            height={50}
            width={50}
          />
        ) : (
          <div className="latest-match-details-bg-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="latest-match-details-image-dimensions"
            />
            <p className="latest-para">Latest Matches</p>
            <div>
              <LatestMatch
                latestMatchDetails={latestMatchDetails}
                key={latestMatchDetails.id}
              />
            </div>
            <ul className="recent-match-bg-container">
              {recentMatches.map(item => (
                <MatchCard item={item} key={item.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
