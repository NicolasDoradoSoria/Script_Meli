import "./App.css";
import Buscador from "./components/Buscador";
import Items from "./components/Items";
import React, { useState } from "react";
function App() {
  
  // en este hooks se guarda los items
  const [items, setItems] = useState([]);
  //destroyoning


  return (
    <>
      {/* se pasa los hooks a sus repectivos componentes */}
      <Buscador setItems={setItems}/>


        <Items items={items} />
     
    </>
  );
}

export default App;
