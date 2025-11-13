import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    experience_level: 'beginner' as 'beginner' | 'intermediate' | 'advanced' | 'professional',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('training_enrollments')
        .insert({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          experience_level: formData.experience_level,
          message: formData.message || null,
          status: 'pending',
        });

      if (submitError) throw submitError;

      setIsSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        experience_level: 'beginner',
        message: '',
      });
    } catch (err) {
      setError('Failed to submit enrollment. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    window.location.href = '/';
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-stone-900 rounded-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-cream mb-4">
            Enrollment Submitted!
          </h2>
          <p className="text-cream/70 mb-6">
            Thank you for enrolling in our Barista Training Program. We'll contact you soon with
            more details.
          </p>
          <button
            onClick={goBack}
            className="bg-amber-700 text-cream px-6 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-cream/70 hover:text-cream mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-stone-900 rounded-xl p-8 border border-amber-900/20">
          <h1 className="text-3xl font-serif text-cream mb-2">
            Barista Training Program Enrollment
          </h1>
          <p className="text-cream/70 mb-8">
            Join our comprehensive barista training program and master the art of coffee making.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cream mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-cream mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-cream mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                placeholder="+880 1725-375647"
              />
            </div>

            <div>
              <label className="block text-cream mb-2">Experience Level *</label>
              <select
                required
                value={formData.experience_level}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experience_level: e.target.value as any,
                  })
                }
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
              >
                <option value="beginner">Beginner - No prior experience</option>
                <option value="intermediate">Intermediate - Some coffee knowledge</option>
                <option value="advanced">Advanced - Looking to refine skills</option>
                <option value="professional">Professional - Competition level training</option>
              </select>
            </div>

            <div>
              <label className="block text-cream mb-2">
                Tell us about your goals (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-stone-800 text-cream border border-amber-900/30 rounded-lg p-3 focus:border-amber-500 focus:outline-none"
                rows={4}
                placeholder="What do you hope to learn? Any specific areas of interest?"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-cream py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Enroll Now'}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-gradient-to-br from-amber-900/30 to-amber-950/30 rounded-xl p-6 border border-amber-900/20">
          <h3 className="text-xl font-serif text-cream mb-4">What's Included:</h3>
          <ul className="space-y-2 text-cream/80">
            <li>✓ Hands-on training with professional equipment</li>
            <li>✓ Industry-recognized certification upon completion</li>
            <li>✓ Learn from award-winning baristas</li>
            <li>✓ Flexible class schedules (weekends & evenings available)</li>
            <li>✓ Small class sizes for personalized attention</li>
            <li>✓ Job placement assistance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
