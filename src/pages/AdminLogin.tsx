import { useState } from 'react';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple authentication check
    if (email === 'testuser@gmail.com' && password === 'testrun01') {
      // Store admin session
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminEmail', email);
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-cream mb-2">SLASH COFFEE</h1>
          <p className="text-cream/60">Admin Panel</p>
        </div>

        <div className="bg-stone-900 rounded-xl p-8 border border-amber-900/20">
          <h2 className="text-2xl font-serif text-cream mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cream mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream/50 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg pl-10 pr-4 py-3 focus:border-amber-500 focus:outline-none"
                  placeholder="testuser@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-cream mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream/50 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg pl-10 pr-4 py-3 focus:border-amber-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-cream py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-amber-900/20">
            <p className="text-cream/40 text-sm text-center">
              Demo credentials: testuser@gmail.com / testrun01
            </p>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = '/')}
          className="mt-6 w-full text-cream/60 hover:text-cream transition-colors text-sm"
        >
          ← Back to Website
        </button>
      </div>
    </div>
  );
}
