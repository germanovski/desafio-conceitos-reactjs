import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      url: "https://github.com/rocketseat",
      title: `Projeto Desafio React${Date.now()}`,
      techs: ["Node JS", "JavaScript"],
    });

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);
    setProjects(projects.filter((rep) => rep.id !== id));
    console.log(projects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
