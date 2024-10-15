// src/components/Sidebar.js
import Link from 'next/link';
import { FaUser, FaShoppingCart, FaBox } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between p-4">
            <div>
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <ul className="space-y-2">
                    <li className="flex items-center">
                        <FaUser className="h-5 w-5 mr-2" />
                        <Link href="/pelanggan" className="block p-2 hover:bg-gray-700 rounded">Pelanggan</Link>
                    </li>
                    <li className="flex items-center">
                        <FaBox className="h-5 w-5 mr-2" />
                        <Link href="/barang" className="block p-2 hover:bg-gray-700 rounded">Barang</Link>
                    </li>
                    <li className="flex items-center">
                        <FaShoppingCart className="h-5 w-5 mr-2" />
                        <Link href="/penjualan" className="block p-2 hover:bg-gray-700 rounded">Penjualan</Link>
                    </li>
                </ul>
            </div>
            <footer className="text-center p-4">
                <p className="text-xs">Created by Ami Rifansyah &copy; 2024</p>
            </footer>
        </aside>
    );
};

export default Sidebar;
