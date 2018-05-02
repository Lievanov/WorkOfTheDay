import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

import '../css/App.css';

class ListWorkouts extends Component {

  calculateTime = workout => {
    let result = 0;
    if(workout.exercises !== undefined)
      workout.exercises.forEach(exercise => {
        result += parseInt(exercise.time,10);
      })
    result += (workout.laps - 1) * workout.rest;
    return Math.floor(result/60);
  }

  render(){
      const { workouts } = this.props;
      return (
          <div>
              <table className="main-table">
                  <thead>
                      <tr>
                          <th>WOD Name</th>
                          <th>Laps</th>
                          <th>Expected time</th>
                          <th>Edit</th>
                      </tr>
                  </thead>
                  <tbody>
                      { workouts.map(workout => (
                          <tr key={workout.id}>
                              <td><Link to={`/startworkout/${workout.id}`}><h5>{workout.name}</h5></Link></td>
                              <td>{workout.laps}</td>
                              <td>{this.calculateTime(workout)} minutes</td>
                              <td><Link to={`/workout/${workout.id}`}><Icon>edit</Icon></Link></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )
  }
}

export default ListWorkouts;
