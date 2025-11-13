import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Mail, Phone, CheckCircle, XCircle } from 'lucide-react';

type Enrollment = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  experience_level: string;
  message?: string;
  status: string;
  created_at: string;
};

export default function EnrollmentManagement() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('training_enrollments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error('Error loading enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('training_enrollments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      await loadEnrollments();
    } catch (error) {
      console.error('Error updating enrollment:', error);
    }
  };

  const filteredEnrollments =
    filter === 'all' ? enrollments : enrollments.filter((e) => e.status === filter);

  return (
    <div>
      <h2 className="text-3xl font-serif text-cream mb-8">Training Enrollments</h2>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'approved', 'completed', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-amber-700 text-cream'
                : 'bg-stone-800 text-cream/70 hover:bg-stone-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-cream/60 text-center py-8">Loading enrollments...</div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="bg-stone-900 border border-amber-900/20 rounded-xl p-8 text-center">
          <p className="text-cream/60">No enrollments found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredEnrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="bg-stone-900 border border-amber-900/20 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-cream mb-2">
                    {enrollment.full_name}
                  </h3>
                  <div className="space-y-1 text-cream/70 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {enrollment.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {enrollment.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Experience: {enrollment.experience_level}
                    </div>
                  </div>
                  <p className="text-cream/60 text-sm mt-2">
                    Enrolled: {new Date(enrollment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    enrollment.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : enrollment.status === 'approved'
                      ? 'bg-green-500/20 text-green-500'
                      : enrollment.status === 'completed'
                      ? 'bg-blue-500/20 text-blue-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {enrollment.status}
                </span>
              </div>

              {enrollment.message && (
                <div className="bg-stone-800 rounded-lg p-4 mb-4">
                  <p className="text-cream/70 text-sm">
                    <strong>Message:</strong> {enrollment.message}
                  </p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {enrollment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(enrollment.id, 'approved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(enrollment.id, 'cancelled')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                {enrollment.status === 'approved' && (
                  <button
                    onClick={() => updateStatus(enrollment.id, 'completed')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
