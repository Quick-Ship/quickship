import "../../app/globals.css";

interface EmailTemplateProps {
  firstName: string;
  url: string;
}

export const EmailTemplate = ({ firstName, url }: EmailTemplateProps) => (
  <div className="">
    <h1 className="text-4xl font-bold text-slate-600 p-5">
      ¡{firstName}, estás a un paso de hacer tus envíos más facil!
    </h1>
    <p className="p-2" style={{ fontSize: "25px" }}>
      Queremos proteger tus datos, nadie de nuestro equipo te pedirá información
      adicional, solo tienes que agregar una contraseña para ver tu perfil en
      nuestro sitio web, ingresa y haz tu primer envió.
    </p>
    <div style={{ marginLeft: "35%" }}>
      <button
        style={{
          padding: "20px",
          backgroundColor: "#36A2EF",
          borderRadius: "10px",
          border: "3px",
          borderColor: "#36A2EF",
          boxShadow: "none",
        }}
      >
        <a
          href={url}
          style={{
            color: "white",
            fontSize: "18px",
            textDecorationLine: "underline",
          }}
        >
          Reset password
        </a>
      </button>
    </div>
  </div>
);
