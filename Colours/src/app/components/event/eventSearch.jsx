"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import apiUrls from "@/app/components/utils/apiConfig";
import useUserRoleFromLocalStorage from "../hook/userRoleFromLocalstorage";

const API_URL = apiUrls;

export default function EventSearchPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("graduacion");
  const [searchLocation, setSearchLocation] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 3;

  const { userRole } = useUserRoleFromLocalStorage();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/evento?activo=true&tipo=graduacion`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error de servidor: ${response.status}`);
      }

      const resultData = await response.json();

      if (resultData.success && Array.isArray(resultData.data)) {
        setAllEvents(resultData.data);
        setFilteredEvents(resultData.data);
        setTotalPages(Math.ceil(resultData.data.length / eventsPerPage));
        updateDisplayedEvents(resultData.data, 1);
        setError(null);
      } else {
        setAllEvents([]);
        setFilteredEvents([]);
        setDisplayedEvents([]);
        throw new Error("Formato de respuesta incorrecto");
      }
    } catch (err) {
      setError(
        "No se pudieron cargar los eventos. Por favor intente nuevamente."
      );
      console.error("Error al cargar eventos:", err.message);
      setAllEvents([]);
      setFilteredEvents([]);
      setDisplayedEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedEvents = (events, page) => {
    const startIndex = (page - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    setDisplayedEvents(events.slice(startIndex, endIndex));
  };

  const filterEvents = () => {
    let filtered = [...allEvents];

    if (searchName && searchName.trim() !== "") {
      const searchTermLower = searchName.trim().toLowerCase();
      filtered = filtered.filter((event) =>
        event.nombre.toLowerCase().includes(searchTermLower)
      );
    }

    if (searchDate && searchDate !== "") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const nextWeekend = new Date(today);
      const dayOfWeek = today.getDay();
      const daysUntilSaturday = dayOfWeek === 6 ? 7 : 6 - dayOfWeek;
      nextWeekend.setDate(today.getDate() + daysUntilSaturday);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.fecha);
        eventDate.setHours(0, 0, 0, 0);

        switch (searchDate) {
          case "today":
            return eventDate.getTime() === today.getTime();
          case "tomorrow":
            return eventDate.getTime() === tomorrow.getTime();
          case "weekend":
            return eventDate >= today && eventDate <= nextWeekend;
          case "month":
            return eventDate >= today && eventDate <= nextMonth;
          default:
            return true;
        }
      });
    }

    if (searchLocation && searchLocation.trim() !== "") {
      const locationLower = searchLocation.trim().toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.salonNombre &&
          event.salonNombre.toLowerCase().includes(locationLower)
      );
    }

    setFilteredEvents(filtered);
    setTotalPages(Math.ceil(filtered.length / eventsPerPage));
    setCurrentPage(1);
    updateDisplayedEvents(filtered, 1);
  };

  useEffect(() => {
    if (mounted) {
      fetchAllEvents();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    filterEvents();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateDisplayedEvents(filteredEvents, page);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#12151f]/40 p-4">
        <div className="w-full max-w-md bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
          <p className="text-white text-sm">Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className=" w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md  p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-white mb-3">Buscar Evento</h2>

        <form onSubmit={handleSearch} className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Por nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] text-xs appearance-none"
            >
              <option value="" className="bg-[#1a1a1a]">
                Fecha
              </option>
              <option value="today" className="bg-[#1a1a1a]">
                Hoy
              </option>
              <option value="tomorrow" className="bg-[#1a1a1a]">
                Mañana
              </option>
              <option value="weekend" className="bg-[#1a1a1a]">
                Este fin de semana
              </option>
              <option value="month" className="bg-[#1a1a1a]">
                Este mes
              </option>
            </select>

            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] text-xs appearance-none"
            >
              <option value="" className="bg-[#1a1a1a]">
                Tipo
              </option>
              <option value="graduacion" className="bg-[#1a1a1a]">
                Graduación
              </option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Salón del Evento"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full p-2 bg-transparent text-white rounded border border-[#BF8D6B] placeholder-gray-400 text-xs"
          />

          <button
            type="submit"
            className="w-full font-bold py-2 px-2 rounded bg-[#BF8D6B] text-white text-sm"
          >
            Buscar
          </button>
          <p className="text-gray-400 text-xs text-center mt-1">
            Presiona Enter para buscar
          </p>
        </form>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BF8D6B] to-transparent my-4"></div>

        {loading ? (
          <div className="text-center py-3">
            <p className="text-white text-sm">Cargando eventos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="text-center py-3">
            <p className="text-white text-sm">No se encontraron eventos</p>
          </div>
        ) : (
          <>
            <div className="space-y-2 mb-3">
              {displayedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex justify-between items-center border border-[#BF8D6B] rounded p-2 w-full"
                >
                  <div className="text-white">
                    <p className="font-medium text-sm">{event.nombre}</p>
                    <p className="text-xs text-gray-400">
                      {event.salonNombre} - {formatDate(event.fecha)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Duración: {event.duracion} min | Capacidad:{" "}
                      {event.capacidad} personas
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (userRole) {
                        const path =
                          userRole === "admin"
                            ? `/prueba/vender/${event.id}`
                            : `/vendor/event/${event.id}`;
                        router.push(path);
                      }
                    }}
                    className="px-2 py-1 bg-[#BF8D6B] hover:bg-[#a67454] text-white font-medium rounded text-xs transition-colors ml-2"
                  >
                    Vender
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-3">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded text-xs ${
                    currentPage === 1
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-[#BF8D6B] text-white hover:bg-[#a67454]"
                  }`}
                >
                  &lt;
                </button>

                <span className="text-white text-xs">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded text-xs ${
                    currentPage === totalPages
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-[#BF8D6B] text-white hover:bg-[#a67454]"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
