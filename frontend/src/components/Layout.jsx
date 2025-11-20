import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Outlet />
    </main>
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Recipe Flashcards. All rights reserved.</p>
        <p className="text-brand-600">Built with MERN + OpenAI</p>
      </div>
    </footer>
  </div>
);

export default Layout;

