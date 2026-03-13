import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

const schema = z.object({
  emailOrMobile: z.string().min(1, 'Required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

 // src/pages/Login.jsx (only change onSubmit)

const onSubmit = async (data) => {
  try {
    setError(null);
    const res = await api.post('/auth/login', data);
    
    const { user, token } = res.data;

    login(user, token);

    // Redirect based ONLY on company field
    if (user.company === 'ADMIN') {
      navigate('/admin');           // Admin user → dashboard
    } else {
      navigate('/');                // Normal user → home
      // OR navigate('/profile');   // if you want
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-950 transition-colors py-12 px-4">
      <div className="max-w-md w-full bg-surface dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-text-pri dark:text-slate-50">Login</h2>

        {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded mb-6">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-pri dark:text-slate-200">
              Email or Mobile
            </label>
            <input
              {...register('emailOrMobile')}
              className="mt-1 block w-full border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-primary focus:border-primary py-3 px-4 bg-surface dark:bg-slate-800 text-text-pri dark:text-slate-100"
              placeholder="Enter email or mobile"
            />
            {errors.emailOrMobile && (
              <p className="mt-1 text-sm text-red-600">{errors.emailOrMobile.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-pri dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:ring-primary focus:border-primary py-3 px-4 bg-surface dark:bg-slate-800 text-text-pri dark:text-slate-100"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary dark:bg-primary-light text-white dark:text-slate-900 py-3 rounded-lg font-semibold hover:bg-primary-dark dark:hover:bg-primary transition disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-text-sec dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary dark:text-primary-light hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}