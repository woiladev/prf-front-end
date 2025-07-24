import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../config/routes';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
        <Link
          to={ROUTES.VIP_DASHBOARD}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 hover:translate-x-1"
          onClick={onClose}
        >
          {user?.role === 'admin' ? 'Mon compte' : 'Tableau de bord'}
        </Link>
        {user?.role === 'admin' && (
          <Link
            to={ROUTES.ADMIN}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
            onClick={onClose}
          >
            Administration
          </Link>
        )}
        <hr className="my-2" />
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 hover:translate-x-1 flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Se déconnecter
        </button>
      </div>

      {/* Click outside to close */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
    </>
  );
};

export default UserMenu;