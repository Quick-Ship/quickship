import Image from "next/image";
import * as styles from "./styles";

export const Footer = () => {
    return (
       
        <footer className="w-full bg-[#2C2C38]">
            <div className={styles.CONTAINER_FOOTER}>
                <div className={styles.CONTAINER_COL_1}>
                <Image
                    src="/logo_footer.png"
                    alt="logo footer quickship"
                    className="bg-inherit cursor-pointer"
                    width={300}
                    height={180}
                    priority
                    />  
                </div>
                <div className={styles.CONTAINER_COL_2}>
                   <div className="text-white w-full lg:w-1/3">
                        <h2 className={styles.TITULO_COLUMN_FOOTER}>Contactanos</h2>
                            <h3 className={styles.SUBTITULO_COLUMN_FOOTER}>Teléfono</h3>
                                <p className="mb-2">55-8014-7271</p>
                            <h3 className={styles.SUBTITULO_COLUMN_FOOTER}>Correo electrónico</h3>
                                <p className="mb-2">contacto@quickship.app</p>
                                <p className="mb-2">Av Cuauhtémoc 1095, Col. Letran Valle, Benito Juárez, CDMX, 03650</p>
                   </div>
                   <div className="text-white w-full lg:w-1/3">
                        <h2 className={styles.TITULO_COLUMN_FOOTER}>Mapa de sitio</h2>
                            <p className="mb-2">Nosotros</p>
                            <p className="mb-2">Servicios</p>
                   </div>
                   <div className="text-white w-full lg:w-1/3">
                        <h2 className={styles.TITULO_COLUMN_FOOTER}>Síguenos</h2>
                        <p className="">
                        <a href="https://www.facebook.com/quikshipmx" target="_blank" className="text-white hover:text-white">
                        <Image
                        src="/icons8-facebook.svg"
                        alt="icon facebook"
                        className="bg-inherit cursor-pointer"
                        width={48}
                        height={48}
                        priority
                        />  
                        <span className="sr-only">Facebook page</span>
                        </a>
                    </p>
                   </div>
                </div>
            </div>
            <div className={styles.CONTENT_COPY}><p>&copy; 2023 QUIKSHIP / <a href="#" className="text-[#2C2C38] hover:text-white font-semibold">Aviso de privacidad</a></p></div>
        </footer>
       
    );
};