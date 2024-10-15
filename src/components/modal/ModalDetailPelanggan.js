import React from 'react';

const ModalDetail = ({ pelanggan, onClose, onDelete }) => {
    if (!pelanggan) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96">
                <div className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <h2 className="text-lg font-bold">Detail Pelanggan</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-400">
                        &times; 
                    </button>
                </div>
                <div className="p-6">
                    <p><strong>ID Pelanggan:</strong> {pelanggan.id_pelanggan}</p>
                    <p><strong>Nama:</strong> {pelanggan.nama}</p>
                    <p><strong>Domisili:</strong> {pelanggan.domisili}</p>
                    <p><strong>Jenis Kelamin:</strong> {pelanggan.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalDetail;
