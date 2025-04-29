"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, selectUser } from "@/lib/slices/profileSlice";
import Swal from "sweetalert2";
import apiUrls from "@/app/components/utils/apiConfig";

// Clave para localStorage con nombre poco obvio
const STORAGE_KEY = "app_session_ref";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const userFromRedux = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Obtener el ID del usuario desde localStorage
        const userId = localStorage.getItem(STORAGE_KEY);
        
        if (!userId) {
          setLoading(false);
          return; // Si no hay ID, simplemente terminamos la carga
        }
        
        // Hacer la petición con Axios
        const response = await axios.get(`${apiUrls.production}/api/users/perfil/${userId}`);
        const userData = response.data;
        console.log("Datos del perfil:", userData);
        
        // Si hay datos, actualizar el formulario
        if (userData) {
          setFormData({
            fullName: `${userData.nombre || ''} ${userData.apellido || ''}`.trim(),
            address: userData.direccion || '',
            email: userData.email || '',
            whatsapp: userData.whatsapp || '',
          });
        }
      } catch (err) {
        console.error("Error al obtener datos del perfil:", err);
        setErrors({
          general: "No se pudieron cargar los datos del perfil. Intenta nuevamente."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es obligatorio";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }
    
    // Validar que whatsapp solo contenga números
    if (formData.whatsapp && !/^[0-9+\s-]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "El WhatsApp debe contener solo números, +, espacios o guiones";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para whatsapp, solo permitir números, +, espacios y guiones
    if (name === 'whatsapp' && value && !/^[0-9+\s-]+$/.test(value)) {
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }
    
    try {
      const userId = localStorage.getItem(STORAGE_KEY);
      if (!userId) return;
      
      // Preparar los datos para enviar
      let nombre = formData.fullName;
      let apellido = "";
      
      if (formData.fullName.includes(" ")) {
        const nameParts = formData.fullName.split(" ");
        nombre = nameParts[0];
        apellido = nameParts.slice(1).join(" ");
      }
      
      const dataToSend = {
        nombre,
        apellido,
        direccion: formData.address,
        email: formData.email,
        whatsapp: formData.whatsapp,
      };
      
      // Enviar la actualización
      const response = await axios.put(`${apiUrls.production}/api/users/${userId}`, dataToSend);
      
      // Si la actualización fue exitosa
      if (response.status === 200) {
        // Actualizar el estado global en Redux
        if (userFromRedux) {
          const updatedUser = {
            ...userFromRedux,
            nombre,
            apellido,
            direccion: formData.address,
            email: formData.email,
            whatsapp: formData.whatsapp,
          };
          
          dispatch(setUserData({
            user: updatedUser,
            auth0User: userFromRedux.auth0User
          }));
        }
        
        // Mostrar mensaje de éxito con SweetAlert
        Swal.fire({
          title: "¡Perfil actualizado!",
          text: "Los cambios se han guardado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#BF8D6B",
        });
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      
      // Mostrar mensaje de error
      setErrors({
        general: "Error al actualizar el perfil. Verifica que los datos sean correctos."
      });
      
      // Mostrar formato esperado
      setErrors(prev => ({
        ...prev,
        format: "Formato esperado: Nombre, Apellido, Dirección, Email, WhatsApp (solo números)"
      }));
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-full w-full flex-col items-center p-4">
        <div className="w-full max-w-md animate-pulse">
          <div className="h-8 w-32 bg-gray-700 mb-6 rounded"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center p-4">
      <div className="w-full max-w-md">
        {/* Encabezado con título */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
        </div>

        {/* Mensajes de error generales */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-md text-red-200 text-sm">
            {errors.general}
          </div>
        )}
        
        {errors.format && (
          <div className="mb-4 p-3 bg-blue-900/50 border border-blue-500 rounded-md text-blue-200 text-sm">
            {errors.format}
          </div>
        )}

        {/* Formulario de perfil */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nombre y Apellido"
              className={`w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none ${
                errors.fullName ? "border-red-500" : "border-[#BF8D6B]"
              }`}
              style={{
                backgroundColor: "transparent",
              }}
              required
            />
            {errors.fullName && (
              <p className="mt-1 text-red-400 text-xs">{errors.fullName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dirección"
              className="w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none"
              style={{
                backgroundColor: "transparent",
                borderColor: "#BF8D6B",
              }}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none ${
                errors.email ? "border-red-500" : "border-[#BF8D6B]"
              }`}
              style={{
                backgroundColor: "transparent",
              }}
              required
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp (solo números)"
              className={`w-full rounded-md border p-3 text-white placeholder-gray-400 focus:outline-none ${
                errors.whatsapp ? "border-red-500" : "border-[#BF8D6B]"
              }`}
              style={{
                backgroundColor: "transparent",
              }}
            />
            {errors.whatsapp && (
              <p className="mt-1 text-red-400 text-xs">{errors.whatsapp}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-md py-3 font-medium text-white transition-colors hover:bg-[#A77A5B]"
              style={{ backgroundColor: "#BF8D6B" }}
            >
              Actualizar Perfil
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button className="text-sm text-gray-300 hover:text-white">Cambiar Contraseña</button>
        </div>
      </div>
    </div>
  );
}