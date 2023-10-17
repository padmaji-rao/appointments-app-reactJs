import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isActive: false,
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const appointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointment],
      title: '', // Reset the title to an empty string
      date: '',
    }))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onStarClicked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onStarred = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  render() {
    const {appointmentList, title, date, isActive} = this.state
    console.log(appointmentList, title, date)
    let resList = null
    let bgColor = null
    if (isActive) {
      resList = appointmentList.filter(each => each.isStarred === true)
      bgColor = 'pink-bg'
    } else {
      resList = appointmentList
      bgColor = null
    }
    return (
      <div className="bg-container">
        <div className="top-outer-container">
          <div className="main-container">
            <div className="left-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onFormSubmit}>
                <div className="title-container">
                  <label htmlFor="title">TITLE</label>
                  <input
                    onChange={this.onTitleChange}
                    id="title"
                    className="title-input"
                  />
                </div>
                <div className="title-container">
                  <label htmlFor="date">DATE</label>
                  <input
                    onChange={this.onDateChange}
                    id="date"
                    type="date"
                    className="date-input"
                  />
                </div>
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="right-pic"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="bottom-container">
            <div className="appoint-container">
              <h1>Appointments</h1>
              <button
                onClick={this.onStarred}
                className={`starred-button ${bgColor}`}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="cards-container">
              {resList.map(each => (
                <AppointmentItem
                  onStarClicked={this.onStarClicked}
                  key={each.id}
                  details={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
