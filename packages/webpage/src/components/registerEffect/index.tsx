import Image from "next/image";

export const RegisterEffect = () => {
  return (
    <div className=" max-sm:hidden">
      <div className="h-40 flex justify-between content-center">
        <div className="rounded-full w-36 h-36 mt-10 ml-2 flip bg-[#4bab9b]"></div>
        <div className="rounded-full w-20 h-20 mt-28 ml-16 flip bg-[#4bab9b]"></div>
        <div className="rounded-full w-32 h-32 mt-4 flip bg-[#4bab9b]"></div>
      </div>
      <div className="brackgound-image w-full h-96">
        <Image
          src="/iconRegister.svg"
          alt="init"
          className="grow h-96"
          width={1000}
          height={1000}
          priority
        />
      </div>
      <div className="flex justify-between content-center">
        <div className="rounded-full w-36 h-36 mt-6 ml-2 flip bg-[#1cccbc]"></div>
        <div className="rounded-full w-20 h-20 mt-32 ml-16 flip bg-[#1cccbc]"></div>
        <div className="rounded-full w-32 h-32 mt-[-20px] flip bg-[#1cccbc]"></div>
      </div>
    </div>
  );
};
