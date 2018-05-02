import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as wodAPI from "./utils/wodAPI";
import Header from './components/Header';
import { Card } from 'react-materialize';
import ListWorkouts from './components/ListWorkouts';
import ManageWorkout from './components/ManageWorkout';
import StartWorkout from "./components/StartWorkout";
import FooterComp from './components/Footer';
import * as utils from './utils/utils';
import WorkoutHistory from './components/WorkoutHistory';

class App extends Component {

  state = {
      workouts: [],
      history: []
    }

  componentDidMount(){
    wodAPI.getAll().then((workouts) => {
      const workoutsList = utils.convertObjectoToArray(workouts);
      this.setState({ workouts: workoutsList });
    })
  }
  createWorkout = workout => {
    wodAPI.create(workout).then(w =>{
      this.setState(state => ({
        workouts: state.workouts.concat(w)
      }))
    })
  }

  updateWorkout = workout => {
    wodAPI.update(workout).then(workouts =>{
      this.setState(state => ({
        workouts: utils.convertObjectoToArray(workouts)
      }))
    })
  }

  addLogs = workout => {
    wodAPI.addLogs(workout).then(histories => {
      this.setState({
        history: histories
      })
    })
  }

  deleteWorkout = workout => {
    this.setState( state => ({
      workouts: this.state.workouts.filter((w) => w.id !== workout.id)
    }))
    wodAPI.remove(workout);
  }

  render() {
    const { workouts, history } = this.state;
    return (
      <div className="App">
        <Header />
        <Route exact path="/" render={() => (
          <div>
            <div>
              <Card className="main-banner">
                <h3 className="main-title">Work of the day</h3>
              </Card>
              <br/>
              <ListWorkouts
                workouts={workouts}
                onEditWorkout={this.editWorkout}
                onDeleteWorkout={this.deleteWorkout}
                />
              <br />
            </div>

          </div>
        )}/>
      <Route exact path="/workout/" render={({history}) => (
          <ManageWorkout
            onUpdateWorkout={ workout => {
              this.updateWorkout(workout);
              history.push(`/workout/${workout.id}`)
            }}
            onCreateWorkout={ workout => {
              this.createWorkout(workout)
              history.push(`/workout/${workout.id}`)
            }}
          />
        )} />
      <Route exact path="/workout/:id"
        render={(props) => (
          <ManageWorkout
            {...props}
            onUpdateWorkout={(workout) => {
              this.updateWorkout(workout);
            }}
          />
        )} />
      <Route exact path="/startworkout/:id"
        render={(props) => (
          <StartWorkout
            {...props}
            addingLog={(workout) => {
              this.addLogs(workout);
            }}
          />
        )}
      />
    <Route exact path="/workout-history"
      render={ () => (
        <WorkoutHistory
          history={history}
        />
      )}
    />

    <FooterComp />
    </div>
    );
  }
}

export default App;
