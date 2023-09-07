"use client";

import { UseAuthContext, useGenerateQuery } from "@/hooks";
import "../globals.css";
import { Button, Input, LoginEfect, MovilEfffect, Spacer } from "@/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QueryGetUsers } from "@/graphql";
import { API_URL } from "@/common";

export default function LoginRegister() {
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const { loginEmailAndPassword } = UseAuthContext();

  const onSubmit = async () => {
    // const res = await fetch("/api/send", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: "mucino.andres1990@gmail.com",
    //     firstName: "Andres",
    //   }),
    // });
    // await res.json();
  };

  const { data, status } = useGenerateQuery(
    `${API_URL}/graphql`,
    "getUsers",
    QueryGetUsers,
    {
      filter: {},
      paging: { limit: 10 },
    }
  );

  useEffect(() => {
    if (status === "success") {
      console.log(data);
    }
  }, [status]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
    console.log(name, value);
  };

  const onClick = () => {
    loginEmailAndPassword(login.email, login.password);
    router.push("/");
  };

  return (
    <div className="md:flex md:w-full md:h-screen bg-slate-100">
      <LoginEfect />
      <MovilEfffect />
      <div className="md:w-3/6	md:h-full">
        <div className="h-1/3 max-sm:pb-16 flex justify-center items-center text-4xl font-bold">
          <div>Iniciar sesión</div>
        </div>
        <div className="h-2/3 flex flex-col justify-start items-center">
          <Input
            type={"text"}
            placeholder="Correo"
            name="email"
            onChange={handleChange}
            onBlur={() => {}}
          />
          <Spacer />
          <Input
            type={"password"}
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            onBlur={() => {}}
          />
          <Spacer />
          <Spacer />
          <Button title={"Entrar"} color="#7fb9b1" onClick={onClick} />
          <Spacer />
          <Spacer />
          <Link
            href={"/register"}
            className="underline underline-offset-4 text-[#7fb9b1]"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
