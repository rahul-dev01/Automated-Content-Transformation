
import React from 'react';

const ViewDetailsModal = ({ entry, onClose }) => {
  if (!entry) return null;

  // For cattle predictions, entry.result might be the full JSON object
  // If it's a string (legacy data), just show it. Otherwise, extract useful info.
  const isObject = typeof entry.result === 'object' && entry.result !== null;
  const description = isObject ? (entry.result.description || entry.result.internet_details || "No description available") : entry.result;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-lg shadow-2xl border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Classification Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500 font-semibold">Date</span>
            <span className="text-slate-900 font-bold">{new Date(entry.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500 font-semibold">Breed</span>
            <span className="text-amber-600 font-black">{entry.breed || "Unknown"}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500 font-semibold">Animal Type</span>
            <span className="text-emerald-600 font-black capitalize">{entry.animalType || "Cattle"}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-3">
            <span className="text-slate-500 font-semibold">Confidence</span>
            <span className="text-slate-900 font-bold">{entry.confidence ? `${entry.confidence}%` : "N/A"}</span>
          </div>
          <div className="pt-2">
            <span className="text-slate-500 font-semibold block mb-2">Description / Info</span>
            <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl">{description}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors duration-300 cursor-pointer shadow-md hover:shadow-lg"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
