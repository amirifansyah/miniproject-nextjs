import React from 'react';
import { formatIDR } from '@/utils/price';
import { FaTimes } from 'react-icons/fa';

const ModalDetailBarang = ({ onClose, barang }) => {
    if (!barang) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded shadow-md w-96">
                <div className="bg-gray-800 text-white p-4 rounded-t relative">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Detail Barang</h2>
                        <button onClick={onClose} className="text-gray-300 hover:text-white">
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <strong>Kode:</strong> {barang.kode}
                    </div>
                    <div className="mb-4">
                        <strong>Nama:</strong> {barang.nama}
                    </div>
                    <div className="mb-4">
                        <strong>Kategori:</strong> {barang.kategori}
                    </div>
                    <div className="mb-4">
                        <strong>Harga:</strong> {formatIDR(barang.harga)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetailBarang;
