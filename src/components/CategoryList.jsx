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
    const newName = prompt("Enter the new name of the category:");

    if (newName) {
      await editCategory(id, newName);
    }

    loadCategories();
  };

  const handleAddCategory = async (parentId) => {
    const categoryName = prompt("Enter the name of the new category:");
    if (categoryName) {
      await addCategory({ name: categoryName, parent: parentId });
    }
    loadCategories();
  };

  const renderCategories = (categories) => {
    console.log(`11111 categories: ${JSON.stringify(categories)}`);
    return (
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button
              style={{ color: "red" }}
              onClick={() => handleRemoveCategory(category.id)}
            >
              Delete
            </button>
            {/* <button
              style={{ color: "purple" }}
              onClick={() => handleEditCategory(category.id)}
            >
              Edit
            </button> */}
            <button
              style={{ color: "green" }}
              onClick={() => handleAddCategory(category.id)}
            >
              Add
            </button>
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
