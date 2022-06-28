import axios from "axios";
import { yupToFormErrors } from "formik";
import * as Yup from "yup";

export async function listDocuments() {
  const { data } = await axios.get(`/documents`);
  return data;
}

export async function findDocument(id) {
  const { data } = await axios.get(`/documents/${id}`);
  return data;
}

export async function createDocument(form) {
  const formData = new FormData(); 
  formData.append('form', form.body);
  formData.append( "file", form.file, form.file.filename);

  console.log(formData)

  const { data } = await axios.post(`/documents`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;
}

export async function updateDocument(id, form) {

  const formData = new FormData(); 
  formData.append('form', form.body);
  
  if (form?.file) {
    formData.append( "file", form.file, form.file.filename);
  }

  const { data } = await axios.put(`/documents/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return data;

  // const { data } = await axios.put(`/documents/${id}`, formData);
  // return data;
}

export async function destroyDocument(id) {
  const { data } = await axios.delete(`/documents/${id}`);
  return data;
}

/*****************************************************************************/

export const validationSchema = Yup.object({
  nome: Yup.string().required("Campo obrigatório"),
  descricao: Yup.string().max(3000, "Descrição maior que permitida"),
  client_id: Yup.string().required("Campo obrigatório"),
  data_validade: Yup.date().required("Campo obrigatório"),
  categoria: Yup.string()
  // ,  file: Yup.mixed().required('File is required') 
});

/*
nome:req.body.nome,
descricao:req.body.descricao,
client_id: parseInt(req.body.client_id),
data_validade:req.body.data_validade,
categoria:req.body.categoria
*/

export const initialValuesFields = {
  nome: '',
  descricao: '',
  client_id: '',
  data_validade: '',
  categoria: '',
  // file: ''
}

export const Fields = [
  { id: "nome", type: "text", label: "Nome do documento" },
  { id: "descricao", type: "text", label: "Descrição do documento" },
  { id: "client_id", type: "number", label: "ID da Empresa" },
  { id: "data_validade", type: "date", label: "Data de validade" },
  { id: "categoria", type: "text", label: "Categoria" },
  // { id: "file", type: "file", label: "Adicione o arquivo" }
]