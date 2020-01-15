import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import "react-toastify/dist/ReactToastify.css";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get("/devs");

        setDevs(response.data.devs);
      } catch (error) {}
    }

    getUsers();
  }, []);

  async function handleAddDev(data) {
    try {
      const response = await api.post("/devs", data);
      setDevs([...devs, response.data]);
      toast.success("User has been added");
    } catch (error) {
      toast.error("Usuer not added or not found");
    }
  }

  return (
    <div id="app">
      <ToastContainer />
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.length && devs.map(dev => <DevItem dev={dev} key={dev._id} />)}

          {!devs.length && <li>Não há desenvolvedores cadastrados</li>}
        </ul>
      </main>
    </div>
  );
}

export default App;
