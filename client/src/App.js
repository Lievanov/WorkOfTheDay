import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as wodAPI from "./utils/wodAPI";
import Header from './components/Header';
import { Card } from 'react-materialize';
import ListWorkouts from './components/ListWorkouts';
import ManageWorkout from './components/ManageWorkout';
import StartWorkout from "./components/StartWorkout";
import FooterComp from './components/Footer';

class App extends Component {

  state = {
      workouts: [],
      workout: {}
    }

  componentDidMount(){
    wodAPI.getAll().then((workouts) => {
      this.setState({ workouts });
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
    wodAPI.update(workout)
  }

  deleteWorkout = workout => {
    this.setState( state => ({
      workouts: this.state.workouts.filter((w) => w.id !== workout.id)
    }))
    wodAPI.remove(workout);
  }

  render() {
    const { workouts } = this.state;
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
            }}
            onCreateWorkout={ async workout => {
              this.createWorkout(workout)
              history.push(`/`)
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
        component={StartWorkout}
      />
    <FooterComp />
    </div>
    );
  }
}

export default App;
