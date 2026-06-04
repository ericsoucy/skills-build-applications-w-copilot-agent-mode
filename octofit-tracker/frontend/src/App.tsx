import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { API_HOST } from './api'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const isPreviewHost = typeof window !== 'undefined' && window.location.hostname.endsWith('.app.github.dev')
const fallbackMessage = codespaceName
  ? 'Codespaces environment detected.'
  : isPreviewHost
  ? 'Preview host detected; using derived backend URL.'
  : 'VITE_CODESPACE_NAME is not set; using localhost fallback.'

function App() {
  const apiHost = API_HOST
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Octofit Tracker</h1>
        <p className="api-note">
          Using API host: <code>{apiHost}</code>
        </p>
        <p className="env-warning">{fallbackMessage}</p>
        <nav className="app-nav">
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
