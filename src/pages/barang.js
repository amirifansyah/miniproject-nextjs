import { useEffect, useState } from 'react';
import api from '../utils/api';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import ModalBarang from '@/components/modal/ModalBarang';
import { formatIDR } from '../utils/price';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDetail from '@/components/modal/ModalDetailBarang';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '@/components/confirmation/ConfirmationModal';

const Barang = () => {
    const [barang, setBarang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for confirmation modal
    const [selectedBarang, setSelectedBarang] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchBarang();
    }, [currentPage]);

    const fetchBarang = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/barang`, {
                params: {
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            setBarang(response.data.data || []);
            setTotalItems(response.data.total || 0);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Gagal memuat data barang.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (data) => {
        setLoading(true);
        try {
            if (selectedBarang) {
                await api.put(`/barang/${selectedBarang.kode}`, data);
                toast.success('Barang berhasil diupdate.');
            } else {
                await api.post('/barang', data);
                toast.success('Barang berhasil ditambahkan.');
            }
            fetchBarang();
            setIsModalOpen(false);
            setSelectedBarang(null);
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Gagal menyimpan data barang.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirmation = (kode) => {
        setSelectedBarang(kode);
        setIsConfirmModalOpen(true); // Open confirmation modal
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            if (selectedBarang) {
                await api.delete(`/barang/${selectedBarang}`);
                toast.success('Barang berhasil dihapus.');
                fetchBarang(); // Refresh the barang list
                setIsConfirmModalOpen(false); // Close confirmation modal
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Gagal menghapus data barang.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = (b) => {
        setSelectedBarang(b);
        setIsDetailModalOpen(true);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (loading) return <Loading />;

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-8 flex-1">
                <h1 className="text-2xl font-bold mb-4">Data Barang</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tambah Barang
                </button>
                {barang.length === 0 ? (
                    <p>Tidak ada data barang.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-center border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Kode</th>
                                    <th className="border px-4 py-2">Nama</th>
                                    <th className="border px-4 py-2">Kategori</th>
                                    <th className="border px-4 py-2">Harga</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {barang.map((b, index) => (
                                    <tr key={b.kode} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border px-4 py-2">{b.kode}</td>
                                        <td className="border px-4 py-2">{b.nama}</td>
                                        <td className="border px-4 py-2">{b.kategori}</td>
                                        <td className="border px-4 py-2">{formatIDR(b.harga)}</td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedBarang(b);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-yellow-500 mr-2 hover:text-yellow-700 transition"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConfirmation(b.id)} // Use confirmation handler
                                                className="text-red-500 mr-2 hover:text-red-700 transition"
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                onClick={() => handleViewDetail(b)}
                                                className="text-green-500 hover:text-green-700 transition"
                                            >
                                                <FaEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300 transition'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Modal for Create/Edit */}
                {isModalOpen && (
                    <ModalBarang
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateOrUpdate}
                        selectedBarang={selectedBarang}
                    />
                )}

                {/* Modal for Viewing Details */}
                {isDetailModalOpen && (
                    <ModalDetail
                        onClose={() => setIsDetailModalOpen(false)}
                        barang={selectedBarang}
                    />
                )}

                {/* Confirmation Modal */}
                {isConfirmModalOpen && (
                    <ConfirmationModal
                        onClose={() => setIsConfirmModalOpen(false)}
                        onConfirm={handleDelete}
                        message="Apakah Anda yakin ingin menghapus barang ini?"
                    />
                )}

                <ToastContainer />
            </div>
        </div>
    );
};

export default Barang;
