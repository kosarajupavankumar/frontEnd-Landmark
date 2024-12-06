import { useCategories } from "../hooks/useCategories";

const CategoryList = () => {
  const {
    categories,
    loading,
    error,
    removeCategory,
    addCategory,
    editCategory,
    loadCategories,
  } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleRemoveCategory = async (id) => {
    await removeCategory(id);
    loadCategories();
  };

  const handleEditCategory = async (id) => {
    await editCategory(id);
    loadCategories();
  };

  const handleAddCategory = async (parentId) => {
    await addCategory({ name: "New Category", parent: parentId });
    loadCategories();
  };

  const renderCategories = (categories) => {
    return (
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleRemoveCategory(category.id)}>Delete</button>
            <button onClick={() => handleEditCategory(category.id)}>Edit</button>
            <button onClick={() => handleAddCategory(category.id)}>Add Category</button>
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
