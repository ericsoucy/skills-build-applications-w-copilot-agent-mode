import { useEffect, useState } from 'react'
import { buildEndpoint, normalizeResponse } from '../api'

interface Workout {
  _id: string
  title: string
  description: string
  difficulty: string
  focus: string
  durationMinutes: number
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = buildEndpoint('workouts')

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(normalizeResponse<Workout>(data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load workouts')
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      <ul className="resource-list">
        {workouts.map((workout) => (
          <li key={workout._id}>
            <strong>{workout.title}</strong>
            <p>{workout.description}</p>
            <p>Difficulty: {workout.difficulty}</p>
            <p>Focus: {workout.focus}</p>
            <p>Duration: {workout.durationMinutes} minutes</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
