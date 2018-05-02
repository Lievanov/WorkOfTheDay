import React, { Component } from 'react';
import * as wodAPI from "../utils/wodAPI";
import {Row, Col, Button, Icon } from 'react-materialize';
import YouTube from '@u-wave/react-youtube';

class StartWorkout extends Component {

    state = {
      workout: {},
      timer: '',
      counter: 0,
      currentLap: 0,
      clock: 0,
      name: '',
      type: '',
      url: '',
      laps: 0,
      pause: true,
      resume: "Start",
      previousExercise: "",
      nextExercise: "",
      nextLap: 0,
      showVideo: false,
      done: false,
      betweenLap: false,
      ytAutoPlay: true
    }


    async componentDidMount(){
        const { match: {params} } = this.props;

        await wodAPI.getAll().then((workouts) => {
            this.setState({
              workout: workouts[params.id]
            });
        })
        const { exercises } = this.state.workout;
        this.setState({
          name: exercises[0].exname,
          type: exercises[0].type,
          url: exercises[0].url,
          laps: this.state.workout.laps,
          currentLap: exercises[0].exlap,
          clock: exercises[0].time,
          nextExercise: exercises[1].exname || ""
        });

    }

    startExercise = () =>{
      this.interval = setInterval(
        () => this.tick(),
        1000
      );
      this.setState({ pause: false, resume: "Resume", showVideo:true, ytAutoPlay: true });
    }
    stopExercise = () => {
      clearInterval(this.interval);
      this.setState({ pause: true });
    }

    restartExercise = () => {
      clearInterval(this.interval);
      this.setState({ ytAutoPlay: false, previousExercise: "", resume: "Start", pause: true })
      this.componentDidMount();
    }

    async tick(){
      await this.setState(prevState => {
        return {clock: prevState.clock - 1}
      });
      if(this.state.clock === 0){
        if(this.state.nextExercise === ""){
          clearInterval(this.interval);
          this.setState({done: true});
          // add logs
        }else
          await this.exerciseChange();

      }
    }

    componentWillUnmount(){
      clearInterval(this.interval);
    }

    exerciseChange = () => {
      const { exercises } = this.state.workout;
      if(this.state.betweenLap){
        this.setState(prevState => {
           return {
             betweenLap: false,
             clock: this.state.workout.rest,
             ytAutoPlay: false,
           }
        })
      } else {
        this.setState(prevState => {
          return {
            betweenLap: exercises[prevState.counter + 1].exlap > this.state.currentLap ? (this.state.currentLap > 0 ? true : false) : false,
            name: exercises[prevState.counter + 1].exname,
            clock: exercises[prevState.counter + 1].time,
            type: exercises[prevState.counter + 1].type,
            url: exercises[prevState.counter + 1].url,
            currentLap: exercises[prevState.counter + 1].exlap,
            previousExercise: exercises[prevState.counter].exname,
            ytAutoPlay: exercises[prevState.counter].exname === "rest" ? false : true,
            counter: prevState.counter + 1
          }
        })
        if(exercises[this.state.counter+1] !== undefined){
          this.setState(prevState => {return { nextExercise: exercises[prevState.counter + 1].exname }});
        } else {
          this.setState({ nextExercise: '' });
        }
      }
    }

    render(){
      const { workout, currentLap, name, url,
        clock, pause, resume, previousExercise, nextExercise,
        laps, showVideo, betweenLap, ytAutoPlay } = this.state;

        return (
          <div>
          {(this.state.done && <div className="well-done"><h1>Workout complete! Well done!</h1></div>) ||
            <div>
              <Row>
                <Col m={12}><div className="start-workout"><h3>Today's Workout: <div className="workout-title">{workout.name}</div></h3></div></Col>
              </Row>
              <Row>
                <Col m={12}>
                  <div className="line">__________________________________________________________________________</div>
                </Col>
              </Row>
              <Row>
                <Col m={3}>
                  <div className="workout-button">
                    {(pause && <Button onClick={this.startExercise}>{resume} Workout<Icon left small>play_circle_outline</Icon></Button> ) || <Button onClick={this.stopExercise}>Pause Workout<Icon left small>pause_circle_outline</Icon></Button>}
                    <Button className="restart-button" onClick={this.restartExercise}>Restart Workout<Icon left small>stop</Icon></Button>
                  </div>
                </Col>
                <Col m={5}>
                  <div className="video-clock">
                    {(workout.url !== '' && showVideo && <YouTube
                      video={url.split("=")[1]}
                      autoplay={ytAutoPlay}
                      width={400}
                      height={280}
                      controls={false}
                      />) || <div className="no-video"><h5>No video</h5></div>}
                    {betweenLap && <div className="between-laps"><h5>Rest between laps</h5></div>}
                    <h5>Time left: {clock} segs <Icon small>access_time</Icon></h5>
                  </div>
                </Col>
                <Col m={3}>
                  <div className="show-laps">
                    {(currentLap > 0 &&
                      <h5>Current lap:{currentLap}/{laps}</h5>) || <h5>Warm up</h5>
                    }
                  </div>
                  {previousExercise !== "" && <div className="exercise-box"><h5>{previousExercise}</h5></div>}
                  <div className="current-exercise"><h5><Icon>subdirectory_arrow_right</Icon>{name}</h5></div>
                  {nextExercise !== "" && <div className="exercise-box"><h5>{nextExercise}</h5></div>}
                </Col>
              </Row>
            </div>
          }
        </div>
        )
    }
}

export default StartWorkout;
