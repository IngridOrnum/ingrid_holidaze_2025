export function Modal({ isOpen, onClose, onConfirm, message, confirmText = "Confirm", cancelText = "Cancel" }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded shadow-lg items-center flex flex-col gap-4">
                <p className="mb-4 text-lg font-text">{message}</p>
                <div className="flex gap-4">
                    <button
                        onClick={onConfirm}
                        className="font-text bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="font-text bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}
