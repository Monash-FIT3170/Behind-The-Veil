/**
 * File Description: Artist gallery modal
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 * Reference/Cite: https://gist.github.com/nimone/c2a86eb3f8b0baae619e23635c741107
 */

import React from "react";

export default function GalleryModal({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div>
          <img
            className="h-auto max-w-full rounded-lg object-cover object-center"
            src={children}
            alt="gallery-photo"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}
