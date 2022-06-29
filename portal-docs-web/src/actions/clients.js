import axios from "axios";
import * as Yup from "yup";

export async function listClients() {
  const { data } = await axios.get(`/clients`);
  return data;
}

export async function findClient(id) {
  const { data } = await axios.get(`/clients/${id}`);
  return data;
}

export async function createClient(formData) {
  const { data } = await axios.post(`/clients`, formData);
  return data;
}

export async function updateClient(id, formData) {
  const { data } = await axios.put(`/clients/${id}`, formData);
  return data;
}

export async function destroyClient(id) {
  const { data } = await axios.delete(`/clients/${id}`);
  return data;
}

export async function sendEmail(id_client, title, message) {
  try {
    const formData = {
      title, message
    }
    const { data } = await axios.post(`/email/send/${id_client}`, formData);
    return data;
  }
  catch (err) { console.log(err.error, err.message) }

  return null;
}


/*****************************************************************************/

export const validationSchema = Yup.object({
  razao_social: Yup.string().required("Campo obrigatório"),
  nome_fantasia: Yup.string().required("Campo obrigatório"),
  inscricao_estadual: Yup.string().matches(/^[0-9]{9}$/, 'Campo precisa ter 9 números').required("Campo obrigatório"),
  inscricao_municipal: Yup.string().matches(/^[0-9]{11}$/, 'Campo precisa ter 11 números').required("Campo obrigatório"),
  cnpj: Yup.string().matches(/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/, 'CNPJ inválido').required("Campo obrigatório"),
  endereco: Yup.string().required("Campo obrigatório"),
  bairro: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
  estado: Yup.string().required("Campo obrigatório"),
  cep: Yup.string().matches(/^[0-9]{5}\-?[0-9]{3}$/, 'CEP inválido').required("Campo obrigatório"),
  telefone: Yup.string().matches(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/, 'Telefone inválido').required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório")
});

export const initialValuesFields = {
  razao_social: '',
  nome_fantasia: '',
  inscricao_estadual: '',
  inscricao_municipal: '',
  cnpj: '',
  endereco: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
  telefone: '',
  email: ''
}

export const Fields = [
  { id: "nome_fantasia", type: "text", label: "Nome Fantasia" },
  { id: "email", type: "text", label: "E-mail" },
  { id: "razao_social", type: "text", label: "Razão Social" },
  { id: "inscricao_estadual", type: "number", label: "Inscricao Estadual" },
  { id: "inscricao_municipal", type: "number", label: "Inscricao Municipal" },
  { id: "cnpj", type: "text", label: "CNPJ" },
  { id: "telefone", type: "text", label: "Telefone" },
  { id: "endereco", type: "text", label: "Endereco" },
  { id: "bairro", type: "text", label: "Bairro" },
  { id: "cidade", type: "text", label: "Cidade" },
  { id: "estado", type: "text", label: "Estado" },
  { id: "cep", type: "text", label: "Cep" }
]



