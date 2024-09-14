import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useSession } from 'next-auth/react';

const IndexPage = () => {
  const router = useRouter();
  const store = useStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      store.setUser(session.user);
      router.push('/dashboard');
    }
  }, [session]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to the Fitness Tracker!</h2>
        <p className="text-gray-600 text-center mb-6">
          Track your progress, set goals, and connect with a supportive community.
        </p>
        {!session?.user && (
          <div className="flex justify-center">
            <button
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;