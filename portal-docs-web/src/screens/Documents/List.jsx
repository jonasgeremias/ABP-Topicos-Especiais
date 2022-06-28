import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingHolder from "~/components/LoadingHolder";

import { listDocuments, destroyDocument } from "~/actions/documents";

export default function List() {
  const navigate = useNavigate();
  const documents = useQuery("documents", listDocuments);

  const fetchDestroyDocument = useMutation(item => destroyDocument(item.id), {
    onSuccess: () => navigate("/documents", { replace: true }),
  });
  
  return (
    <LoadingHolder loading={!!documents.isLoading || !!fetchDestroyDocument.isLoading}>
      {documents.status === "error" && (
        <div className="alert alert-danger fade show" role="alert">
          Não foi possível receber a lista de documents do sistema neste momento
        </div>
      )}
      {fetchDestroyDocument.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível exluir este documento neste momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyDocument.reset()}></button>
        </div>
      )}
      {fetchDestroyDocument.status === "success" && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Documento excluído com sucesso!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyDocument.reset()}></button>
        </div>
      )}
      <div className="table-responsive">
        <Link className="btn btn-primary float-end" to="/documents/add" role="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>{" "}
          Adicionar Documento
        </Link>
        <h2 className="h3 mb-4 fw-normal">Documents cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="text-center" style={{ width: 112 }}>
                Clientes
              </th>
              <th className="text-center" style={{ width: 146 }}>
                Ações
              </th>
            </tr>
          </thead>
          {!!documents.data && (
            <tbody>
              {documents.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-5">
                    Nenhum documento cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {documents.data.map(item => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td className="text-center">{item.clientsCount}</td>
                  <td className="text-center">
                    <Link className="btn btn-info btn-sm" to={`/documents/edit/${item.id}`} role="button">
                      Editar
                    </Link>
                    <a
                      onClick={event => {
                        event.preventDefault();
                        if (window.confirm(`Você confirma a exclusão do documento ${item.nome}?`)) {
                          fetchDestroyDocument.mutate(item);
                        }
                      }}
                      className="btn btn-danger btn-sm"
                      href="#delete-document"
                      role="button">
                      Excluir
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
