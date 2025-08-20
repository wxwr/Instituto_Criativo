import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setProfileImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.post("/api/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Perfil atualizado com sucesso:", response.data);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Configurações do Perfil</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo de Nome */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo de Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Upload de Imagem */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Foto de Perfil</label>
          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          >
            <input {...getInputProps()} />
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <p className="text-gray-500">Arraste e solte uma imagem aqui, ou clique para selecionar</p>
            )}
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;