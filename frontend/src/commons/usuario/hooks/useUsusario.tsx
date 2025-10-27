import { useState, useEffect } from "react";
import type{ Usuario } from "../types/types";
import { getUsuarios, createUsuario } from "../services/services";

const useUsuario = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const addUsuario = async (usuario: Omit<Usuario, 'id'>) => {
    setLoading(true);
    try {
      const data = await createUsuario(usuario);
      setUsuarios((prevUsuarios) => [...prevUsuarios, data]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    addUsuario,
  };
};

export default useUsuario;