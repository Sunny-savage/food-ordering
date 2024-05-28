"use client";
import React, { useEffect, useState } from "react";
import Tabs from "../../components/layout/Tabs";
import { useProfile } from "../../components/useProfile";
import Link from "next/link";
const Users = () => {
  const { data, loading } = useProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((user) => {
        setUsers(user);
      });
    });
  }, []);
  if (loading) {
    return "Loading user info...";
  }

  if (!data) {
    return "Not an admin";
  }
  return (
    <section className="max-w-2xl mx-auto mt-8">
      <Tabs isAdmin={true} />

      <div className="mt-8">
        {users?.length > 0 &&
          users.map((use, index) => (
            <div
              key={use._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 items-center gap-4 flex"
            >
              <div className=" grid grid_col-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!use.name && <span> {use.name}</span>}
                  {!use.name && <span className="italic">
                    No Name
                    </span>}
                </div>

                <span className="text-gray-500"> {use.email}</span>
              </div>
              <div>
                <Link className="button" href={"/users/" + use._id}>
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Users;
