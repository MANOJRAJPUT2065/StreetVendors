import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { notifications } = useSocket();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-semibold text-white">
          StreetVendors
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-200">
          <Link to="/" className="rounded-md px-3 py-2 hover:bg-white/5">
            Browse
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="rounded-md px-3 py-2 hover:bg-white/5">
                Dashboard
              </Link>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-white/5">
                <span className="inline-flex items-center justify-center rounded-full bg-rose-500 px-2 text-xs font-semibold text-white">
                  {notifications.length}
                </span>
                <span>Notifications</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-md bg-slate-800 px-3 py-2 text-slate-100 hover:bg-slate-700"
              >
                Logout
              </button>
              <span className="rounded-md bg-white/5 px-3 py-2 text-slate-100">
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 hover:bg-white/5">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-slate-100 px-3 py-2 font-semibold text-slate-900 hover:bg-white"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
