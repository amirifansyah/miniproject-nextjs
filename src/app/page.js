// src/app/page.js
import Layout from '../components/Layout';

const Home = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Selamat Datang di Aplikasi Manajemen Data</h1>
            <p className="mt-2">Silakan pilih menu di samping untuk mulai.</p>
        </Layout>
    );
};

export default Home;
