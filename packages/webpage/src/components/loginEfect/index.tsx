import Image from "next/image";
import "../../app/globals.css";

export const LoginEfect = () => {
  return (
    <div className="w-3/6 h-screen object-cover content-center max-sm:hidden cursor-pointer">
      <div className="h-32 flex">
        <div className="h-full w-96">
          <h4 className="h-full origin-top-left"></h4>
        </div>
        <div className="h-full w-4"></div>
        <h4
          id="paralelograma"
          className="animate-paralelograma-y w-40 h-28 bg-[#7fb9b1] "
        ></h4>
        <div className="h-full w-28"></div>
        <h4
          id="paralelograma"
          className="animate-paralelograma-y w-28 h-32 bg-[#f2bb06] "
        ></h4>
      </div>
      <Image
        src="/login.svg"
        alt="init"
        className="cursor-pointer h-auto animate-image-in-y bg-slate-100"
        width={900}
        height={100}
        priority
      />
      <div className="h-44 flex">
        <div className="h-44 w-80"></div>
        <div className="h-44 w-5"></div>
        <h4
          id="paralelograma-botton"
          className="animate-fade-in-y w-64 bg-[#7fb9b1] mt-5"
        ></h4>
        <div className="h-28 w-10"></div>
        <h4
          id="paralelograma-botton"
          className="animate-fade-in-y w-20 bg-[#f2bb06] mt-5"
        ></h4>
      </div>
    </div>
  );
};
