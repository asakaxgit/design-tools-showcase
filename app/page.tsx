export default function Home() {
  return (
    <main className="container">
      <div className="header">
        <h1>Design Tools Showcase</h1>
        <p className="subtitle">
          Evaluating graphics libraries for production decision-making
        </p>
      </div>

      <section className="intro">
        <h2>Purpose</h2>
        <p>
          This showcase demonstrates and evaluates various graphics libraries to help make
          informed decisions about which technology to use in production environments.
        </p>
      </section>

      <section className="libraries">
        <h2>Libraries Under Evaluation</h2>
        
        <div className="library-grid">
          <div className="library-card">
            <h3>Konva (react-konva)</h3>
            <p>Canvas-based 2D graphics library with React integration</p>
            <span className="status">Coming Soon</span>
          </div>

          <div className="library-card">
            <h3>Fabric.js</h3>
            <p>Powerful canvas library with interactive object model</p>
            <span className="status">Coming Soon</span>
          </div>

          <div className="library-card">
            <h3>Paper.js</h3>
            <p>Vector graphics scripting framework</p>
            <span className="status">Coming Soon</span>
          </div>
        </div>
      </section>

      <section className="paid-solutions">
        <h2>Future Paid Solutions Evaluation</h2>
        <ul>
          <li>Zakeke</li>
          <li>Customily</li>
          <li>Pacdora</li>
        </ul>
      </section>

      <footer className="footer">
        <p>🚧 Project in Development</p>
      </footer>
    </main>
  )
}
