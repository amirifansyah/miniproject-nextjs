import { formatIDR } from '@/utils/price';
import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Ikon untuk menutup modal

const ModalDetail = ({ isOpen, onClose, penjualanData }) => {
    if (!isOpen || !penjualanData) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out">
            <div className="bg-white rounded-lg shadow-lg w-96 transform transition-transform duration-300 ease-in-out">
                <div className="bg-gray-900 text-white p-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Detail Penjualan {penjualanData.id_nota}</h2>
                        <button onClick={onClose} className="text-gray-300 hover:text-white">
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-gray-700"><strong>Tanggal:</strong> {penjualanData.tanggal}</p>
                    <p className="text-gray-700"><strong>Nama Pelanggan:</strong> {penjualanData.pelanggan.nama}</p>
                    <p className="text-gray-700"><strong>Subtotal:</strong> {formatIDR(penjualanData.subtotal)}</p>
                    <h3 className="mt-4 text-md font-semibold">Items:</h3>
                    <ul className="list-disc pl-5">
                        {penjualanData.item_penjualans.map(item => (
                            <li key={item.id} className="text-gray-600">
                                {item.kode_barang} - {item?.barang?.nama} - Qty: {item.qty}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ModalDetail;
