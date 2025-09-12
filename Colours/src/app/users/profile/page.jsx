"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import apiUrls from "@/app/components/utils/apiConfig";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { clearUserData } from "@/lib/slices/profileSlice";
import { useRouter } from "next/navigation";

const API_URL = apiUrls;

export default function ProfilePage() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    address: "",
    email: "",
    whatsapp: "",
    dni: "",
    usuario: "",
  });
  const [errors, setErrors] = useState({});
  const { loginWithRedirect, logout } = useAuth0();
  const dispatch = useDispatch();
  const router = useRouter();
  const STORAGE_KEY = "app_session_ref";
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!authData || !authData.user) {
          setLoading(false);
          return;
        }

        const userId = authData.user.id || authData.user._id;
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/users/perfil/${userId}`,
          {
            headers: {
              ...(authData.token && {
                Authorization: `Bearer ${authData.token}`,
              }),
            },
          }
        );

        const userData = response.data;
        if (userData) {
          setFormData({
            nombre: userData.nombre || "",
            apellido: userData.apellido || "",
            address: userData.direccion || "",
            email: userData.email || "",
            whatsapp: userData.whatsapp || "",
            dni: userData.dni || "",
            usuario: userData.usuario || "",
          });
        }
      } catch (err) {
        console.error("Error al obtener datos del perfil:", err);
        setErrors({
          general: "No se pudieron cargar los datos del perfil.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El formato del email no es válido";
    if (formData.whatsapp && !/^[0-9+\s-]+$/.test(formData.whatsapp))
      newErrors.whatsapp =
        "El WhatsApp debe contener solo números, +, espacios o guiones";
    if (!formData.usuario.trim())
      newErrors.usuario = "El nombre de usuario es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "whatsapp" && value && !/^[0-9+\s-]+$/.test(value)) return;

    if (name === "dni") {
      const validatedValue = value.replace(/[^0-9MFmf]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: validatedValue.toUpperCase(),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (!authData || !authData.user) {
        setSubmitting(false);
        setErrors({ general: "No hay sesión activa." });
        return;
      }

      const userId = authData.user.id || authData.user._id;
      if (!userId) {
        setSubmitting(false);
        setErrors({ general: "No se pudo determinar el ID del usuario." });
        return;
      }

      const dataToSend = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        direccion: formData.address,
        email: formData.email || null,
        whatsapp: formData.whatsapp || null,
        dni: formData.dni || null,
        usuario: formData.usuario,
      };

      const url = `${API_URL}/api/users/perfil/${userId}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(authData.token && {
            Authorization: `Bearer ${authData.token}`,
          }),
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Error al actualizar el perfil");

      if (authData && authData.user) {
        setAuthData({
          ...authData,
          user: { ...authData.user, ...dataToSend },
        });
      }

      Swal.fire({
        title: "¡Perfil actualizado!",
        text: "Los cambios se han guardado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#BF8D6B",
      });
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setErrors({ general: "Error al actualizar el perfil." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      dispatch(clearUserData());
      setAuthData(null);

      localStorage.removeItem("authData");
      localStorage.removeItem(STORAGE_KEY);

      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });

      setTimeout(async () => {
        await loginWithRedirect({
          screen_hint: "reset_password",
        });
      }, 500);
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "No se pudo cambiar la contraseña.",
        "error"
      );
    }
  };

  const roleLabels = {
    admin: "Administrador",
    vendor: "Vendedor",
    comun: "Común",
    graduado: "Graduado",
  };

  const handleAssignRole = async (role) => {
    try {
      if (!authData || !authData.user) {
        Swal.fire("Error", "No hay sesión activa.", "error");
        return;
      }

      const userId = authData.user.id || authData.user._id;
      if (!userId) {
        Swal.fire("Error", "No se pudo identificar al usuario.", "error");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/users/change-role/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(authData.token && {
              Authorization: `Bearer ${authData.token}`,
            }),
          },
          body: JSON.stringify({ rol: role }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Error al asignar el rol");
      }

      setAuthData({
        ...authData,
        user: { ...authData.user, rol: role },
      });

      Swal.fire({
        title: "¡Rol asignado!",
        text: `Ahora eres ${roleLabels[role] || role}`,
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#BF8D6B",
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center overflow-hidden">
        <p className="text-sm text-white">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-start overflow-hidden p-2 md:p-0">
      <div className="w-full max-w-4xl px-2 md:px-4">
        {/* Encabezado con botones de roles */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h1 className="text-lg font-bold text-white">
            {formData.nombre
              ? `${formData.nombre} ${formData.apellido}`
              : "Perfil"}
          </h1>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleAssignRole("vendor")}
              className="px-3 py-1.5 text-xs md:text-sm rounded bg-[#BF8D6B] text-white hover:bg-[#A77A5B] transition"
            >
              {isMobile ? "Vendedor" : "Asignar rol Vendedor"}
            </button>
            <button
              type="button"
              onClick={() => handleAssignRole("admin")}
              className="px-3 py-1.5 text-xs md:text-sm rounded bg-[#BF8D6B] text-white hover:bg-[#A77A5B] transition"
            >
              {isMobile ? "Admin" : "Asignar rol Administrador"}
            </button>
          </div>
        </div>

        {/* Errores generales */}
        {errors.general && (
          <div className="mb-4 p-2 bg-red-900/50 border border-red-500 rounded text-red-200 text-xs">
            {errors.general}
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {/* Usuario */}
          <div className="col-span-1 md:col-span-3">
            <div className="w-full">
              <label
                htmlFor="usuario"
                className="block text-xs font-medium text-gray-300 mb-1"
              >
                Usuario *
              </label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                value={formData.usuario || ""}
                onChange={handleChange}
                placeholder="Usuario *"
                className={`w-full rounded border px-3 py-2.5 text-sm text-white focus:outline-none ${
                  errors.usuario ? "border-red-500" : "border-[#BF8D6B]"
                }`}
                style={{ backgroundColor: "transparent" }}
                required
              />
              {errors.usuario && (
                <p className="mt-1 text-red-400 text-xs">{errors.usuario}</p>
              )}
            </div>
          </div>

          {/* Campos en 3 columnas en desktop, 1 columna en móvil */}
          {[
            { id: "nombre", label: "Nombre *", required: true },
            { id: "apellido", label: "Apellido *", required: true },
            { id: "dni", label: "DNI (Opcional)" },
            { id: "email", label: "Email (Opcional)" },
            { id: "whatsapp", label: "WhatsApp (Opcional)" },
            { id: "address", label: "Dirección (Opcional)" },
          ].map((field) => (
            <div key={field.id} className="col-span-1 md:col-span-1">
              <div className="w-full">
                <label
                  htmlFor={field.id}
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type="text"
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                  placeholder={field.label}
                  className={`w-full rounded border px-3 py-2.5 text-sm text-white focus:outline-none ${
                    errors[field.id] ? "border-red-500" : "border-[#BF8D6B]"
                  }`}
                  style={{ backgroundColor: "transparent" }}
                  required={field.required}
                />
                {errors[field.id] && (
                  <p className="mt-1 text-red-400 text-xs">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Botones */}
          <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row justify-start gap-3 mt-4">
            {/* <button
              type="button"
              className="flex-1 px-4 py-3 md:py-2 text-sm rounded bg-transparent border border-[#BF8D6B] text-[#BF8D6B] hover:bg-[#BF8D6B] hover:text-white transition"
            >
              Cancelar
            </button> */}
            <button
              type="submit"
              className="flex-1 px-4 py-3 md:py-2 text-sm rounded bg-transparent border border-[#BF8D6B] text-[#BF8D6B] hover:bg-[#BF8D6B] hover:text-white transition"
              disabled={submitting}
            >
              {submitting ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={handleChangePassword}
              className="flex-1 px-4 py-3 md:py-2 text-sm rounded bg-transparent border border-[#BF8D6B] text-[#BF8D6B] hover:bg-[#BF8D6B] hover:text-white transition"
            >
              {isMobile ? "Cambiar Pass" : "Cambiar Contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
