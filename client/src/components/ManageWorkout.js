import React, { Component } from 'react';
import * as wodAPI from '../utils/wodAPI';
import ListExercise from './ListExercise';
import { Row, Col, Input, Button, Card } from 'react-materialize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ManageWorkout extends Component {

  state = {
    exercises: [],
    id: '',
    name: '',
    laps: '',
    rest: '',
    type: '',
    time: '',
    exrest: '',
    exname: '',
    url: '',
    exlap: ''
  }

  componentDidMount(){
    if(this.props.match !== undefined){
      const { match: {params} } = this.props;
      if(Object.keys(params).length !== 0)
      wodAPI.getAll().then(workouts => {
        const w = workouts[params.id];
        console.log(w);
        this.setState({ id: w.id, name: w.name, laps: w.laps, rest: w.rest, exercises: w.exercises })
      })
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  AvailableLaps = () => {
    let items = [];
    const { laps } = this.state;
    if(laps === undefined) return '';
    for (let i = 1; i <= parseInt(laps, 10) ; i++) {
        items.push(<option key={i} value={i}>{i}</option>);
    }
    return items;
  }

  deleteExercise = async (exerciseId) => {
    const { id, name, laps, rest, exercises } = this.state;
    await this.setState({ exercises: exercises.filter(e => e.id !== exerciseId) })
    const workout = {
      id, name, laps, rest, exercises: exercises.filter(e => e.id !== exerciseId)
    }
    console.log(workout)
    this.props.onUpdateWorkout(workout);
  }

  validations = (error) => {
    toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  AddExercise = async () => {
    const { id, name, laps, rest, exercises, type, time, exrest, exname, url, exlap } = this.state;
    let newId = "", newWorkout = false;
    if(name === ""){
      this.validations("Please, add a name !");
      return;
    } else if (parseInt(laps, 0) < 1 || laps === ""){
      this.validations("Laps must be higher than 0 !");
      return;
    } else if (rest === ""){
      this.validations("Rest between laps must have a value !");
      return;
    } else if(type === "") {
      this.validations("Please, choose between Warm up or Work of the Day !");
      return;
    } else if(exname === "") {
      this.validations("Please, add a name in your exercise !");
      return;
    } else if(time === "" && parseInt(time, 10) > 0) {
      this.validations("Exercise time must be higher than 0 !");
      return;
    } else if(exrest === "" && parseInt(exrest, 10) > -1) {
      this.validations("Exercise rest must be a number !");
      return;
    }
    if(id === ""){
      newId = Math.random().toString(36).substr(-8);
      await this.setState({id: newId })
      newWorkout=true;
    } else {
      newId = id
    }

    const exerciseList = exercises || [];
    const newExercise = {
      id: Math.random().toString(36).substr(-8),
      type,
      time,
      exname,
      url,
      exlap: type === "wod" ? exlap : "0"
    }
    exerciseList.push(newExercise);
    if(parseInt(exrest, 10) > 0){
      const  restExercise = {
        id: Math.random().toString(36).substr(-8),
        type: 'rest',
        time: exrest,
        exname: 'rest',
        exlap: type === "wod" ? exlap : "0",
        url: ""
      }
      exerciseList.push(restExercise);
    }

    await this.setState(prevState => ({
      exercises: exerciseList
    }))
    this.setState({
      time: "0", exrest: "0", exname:'', url:'', exlap: ''
    })
    const workout = {
      id: newId, name, laps, rest, exercises
    }
    if(newWorkout){
      this.props.onCreateWorkout(workout);
    } else {
      this.props.onUpdateWorkout(workout);
    }
    toast.success('Workout saved !', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  render(){
    const { id, name, laps, rest, exercises, type, time, exrest, exname, url } = this.state;
    return (
      <div>
        <Card className="workout-banner">
          {( id === '' && <h3>Create Workout</h3>) || <h3>Manage Workout</h3>}
        </Card>
        <Row>
          <Col m={5}>
            <div>
              <form>
                <h4>Workout</h4>
                  <Input m={12} type="text" label="Name*" name="name" placeholder="Workout name" onChange={this.handleChange} value={name} />
                    <Input m={6} type="number" label="Laps*" name="laps" placeholder="Laps" onChange={this.handleChange} value={laps} />
                    <Input m={6} type="number" label="Rest between laps*" name="rest" placeholder="Rest between laps (seg)" onChange={this.handleChange} value={rest} />
                <br/>
                <h4>Exercise</h4>
                <Row>
                  <Input name="type" type='radio' value="wu" label="Warm up" onChange={this.handleChange} />
                  <Input name="type" type='radio' value="wod" label="Work of the Day" onChange={this.handleChange} />
                </Row>

                <Input m={12} type="text" name="exname" label="Name" placeholder="Name" onChange={this.handleChange} value={exname} />
                <Input m={6} type="number" name="time" label="time in seconds" placeholder="Exercise Time(seg)" onChange={this.handleChange} value={time}  />
                <Input m={6} type="number" name="exrest" label="Rest in seconds" placeholder="Rest Time(seg)" onChange={this.handleChange} value={exrest} />
                <Input m={12} type="text" name="url" label="URL Video" placeholder="Youtube URL" onChange={this.handleChange} value={url} />
                {laps > 0 && type === "wod" && <Input m={12} type='select' label='Lap Number' name="exlap" onChange={this.handleChange} >
                    <option key="" value="">Select</option>
                    {this.AvailableLaps()}
                </Input>}<br/>
              <Button m={12} type="button" onClick={this.AddExercise}>Save</Button>
              </form><br/>
            </div>
          </Col>
          <Col m={7}>
            <h4>Exercise List</h4>
            <ListExercise exercises={exercises} laps={laps} onDeleteExercise={this.deleteExercise} />
          </Col>
        </Row>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>)
  }
}

export default ManageWorkout;
