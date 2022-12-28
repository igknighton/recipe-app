import './App.css';
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import Navbar from "./components/Navbar";
import { Routes,Route} from "react-router-dom";

function App() {
  return (
      <>
          <Navbar/>
          <div className="container">
              <Routes>
                  <Route path={'/'} element={<Recipes/>}/>
                  <Route path={'/:id'} element={<Recipe/>}/>
              </Routes>
          </div>
      </>

  );
}

export default App;
