import React, { Component } from 'react';
import dateFormat from 'dateformat';

class WorkoutHistory extends Component {

  render () {
    const { history } = this.props;
    return (
      <div>
        <h3>Workout History</h3><br/><br/>
        <table className="main-table">
          <thead>
            <tr>
              <th>Wod Name</th>
              <th>When</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { history.map(workout => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                  <td>{dateFormat(workout.date)}</td>
                  <td>{workout.status}</td>
                </tr>
            ))}
          </tbody>
        </table>
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    );
  }
}

export default WorkoutHistory;
