import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./App.css";


// =====================================================
// JOB DATA
// =====================================================

const jobs = [
  {
    id: 1,
    company: "TCS",
    title: "Software Developer",
    location: "Chennai",
    type: "Full-time",
    experience: "Entry level",
    salary: "₹5-10 LPA",
  },
  {
    id: 2,
    company: "Infosys",
    title: "Java Developer",
    location: "Bangalore",
    type: "Full-time",
    experience: "Mid level",
    salary: "₹10+ LPA",
  },
  {
    id: 3,
    company: "Wipro",
    title: "Frontend Developer",
    location: "Chennai",
    type: "Full-time",
    experience: "Entry level",
    salary: "₹5-10 LPA",
  },
  {
    id: 4,
    company: "Accenture",
    title: "React Developer",
    location: "Hyderabad",
    type: "Full-time",
    experience: "Mid level",
    salary: "₹10+ LPA",
  },
  {
    id: 5,
    company: "Zoho",
    title: "Full Stack Developer",
    location: "Chennai",
    type: "Full-time",
    experience: "Mid level",
    salary: "₹10+ LPA",
  },
  {
    id: 6,
    company: "HCLTech",
    title: "Software Engineer",
    location: "Noida",
    type: "Full-time",
    experience: "Entry level",
    salary: "₹5-10 LPA",
  },
  {
    id: 7,
    company: "Freshworks",
    title: "Frontend Engineer",
    location: "Chennai",
    type: "Remote",
    experience: "Mid level",
    salary: "₹10+ LPA",
  },
  {
    id: 8,
    company: "Cognizant",
    title: "Python Developer",
    location: "Pune",
    type: "Full-time",
    experience: "Entry level",
    salary: "₹5-10 LPA",
  },
  {
    id: 9,
    company: "Capgemini",
    title: "Data Analyst",
    location: "Mumbai",
    type: "Part-time",
    experience: "Entry level",
    salary: "₹5-10 LPA",
  },
  {
    id: 10,
    company: "Microsoft",
    title: "Software Engineer",
    location: "Hyderabad",
    type: "Remote",
    experience: "Mid level",
    salary: "₹10+ LPA",
  },
];


// =====================================================
// LOGIN
// =====================================================

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="login-brand">
          <span>J</span>
          JobTrack
        </div>

        <div className="login-content">

          <p className="login-tag">
            SMART JOB SEARCH MANAGEMENT
          </p>

          <h1>
            Take control of
            <br />
            your job search.
          </h1>

          <p className="login-description">
            Track applications, manage interviews,
            monitor your progress and organize your
            entire job search in one place.
          </p>

          <div className="login-features">

            <div>
              <span>✓</span>
              Track job applications
            </div>

            <div>
              <span>✓</span>
              Manage your interview pipeline
            </div>

            <div>
              <span>✓</span>
              View application analytics
            </div>

          </div>

        </div>

      </div>


      <div className="login-right">

        <div className="login-card">

          <div className="login-icon">
            J
          </div>

          <h2>
            Welcome to JobTrack
          </h2>

          <p>
            Sign in to manage your job applications.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                defaultValue="demo@jobtrack.com"
                required
              />

            </div>


            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                defaultValue="123456"
                required
              />

            </div>


            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  defaultChecked
                />

                Remember me

              </label>

              <span>
                Forgot password?
              </span>

            </div>


            <button
              type="submit"
              className="login-btn"
            >
              Sign In →
            </button>

          </form>


          <p className="demo-text">
            Demo project • Any email/password will work
          </p>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// KANBAN BOARD
// =====================================================

function KanbanBoard({
  applications,
  setApplications,
}) {

  const columns = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
  ];


  const handleDragStart = (e, id) => {

    e.dataTransfer.setData(
      "applicationId",
      id
    );

  };


  const handleDragOver = (e) => {

    e.preventDefault();

  };


  const handleDrop = (e, newStatus) => {

    e.preventDefault();

    const id = Number(
      e.dataTransfer.getData(
        "applicationId"
      )
    );


    const updatedApplications =
      applications.map((application) => {

        if (application.id === id) {

          return {
            ...application,
            status: newStatus,
          };

        }

        return application;

      });


    setApplications(updatedApplications);

  };


  return (

    <div className="kanban-board">

      {columns.map((column) => {

        const columnApplications =
          applications.filter(
            (application) =>
              application.status === column
          );


        return (

          <div
            className="kanban-column"
            key={column}
            onDragOver={handleDragOver}
            onDrop={(e) =>
              handleDrop(e, column)
            }
          >

            <div className="kanban-header">

              <h3>{column}</h3>

              <span>
                {columnApplications.length}
              </span>

            </div>


            <div className="kanban-cards">

              {columnApplications.length > 0 ? (

                columnApplications.map(
                  (application) => (

                    <div
                      className="kanban-card"
                      key={application.id}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(
                          e,
                          application.id
                        )
                      }
                    >

                      <div className="card-top">

                        <h4>
                          {application.company}
                        </h4>

                        <span className="drag-icon">
                          ⋮⋮
                        </span>

                      </div>


                      <p className="job-title">
                        {application.position}
                      </p>


                      <p className="job-location">
                        📍 {application.location}
                      </p>


                      <div className="card-footer">

                        <span>
                          📅 {application.date}
                        </span>

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="empty-column">
                  Drop applications here
                </div>

              )}

            </div>

          </div>

        );

      })}

    </div>

  );
}


// =====================================================
// ANALYTICS
// =====================================================

function Analytics({ applications }) {

  const totalApplications =
    applications.length;


  const applied =
    applications.filter(
      (app) => app.status === "Applied"
    ).length;


  const interviews =
    applications.filter(
      (app) => app.status === "Interview"
    ).length;


  const offers =
    applications.filter(
      (app) => app.status === "Offer"
    ).length;


  const rejected =
    applications.filter(
      (app) => app.status === "Rejected"
    ).length;


  const interviewRate =
    totalApplications > 0
      ? (
          (interviews /
            totalApplications) *
          100
        ).toFixed(1)
      : 0;


  const offerRate =
    totalApplications > 0
      ? (
          (offers /
            totalApplications) *
          100
        ).toFixed(1)
      : 0;


  const rejectionRate =
    totalApplications > 0
      ? (
          (rejected /
            totalApplications) *
          100
        ).toFixed(1)
      : 0;


  const statusData = [
    {
      name: "Applied",
      value: applied,
    },
    {
      name: "Interview",
      value: interviews,
    },
    {
      name: "Offer",
      value: offers,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];


  const companyCounts = {};


  applications.forEach((app) => {

    companyCounts[app.company] =
      (companyCounts[app.company] || 0) + 1;

  });


  const companyData =
    Object.entries(companyCounts).map(
      ([company, count]) => ({
        company,
        applications: count,
      })
    );


  return (

    <div className="analytics">

      {/* Summary Cards */}

      <section className="analytics-stats">

        <div className="analytics-card">

          <span>📋</span>

          <div>

            <p>Total Applications</p>

            <h2>
              {totalApplications}
            </h2>

          </div>

        </div>


        <div className="analytics-card">

          <span>🎯</span>

          <div>

            <p>Interview Rate</p>

            <h2>
              {interviewRate}%
            </h2>

          </div>

        </div>


        <div className="analytics-card">

          <span>🏆</span>

          <div>

            <p>Offer Rate</p>

            <h2>
              {offerRate}%
            </h2>

          </div>

        </div>


        <div className="analytics-card">

          <span>❌</span>

          <div>

            <p>Rejection Rate</p>

            <h2>
              {rejectionRate}%
            </h2>

          </div>

        </div>

      </section>


      {/* Charts */}

      <section className="charts-grid">

        {/* Pie Chart */}

        <div className="chart-card">

          <div className="chart-header">

            <h2>
              Applications by Status
            </h2>

            <p>
              Current application pipeline
            </p>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >

                  <Cell />
                  <Cell />
                  <Cell />
                  <Cell />

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Bar Chart */}

        <div className="chart-card">

          <div className="chart-header">

            <h2>
              Applications by Company
            </h2>

            <p>
              Companies you've applied to
            </p>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={companyData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="company"
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>


      {/* Breakdown */}

      <section className="breakdown-card">

        <div className="chart-header">

          <h2>
            Application Breakdown
          </h2>

          <p>
            Detailed view of your applications
          </p>

        </div>


        <div className="breakdown-grid">

          <div className="breakdown-item">

            <span className="breakdown-dot applied-dot"></span>

            <div>

              <strong>
                Applied
              </strong>

              <p>
                {applied} applications
              </p>

            </div>

            <strong>
              {totalApplications > 0
                ? (
                    (applied /
                      totalApplications) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </strong>

          </div>


          <div className="breakdown-item">

            <span className="breakdown-dot interview-dot"></span>

            <div>

              <strong>
                Interview
              </strong>

              <p>
                {interviews} applications
              </p>

            </div>

            <strong>
              {interviewRate}%
            </strong>

          </div>


          <div className="breakdown-item">

            <span className="breakdown-dot offer-dot"></span>

            <div>

              <strong>
                Offer
              </strong>

              <p>
                {offers} applications
              </p>

            </div>

            <strong>
              {offerRate}%
            </strong>

          </div>


          <div className="breakdown-item">

            <span className="breakdown-dot rejected-dot"></span>

            <div>

              <strong>
                Rejected
              </strong>

              <p>
                {rejected} applications
              </p>

            </div>

            <strong>
              {rejectionRate}%
            </strong>

          </div>

        </div>

      </section>

    </div>

  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);


  const [search, setSearch] =
    useState("");


  const [location, setLocation] =
    useState("");


  const [savedJobs, setSavedJobs] =
    useState([]);


  const [activePage, setActivePage] =
    useState("jobs");


  const [applications, setApplications] =
    useState([
      {
        id: 1,
        company: "TCS",
        position: "Software Developer",
        location: "Chennai",
        date: "25 Sep 2026",
        status: "Applied",
      },
      {
        id: 2,
        company: "Infosys",
        position: "Java Developer",
        location: "Bangalore",
        date: "24 Sep 2026",
        status: "Interview",
      },
      {
        id: 3,
        company: "Wipro",
        position: "Frontend Developer",
        location: "Chennai",
        date: "23 Sep 2026",
        status: "Offer",
      },
      {
        id: 4,
        company: "Accenture",
        position: "React Developer",
        location: "Hyderabad",
        date: "22 Sep 2026",
        status: "Rejected",
      },
    ]);


  // =================================================
  // LOGIN
  // =================================================

  if (!isLoggedIn) {

    return (

      <Login
        onLogin={() =>
          setIsLoggedIn(true)
        }
      />

    );

  }


  // =================================================
  // SEARCH
  // =================================================

  const filteredJobs =
    jobs.filter((job) => {

      const searchMatch =
        !search ||
        job.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const locationMatch =
        !location ||
        job.location
          .toLowerCase()
          .includes(
            location.toLowerCase()
          );


      return (
        searchMatch &&
        locationMatch
      );

    });


  // =================================================
  // SAVE JOB
  // =================================================

  const toggleSaveJob = (job) => {

    setSavedJobs((current) => {

      const alreadySaved =
        current.some(
          (saved) =>
            saved.id === job.id
        );


      if (alreadySaved) {

        return current.filter(
          (saved) =>
            saved.id !== job.id
        );

      }


      return [
        ...current,
        job,
      ];

    });

  };


  // =================================================
  // APPLY JOB
  // =================================================

  const applyJob = (job) => {

    const alreadyApplied =
      applications.some(
        (app) =>
          app.company === job.company &&
          app.position === job.title
      );


    if (alreadyApplied) {

      alert(
        "You have already applied for this job."
      );

      return;

    }


    const newApplication = {

      id:
        applications.length +
        1,

      company:
        job.company,

      position:
        job.title,

      location:
        job.location,

      date:
        new Date().toLocaleDateString(),

      status:
        "Applied",

    };


    setApplications([
      ...applications,
      newApplication,
    ]);


    alert(
      `${job.title} at ${job.company} added to your applications.`
    );

  };


  // =================================================
  // MAIN UI
  // =================================================

  return (

    <>

      {/* NAVBAR */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            J
          </div>

          <strong>
            JobTrack
          </strong>

        </div>


        <nav>

          <button
            onClick={() =>
              setActivePage("jobs")
            }
          >
            Find Jobs
          </button>

          <button
            onClick={() =>
              setActivePage("saved")
            }
          >
            Saved Jobs
          </button>

          <button
            onClick={() =>
              setActivePage("tracker")
            }
          >
            Application Tracker
          </button>

          <button
            onClick={() =>
              setActivePage("analytics")
            }
          >
            Analytics
          </button>

        </nav>


        <button
          className="profile-button"
          onClick={() => {
            setIsLoggedIn(false);
            setActivePage("jobs");
          }}
        >
          Logout
        </button>

      </header>


      <main>


        {/* ==========================================
            FIND JOBS
        ========================================== */}

        {activePage === "jobs" && (

          <>

            <section className="hero-section">

              <div className="badge">
                🚀 Find your next opportunity
              </div>


              <h1>
                Find a job you{" "}
                <span>
                  actually want.
                </span>
              </h1>


              <p>
                Search jobs and keep track
                of opportunities that matter
                to you.
              </p>


              <div className="search-box">

                <input
                  type="text"
                  placeholder="🔍 Job title or keyword"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />


                <input
                  type="text"
                  placeholder="📍 Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                />


                <button type="button">
                  Search Jobs
                </button>

              </div>

            </section>


            {/* STATS */}

            <section className="stats">

              <div>

                <strong>
                  10,000+
                </strong>

                <span>
                  Jobs available
                </span>

              </div>


              <div>

                <strong>
                  2,500+
                </strong>

                <span>
                  Companies
                </span>

              </div>


              <div>

                <strong>
                  5,000+
                </strong>

                <span>
                  Job seekers
                </span>

              </div>

            </section>


            {/* JOBS */}

            <section className="jobs-section">

              <div className="section-heading">

                <div>

                  <h2>
                    Latest job opportunities
                  </h2>

                  <p>
                    Discover roles that match
                    your career goals.
                  </p>

                </div>

              </div>


              <div className="jobs-layout">

                {/* FILTERS */}

                <aside className="filters">

                  <h3>
                    Filters
                  </h3>

                  <h4>
                    Job Type
                  </h4>

                  <label>
                    <input type="checkbox" />
                    Full-time
                  </label>

                  <label>
                    <input type="checkbox" />
                    Part-time
                  </label>

                  <label>
                    <input type="checkbox" />
                    Remote
                  </label>


                  <h4>
                    Experience
                  </h4>

                  <label>
                    <input type="checkbox" />
                    Entry level
                  </label>

                  <label>
                    <input type="checkbox" />
                    Mid level
                  </label>


                  <h4>
                    Salary
                  </h4>

                  <label>
                    <input type="checkbox" />
                    ₹5-10 LPA
                  </label>

                  <label>
                    <input type="checkbox" />
                    ₹10+ LPA
                  </label>

                </aside>


                {/* JOB LIST */}

                <div className="job-list">

                  {filteredJobs.length === 0 ? (

                    <div className="no-jobs">

                      <h3>
                        No jobs found
                      </h3>

                      <p>
                        Try changing your search
                        or location.
                      </p>

                    </div>

                  ) : (

                    filteredJobs.map(
                      (job) => {

                        const isSaved =
                          savedJobs.some(
                            (saved) =>
                              saved.id ===
                              job.id
                          );


                        return (

                          <article
                            className="job-card"
                            key={job.id}
                          >

                            <div className="job-card-top">

                              <div>

                                <h3>
                                  {job.title}
                                </h3>

                                <p className="company">
                                  {job.company}
                                </p>

                              </div>


                              <button
                                type="button"
                                className="save-button"
                                onClick={() =>
                                  toggleSaveJob(
                                    job
                                  )
                                }
                              >

                                {isSaved
                                  ? "★ Saved"
                                  : "☆ Save"}

                              </button>

                            </div>


                            <div className="job-details">

                              <span>
                                📍 {job.location}
                              </span>

                              <span>
                                💼 {job.type}
                              </span>

                              <span>
                                🎯 {job.experience}
                              </span>

                              <span>
                                💰 {job.salary}
                              </span>

                            </div>


                            <button
                              type="button"
                              className="apply-button"
                              onClick={() =>
                                applyJob(job)
                              }
                            >
                              Apply Now
                            </button>

                          </article>

                        );

                      }
                    )

                  )}

                </div>

              </div>

            </section>

          </>

        )}


        {/* ==========================================
            SAVED JOBS
        ========================================== */}

        {activePage === "saved" && (

          <section className="saved-section">

            <h2>
              Saved Jobs
            </h2>

            <p>
              Your saved job opportunities.
            </p>


            <h3>
              {savedJobs.length} Saved Jobs
            </h3>


            <div className="saved-jobs-list">

              {savedJobs.length === 0 ? (

                <p>
                  No saved jobs yet.
                </p>

              ) : (

                savedJobs.map(
                  (job) => (

                    <article
                      className="job-card"
                      key={job.id}
                    >

                      <h3>
                        {job.title}
                      </h3>

                      <p>
                        {job.company}
                      </p>


                      <div className="job-details">

                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💼 {job.type}
                        </span>

                        <span>
                          🎯 {job.experience}
                        </span>

                        <span>
                          💰 {job.salary}
                        </span>

                      </div>


                      <button
                        className="save-button"
                        onClick={() =>
                          toggleSaveJob(job)
                        }
                      >
                        Remove
                      </button>


                      <button
                        type="button"
                        className="apply-button"
                        onClick={() =>
                          applyJob(job)
                        }
                      >
                        Apply Now
                      </button>

                    </article>

                  )
                )

              )}

            </div>

          </section>

        )}


        {/* ==========================================
            APPLICATION TRACKER
        ========================================== */}

        {activePage === "tracker" && (

          <section className="tracker-section">

            <div className="section-heading">

              <div>

                <h2>
                  Application Tracker
                </h2>

                <p>
                  Drag and drop applications
                  between stages.
                </p>

              </div>

            </div>


            <KanbanBoard
              applications={applications}
              setApplications={
                setApplications
              }
            />

          </section>

        )}


        {/* ==========================================
            ANALYTICS
        ========================================== */}

        {activePage === "analytics" && (

          <section className="analytics-section">

            <div className="section-heading">

              <div>

                <h2>
                  Application Analytics
                </h2>

                <p>
                  Track your job search
                  progress.
                </p>

              </div>

            </div>


            <Analytics
              applications={
                applications
              }
            />

          </section>

        )}

      </main>


      {/* FOOTER */}

      <footer>

        <strong>
          JobTrack
        </strong>

        <span>
          Track your opportunities.
          Build your career.
        </span>

        <span>
          © 2026 JobTrack
        </span>

      </footer>

    </>

  );
}


export default App;
