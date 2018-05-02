import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

class ListExercise extends Component {

  LapsTables(){
    const { exercises, laps, onDeleteExercise } = this.props;
    let items = [];
    if(exercises === undefined)
      return (<h4>Add a new exercise</h4>);
    for(let i = 0; i<=parseInt(laps, 10); i++){
      const exercisesByLap = exercises.filter(e => parseInt(e.exlap, 10) === i);
      if(exercisesByLap.length === 0) continue;
      items.push(
        <div key={Math.random().toString(36).substr(-8)}>
          <table className="main-table">
              <thead>
                  <tr>
                      <th>Exercise name</th>
                      {i!==0 && <th>Lap number</th> }
                      <th>Time</th>
                      <th>Video</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                {exercisesByLap.map(e => (
                  <tr key={e.id}>
                    <td>{e.exname}</td>
                    {i!==0 && <td>{e.exlap}</td> }
                    <td>{e.time} segs</td>
                    <td><a href={`${e.url}`} target="_blank"><Icon small >video_library</Icon></a></td>
                    <td><Button type="button" onClick={() => onDeleteExercise(e.id)}><Icon>delete_forever</Icon></Button></td>
                  </tr>
                ))}
              </tbody>
          </table>
          <br/>
        </div>
      );
    }
    return items;
  }

  render(){
    return (
        <div>
          {this.LapsTables()}
        </div>
    )
  }
}

export default ListExercise;
