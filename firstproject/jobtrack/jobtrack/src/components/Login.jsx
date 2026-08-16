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

export default Login;