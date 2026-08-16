import { useEffect, useState } from "react";
import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import Analytics from "./components/Analytics";
import Login from "./components/Login";

function App() {
  const [darkMode, setDarkMode] = useState(false);

const [isLoggedIn, setIsLoggedIn] = useState(() => {
  
  
  return
   localStorage.getItem("jobTrackLoggedIn") === "true";
});

const [currentPage, setCurrentPage] =
  useState("applications");

  const handleLogin = () => {
  localStorage.setItem(
    "jobTrackLoggedIn",
    "true"
  );

  setIsLoggedIn(true);
};

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const [applications, setApplications] = useState(() => {
    const savedApplications =
      localStorage.getItem("jobApplications");

    return savedApplications
      ? JSON.parse(savedApplications)
      : [
          {
            company: "Google",
            position: "Frontend Developer",
            location: "Bangalore",
            date: "Aug 15, 2026",
            status: "Interview",
          },
          {
            company: "Microsoft",
            position: "React Developer",
            location: "Hyderabad",
            date: "Aug 13, 2026",
            status: "Applied",
          },
          {
            company: "Amazon",
            position: "Software Engineer",
            location: "Chennai",
            date: "Aug 10, 2026",
            status: "Rejected",
          },
          {
            company: "Infosys",
            position: "React Developer",
            location: "Chennai",
            date: "Aug 08, 2026",
            status: "Offer",
          },
        ];
  });

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    date: "",
    status: "Applied",
  });

  // Save applications to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "jobApplications",
      JSON.stringify(applications)
    );
  }, [applications]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Edit application
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.company ||
      !formData.position ||
      !formData.location ||
      !formData.date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const formattedDate = new Date(
      formData.date
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const updatedApplication = {
      ...formData,
      date: formattedDate,
    };

    if (editingIndex !== null) {
      const updatedApplications = [...applications];

      updatedApplications[editingIndex] =
        updatedApplication;

      setApplications(updatedApplications);
      setEditingIndex(null);
    } else {
      setApplications([
        updatedApplication,
        ...applications,
      ]);
    }

    setFormData({
      company: "",
      position: "",
      location: "",
      date: "",
      status: "Applied",
    });

    setShowForm(false);
  };

  // Delete application
  const deleteApplication = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    const updatedApplications =
      applications.filter((_, i) => i !== index);

    setApplications(updatedApplications);
  };

  // Edit application
  const editApplication = (index) => {
  const application = applications[index];

  let formattedDate = "";

  if (application.date) {
    const dateObject = new Date(application.date);

    if (!isNaN(dateObject.getTime())) {
      formattedDate = dateObject
        .toISOString()
        .split("T")[0];
    }
  }

  setFormData({
    company: application.company,
    position: application.position,
    location: application.location,
    date: formattedDate,
    status: application.status,
  });

  setEditingIndex(index);
  setShowForm(true);
};

  // Search + Filter
  const filteredApplications =
    applications.filter((application) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(search) ||
        application.position
          .toLowerCase()
          .includes(search) ||
        application.location
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  // Sorting
  const sortedApplications =
    [...filteredApplications].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === "Newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

  // Reset form
  const resetForm = () => {
    setShowForm(false);
    setEditingIndex(null);

    setFormData({
      company: "",
      position: "",
      location: "",
      date: "",
      status: "Applied",
    });
  };

  if (!isLoggedIn) {
  return (
    <Login
      onLogin={handleLogin}
    />
  );
}

return (
  <div
      className={
        darkMode ? "app dark" : "app"
      }
    >
      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="logo">
          <span>J</span>
          JobTrack
        </div>

        <nav>

          <a
            className={
              currentPage === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setCurrentPage("dashboard")
            }
          >
            📊 Dashboard
          </a>

          <a
            className={
              currentPage === "applications"
                ? "active"
                : ""
            }
            onClick={() =>
              setCurrentPage("applications")
            }
          >
            💼 Applications
          </a>

          <a
            className={
              currentPage === "kanban"
                ? "active"
                : ""
            }
            onClick={() =>
              setCurrentPage("kanban")
            }
          >
            📋 Kanban Board
          </a>

          <a
            className={
              currentPage === "analytics"
                ? "active"
                : ""
            }
            onClick={() =>
              setCurrentPage("analytics")
            }
          >
            📈 Analytics
          </a>

        </nav>

        <div className="sidebar-bottom">

  <a>
    ⚙️ Settings
  </a>

  <a
    onClick={() => {
      localStorage.removeItem(
        "jobTrackLoggedIn"
      );

      setIsLoggedIn(false);
    }}
  >
    🚪 Logout
  </a>

</div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main">

        {/* =========================
            KANBAN PAGE
        ========================= */}

        {currentPage === "kanban" && (
          <>
            <header className="header">

              <div>
                <h1>Kanban Board</h1>

                <p>
                  Drag and drop applications
                  between stages
                </p>
              </div>

              <div className="header-actions">

                <button
                  className="theme-btn"
                  onClick={() =>
                    setDarkMode(!darkMode)
                  }
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>

              </div>

            </header>

            <KanbanBoard
              applications={applications}
              setApplications={
                setApplications
              }
            />
          </>
        )}

        {/* =========================
            ANALYTICS PAGE
        ========================= */}

        {currentPage === "analytics" && (
          <>
            <header className="header">

              <div>
                <h1>Analytics</h1>

                <p>
                  Understand your job search
                  performance
                </p>
              </div>

              <div className="header-actions">

                <button
                  className="theme-btn"
                  onClick={() =>
                    setDarkMode(!darkMode)
                  }
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>

              </div>

            </header>

            <Analytics
              applications={applications}
            />
          </>
        )}

        {/* =========================
            APPLICATIONS PAGE
        ========================= */}

        {currentPage === "applications" && (
          <>
            {/* Header */}

            <header className="header">

              <div>
                <h1>Applications</h1>

                <p>
                  Manage all your job
                  applications
                </p>
              </div>

              <div className="header-actions">

                <button
                  className="theme-btn"
                  onClick={() =>
                    setDarkMode(!darkMode)
                  }
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>

                <button
                  className="add-btn"
                  onClick={() => {
                    setEditingIndex(null);

                    setFormData({
                      company: "",
                      position: "",
                      location: "",
                      date: "",
                      status: "Applied",
                    });

                    setShowForm(true);
                  }}
                >
                  + Add Application
                </button>

              </div>

            </header>

            {/* Search and Filters */}

            <section className="filters">

              <div className="search-box">

                🔎

                <input
                  type="text"
                  placeholder="Search company, position or location..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                />

              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(
                    e.target.value
                  )
                }
              >
                <option value="Newest">
                  Newest First
                </option>

                <option value="Oldest">
                  Oldest First
                </option>

              </select>

            </section>

            {/* Application Count */}

            <div className="application-count">
              Showing{" "}
              {sortedApplications.length}{" "}
              of {applications.length}{" "}
              applications
            </div>

            {/* Applications Table */}

            <section className="applications-section">

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Company</th>
                      <th>Position</th>
                      <th>Location</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {sortedApplications.length >
                    0 ? (

                      sortedApplications.map(
                        (
                          application
                        ) => (

                          <tr
                            key={
                              applications.indexOf(
                                application
                              )
                            }
                          >

                            <td>
                              <strong>
                                {
                                  application.company
                                }
                              </strong>
                            </td>

                            <td>
                              {
                                application.position
                              }
                            </td>

                            <td>
                              {
                                application.location
                              }
                            </td>

                            <td>
                              {
                                application.date
                              }
                            </td>

                            <td>

                              <span
                                className={`status ${application.status.toLowerCase()}`}
                              >
                                {
                                  application.status
                                }
                              </span>

                            </td>

                            <td>

                              <div className="action-buttons">

                                <button
                                  className="edit-btn"
                                  onClick={() =>
                                    editApplication(
                                      applications.indexOf(
                                        application
                                      )
                                    )
                                  }
                                >
                                  ✏️
                                </button>

                                <button
                                  className="delete-btn"
                                  onClick={() =>
                                    deleteApplication(
                                      applications.indexOf(
                                        application
                                      )
                                    )
                                  }
                                >
                                  🗑️
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="6"
                          className="no-results"
                        >
                          🔍 No applications found
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </section>
          </>
        )}

        {/* =========================
            DASHBOARD PAGE
        ========================= */}

        {currentPage === "dashboard" && (
          <>
            <header className="header">

              <div>
                <h1>Dashboard</h1>

                <p>
                  Welcome to your JobTrack
                  dashboard
                </p>
              </div>

              <div className="header-actions">

                <button
                  className="theme-btn"
                  onClick={() =>
                    setDarkMode(!darkMode)
                  }
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>

              </div>

            </header>

            <section className="analytics-stats">

              <div className="analytics-card">

                <span>📋</span>

                <div>
                  <p>
                    Total Applications
                  </p>

                  <h2>
                    {applications.length}
                  </h2>
                </div>

              </div>

              <div className="analytics-card">

                <span>🎯</span>

                <div>
                  <p>
                    Interviews
                  </p>

                  <h2>
                    {
                      applications.filter(
                        (app) =>
                          app.status ===
                          "Interview"
                      ).length
                    }
                  </h2>
                </div>

              </div>

              <div className="analytics-card">

                <span>🏆</span>

                <div>
                  <p>
                    Offers
                  </p>

                  <h2>
                    {
                      applications.filter(
                        (app) =>
                          app.status ===
                          "Offer"
                      ).length
                    }
                  </h2>
                </div>

              </div>

              <div className="analytics-card">

                <span>❌</span>

                <div>
                  <p>
                    Rejected
                  </p>

                  <h2>
                    {
                      applications.filter(
                        (app) =>
                          app.status ===
                          "Rejected"
                      ).length
                    }
                  </h2>
                </div>

              </div>

            </section>
          </>
        )}

      </main>

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showForm && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <div>

                <h2>
                  {editingIndex !== null
                    ? "Edit Application"
                    : "Add Application"}
                </h2>

                <p>
                  {editingIndex !== null
                    ? "Update application details"
                    : "Enter your job application details"}
                </p>

              </div>

              <button
                className="close-btn"
                onClick={resetForm}
              >
                ✕
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  Company Name
                </label>

                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Google"
                  value={formData.company}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Job Position
                </label>

                <input
                  type="text"
                  name="position"
                  placeholder="e.g. Frontend Developer"
                  value={formData.position}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Chennai"
                  value={formData.location}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Date Applied
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Offer">
                    Offer
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingIndex !== null
                    ? "Update Application"
                    : "Save Application"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;