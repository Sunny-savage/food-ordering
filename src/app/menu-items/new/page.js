"use client";
import React, { useState } from "react";
import { useProfile } from "../../../components/useProfile";
import Tabs from "../../../components/layout/Tabs";
import EditableImage from "../../../components/layout/EditableImage";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "../../../components/layout/MenuItemForm";

const NewMenuItemPage = () => {
  const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);
  const handleformsubmit = async (ev, data) => {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items", {
        method: "POST",
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
      <MenuItemForm onSubmit={handleformsubmit} menuItem={null} />
    </section>
  );
};

export default NewMenuItemPage;
