import { useUsuario } from "~/context/UsuarioContext";

export default function Home() {
  const { usuario } = useUsuario();

  return (

    <div class="jumbotron jumbotron-fluid">      
    <div class="container">
    <h1 className="display-5 fw-bold">Olá {usuario?.nome}</h1>
    <p className="lead mb-4">
      Seja bem-vindo o <strong>Portal Docs</strong>, um sistema completo de gerencimento dos documento de sua empresa.
    </p>
    </div>
    </div>    
  );
}