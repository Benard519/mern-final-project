import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register: registerUser, loading, error, clearError } = useAuth();
  const [mode, setMode] = useState('login');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toggleMode = () => {
    reset();
    clearError();
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const onSubmit = async (values) => {
    if (mode === 'login') {
      await login(values);
    } else {
      await registerUser(values);
    }
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
      <div className="flex justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Account access</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === 'login'
              ? 'Continue exploring recipes and flashcards.'
              : 'Register to generate AI flashcards for your creations.'}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleMode}
          className="text-sm font-semibold text-brand-600"
        >
          {mode === 'login' ? 'Need an account?' : 'Already registered?'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        {mode === 'register' && (
          <div>
            <label className="text-sm font-semibold text-slate-700">Name</label>
            <input
              {...register('name', { required: mode === 'register' })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">Name is required</p>
            )}
          </div>
        )}
        <div>
          <label className="text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">Email is required</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500">Min 6 characters</p>
          )}
        </div>

        {error && (
          <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? 'Submitting...' : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;

