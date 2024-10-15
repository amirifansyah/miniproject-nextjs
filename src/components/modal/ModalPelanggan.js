import React, { useState, useEffect } from 'react';

const ModalPelanggan = ({ onClose, onSubmit, selectedPelanggan }) => {
    const [formData, setFormData] = useState({
        nama: '',
        domisili: '',
        jenis_kelamin: '',
    });

    useEffect(() => {
        if (selectedPelanggan) {
            setFormData({
                nama: selectedPelanggan.nama,
                domisili: selectedPelanggan.domisili,
                jenis_kelamin: selectedPelanggan.jenis_kelamin,
            });
        }
    }, [selectedPelanggan]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl mb-4">{selectedPelanggan ? 'Edit Pelanggan' : 'Tambah Pelanggan'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="nama" 
                        value={formData.nama} 
                        onChange={handleChange} 
                        placeholder="Nama" 
                        className="border p-2 w-full mb-4" 
                        required
                    />
                    <input 
                        type="text" 
                        name="domisili" 
                        value={formData.domisili} 
                        onChange={handleChange} 
                        placeholder="Domisili" 
                        className="border p-2 w-full mb-4" 
                        required
                    />
                    <select 
                        name="jenis_kelamin" 
                        value={formData.jenis_kelamin} 
                        onChange={handleChange} 
                        className="border p-2 w-full mb-4" 
                        required
                    >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {selectedPelanggan ? 'Update' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalPelanggan;
