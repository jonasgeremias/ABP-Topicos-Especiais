import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import LoadingHolder from "~/components/LoadingHolder";
import { API_URL } from "~/env";

import { listDocuments, destroyDocument } from "~/actions/documents";
import { sendEmail } from "~/actions/clients";

const estiloDataVencida = { backgroundColor: "#F7C8C8" }

export default function List() {
  const navigate = useNavigate();
  const documents = useQuery("documents", listDocuments);

  const enviaEmail = item => {
    if (window.confirm(`Você deseja informar ao cliente sobre vencimento do documento ${item.nome}?`)) {
      const result = sendEmail(item.client_id, "PortalDocs - Aviso de documento vencido",
        `O documento ${item.nome} com data de vencimento ${item.data_validade} expirou.`)




      if (result !== null) {
        alert("Email enviado com sucesso")
      }
      else {
        alert("Falha ao enviar Email")
      }
    }
  }

  const verificaData = data => {
    const dataAtual = new Date().getTime();
    const dataDoc = new Date(data).getTime();
    return (dataAtual >= dataDoc)
  }

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
        <Link className="btn btn-outline-dark float-end" to="/documents/add" role="button">          
          <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" /></svg>
        </Link>
        <h2 className="h3 mb-4 fw-normal">Documents cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Nome </th>
              <th className="text-center" style={{ width: 125 }}>
                ID da Empresa
              </th>
              <th className="text-center" style={{ width: 300 }}>
                Descrição
              </th>
              <th className="text-center" style={{ width: 150 }}>
              Data de validade
              </th>
              <th className="text-center" style={{ width: 100 }}>
              Categoria
              </th>
              <th className="text-center" style={{ width: 80 }}>
              Download
              </th>
              <th className="text-center" style={{ width: 120 }}>
                Ações
              </th>
            </tr>
          </thead>
          {!!documents.data && (
            <tbody>
              {documents.data.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-5">
                    Nenhum documento cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {documents.data.map(item => (
                <tr key={item.id}
                  style={verificaData(item.data_validade) ? estiloDataVencida : null} >

                  <td>{item.nome}</td>

                  <td className="text-center"> <a> {item.client_id} </a></td>

                  <td className="text-center"> <a> {item.descricao} </a></td>

                  <td className="text-center"> <a> {item.data_validade} </a></td>

                  <td className="text-center"> <a> {item.categoria} </a></td>

                  {/* Baixar documento */}
                  <td className="text-center"><a href={API_URL + '/' + item.path}
                    target="_blank" rel="noopener noreferrer" role="button">
                      <svg style={{color:"Black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>  </a></td>

                  <td className="text-center">
                    <Link to={`/documents/edit/${item.id}`} role="button">
                      <svg style={{color:"Black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </Link>
                    <a style={{ marginLeft: "10px" }}
                      onClick={event => {
                        event.preventDefault();
                        if (window.confirm(`Você confirma a exclusão do documento ${item.nome}?`)) {
                          fetchDestroyDocument.mutate(item);
                        }
                      }}
                      role="button">
                      <svg style={{color:"Black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                      </svg>
                    </a>
                    <a style={{ marginLeft: "10px" }}
                      onClick={event => { event.preventDefault(); enviaEmail(item) }}
                      role="button">
                      <svg style={{color:"Black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
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
