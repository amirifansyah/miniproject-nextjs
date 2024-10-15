import { useEffect, useState } from 'react';
import api from '../utils/api';
import ModalPenjualan from '@/components/modal/ModalPenjualan';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import ModalDetail from '@/components/modal/ModalDetail';
import { formatIDR } from '@/utils/price';
import ConfirmationModal from '@/components/confirmation/ConfirmationModal';

const Penjualan = () => {
    const [penjualan, setPenjualan] = useState([]);
    const [pelanggan, setPelanggan] = useState([]);
    const [barangs, setBarangs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for confirmation modal
    const [currentPenjualan, setCurrentPenjualan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async (page = 1) => {
            setLoading(true);
            try {
                const [penjualanResponse, pelangganResponse, barangsResponse] = await Promise.all([
                    api.get(`/penjualan?page=${page}`),
                    api.get('/pelanggan'),
                    api.get('/barang'),
                ]);

                setPenjualan(penjualanResponse.data.data);
                setTotalPages(penjualanResponse.data.last_page);
                setPelanggan(pelangganResponse.data);
                setBarangs(barangsResponse.data || []); // Ensure this is an array
            } catch (error) {
                console.error('Error fetching data:', error);
                setBarangs([]); // Set to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchData(currentPage);
    }, [currentPage]);

    const handleSubmit = async (formData) => {
        try {
            if (currentPenjualan) {
                await api.put(`/penjualan/${currentPenjualan.id}`, formData);
                toast.success('Penjualan berhasil diperbarui!');
            } else {
                await api.post('/penjualan', formData);
                toast.success('Penjualan berhasil ditambahkan!');
            }
            setIsModalOpen(false);
            setCurrentPenjualan(null);
            const response = await api.get(`/penjualan?page=${currentPage}`);
            setPenjualan(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Gagal menyimpan data penjualan.');
        }
    };

    const openModal = (penjualanData = null) => {
        setCurrentPenjualan(penjualanData);
        setIsModalOpen(true);
    };

    const handleDeleteConfirmation = (id) => {
        setCurrentPenjualan({ id }); // Set currentPenjualan to the item to be deleted
        setIsConfirmModalOpen(true); // Open confirmation modal
    };

    const handleDelete = async () => {
        try {
            if (currentPenjualan) {
                await api.delete(`/penjualan/${currentPenjualan.id}`);
                toast.success('Penjualan berhasil dihapus!');
                const response = await api.get(`/penjualan?page=${currentPage}`);
                setPenjualan(response.data.data);
                setTotalPages(response.data.last_page);
                setIsConfirmModalOpen(false); // Close confirmation modal
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Gagal menghapus penjualan.');
        }
    };

    const openDetailModal = (penjualanData) => {
        setCurrentPenjualan(penjualanData);
        setIsDetailModalOpen(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Layout>
            <ToastContainer />
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Data Penjualan</h1>
                <button 
                    onClick={() => openModal()} 
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    Tambah Penjualan
                </button>
                {penjualan.length === 0 ? (
                    <p className="text-center text-gray-500">Tidak ada data penjualan.</p>
                ) : (
                    <table className="min-w-full text-center border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID Nota</th>
                                <th className="border px-4 py-2">Tanggal</th>
                                <th className="border px-4 py-2">Nama Pelanggan</th>
                                <th className="border px-4 py-2">Subtotal</th>
                                <th className="border px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {penjualan.map((p, index) => (
                                <tr key={p.id_nota} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border px-4 py-2">{p.id_nota}</td>
                                    <td className="border px-4 py-2">{p.tanggal}</td>
                                    <td className="border px-4 py-2">{p.pelanggan.nama}</td>
                                    <td className="border px-4 py-2">{formatIDR(p.subtotal)}</td>
                                    <td className="border px-4 py-2">
                                        <button 
                                            onClick={() => openModal(p)} 
                                            className="text-blue-500 mr-2 hover:text-blue-700 transition"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteConfirmation(p.id)} // Use confirmation handler
                                            className="text-red-500 mr-2 hover:text-red-700 transition"
                                        >
                                            <FaTrash />
                                        </button>
                                        <button 
                                            onClick={() => openDetailModal(p)} 
                                            className="text-green-500 hover:text-green-700 transition"
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 px-4 py-2 rounded-lg shadow ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300 transition'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Modal for Create/Edit */}
                {isModalOpen && (
                    <ModalPenjualan
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onSubmit={handleSubmit} 
                        initialData={currentPenjualan}
                        pelangganData={pelanggan}
                        barangsData={barangs}
                    />
                )}

                {/* Modal for Viewing Details */}
                {isDetailModalOpen && (
                    <ModalDetail
                        isOpen={isDetailModalOpen}
                        onClose={() => setIsDetailModalOpen(false)}
                        penjualanData={currentPenjualan}
                    />
                )}

                {/* Confirmation Modal */}
                {isConfirmModalOpen && (
                    <ConfirmationModal
                        onClose={() => setIsConfirmModalOpen(false)}
                        onConfirm={handleDelete}
                        message="Apakah Anda yakin ingin menghapus penjualan ini?"
                    />
                )}
            </div>
        </Layout>
    );
};

export default Penjualan;
