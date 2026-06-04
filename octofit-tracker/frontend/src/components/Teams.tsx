import { useEffect, useState } from 'react'
import { buildEndpoint, normalizeResponse } from '../api'

interface Team {
  _id: string
  name: string
  description?: string
  memberIds: string[]
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = buildEndpoint('teams')

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTeams(normalizeResponse<Team>(data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load teams')
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      <ul className="resource-list">
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong>
            {team.description && <p>{team.description}</p>}
            <p>Members: {team.memberIds.join(', ')}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
