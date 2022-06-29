import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useFormik } from "formik";
// import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { createDocument, validationSchema, initialValuesFields, Fields } from "~/actions/documents";

import { hasFormError } from "~/utils";
import { useState } from "react";


export default function Add() {
  const navigate = useNavigate();

  const [fileError, setFileError] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const fetchCreateDocument = useMutation(createDocument, {
    onSuccess: () => navigate("/documents", { replace: true }),
  });

  const handleGetFile = (e) => {
    const file = e.target.files[0];
    if (file.size > (1024 * 1024 * 1024)) // 1 GB
      setFileError("Arquivo não pode ser maior que 1GB.");
    else {
      setFileError("");
      setSelectedFile(file)
    }
  }

  const formik = useFormik({
    initialValues: initialValuesFields,
    validationSchema,
    onSubmit: values => {
      const form = {
        body: JSON.stringify(values),
        file:selectedFile
      }
      fetchCreateDocument.mutate(form);
    },
  });

  return (
    <LoadingHolder loading={!!fetchCreateDocument.isLoading}>
      {fetchCreateDocument.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível salvar este novo documento no momento!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchCreateDocument.reset()}></button>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Adicionando novo Document</h2>

        {Fields.map(Field => {
          return <SysInput
            key={Field.id}
            id={Field.id}
            type={Field.type}
            label={Field.label}
            value={formik.values[Field.id]}
            onChange={formik.handleChange}
            error={hasFormError(formik, Field.id)}
          />
        })}

        <input
          id='file'
          type='file'
          className={`form-control ${!!fileError ? "is-invalid" : ""}`}
          placeholder='Adicione o arquivo'
          value={selectedFile?.filename}
          onChange={(e) => handleGetFile(e)}
        />

        <button disabled={!!fetchCreateDocument.isLoading} className="btn btn-lg btn-dark mt-3" type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
}
