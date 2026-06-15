'use client';

import { useState, useEffect } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const openModal = () => {
    setStatus('idle');
    setMessage('');
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Thanks for subscribing!');
        setFirstName('');
        setLastName('');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 border border-gray-200 text-sm text-near-black focus:border-gold focus:ring-0 focus:outline-none bg-white';

  return (
    <div className="lg:justify-self-end">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center px-6 py-3 bg-gold text-dark-bg text-sm font-bold uppercase tracking-wider hover:bg-gold/90 transition-colors"
      >
        Subscribe to our Newsletter
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter signup"
        >
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-md bg-white p-8 sm:p-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-meta-gray hover:text-near-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-gold mx-auto flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="heading-display text-2xl text-near-black mb-2">You&apos;re subscribed</h3>
                <p className="text-meta-gray mb-6">{message}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 bg-near-black text-white text-sm font-bold uppercase tracking-wider hover:bg-dark-surface transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="heading-display text-2xl text-near-black mb-2">Join our Newsletter</h3>
                <p className="text-meta-gray text-sm mb-6">
                  Be the first to hear about new arrivals, exclusive offers and finance specials.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="nl-first" className="block text-sm font-medium text-near-black mb-2">
                      First Name *
                    </label>
                    <input
                      id="nl-first"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="nl-last" className="block text-sm font-medium text-near-black mb-2">
                      Last Name *
                    </label>
                    <input
                      id="nl-last"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="nl-email" className="block text-sm font-medium text-near-black mb-2">
                    Email Address *
                  </label>
                  <input
                    id="nl-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </div>

                {message && status === 'error' && (
                  <p className="text-red-600 text-sm mb-4" role="status">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 bg-gold text-dark-bg text-sm font-bold uppercase tracking-wider hover:bg-gold/90 transition-colors disabled:opacity-60"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>

                <p className="mt-4 text-xs text-meta-gray leading-relaxed">
                  By subscribing you agree to receive marketing emails from The Autoshed. You can
                  unsubscribe at any time. Your information is handled in accordance with POPIA.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
