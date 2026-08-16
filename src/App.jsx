import { useState } from 'react'
import './App.css'

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹8–12 LPA',
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'React Developer',
    company: 'CloudWorks',
    location: 'Chennai, India',
    type: 'Full-time',
    salary: '₹6–10 LPA',
    posted: '3 days ago',
  },
  {
    id: 3,
    title: 'Junior Software Engineer',
    company: 'InnovateLabs',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹5–8 LPA',
    posted: '5 days ago',
  },
  {
    id: 4,
    title: 'UI Developer',
    company: 'DesignHub',
    location: 'Remote',
    type: 'Remote',
    salary: '₹7–11 LPA',
    posted: '1 week ago',
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [savedJobs, setSavedJobs] = useState([])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      location === '' ||
      job.location.toLowerCase().includes(location.toLowerCase())

    return matchesSearch && matchesLocation
  })

  const toggleSave = (id) => {
    setSavedJobs((current) =>
      current.includes(id)
        ? current.filter((jobId) => jobId !== id)
        : [...current, id],
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">J</span>
          <span>JobTrack</span>
        </div>

        <nav>
          <a href="#jobs">Find Jobs</a>
          <a href="#saved">Saved Jobs</a>
          <a href="#about">About</a>
        </nav>

        <button className="profile-button">My Profile</button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="badge">🚀 Find your next opportunity</span>

            <h1>
              Find a job you
              <span> actually want.</span>
            </h1>

            <p>
              Search thousands of jobs and keep track of the opportunities
              that matter to you.
            </p>

            <div className="search-box">
              <div className="search-field">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Job title, skills or company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="search-field location-field">
                <span>📍</span>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <button className="search-button">Search Jobs</button>
            </div>
          </div>
        </section>

        <section className="stats">
          <div>
            <strong>10,000+</strong>
            <span>Jobs available</span>
          </div>
          <div>
            <strong>2,500+</strong>
            <span>Companies</span>
          </div>
          <div>
            <strong>5,000+</strong>
            <span>Job seekers</span>
          </div>
        </section>

        <section className="jobs-section" id="jobs">
          <div className="section-heading">
            <div>
              <h2>Latest job opportunities</h2>
              <p>Discover roles that match your career goals.</p>
            </div>

            <select>
              <option>Sort: Most Recent</option>
              <option>Salary: High to Low</option>
              <option>Salary: Low to High</option>
            </select>
          </div>

          <div className="job-layout">
            <aside className="filters">
              <h3>Filters</h3>

              <label>Job Type</label>
              <div className="check">
                <input type="checkbox" /> Full-time
              </div>
              <div className="check">
                <input type="checkbox" /> Part-time
              </div>
              <div className="check">
                <input type="checkbox" /> Remote
              </div>

              <label>Experience</label>
              <div className="check">
                <input type="checkbox" /> Entry level
              </div>
              <div className="check">
                <input type="checkbox" /> Mid level
              </div>

              <label>Salary</label>
              <div className="check">
                <input type="checkbox" /> ₹5–10 LPA
              </div>
              <div className="check">
                <input type="checkbox" /> ₹10+ LPA
              </div>
            </aside>

            <div className="job-list">
              {filteredJobs.length === 0 ? (
                <div className="no-results">
                  <h3>No jobs found</h3>
                  <p>Try changing your search or location.</p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <article className="job-card" key={job.id}>
                    <div className="company-logo">
                      {job.company.charAt(0)}
                    </div>

                    <div className="job-info">
                      <div className="job-title-row">
                        <div>
                          <h3>{job.title}</h3>
                          <p className="company">{job.company}</p>
                        </div>

                        <button
                          className={`save-button ${
                            savedJobs.includes(job.id) ? 'saved' : ''
                          }`}
                          onClick={() => toggleSave(job.id)}
                          title="Save job"
                        >
                          {savedJobs.includes(job.id) ? '♥' : '♡'}
                        </button>
                      </div>

                      <div className="job-details">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>💰 {job.salary}</span>
                      </div>

                      <div className="job-footer">
                        <span className="posted">{job.posted}</span>
                        <button className="apply-button">View Job</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="cta" id="saved">
          <div>
            <h2>Keep your job search organized.</h2>
            <p>
              Save interesting jobs and come back to them whenever you're
              ready.
            </p>
          </div>

          <div className="saved-count">
            <strong>{savedJobs.length}</strong>
            <span>Saved Jobs</span>
          </div>
        </section>
      </main>

      <footer id="about">
        <div className="logo">
          <span className="logo-icon">J</span>
          <span>JobTrack</span>
        </div>
        <p>Track your opportunities. Build your career.</p>
        <span>© 2026 JobTrack</span>
      </footer>
    </div>
  )
}

export default App
