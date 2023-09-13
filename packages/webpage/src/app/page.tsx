import Image from "next/image";
import { Slider} from "../components/Slider"

import * as styles from "../components/Navbar/styles";
export default function Home() {
  return (
  
    <div>  
      <Slider></Slider>
      <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum distinctio molestias esse omnis illo qui, accusantium quas est, velit molestiae dolorum quae sit sequi? Ullam eius expedita voluptatum odit quo?</div> 
    </div>
    /*<div className="mt-28 ">
      <div className="h-96">
        <div className="object-cover h-96 w-full flex justify-center">
          <Image
            src="/quickship.init.png"
            alt="init"
            className="bg-inherit cursor-pointer object-cover"
            width={900}
            height={100}
            priority
          />
          <button className="absolute bottom-10 left-10">hola</button>
        </div>
      </div>
      <div className="h-96 flex flex-row w-full m-2">
        <div className="basis-1/2 text-center">
          <div className="text-xl mb-2">Realiza tus envios como de rayo</div>
          <button
            className={` border-2 ${styles.DEGRADIENT} w-64 text-white h-16`}
          >
            Cotiza tu envio
          </button>
        </div>
        <div className="basis-1/2">
          <div className="text-xl text-center	font-medium m-4">
            Crecemos contigo, haciendo de quickship una excelente plataforma
            para hacer tus envios mas faciles, nuestro trabajo es brindar el
            mejor servicio y seguridad de tus paquetes.
          </div>
          <button className="block">realizar un envio</button>
        </div>
      </div>
      <div className="h-96 text-amber-300">tres</div>
      <div className="h-96 text-amber-300">cuatro</div>
    </div>*/
  );
}
