"use client";

import React, { useEffect, useState } from "react";
import Tabs from "../../components/layout/Tabs";
import { useProfile } from "../../components/useProfile";
import toast, { ToastBar } from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";

const Categories = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editCategory, setEditCategory] = useState(null);
  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((category) => {
        console.log(category);
        setCategories(category);
      });
    });
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  if (profileLoading) {
    return "Loading user Info............";
  }

  if (!profileData) {
    return "Not An Admin.";
  }

  async function handleDelete(id) {
    console.log(id);
    const deletePromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/categories?_id=" + id, {
        method: "DELETE",
      });

      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      loading: "Deleting Category...",
      success: "Category deleted",
      error: "error while deleting category",
    });

    fetchCategories();
  }

  const handleCategory = (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: CategoryName };

      if (editCategory) {
        data._id = editCategory._id;
      }
      const res = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      fetchCategories();
      setCategoryName("");
      setEditCategory(null);
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(creationPromise, {
      loading: editCategory ? "Updating category..." : "Creating new Category",
      success: editCategory ? "Category updated" : "Category created",
      error: "Error, sorry",
    });
  };
  return (
    <section className="mx-auto mt-8 max-w-2xl">
      <Tabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategory}>
        <div className="flex gap-2 items-end ">
          <div className="grow">
            <label>
              {editCategory ? "Update Category" : "New Category Name"}
              {editCategory && (
                <>
                  :<b>{editCategory.name}</b>{" "}
                </>
              )}
            </label>
            <input
              type="text"
              value={CategoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            ></input>
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h1 className="mt-8 text-sm text-gray-500">Existing Category</h1>
        {categories.length > 0 &&
          categories.map((c) => (
            <div
              className="bg-gray-100 rounded-xl p-2 mb-1 px-4 flex gap-1 items-center"
              key={c._id}
            >
              <div className=" grow ">{c.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditCategory(c);
                    setCategoryName(c.name);
                  }}
                  type="button"
                >
                  Edit
                </button>

                <DeleteButton
                  label={"Delete"}
                  onDelete={() => handleDelete(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Categories;
