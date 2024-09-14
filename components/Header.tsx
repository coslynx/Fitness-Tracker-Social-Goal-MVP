import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { User } from '@/types';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  handleLogout: () => Promise<void>;
  userId: number;
}

const Header = ({ handleLogout, userId }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const store = useStore();
  const { data: session } = useSession();

  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-primary">
          Fitness Tracker
        </Link>
        <div className="flex items-center">
          {session?.user ? (
            <>
              <button
                className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleOpenDropdown}
              >
                {session?.user.name}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login" className="text-primary font-bold px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;