import { useEffect, useState } from 'react'
import { buildEndpoint, normalizeResponse } from '../api'

interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  joinedAt?: string
}

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = buildEndpoint('users')

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers(normalizeResponse<User>(data))
        setLoading(false)
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load users')
        setLoading(false)
      })
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      <ul className="resource-list">
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
            {user.avatar && <img src={user.avatar} alt={`${user.name} avatar`} />}
            {user.joinedAt && <p>Joined at {new Date(user.joinedAt).toLocaleDateString()}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
