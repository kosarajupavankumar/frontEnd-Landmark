import axios from "axios";

const API_URL = "http://localhost:3000/api/categories"; // Adjust API URL

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/tree`);
    console.log(response.data.tree);
    return response.data.tree;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, {
      name: category.name,
      parentId: category.parent,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

// Update an existing category
export const updateCategory = async (id, name) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      name,
      id,
      parentId: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
