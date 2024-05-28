"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import UserForm from "../../components/layout/UserForm";
import { useRouter } from "next/navigation";
import Tabs from "../../components/layout/Tabs";
import { useEffect, useState } from "react";
import EditableImage from "../../components/layout/EditableImage";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const session = useSession();
  const [user, setUser] = useState(null);

  const [admin, setAdmin] = useState(false);
  const [profile, setProfileFetched] = useState(false);

  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setAdmin(data.admin);
          setUser(data);
          setProfileFetched(true);
        });
      });
    }
  }, [status, session]);

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "loading" || !profile) {
    return "loading ......";
  }

  async function handleprofileupdate(e, data) {
    e.preventDefault();

    const savedPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savedPromise, {
      loading: "Saving...",
      success: "Profile saved",
      error: "Error",
    });
  }
  const userImage = session?.data?.user?.image;

  return (
    <section className="mt-8">
      <Tabs isAdmin={admin} />

      <div className=" mx-auto max-w-2xl  mt-8">
        <UserForm user={user} onSave={handleprofileupdate} />
      </div>
    </section>
  );
};

export default Profile;
