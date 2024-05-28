"use client";
import React, { useEffect, useState } from "react";
import Tabs from "../../../components/layout/Tabs";
import { useProfile } from "../../../components/useProfile";
import UserForm from "../../../components/layout/UserForm";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
const EditUserPage = () => {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [loading1, setLoading] = useState(false);
  useEffect(() => {
    fetch("/api/profile?_id" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
        console.log(user);
        console.log(id);
        setLoading(true);
      });
    });
  }, []);

  async function handlesavebuttonclick(ev, data) {
    ev.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Saving.....",
      success: "Saved information",
      error: "something went wrong",
    });
  }

  if (loading) {
    return "Loading user profile....";
  }

  if (!data) {
    return "not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <Tabs isAdmin={true} />
      <div className="mt-8">
        {loading1 && <UserForm user={user} onSave={handlesavebuttonclick} />}
      </div>
    </section>
  );
};

export default EditUserPage;
