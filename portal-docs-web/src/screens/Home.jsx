import { useUsuario } from "~/context/UsuarioContext";

export default function Home() {
  const { usuario } = useUsuario();

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Olá {usuario?.nome}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Seja bem-vindo o <strong>Portal Docs</strong>, um sistema completo de gerencimento dos documento de sua
          empresa.
        </p>
      </div>
    </div>
  );
}
