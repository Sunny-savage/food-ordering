import Image from "next/image";
import ArrowRight from "../icons/ArrowRight";

const Hero = () => {
  return (
    <section className="hero mt-6">
      <div className="md:py-12 py-4">
        <h1 className="text-4xl font-semibold">
          Everything
          <br /> is better
          <br /> with a&nbsp;
          <span className="text-primary">Pixxa</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm ">
          Velit est ex aute deserunt esse excepteur reprehenderit elit deserunt.
          Lorem aute qui proident est. Consectetur officia proident aute veniam
          qui esse.
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary flex items-center justify-center uppercase  gap-2 text-white px-4 py-2 rounded-full ">
            Order Now
            <ArrowRight />
          </button>
          <button className="flex border-0 items-center gap-2 py-2 text-gray-600 font-semibold">
            Learn more <ArrowRight />
          </button>
        </div>
      </div>

      <div className="relative hidden md:block">
        {" "}
        <Image
          src={"/pizza.png"}
          alt="Pixxa"
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
};

export default Hero;
