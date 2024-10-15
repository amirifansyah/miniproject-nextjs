import { useEffect, useState } from 'react';
import api from '../utils/api';
import Loading from '../components/Loading';
import Layout from '@/components/Layout';
import ModalPelanggan from '@/components/modal/ModalPelanggan';
import { ToastContainer, toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import ModalDetailPelanggan from '@/components/modal/ModalDetailPelanggan';
import ConfirmationModal from '@/components/confirmation/ConfirmationModal';

const Pelanggan = () => {
    const [pelanggan, setPelanggan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for confirmation modal
    const [selectedPelanggan, setSelectedPelanggan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchPelanggan = async () => {
            setLoading(true);
            try {
                const response = await api.get('/pelanggan', {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                    },
                });
                setPelanggan(response.data.data);
                setTotalItems(response.data.total);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPelanggan();
    }, [currentPage]);

    const handleCreateOrUpdate = async (newData) => {
        try {
            if (selectedPelanggan) {
                await api.put(`/pelanggan/${selectedPelanggan.id}`, newData);
                toast.success('Pelanggan berhasil diperbarui!');
            } else {
                await api.post('/pelanggan', newData);
                toast.success('Pelanggan berhasil ditambahkan!');
            }
            setIsModalOpen(false);
            setSelectedPelanggan(null);
            const response = await api.get('/pelanggan', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            setPelanggan(response.data.data);
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Gagal menyimpan data pelanggan.');
        }
    };

    const handleEdit = (pelangganData) => {
        setSelectedPelanggan(pelangganData);
        setIsModalOpen(true);
    };

    const handleDeleteConfirmation = (id) => {
        setSelectedPelanggan(id);
        setIsConfirmModalOpen(true); // Open confirmation modal
    };

    const handleDelete = async () => {
        if (selectedPelanggan) {
            try {
                await api.delete(`/pelanggan/${selectedPelanggan}`);
                toast.success('Pelanggan berhasil dihapus!');
                setIsConfirmModalOpen(false); // Close confirmation modal
                const response = await api.get('/pelanggan', {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                    },
                });
                setPelanggan(response.data.data);
            } catch (error) {
                console.error('Error deleting data:', error);
                toast.error('Gagal menghapus pelanggan.');
            }
        }
    };

    const handleViewDetail = (pelangganData) => {
        setSelectedPelanggan(pelangganData);
        setIsDetailModalOpen(true);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (loading) return <Loading />;

    return (
        <Layout>
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Data Pelanggan</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Tambah Pelanggan
            </button>

            {pelanggan.length === 0 ? (
                <p>Tidak ada data pelanggan.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-center border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-4 py-2">ID Pelanggan</th>
                                <th className="border px-4 py-2">Nama</th>
                                <th className="border px-4 py-2">Domisili</th>
                                <th className="border px-4 py-2">Jenis Kelamin</th>
                                <th className="border px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pelanggan.map((p, index) => (
                                <tr key={p.id_pelanggan} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border px-4 py-2">{p.id_pelanggan}</td>
                                    <td className="border px-4 py-2">{p.nama}</td>
                                    <td className="border px-4 py-2">{p.domisili}</td>
                                    <td className="border px-4 py-2">
                                        {p.jenis_kelamin === 'L' ? 'Laki-Laki' : 'Perempuan'}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="text-yellow-500 mr-2 hover:text-yellow-700 transition"
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
                                            onClick={() => handleViewDetail(p)}
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
                <ModalPelanggan
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateOrUpdate}
                    selectedPelanggan={selectedPelanggan}
                />
            )}

            {/* Modal for Viewing Details */}
            {isDetailModalOpen && (
                <ModalDetailPelanggan
                    onClose={() => setIsDetailModalOpen(false)}
                    pelanggan={selectedPelanggan}
                />
            )}

            {/* Confirmation Modal */}
            {isConfirmModalOpen && (
                <ConfirmationModal
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleDelete}
                    message="Apakah Anda yakin ingin menghapus pelanggan ini?"
                />
            )}
        </Layout>
    );
};

export default Pelanggan;
