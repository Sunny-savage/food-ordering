"use client";

import axios from "axios";
import { signIn } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  console.log(process.env.NODE_ENV);
  const onsubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const res = await axios.post(`/api/register`, { name, email, password });
    console.log(res, "this is response");
    console.log(password, email);

    if (res.ok) {
      setUserCreated(true);

      setEmail("");
      setPassword("");
    } else {
      setError(true);
    }

    setCreatingUser(false);
    router.push("/");
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl  mb-4">Register</h1>
      {userCreated && (
        <div className="text-center my-4">
          User Created.
          <br />
          Now you can{" "}
          <Link className="underline " href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && <div className="text-center my-4">Please try again later.</div>}
      <form className="block max-w-xs mx-auto " onSubmit={onsubmit}>
        <input
          disabled={creatingUser}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        ></input>
        <input
          disabled={creatingUser}
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>

        <input
          disabled={creatingUser}
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button disabled={creatingUser} type="submit">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} alt="xyx" width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing acconts?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
