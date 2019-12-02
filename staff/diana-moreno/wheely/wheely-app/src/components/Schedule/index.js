import React from 'react'
import './index.sass'
import Navbar from '../Navbar'
import ScheduleItem from '../Schedule-item'

const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00']

const days = [0,1,2,3,4,5,6]

const C = [
  {
    hours: ['10:00']
  },
  {
    hours: ['12:00']
  },
  {
    hours: ['11:00']
  },
  {
    hours: []
  },
  {
    hours: []
  },
  {
    hours: []
  },
  {
    hours: []
  },
]



export default class Schedule extends React.Component {
  state = {
    horasDisponibles: this.props.horasDisponibles || C
  }

  updateSlot = (day, hour) => {

    console.log('clicked', day, hour)
    // toggle({ day, hour }).then(result => this.setState({
    //   horasDisponibles: result,
    // })
  }

  render() {
    // debugger
    let _state = this.state
    return <>
      <Navbar />
      <section className='schedule'>
        <p>Here you can edit the schedule of: </p>
        <p><b>Paco García</b></p>
        <div className='timetable'>
          <div className="week-names">
            { ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <p>{d}</p>) }
          </div>
          <div className="time-interval">
            { hours.map((hour) => <p>{hour}</p>) }
          </div>
          <form className="content" action="">
            { hours.map(hour => (
                days.map(day =>
                  <ScheduleItem
                    day={day}
                    hour={hour}
                    handleClick={this.updateSlot}
                    checked={_state.horasDisponibles[day].hours.includes(hour)}
                  />
                )
              )
            )
            }
          </form>
        </div>
      </section>
    </>
  }
}
