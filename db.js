const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
    workouts: {
        "dpo3jkp4o": {
          id: "dpo3jkp4o",
          name: "Burpees and Push ups",
          laps: "2",
          rest: '60',
          exercises: [
            {
              id: "asidjals",
              time: '60',
              type: "wu",
              exname: "Stretching up",
              url: "https://www.youtube.com/watch?v=R0mMyV5OtcM",
              exlap: '0'
            },
            {
              id: "asdad312d",
              time: '30',
              type: "wod",
              exname: "Push ups",
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
              time: '60',
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
        },
        "dase23dfv": {
          id: "dase23dfv",
          name: "Monday's Squats",
          laps: "2",
          rest: '60',
          exercises: [
            {
              id: "3231dsea",
              time: '120',
              type: "wu",
              exname: "Legs warm up",
              url: "https://www.youtube.com/watch?v=mDN5DnMkSw4",
              exlap: '0'
            },
            {
              id: "asd4fds2",
              time: '30',
              type: "wod",
              exname: "Effective squat",
              url: "https://www.youtube.com/watch?v=mGvzVjuY8SY",
              exlap: '1'
            },
            {
              id: "asdfgty4",
              time: '5',
              type: "rest",
              exname: "rest",
              url:"",
              exlap: '1'
            },
            {
              id: "cer4543d",
              time: '120',
              type: "wod",
              exname: "Bulgarian Split Squat",
              url: "https://www.youtube.com/watch?v=2C-uNgKwPLE",
              exlap: '2'
            },
            {
              id: "casd4t5u6",
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
