import React, { useState, useEffect } from 'react';
import ViewDetailsModal from '../components/ViewDetailsModal';

const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/cattle/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      // The backend returns an array directly, not an object with a history property
      setHistory(Array.isArray(data) ? data : data.history || data.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/cattle/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        setHistory(history.filter((entry) => entry._id !== id));
      } else {
        alert("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const openModal = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-amber-600 uppercase bg-amber-50 rounded-xl border border-amber-100">
              Records Management
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Classification History
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Review and manage your past breed identifications. Track changes and download reports.
            </p>
          </div>
          <button 
            onClick={fetchHistory}
            className="group flex items-center justify-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-2xl hover:border-amber-500/30 hover:bg-amber-50/30 transition-all duration-300 text-slate-900 font-bold shadow-sm"
          >
            <svg className={`w-5 h-5 transition-transform duration-700 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Records
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.06)] overflow-hidden border border-slate-100">
          {isLoading ? (
            <div className="py-32 text-center">
              <div className="relative inline-block">
                <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                </div>
              </div>
              <p className="mt-6 text-slate-500 font-bold text-lg">Retrieving your records...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900">
                    <th className="px-8 py-6 font-black text-xs uppercase tracking-[0.2em] text-slate-400">#</th>
                    <th className="px-8 py-6 font-black text-xs uppercase tracking-[0.2em] text-slate-400">Date</th>
                    <th className="px-8 py-6 font-black text-xs uppercase tracking-[0.2em] text-slate-400">Breed</th>
                    <th className="px-8 py-6 font-black text-xs uppercase tracking-[0.2em] text-slate-400">Result</th>
                    <th className="px-8 py-6 font-black text-xs uppercase tracking-[0.2em] text-slate-400 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((entry, index) => (
                    <tr key={entry._id} className="group hover:bg-slate-50/80 transition-all duration-300">
                      <td className="px-8 py-6">
                        <span className="text-slate-400 font-black text-sm">{String(index + 1).padStart(2, '0')}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-bold">
                            {new Date(entry.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="text-slate-400 text-xs font-medium">
                            {new Date(entry.createdAt).toLocaleTimeString(undefined, {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span className="px-4 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-black border border-amber-100">
                            {entry.breed ? entry.breed.replace("Breed name : ", "") : "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-slate-600 font-bold text-sm">
                          {entry.animalType ? entry.animalType : "cattle"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => openModal(entry)}
                            className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer shadow-sm group/btn"
                            title="View Details"
                          >
                            <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteEntry(entry._id)}
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer shadow-sm group/btn"
                            title="Delete Entry"
                          >
                            <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-32 text-center px-6">
              <div className="bg-slate-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">No records found</h3>
              <p className="text-slate-500 mb-12 max-w-sm mx-auto text-lg leading-relaxed">Your classification history will appear here once you start identifying cattle breeds.</p>
              <button 
                onClick={() => window.location.href='/upload'}
                className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_20px_40px_rgba(217,119,6,0.2)] hover:-translate-y-1 active:scale-95"
              >
                Identify First Breed
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ViewDetailsModal entry={selectedEntry} onClose={closeModal} />
      )}
    </div>
  );
};

export default History;
