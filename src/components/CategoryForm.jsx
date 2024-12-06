import { useState } from "react";
import { useCategories } from "../hooks/useCategories";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const { addCategory, loadCategories } = useCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      addCategory({ name });
      setName("");
      loadCategories(); // Reload categories after adding
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
