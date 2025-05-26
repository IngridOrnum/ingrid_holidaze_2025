import React from 'react';

export function Modal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded shadow-lg items-center flex flex-col gap-4">
                <p className="mb-4 text-lg font-text">{message}</p>
                <div className="flex gap-4">
                    <button
                        onClick={onConfirm}
                        className="font-text bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
                    >
                        Yes, Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="font-text bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        No, Keep
                    </button>
                </div>
            </div>
        </div>
    );
}
