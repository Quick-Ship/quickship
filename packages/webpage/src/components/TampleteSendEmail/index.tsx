interface EmailTemplateProps {
  firstName: string;
  url: string;
}

export const EmailTemplate = ({ firstName, url }: EmailTemplateProps) => (
  <div className="">
    <h1 className="text-4xl font-bold text-slate-600 p-5">
      ¡{firstName}, estás a un paso de hacer tus envíos!
    </h1>
    <p className="p-2 text-base">
      Queremos proteger tus datos, nadie de nuestro equipo te pedirá información
      adicional, solo tienes que agregar una contraseña para ver tu perfil en
      nuestro sitio web, ingresa y haz tu primer envió.
    </p>
    <a
      href={url}
      className="border border-blue-500 p-4 cursor-pointer text-white font-bold underline underline-offset-4 rounded-lg w-72 flex justify-center bg-blue-500 shadow-2xl active:bg-blue-500 hover:bg-blue-600"
    >
      Reset password
    </a>
  </div>
);
