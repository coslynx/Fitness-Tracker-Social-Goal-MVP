import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  userId: number;
}

const Layout = ({ children, userId }: LayoutProps) => {
  const router = useRouter();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await store.logout();
      router.push('/login');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header userId={userId} handleLogout={handleLogout} />
      <main className="container mx-auto p-4 mt-12">
        {children}
      </main>
    </>
  );
};

export default Layout;