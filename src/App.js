import './App.css';
import Recipes from "./components/Recipes";
import Navbar from "./components/Navbar";

function App() {
  return (
      <>
          <Navbar/>
          <div className="container">
              <Recipes/>
          </div>
      </>

  );
}

export default App;
