import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import LoadingHolder from "~/components/LoadingHolder";

import { listClients, destroyClient } from "~/actions/clients";

export default function List() {
  const queryClient = useQueryClient();

  // clients.isLoading = vai indicar um carregamento ta rolando ou nao
  // clients.data = conter os dados do servidor após o carregamento (ou do cache)
  // clients.status = success, error ou loading
  // clients.error = mensagem de erro que veio do servidor
  const clients = useQuery("clients", listClients);

  const fetchDestroyClient = useMutation(item => destroyClient(item.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
    },
  });

  const isLoading = !!clients.isLoading || !!fetchDestroyClient.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      {clients.status === "error" && (
        <div className="alert alert-danger fade show" role="alert">
          Não foi possível receber a lista de clients do sistema neste momento
        </div>
      )}
      {fetchDestroyClient.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível exluir este cliente neste momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyClient.reset()}></button>
        </div>
      )}
      {fetchDestroyClient.status === "success" && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Client excluído com sucesso!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyClient.reset()}></button>
        </div>
      )}
      <div className="table-responsive">
        {/* botão de adicionar clientes */}
        <Link className="btn btn-outline-dark float-end" to="/clients/add" role="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
          </svg>
        </Link>
        <h2 className="h3 mb-4 fw-normal">Clients cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
            <th className="text-center" style={{ width: 10 }}>
                ID  </th>
              <th className="text-center" style={{ width: 125 }}>
                Nome fantasia  </th>
              <th className="text-center" style={{ width: 125 }}>
                CNPJ  </th>
              <th className="text-center" style={{ width: 125 }}>
                E-mail </th>
              <th className="text-center" style={{ width: 125 }}>
                Telefone </th>
              <th className="text-center" style={{ width: 146 }}>
                Ações </th>

            </tr>
          </thead>
          {!!clients.data && (
            <tbody>
              {clients.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-5">
                    Nenhum cliente cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {clients.data.map(item => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.nome_fantasia}</td>
                  <td className="text-center">{item.cnpj}</td>
                  <td className="text-center">
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td className="text-center">{item.telefone}</td>

                  <td className="text-center">
                    <Link to={`/clients/edit/${item.id}`} role="button">
                      {/* botão de editar */}
                      <svg style={{color:"Black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </Link>
                    <a style={{marginLeft:"10px"}}
                      onClick={event => {
                        event.preventDefault();
                        if (window.confirm(`Você confirma a exclusão do cliente ${item.nome_fantasia}?`)) {
                          fetchDestroyClient.mutate(item);
                        }
                      }}
                      // botão de excluir
                      role="button">
                      <svg style={{color:"Black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </LoadingHolder>
  );
}
