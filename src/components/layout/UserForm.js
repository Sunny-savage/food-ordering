"use client";
import React, { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../useProfile";
import AddressInputs from "../layout/AddressInputs";

const UserForm = ({ user, onSave }) => {
  const [userName, setUsername] = useState(user?.name || " ");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setstreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "city") setCity(value);
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setstreetAddress(value);
    if (propName === "country") setCountry(value);
    if (propName === "postalcode") setPostalCode(value);
  }

  return (
    <div className="md:flex gap-4">
      <div className=" p-2 rounded-lg relative max-w-[120px]">
        <EditableImage userImage={"/pizza.png"} />
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            phone,
            admin,
            streetAddress,
            postalCode,
            city,
            country,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user?.email}
          placeholder="email"
        ></input>
        <AddressInputs
          addressProps={{ streetAddress, postalCode, city, country, phone }}
          setAddressProps={handleAddressChange}
        />
        {loggedInUserData && (
          <div>
            <label
              htmlFor="adminCb"
              className="p-2 inline-flex items-center gap-2 mb-2"
            >
              <input
                type="checkbox"
                id="adminCb"
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
