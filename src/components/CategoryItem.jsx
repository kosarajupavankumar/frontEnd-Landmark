import { useState } from "react";
import PropTypes from "prop-types";
import { useCategories } from "../hooks/useCategories";

const CategoryItem = ({ category }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(category.name);
  const { editCategory, removeCategory, loadCategories } = useCategories();

  const handleEdit = () => {
    if (isEditing && updatedName !== category.name) {
      editCategory(category.id, { name: updatedName });
      loadCategories(); // Reload categories after editing
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    removeCategory(category.id);
    loadCategories(); // Reload categories after deleting
  };

  return (
    <div className="category-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span>{category.name}</span>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      <button onClick={handleDelete} className="delete-btn">
        Delete
      </button>
    </div>
  );
};
CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryItem;
