"use client";
import Image from "next/image";
import Menu from "../menu/Menu";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

const HomeMenu = () => {
  const [bestsellers, setBestsellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestsellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
    <section className="relative">
      <div className="absolute left-0 right-0  w-full justify-start">
        <div className=" absolute left-0 -top-[70px] text-left -z-10">
          <Image
            src={"/sallad1.png"}
            alt={"salllad1"}
            height={189}
            width={109}
          />
        </div>
        <div className="absolute right-0 -z-10 -top-[100px]">
          <Image
            src={"/sallad2.png"}
            alt={"salllad1"}
            height={195}
            width={107}
          />
        </div>
      </div>

      <SectionHeaders subHeader={"Check out"} mainHeader={"Our best sellers"} />

      <div className="grid sm:grid-cols-3 gap-4 px-24">
        {bestsellers?.length > 0 &&
          bestsellers.map((items) => <Menu key={items._id} {...items} />)}
      </div>
    </section>
  );
};

export default HomeMenu;
