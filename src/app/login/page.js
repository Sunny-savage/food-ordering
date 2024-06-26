"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";

import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const onsubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setCreatingUser(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl  mb-4">Login</h1>

      <form className="block max-w-xs mx-auto " onSubmit={onsubmit}>
        <input
          disabled={creatingUser}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>

        <input
          disabled={creatingUser}
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button disabled={creatingUser} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} alt="xyx" width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
