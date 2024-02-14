import './index.css'

const MatchCard = props => {
  const {item} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = item

  const color = matchStatus === 'Won' ? 'green' : 'red'

  return (
    <li className="match-card-item-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo-dimensions"
      />
      <p className="team-heading">{competingTeam}</p>
      <p className="result-para">{result}</p>
      <p className={color}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
