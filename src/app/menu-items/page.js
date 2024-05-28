"use client";
import React, { useEffect, useState } from "react";
import Tabs from "../../components/layout/Tabs";
import { useProfile } from "../../components/useProfile";
import EditableImage from "../../components/layout/EditableImage";
import toast from "react-hot-toast";
import Link from "next/link";
import ArrowRight from "../../components/icons/ArrowRight";
import Image from "next/image";

const MenuItemsPage = () => {
  const { loading, data } = useProfile();
  const [menuitems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  if (loading) {
    return "Loading use info...";
  }

  if (!data) {
    return "Not an admin";
  }
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <Tabs isAdmin={true} />
      <div className="mt-8 flex">
        <Link className="button flex" href={"/menu-items/new"}>
          <span> Create new Menu Item </span> <ArrowRight />
        </Link>
      </div>
      <div>
        <h2 className="mt-8 text-sm text-gray-500 ">Edit menu items</h2>

        <div className="grid grid-cols-3 gap-2">
          {menuitems?.length > 0 &&
            menuitems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative flex justify-center">
                  {" "}
                  <Image
                    className="rounded-md"
                    src={"/pizza.png"}
                    alt="pixxa"
                    width={100}
                    height={100}
                  ></Image>{" "}
                </div>
                <div className="text-center"> {item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;
