import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
    <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">404</p>
    <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
    <p className="mt-2 text-sm text-slate-500">
      The page you are looking for doesn&apos;t exist or has been moved.
    </p>
    <Link
      to="/"
      className="mt-6 inline-flex rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
    >
      Back to home
    </Link>
  </div>
);

export default NotFoundPage;

