// src/components/CategoryList.jsx
import { useCategories } from "../hooks/useCategories";

const CategoryList = () => {
  const {
    categories,
    loading,
    error,
    removeCategory,
    addCategory,
    editCategory,
  } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderCategories = (categories) => {
    return (
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => removeCategory(category.id)}>Delete</button>
            <button onClick={() => editCategory(category.id)}>Edit</button>
            <button onClick={() => addCategory(category)}>Add child</button>
            {category.children &&
              category.children.length > 0 &&
              renderCategories(category.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories.length === 0 && <div>No categories found</div>}
      {renderCategories(categories)}
    </div>
  );
};

export default CategoryList;
