import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState(null)

  useEffect( () => {
    fetch("http://localhost:3001/pizzas")
      .then(resp => resp.json())
      .then(data => setPizzas(data))
  }, [])

  function changeSelected(value, name) {
    setSelectedPizza( {
      ...selectedPizza, [name] : value,})
  }

  function editPizza(data) {
    const updatedPizzas = pizzas.map( (pizza) =>  (pizza.id === data.id) ? data : pizza )
    setPizzas(updatedPizzas);
    setSelectedPizza(data)
  }

  return (
    <>
      <Header />
      <PizzaForm pizza={selectedPizza} changeSelected={changeSelected} editPizza={editPizza}/>
      <PizzaList setSelectedPizza={setSelectedPizza} pizzas={pizzas} />
    </>
  );
}

export default App;
