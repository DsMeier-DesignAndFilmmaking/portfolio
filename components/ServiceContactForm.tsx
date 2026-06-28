'use client';

// Services inquiry form for /services (#contact-form).
//
// Submission strategy (static-export safe):
// The site is built with `output: 'export'`, so there is no server runtime in
// production to receive a POST. Rather than fake a send, the form posts to a
// configurable static-form endpoint read from NEXT_PUBLIC_CONTACT_ENDPOINT
// (e.g. a Formspree form URL like https://formspree.io/f/abcdwxyz). That value
// is a public form id, not a secret, so the NEXT_PUBLIC_ prefix is correct.
//
// ── To make this form actually send email ──────────────────────────────────
// 1. Create a form at a static-form provider (Formspree, Web3Forms, Basin, or
//    Netlify Forms if you deploy to Netlify) with the recipient set to
//    danielstevenmeier@outlook.com.
// 2. Add the provider's POST endpoint to your environment:
//       NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
//    (set it in .env.local for dev and in the host's env settings for prod).
// 3. Rebuild. No code change needed — the form will POST JSON and show the
//    success state on a 2xx response.
// Until the env var is set, submitting shows the error state with a fallback
// email link; the form does not silently pretend to deliver.

import { useId, useState } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '';
const FALLBACK_EMAIL = 'danielstevenmeier@outlook.com';

const SUCCESS_MESSAGE =
  "Thanks — your inquiry has been sent. I'll review the system, friction, and timeline before responding.";
const ERROR_MESSAGE = `Something went wrong. Please try again or email ${FALLBACK_EMAIL} directly.`;

type FieldName = 'name' | 'email' | 'organization' | 'system' | 'friction' | 'timeline' | 'budget';

const REQUIRED_FIELDS: FieldName[] = ['name', 'email', 'system', 'friction'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: Record<FieldName, string> = {
  name: '',
  email: '',
  organization: '',
  system: '',
  friction: '',
  timeline: '',
  budget: '',
};

export default function ServiceContactForm() {
  const fid = useId();
  const [values, setValues] = useState<Record<FieldName, string>>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');

  const fieldId = (name: FieldName) => `${fid}-${name}`;
  const errorId = (name: FieldName) => `${fid}-${name}-error`;

  const update = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (vals: Record<FieldName, string>) => {
    const next: Partial<Record<FieldName, string>> = {};
    for (const field of REQUIRED_FIELDS) {
      if (!vals[field].trim()) {
        next[field] = 'This field is required.';
      }
    }
    if (vals.email.trim() && !EMAIL_RE.test(vals.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: a real user never fills this. Treat as a silent success.
    if (honeypot.trim()) {
      setStatus('success');
      return;
    }

    const trimmed = Object.fromEntries(
      (Object.keys(values) as FieldName[]).map((k) => [k, values[k].trim()]),
    ) as Record<FieldName, string>;

    const nextErrors = validate(trimmed);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Move focus to the first invalid field for accessibility.
      const firstInvalid = REQUIRED_FIELDS.find((f) => nextErrors[f]) ?? 'email';
      document.getElementById(fieldId(firstInvalid as FieldName))?.focus();
      return;
    }

    setErrors({});
    setStatus('submitting');

    // No endpoint configured → cannot deliver. Be honest: show the error state
    // with the fallback email rather than claiming a send.
    if (!CONTACT_ENDPOINT) {
      setStatus('error');
      return;
    }

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...trimmed, _subject: 'New services inquiry' }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8"
      >
        <Check className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
        <div>
          <p className="font-tiempos text-xl font-bold text-neutral-950">Inquiry sent</p>
          <p className="mt-2 text-base leading-relaxed text-neutral-700">{SUCCESS_MESSAGE}</p>
        </div>
      </div>
    );
  }

  const inputClass = (name: FieldName) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 ${
      errors[name] ? 'border-red-400' : 'border-neutral-300 hover:border-neutral-400'
    }`;

  const labelClass = 'block text-sm font-semibold text-neutral-900';

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-2xl">
      {/* Honeypot — visually hidden, off the tab order, ignored by real users. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId('name') + '-company'}>Company (leave blank)</label>
        <input
          id={fieldId('name') + '-company'}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className={labelClass}>
            Name <span className="text-amber-700">*</span>
          </label>
          <input
            id={fieldId('name')}
            type="text"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={inputClass('name')}
          />
          {errors.name && (
            <p id={errorId('name')} className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId('email')} className={labelClass}>
            Email <span className="text-amber-700">*</span>
          </label>
          <input
            id={fieldId('email')}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={inputClass('email')}
          />
          {errors.email && (
            <p id={errorId('email')} className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={fieldId('organization')} className={labelClass}>
          Organization / Team
        </label>
        <input
          id={fieldId('organization')}
          type="text"
          name="organization"
          autoComplete="organization"
          value={values.organization}
          onChange={(e) => update('organization', e.target.value)}
          className={inputClass('organization')}
        />
      </div>

      <div className="mt-5">
        <label htmlFor={fieldId('system')} className={labelClass}>
          System <span className="text-amber-700">*</span>
        </label>
        <p id={`${fieldId('system')}-help`} className="mt-1 text-sm text-neutral-500">
          What system, product, or workflow are you working on?
        </p>
        <textarea
          id={fieldId('system')}
          name="system"
          required
          rows={3}
          value={values.system}
          onChange={(e) => update('system', e.target.value)}
          aria-invalid={Boolean(errors.system)}
          aria-describedby={`${fieldId('system')}-help${errors.system ? ' ' + errorId('system') : ''}`}
          className={inputClass('system')}
        />
        {errors.system && (
          <p id={errorId('system')} className="mt-1.5 text-sm text-red-600">
            {errors.system}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor={fieldId('friction')} className={labelClass}>
          Friction <span className="text-amber-700">*</span>
        </label>
        <p id={`${fieldId('friction')}-help`} className="mt-1 text-sm text-neutral-500">
          Where is it breaking down?
        </p>
        <textarea
          id={fieldId('friction')}
          name="friction"
          required
          rows={3}
          value={values.friction}
          onChange={(e) => update('friction', e.target.value)}
          aria-invalid={Boolean(errors.friction)}
          aria-describedby={`${fieldId('friction')}-help${errors.friction ? ' ' + errorId('friction') : ''}`}
          className={inputClass('friction')}
        />
        {errors.friction && (
          <p id={errorId('friction')} className="mt-1.5 text-sm text-red-600">
            {errors.friction}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('timeline')} className={labelClass}>
            Timeline
          </label>
          <input
            id={fieldId('timeline')}
            type="text"
            name="timeline"
            placeholder="e.g. next quarter"
            value={values.timeline}
            onChange={(e) => update('timeline', e.target.value)}
            className={inputClass('timeline')}
          />
        </div>
        <div>
          <label htmlFor={fieldId('budget')} className={labelClass}>
            Budget Range <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id={fieldId('budget')}
            type="text"
            name="budget"
            placeholder="Helps me scope realistically"
            value={values.budget}
            onChange={(e) => update('budget', e.target.value)}
            className={inputClass('budget')}
          />
        </div>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/70 p-4 text-sm leading-relaxed text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
          <span>
            Something went wrong. Please try again or email{' '}
            <a
              href={`mailto:${FALLBACK_EMAIL}`}
              className="font-semibold underline underline-offset-2 hover:text-red-900"
            >
              {FALLBACK_EMAIL}
            </a>{' '}
            directly.
          </span>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
          {status !== 'submitting' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
        <p className="text-sm text-neutral-500">
          Required fields are marked <span className="text-amber-700">*</span>.
        </p>
      </div>
    </form>
  );
}
