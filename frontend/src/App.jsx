import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("Data received is not an array, setting to empty:", data);
          setProjects([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
        setProjects([]); // Fallback to an empty array
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <aside className="sidebar">
        <h1>Sabri Küçük</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </aside>
      <main className="main">
        <section id="about" className="section">
          <img src="/profile.jpg" alt="Sabri Küçük" style={{ width: 180, borderRadius: '50%', marginBottom: 24, border: '4px solid #e94560' }} />
          <h2>About Me</h2>
          <p>
            I am a 4th-year Computer Engineering student passionate about building scalable web applications and solving complex problems. With a strong foundation in software engineering principles, I have hands-on experience with technologies like React, Node.js, and MongoDB. I am eager to apply my skills to real-world challenges and contribute to innovative projects.
          </p>
        </section>
        <section id="projects" className="section">
          <h2>My Projects</h2>
          {loading ? <p>Loading projects...</p> : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id || project._id} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>
            I'm currently seeking internship opportunities and am open to collaboration. Feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:sabri.kucuk@example.com">sabri.kucuk001@hotmail.com</a>
            <a href="https://github.com/TobitoSabrito" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sabri-kucuk/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
