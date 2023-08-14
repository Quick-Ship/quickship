"use client";

import Image from "next/image";
import { Menu, menuList } from "../Menu";
import { useState } from "react";
import * as styles from "./styles";

export const Nabvar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const OPTION_CONTAINER = `${styles.OPTION_CONTAINER} ${styles.DEGRADIENT}
  ${
    openMenu
      ? "block transition-all ease-in-out duration-150 h-auto"
      : "hidden max-h-0"
  }`;

  return (
    <div
      className={`w-full fixed top-0 left-0 right-0 h-28 max-sm:h-14 flex justify-between ${styles.DEGRADIENT}`}
    >
      <div className="h-24 w-72 flex justify-center bg-trasparent mt-2 max-sm:hidden">
        <Image
          src="/quickship.svg"
          alt="quickship logo"
          className="bg-inherit cursor-pointer"
          width={100}
          height={24}
          priority
        />
      </div>
      <div className="w-3/6 flex justify-between max-sm:hidden items-center">
        <Menu />
      </div>
      <div className="w-72 max-sm:w-full max-sm:relative flex justify-center max-sm:justify-start max-sm:m-2 items-center">
        <div className="max-sm:hidden flex cursor-pointer">
          <h4 className="flex items-center text-white mr-2">Iniciar sesión</h4>
          <Image
            src="/circle-user-regular.svg"
            alt="user login"
            className="bg-inherit "
            width={35}
            height={24}
            onClick={() => {}}
            priority
          />
        </div>
        <div className="flex w-full justify-between md:hidden">
          <div className="flex">
            <Image
              src="/bars-solid.svg"
              alt="next login"
              className="bg-inherit w-8 h-8"
              width={35}
              height={24}
              priority
              onClick={() => setOpenMenu(!openMenu)}
            />
            <Image
              src="/quickship.svg"
              alt="quickship logo"
              className="bg-inherit ml-2 w-10 h-8"
              width={100}
              height={24}
              priority
            />
          </div>
          <div className="">
            <Image
              src="/circle-user-regular.svg"
              alt="user login"
              className="bg-inherit w-8 h-8"
              width={35}
              height={24}
              priority
            />
          </div>
        </div>
      </div>
      {openMenu && (
        <div className={OPTION_CONTAINER}>
          {menuList.map((i, index) => (
            <a
              key={index}
              className={`
              ${styles.OPTIONS}`}
              href={i.link}
              onClick={() => setOpenMenu(!openMenu)}
            >
              {i.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
