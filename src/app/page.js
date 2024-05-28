import Link from "next/link";

import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="#about">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About us"} />
        <div className=" text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Magna laboris aliqua adipisicing mollit consequat eu ullamco mollit
            ex mollit sit. Fugiat labore excepteur incididunt nisi anim veniam.
            Ullamco pariatur excepteur sunt veniam dolor anim dolor. Amet dolor
            id commodo nisi quis deserunt ipsum aute exercitation commodo
            ullamco eiusmod pariatur. Nisi ut tempor elit quis minim duis
            voluptate dolor. Sunt nisi excepteur nisi mollit. Qui ad fugiat anim
            fugiat id quis.
          </p>
          <p>
            Magna laboris aliqua adipisicing mollit consequat eu ullamco mollit
            ex mollit sit. Fugiat labore excepteur incididunt nisi anim veniam.
            Ullamco pariatur excepteur sunt veniam dolor anim dolor. Amet dolor
            id commodo nisi quis deserunt ipsum aute exercitation commodo
            ullamco eiusmod pariatur.
          </p>
          <p>
            Magna laboris aliqua adipisicing mollit consequat eu ullamco mollit
            ex mollit sit. Fugiat labore excepteur incididunt nisi anim veniam.
            Ullamco pariatur excepteur sunt veniam dolor anim dolor.
          </p>
        </div>
      </section>

      <section className="text-center my-8" id="contact">
        <SectionHeaders subHeader={"Dont hesitate"} mainHeader={"Contact us"} />
        <div className="mt-8">
          <Link
            className="text-4xl underline text-gray-500 "
            href="tel:+918393943934"
          >
            +91 8393 9439 34
          </Link>
        </div>
      </section>
    </>
  );
}
