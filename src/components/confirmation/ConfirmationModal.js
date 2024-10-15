import React from 'react';

const ConfirmationModal = ({ onClose, onConfirm, message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
                <h2 className="text-lg font-bold mb-0 bg-gray-800 text-white p-4 rounded-t-lg">
                    Konfirmasi
                </h2>
                <p className="mb-4 p-6">{message}</p>
                <div className="flex justify-end p-4">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
