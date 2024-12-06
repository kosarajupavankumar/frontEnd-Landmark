// src/hooks/useCategories.js
import { useState, useEffect } from "react";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories from the backend
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Add a new category
  const addCategory = async (category) => {
    try {
      const newCategory = await createCategory(category);
      setCategories([...categories, newCategory]);
    } catch {
      setError("Failed to add category");
    }
  };

  // Update an existing category
  const editCategory = async (id, updatedCategory) => {
    try {
      const updated = await updateCategory(id, updatedCategory);
      setCategories(categories.map((cat) => (cat._id === id ? updated : cat)));
    } catch {
      setError("Failed to update category");
    }
  };

  // Delete a category
  const removeCategory = async (id) => {
    try {
      console.log(id);
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch {
      setError("Failed to delete category");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  };
};
