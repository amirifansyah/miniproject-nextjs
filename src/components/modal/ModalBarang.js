import { useEffect, useState } from 'react';

const ModalBarang = ({ onClose, onSubmit, selectedBarang }) => {
    const [nama, setNama] = useState('');
    const [kategori, setKategori] = useState('');
    const [harga, setHarga] = useState('');

    useEffect(() => {
        if (selectedBarang) {
            setNama(selectedBarang.nama);
            setKategori(selectedBarang.kategori);
            setHarga(selectedBarang.harga);
        } else {
            setNama('');
            setKategori('');
            setHarga('');
        }
    }, [selectedBarang]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nama, kategori, harga });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">{selectedBarang ? 'Edit Barang' : 'Tambah Barang'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Nama</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Kategori</label>
                        <input
                            type="text"
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Harga</label>
                        <input
                            type="number"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                            className="border border-gray-300 rounded w-full p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {selectedBarang ? 'Update' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalBarang;
