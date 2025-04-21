import dynamic from 'next/dynamic';
import styles from '@/components/admin/home/styles/AdminHome.module.css';

const AdminHomeClientPage = dynamic(() => import('@/components/admin/home/ClientPage'), { ssr: false });

const Page = async () => {
    return (
        <div className={styles.container}>
            <AdminHomeClientPage />
        </div>
    );
};

export default Page;