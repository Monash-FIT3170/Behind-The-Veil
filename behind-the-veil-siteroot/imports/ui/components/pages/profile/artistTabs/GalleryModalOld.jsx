/**
 * File Description: Artist gallery modal
 * File version: 1.0
 * Contributors: Kefei (Phillip) Li
 * Reference/Cite: https://gist.github.com/nimone/c2a86eb3f8b0baae619e23635c741107
 */

import React from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function GalleryModalOld({ open, onClose, children }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-baseline pt-20 transition-colors
        ${open ? "visible bg-black/50" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          sticky bg-white rounded-xl shadow p-6 m-8 transition-all w-full
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="columns-2 w-full">
          <div className="w-full h-full">
            <img
              className="w-full h-full object-cover"
              src={children}
              alt="gallery-photo"
              onClick={() => setOpen(true)}
            />
          </div>

          <div>hello</div>
        </div>
      </div>
    </div>
  );
}
