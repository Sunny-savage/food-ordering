"use client";
import React, { useEffect, useState } from "react";
import { useProfile } from "../../../../components/useProfile";
import Tabs from "../../../../components/layout/Tabs";
import EditableImage from "../../../../components/layout/EditableImage";
import Link from "next/link";
import Left from "../../../../components/icons/Left";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "../../../../components/layout/MenuItemForm";
import DeleteButton from "../../../../components/DeleteButton";

const EditMenuItemPage = () => {
  const { id } = useParams();
  const { loading, data } = useProfile();

  const [menuItems, setMenuItems] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        console.log(item.name);
        setMenuItems(item);
      });
    });
  }, []);

  async function handledelete() {
    const delepromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });

      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(delepromise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "rrroo",
    });

    setRedirectToItems(true);
  }

  const handleformsubmit = async (ev, data) => {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(savingPromise, {
      loading: "updating menu item",
      success: "menu item updated",
      error: "error",
    });

    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu-items");
  }
  if (loading) {
    return "Loading use info...";
  }

  if (!data) {
    return "Not an admin";
  }
  return (
    <section className="mt-8">
      <Tabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm onSubmit={handleformsubmit} menuItem={menuItems} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label={"Delete this menu item"}
            onDelete={handledelete}
          />
        </div>
      </div>
    </section>
  );
};

export default EditMenuItemPage;
