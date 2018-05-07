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
    wodAPI.getLogs().then((logs) => {
      const LogHistory = utils.convertObjectoToArray(logs);
      this.setState({ history: LogHistory });
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

  addLogs = (workout, logId, status) => {
    wodAPI.addLogs(workout, logId, status).then(log => {
      if(status === "Incomplete"){
        this.setState(state => ({
          history: state.history.concat([log])
        }))
      } else if (status === "Complete"){
        wodAPI.getLogs().then((logs) => {
          const LogHistory = utils.convertObjectoToArray(logs);
          this.setState({ history: LogHistory });
        })
      }
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
        <Header history={history}/>
        <Route exact path="/" render={() => (
          <div>
            <div>
              <Card className="main-banner">
              </Card>
              <br/>
              <ListWorkouts
                workouts={workouts}
                onEditWorkout={this.editWorkout}
                onDeleteWorkout={this.deleteWorkout}
                />
              <br /><br /><br /><br /><br /><br />

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
            addingLog={(workout, logId, status) => {
              this.addLogs(workout, logId, status);
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
