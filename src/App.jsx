// src/App.jsx
import CategoryList from "./components/CategoryList";
import CategoryForm from "./components/CategoryForm";

import "./styles/styles.css";

function App() {
  return (
    <div className="App">
      <h1>Category Management</h1>
      <CategoryForm />
      <CategoryList />
    </div>
  );
}

export default App;
