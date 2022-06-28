import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useUsuario } from "./context/UsuarioContext";

import AppLayout from "./layouts/AppLayout";
import LoginLayout from "./layouts/LoginLayout";

import Auth from "./screens/Auth";
import Home from "./screens/Home";

/* Documents */
import DocumentsList from "./screens/Documents/List";
import DocumentsAdd from "./screens/Documents/Add";
import DocumentsEdit from "./screens/Documents/Edit";

/* Clients */
import ClientsList from "./screens/Clients/List";
import ClientsAdd from "./screens/Clients/Add";
import ClientsEdit from "./screens/Clients/Edit";

// esse é um "layout" alternativo
// toda tela vem de um layout para informar os componentes padrão
// normalmente em um layout fica o top/menu e o rodapé, como temos
// no <AppLayout />. Aí aqui abaixo criei um layout que "testa" o
// login antes de dar permissão para chegar em determinadas áreas
function RequireLoginAppLayout(props) {
  let { isLogged } = useUsuario();
  let location = useLocation();

  // caso o usuário não esteja logado iremos impedir que a tela
  // requisitada seja aberta, ao invés de abrir a tela iremos redirecionar
  // para o /login
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // se chegar aqui é porque o usuário está logado logo pode abrir
  // o layout padrão que abriga todas as telas
  return <AppLayout {...props} />;
}

// esse segundo "layout" alternativo têm o efeito contrário do anterior
// serve para as telas "publicas" do tipo "login", "registro" e etc
// a ideia é só permitir o acesso a estas rotas se jutamente a pessoa
// NÃO ESTIVER LOGADA. Ou seja não faz sentidor permitir acessar o "/login"
// se a pessoa já estiver logada, ai nesse caso redirecionamentos para a capa
// do sistema que fica no endereço "/"
function PublicLoginLayout(props) {
  let { isLogged } = useUsuario();
  let location = useLocation();

  // se o usuário estiver logado redireciona para o dashboard "/"
  if (!!isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // se chegar aqui é porque NÃO ESTÁ LOGADO... logo iremos renderizar
  // o layout de login, uma tela mais limpa no caso sem acesso ao menu
  // do sistema
  return <LoginLayout {...props} />;
}

// Nesta funcão `App` temos todo o arcabouço de rotas e menus do nosso sistema
// aqui temos dois nichos principais de <Routes> um contém as rotas "publicas"
// que irá dispor as páginas de login, registro, esqueci minha senha e etc
// já o outro conjunto de <Routes> contém os menus do sistema em si, com rotas
// que só poderão ser navegadas se a pessoa estiver logada, como por exemplo
// "/Clients" e também "/documents"
function App() {
  return (
    <div className="App">
      <Routes>
        <Fragment>
          <Route element={<PublicLoginLayout />}>
            <Route path="/login" element={<Auth />} />
          </Route>
          <Route element={<RequireLoginAppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/documents">
              <Route index element={<DocumentsList />} />
              <Route path="add" element={<DocumentsAdd />} />
              <Route path="edit/:id" element={<DocumentsEdit />} />
            </Route>
            <Route path="/clients">
              <Route index element={<ClientsList />} />
              <Route path="add" element={<ClientsAdd />} />
              <Route path="edit/:id" element={<ClientsEdit />} />
            </Route>
          </Route>
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
