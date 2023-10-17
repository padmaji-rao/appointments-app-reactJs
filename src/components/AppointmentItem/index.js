import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {details, onStarClicked} = props
  const {title, id, date, isStarred} = details
  console.log(title, id, date, isStarred)
  const modDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarClick = () => {
    onStarClicked(id)
  }
  return (
    <li className="card-container">
      <div className="card-title-cotainer">
        <p>{title}</p>
        <button
          onClick={onStarClick}
          type="button"
          data-testid="star"
          className="star-button"
        >
          <img src={starUrl} alt="star" />
        </button>
      </div>
      <p>{`Date: ${modDate}`}</p>
    </li>
  )
}

export default AppointmentItem
