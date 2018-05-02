import React, { Component } from 'react';

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
                  <td>{workout.date}</td>
                  <td>{workout.date}</td>
                  <td>{workout.status}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WorkoutHistory;
