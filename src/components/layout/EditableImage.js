"use client";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
const EditableImage = ({ userImage }) => {
  async function handlefilechange(ev) {
    const files = ev.target.files;

    if (files?.length > 0) {
      const data = new FormData();
      data.set("file", files[0]);
      const uploadPromise = new Promise(async (resolve, reject) => {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (res.ok) {
          resolve();
        } else {
          reject();
        }
      });

      toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Uploaded",
        error: "error",
      });
    }
  }
  return (
    <>
      {userImage && (
        <Image
          className="rounded-lg  mb-1"
          src={userImage}
          width={250}
          height={250}
          alt="avatar"
        />
      )}

      {!userImage && (
        <div className="bg-gray-200 p-4 text-gray-500 text-center rounded-lg mb-1">
          No Image
        </div>
      )}
      <label>
        <input
          type="file"
          className="hidden"
          onChange={handlefilechange}
        ></input>
        <span className="border border-gray-300 rounded-lg p-2 block cursor-pointer text-center ">
          Edit Image
        </span>
      </label>
    </>
  );
};

export default EditableImage;
