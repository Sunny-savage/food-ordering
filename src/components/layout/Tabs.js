"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Tabs = ({ isAdmin }) => {
  const path = usePathname();
  console.log(path);
  return (
    <div className="flex gap-2 tabs mx-auto justify-center flex-wrap">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        {" "}
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            href={"/menu-items"}
            className={path.includes("/menu-items") ? "active" : ""}
          >
            Menu Items
          </Link>
          <Link
            className={path.includes("/users") ? "active" : ""}
            href={"/users"}
          >
            Users
          </Link>
        </>
      )}

      <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
        Orders
      </Link>
    </div>
  );
};

export default Tabs;
