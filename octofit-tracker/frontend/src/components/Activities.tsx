import { useEffect, useState } from 'react'
import { buildEndpoint, normalizeResponse } from '../api'

interface Activity {
  _id: string
  userId: string
  type: string
  durationMinutes: number
  distanceKm?: number
  caloriesBurned: number
  date?: string
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = buildEndpoint('activities')

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setActivities(normalizeResponse<Activity>(data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load activities')
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      <ul className="resource-list">
        {activities.map((activity) => (
          <li key={activity._id}>
            <strong>{activity.type}</strong>
            <p>Duration: {activity.durationMinutes} minutes</p>
            {activity.distanceKm != null && <p>Distance: {activity.distanceKm} km</p>}
            <p>Calories: {activity.caloriesBurned}</p>
            {activity.date && <p>Date: {new Date(activity.date).toLocaleDateString()}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
