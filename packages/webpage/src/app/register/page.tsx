"use client";

import "../globals.css";
import { Button, Input, MovilEfffect, RegisterEffect, Spacer } from "@/components";
import { useState } from "react";

export default function Register() {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
    console.log(name, value);
  };

  const onSubmit = () => {
    console.log(inputValue);
  };

  return (
    <div className="md:flex md:w-full md:h-screen bg-slate-100">
      <RegisterEffect />
      <MovilEfffect />
      <div className="md:w-3/6 md:h-full">
        <div className="h-1/3 flex max-sm:p-5 justify-center items-center text-4xl font-bold">
          <div>Registrarte</div>
        </div>
        <div className="h-2/3 max-sm:p-10	flex flex-col justify-start items-center">
          <Input
            type={"text"}
            name="firstName"
            placeholder="Nombre"
            onChange={handleChange}
            onBlur={() => {}}
          />
          <Spacer />
          <Input
            type={"text"}
            name="lastName"
            placeholder="Apellido"
            onChange={handleChange}
            onBlur={() => {}}
          />
          <Spacer />
          <Input
            type={"text"}
            name="phone"
            placeholder="Teléfono"
            onChange={handleChange}
            onBlur={() => {}}
          />
          <Spacer />
          <Input
            type={"text"}
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            onBlur={() => {}}
          />
          <Spacer />
          <Spacer />
          <Button title={"Registrarme"} color="#7fb9b1" onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
}
