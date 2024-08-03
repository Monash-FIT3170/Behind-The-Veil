/**
 * File Description: Artist gallery modal
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 * Source/Credit: https://gist.github.com/nimone/c2a86eb3f8b0baae619e23635c741107
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
            src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="gallery-photo"
            onClick={() => setOpen(true)}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
