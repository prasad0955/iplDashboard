import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {item} = props
  const {teamImageUrl, id, name} = item
  return (
    <li>
      <Link className="team-card-container" to={`/team-matches/${id}`}>
        <img
          src={teamImageUrl}
          alt={name}
          className="team-card-image-dimensions"
        />
        <p className="name-heading">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard
