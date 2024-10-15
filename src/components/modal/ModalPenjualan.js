import React from 'react';
import { FaTrash, FaTimes, FaPlus } from 'react-icons/fa';

const ModalPenjualan = ({ isOpen, onClose, onSubmit, initialData, pelangganData, barangsData }) => {
    const [formData, setFormData] = React.useState({ items: [] });
    const [subtotal, setSubtotal] = React.useState(0);

    React.useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                items: initialData.item_penjualans.map(item => ({
                    kode_barang: item.kode_barang,
                    qty: item.qty,
                    barang: item.barang
                }))
            });
            calculateSubtotal(initialData.item_penjualans);
        } else {
            setFormData({ tanggal: '', kode_pelanggan: '', items: [] });
            setSubtotal(0);
        }
    }, [initialData]);

    const calculateSubtotal = (items) => {
        const total = (items || []).reduce((acc, item) => {
            const barang = item.barang;

            // Check if barang exists, if not, find it in barangsData
            const harga = barang
                ? parseFloat(barang.harga)
                : parseFloat(barangsData.find(b => b.kode === item.kode_barang)?.harga) || 0;

            return acc + (harga * item.qty);
        }, 0);
        setSubtotal(total);
    };

    React.useEffect(() => {
        calculateSubtotal(formData.items); // Recalculate subtotal whenever items change
    }, [formData.items]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const submittedItems = formData.items.map(item => ({
            ...item,
            qty: item.qty === '0' ? 1 : item.qty // Convert 0 to 1 for submission
        }));
        onSubmit({ ...formData, items: submittedItems, subtotal }); // Include subtotal in the submitted data
        onClose();
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { kode_barang: '', qty: '' }] // Start with an empty qty
        });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...formData.items];
        if (field === 'qty') {
            newItems[index].qty = value; // Allow any value, including 0
        } else {
            newItems[index][field] = value; // Handle other fields
        }
        setFormData({ ...formData, items: newItems });
    };

    const deleteItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden">
                <div className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t">
                    <h2 className="text-lg font-bold">{initialData?.id_nota ? 'Edit Penjualan' : 'Tambah Penjualan'}</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-300">
                        <FaTimes />
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1">Tanggal</label>
                            <input
                                type="date"
                                value={formData.tanggal || ''}
                                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                                className="border rounded-lg w-full px-2 py-1"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Kode Pelanggan</label>
                            <select
                                value={formData.kode_pelanggan || ''}
                                onChange={(e) => setFormData({ ...formData, kode_pelanggan: e.target.value })}
                                className="border rounded-lg w-full px-2 py-1"
                                required
                            >
                                <option value="" disabled>Pilih Pelanggan</option>
                                {pelangganData?.map((pelanggan) => (
                                    <option key={pelanggan.id_pelanggan} value={pelanggan.id_pelanggan}>
                                        {pelanggan.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">
                                Subtotal <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder='0'
                                value={subtotal > 0 ? subtotal : ''}
                                readOnly
                                className="border rounded-lg w-full px-2 py-1"
                            />
                            <p className="text-sm text-gray-500">
                                Nilai akan muncul setelah item ditambahkan.
                            </p>
                        </div>

                        {/* Input for items */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block">Items</label>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="bg-green-500 text-white rounded-lg shadow hover:bg-green-600 px-2 py-1 flex items-center"
                                >
                                    <FaPlus className="mr-1" /> Tambah Item
                                </button>
                            </div>
                            {(formData.items || []).map((item, index) => (
                                <div key={index} className="flex mb-2 items-center">
                                    <select
                                        value={item.kode_barang}
                                        onChange={(e) => handleItemChange(index, 'kode_barang', e.target.value)}
                                        className="border rounded-lg w-1/2 px-2 py-1 mr-2"
                                        required
                                    >
                                        <option value="" disabled>Pilih Kode Barang</option>
                                        {Array.isArray(barangsData) ? barangsData.map((barang) => (
                                            <option key={barang.kode} value={barang.kode}>
                                                {barang.nama}
                                            </option>
                                        )) : null}
                                    </select>
                                    <input
                                        type="number"
                                        value={item?.qty}
                                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                                        placeholder="0" // Show 0 as placeholder
                                        className="border rounded-lg w-1/4 px-2 py-1 mr-2"
                                        min="0" // Allow 0 as valid input
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteItem(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 px-2 py-1">
                            {initialData?.id_nota ? 'Update' : 'Simpan'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalPenjualan;
