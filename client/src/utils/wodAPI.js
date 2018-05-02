//const api = 'http://wod-db.lievanov.c9users.io'
const api = 'http://localhost:5000'

let token = localStorage.token

if(!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/workouts`, { headers })
    .then(res => res.json())
    .then(data => data.workouts)

export const create = (body) =>
  fetch(`${api}/workouts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const update = (body) =>
  fetch(`${api}/workouts/${body.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const remove = (workout) =>
  fetch(`${api}/workouts/${workout.id}`, { method: 'DELETE', headers})
    .then(res => res.json())
    .then(data => data.workout)
