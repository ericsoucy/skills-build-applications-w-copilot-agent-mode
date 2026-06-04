import { useEffect, useState } from 'react'
import { buildEndpoint, normalizeResponse } from '../api'

interface LeaderboardEntry {
  _id: string
  userId: string
  name: string
  score: number
  rank: number
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = buildEndpoint('leaderboard')

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEntries(normalizeResponse<LeaderboardEntry>(data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load leaderboard')
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      <ol className="resource-list leaderboard-list">
        {entries.map((entry) => (
          <li key={entry._id}>
            <span className="leader-name">{entry.name}</span>
            <span className="leader-score">{entry.score} pts</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
