const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
    workouts: [
        {
          id: "123i2pjo",
          name: "Arm and chest",
          laps: 2,
          time: "30"
        },
        {
          id: "podakp3",
          name: "Insanity",
          laps: 10,
          time: "45"
        },
        {
          id: "dpo3jkp4o",
          name: "Crossfit (Complete)",
          laps: "2",
          rest: '120',
          exercises: [
            {
              id: "asidjals",
              time: '120',
              type: "wu",
              exname: "Warm up",
              url: "R0mMyV5OtcM",
              exlap: '0'
            },
            {
              id: "asdad312d",
              time: '30',
              type: "wod",
              exname: "Push up",
              url: "IODxDxX7oi4",
              exlap: '1'
            },
            {
              id: "asdc43",
              time: '5',
              type: "rest",
              exname: "rest",
              exlap: '1'
            },
            {
              id: "d12d43v",
              time: '30',
              type: "wod",
              exname: "Burpees",
              url: "Uy2nUNX38xE",
              exlap: '2'
            },
            {
              id: "dsf346b",
              time: '5',
              type: "rest",
              exname: "rest",
              exlap: '2'
            }
          ]
        }

    ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

const add = (token, workout) => {
  if (!workout.id) {
    workout.id = Math.random().toString(36).substr(-8)
  }
  get(token).workouts.push(workout)
  return workout
}

const update = async (token, workout) => {
  const data = get(token);
   const currentWorkout = await data.workouts.find(w => w.id === workout.id );
  if(currentWorkout){
    data.workouts = await data.workouts.filter(w => w.id !== workout.id);
  }
  data.workouts.push(workout);
  console.log(JSON.stringify(data.workouts));
  return workout
}

module.exports = {
  get,
  add,
  update
}
