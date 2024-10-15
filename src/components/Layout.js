// src/app/layout.js
import '../../src/app/globals.css'; // Pastikan untuk mengimpor CSS global
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-background text-foreground">
                {children}
            </main>
        </div>
    );
};

export default Layout;
