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

function Analytics({ applications }) {

  const totalApplications = applications.length;

  const applied = applications.filter(
    (app) => app.status === "Applied"
  ).length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const interviewRate =
    totalApplications > 0
      ? ((interviews / totalApplications) * 100).toFixed(1)
      : 0;

  const offerRate =
    totalApplications > 0
      ? ((offers / totalApplications) * 100).toFixed(1)
      : 0;

  const rejectionRate =
    totalApplications > 0
      ? ((rejected / totalApplications) * 100).toFixed(1)
      : 0;

  // Status chart data
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

  // Company application count
  const companyCounts = {};

  applications.forEach((app) => {
    companyCounts[app.company] =
      (companyCounts[app.company] || 0) + 1;
  });

  const companyData = Object.entries(companyCounts).map(
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
            <h2>{totalApplications}</h2>
          </div>
        </div>

        <div className="analytics-card">
          <span>🎯</span>

          <div>
            <p>Interview Rate</p>
            <h2>{interviewRate}%</h2>
          </div>
        </div>

        <div className="analytics-card">
          <span>🏆</span>

          <div>
            <p>Offer Rate</p>
            <h2>{offerRate}%</h2>
          </div>
        </div>

        <div className="analytics-card">
          <span>❌</span>

          <div>
            <p>Rejection Rate</p>
            <h2>{rejectionRate}%</h2>
          </div>
        </div>

      </section>

      {/* Charts */}

      <section className="charts-grid">

        {/* Status Chart */}

        <div className="chart-card">

          <div className="chart-header">
            <h2>Applications by Status</h2>
            <p>Current application pipeline</p>
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

        {/* Company Chart */}

        <div className="chart-card">

          <div className="chart-header">
            <h2>Applications by Company</h2>
            <p>Companies you've applied to</p>
          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={companyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="company"
                />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </section>

      {/* Status Breakdown */}

      <section className="breakdown-card">

        <div className="chart-header">
          <h2>Application Breakdown</h2>
          <p>Detailed view of your applications</p>
        </div>

        <div className="breakdown-grid">

          <div className="breakdown-item">
            <span className="breakdown-dot applied-dot"></span>

            <div>
              <strong>Applied</strong>
              <p>{applied} applications</p>
            </div>

            <strong>
              {totalApplications > 0
                ? ((applied / totalApplications) * 100).toFixed(1)
                : 0}
              %
            </strong>
          </div>

          <div className="breakdown-item">
            <span className="breakdown-dot interview-dot"></span>

            <div>
              <strong>Interview</strong>
              <p>{interviews} applications</p>
            </div>

            <strong>
              {interviewRate}%
            </strong>
          </div>

          <div className="breakdown-item">
            <span className="breakdown-dot offer-dot"></span>

            <div>
              <strong>Offer</strong>
              <p>{offers} applications</p>
            </div>

            <strong>
              {offerRate}%
            </strong>
          </div>

          <div className="breakdown-item">
            <span className="breakdown-dot rejected-dot"></span>

            <div>
              <strong>Rejected</strong>
              <p>{rejected} applications</p>
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

export default Analytics;