const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
    workouts: {
        "dpo3jkp4o": {
          id: "dpo3jkp4o",
          name: "Crossfit (Complete)",
          laps: "2",
          rest: '10',
          exercises: [
            {
              id: "asidjals",
              time: '5',
              type: "wu",
              exname: "Warm up",
              url: "https://www.youtube.com/watch?v=R0mMyV5OtcM",
              exlap: '0'
            },
            {
              id: "asdad312d",
              time: '5',
              type: "wod",
              exname: "Push up",
              url: "https://www.youtube.com/watch?v=IODxDxX7oi4",
              exlap: '1'
            },
            {
              id: "asdc43",
              time: '5',
              type: "rest",
              exname: "rest",
              url:"",
              exlap: '1'
            },
            {
              id: "d12d43v",
              time: '5',
              type: "wod",
              exname: "Burpees",
              url: "https://www.youtube.com/watch?v=Uy2nUNX38xE",
              exlap: '2'
            },
            {
              id: "dsf346b",
              time: '5',
              type: "rest",
              exname: "rest",
              url:"",
              exlap: '2'
            }
          ]
        }
    },
    logs: [

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
  db[token].workouts[workout.id] = {
    id: workout.id,
    name: workout.name,
    laps: workout.laps,
    rest: workout.rest,
    exercises: workout.exercises
  }
  return db[token].workouts[workout.id]
}

const update = (token, workout) => {
  db[token].workouts[workout.id] = {
    id: workout.id,
    name: workout.name,
    laps: workout.laps,
    rest: workout.rest,
    exercises: workout.exercises
  }
  return db[token].workouts;
}

const addLog = (token, id) => {
  db[token].logs.push(
    {
      id: Math.random().toString(36).substr(-8),
      name: db[token].workouts[id].name,
      date: Date.now(),
      status: "Incomplete"
    }
  )
  return db[token].logs;
}

module.exports = {
  get,
  add,
  update,
  addLog
}
