import Home from "./Home/home.jsx";
import DataProvider from "./context/DataContext.js";

function App() {
  return (
    <>
      <DataProvider>
        <Home/>
      </DataProvider>
    </>
  );
}
  
export default App;
