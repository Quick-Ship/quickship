"use client";

import Image from "next/image";
import '../globals.css'
export default function LoginRegister() {
  return (
    <div className="flex w-full h-full">
      <div className="w-3/6 h-full object-cover content-center">
        <div className="border border-sky-500 p-2 h-56">
            <h4 className="animate-fade-in-y text-2xl">hola</h4>
        </div>
        <Image
          src="/quickship.init.png"
          alt="init"
          className="bg-inherit cursor-pointer h-full"
          width={900}
          height={1000}
          priority
        />
        <div className="border border-sky-500 p-2 h-56"></div>
      </div>
      <div className="w-3/6	">
        como estas
        <button
          onClick={() => {
            console.log('click');
          }}
          className="p-20 bg-blue-500"
        >click</button>
      </div>
    </div>
  );
}
