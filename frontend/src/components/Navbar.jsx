import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/recipes/new', label: 'Create' },
  { to: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
  const { authenticated, logout, user } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-brand-600">
          <span role="img" aria-label="chef">
            👩‍🍳
          </span>
          Recipe Flashcards
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-brand-600 ${
                  isActive ? 'text-brand-600' : 'text-slate-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {authenticated ? (
            <>
              <span className="hidden text-sm font-medium text-slate-600 md:inline">
                Hi, {user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="rounded-full border border-brand-500 px-4 py-1 text-sm font-medium text-brand-600 transition hover:bg-brand-50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-brand-500 px-4 py-1 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

