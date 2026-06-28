'use client';

// Services inquiry form for /services (#contact-form).
//
// Submission strategy: @formspree/react useForm hook posting to form ID
// 'mkolbanb'. The form ID is a public identifier (not a secret) — it is safe
// to commit directly. No environment variable or server runtime required.
//
// Provider dashboard: https://formspree.io → Forms → mkolbanb

import { useId, useState } from 'react';
import { useForm } from '@formspree/react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

const FORM_ID = 'mkolbanb';
const FALLBACK_EMAIL = 'danielstevenmeier@outlook.com';

const SUCCESS_MESSAGE =
  "Thanks — your inquiry has been sent. I'll review the system, friction, and timeline before responding.";

type FieldName = 'name' | 'email' | 'organization' | 'system' | 'friction' | 'timeline' | 'budget';

const REQUIRED_FIELDS: FieldName[] = ['name', 'email', 'system', 'friction'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // Formspree state machine — handles fetch, loading, success, and server errors.
  const [state, formspreeSubmit] = useForm(FORM_ID);

  // Local controlled field state (values + client-side validation errors).
  const [values, setValues] = useState<Record<FieldName, string>>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});

  // Local flag for honeypot hits — lets us show the success UI without
  // actually posting to Formspree and polluting the inbox with bot submissions.
  const [botTrap, setBotTrap] = useState(false);

  const fieldId = (name: FieldName) => `${fid}-${name}`;
  const errorId = (name: FieldName) => `${fid}-${name}-error`;

  const update = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (vals: Record<FieldName, string>) => {
    const next: Partial<Record<FieldName, string>> = {};
    for (const field of REQUIRED_FIELDS) {
      if (!vals[field].trim()) next[field] = 'This field is required.';
    }
    if (vals.email.trim() && !EMAIL_RE.test(vals.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot — read the uncontrolled _gotcha field directly from the DOM.
    // Real users never see or fill it; bots typically do.
    const gotchaEl = e.currentTarget.elements.namedItem('_gotcha') as HTMLInputElement | null;
    if (gotchaEl?.value?.trim()) {
      setBotTrap(true);
      return;
    }

    const trimmed = Object.fromEntries(
      (Object.keys(values) as FieldName[]).map((k) => [k, values[k].trim()]),
    ) as Record<FieldName, string>;

    const errs = validate(trimmed);
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      const firstInvalid = REQUIRED_FIELDS.find((f) => errs[f]) ?? 'name';
      document.getElementById(fieldId(firstInvalid as FieldName))?.focus();
      return;
    }

    setFieldErrors({});

    // Delegate the HTTP submission to Formspree's handler. It reads the form
    // fields from the DOM via FormData, which includes the hidden _subject input.
    await formspreeSubmit(e);
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (state.succeeded || botTrap) {
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

  const hasSubmitError = !state.submitting && state.errors !== null;

  const inputClass = (name: FieldName) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 ${
      fieldErrors[name] ? 'border-red-400' : 'border-neutral-300 hover:border-neutral-400'
    }`;

  const labelClass = 'block text-sm font-semibold text-neutral-900';

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-2xl">
      {/*
        Honeypot field — off-screen and hidden from real users; bots often fill it.
        Uses Formspree's conventional name (_gotcha) so the server also treats
        non-empty submissions as spam independently of our client-side check.
      */}
      {/* Honeypot — hidden from real users, Formspree also discards non-empty _gotcha submissions server-side */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      />
      {/* Subject line for the incoming email */}
      <input type="hidden" name="_subject" value="New services inquiry" />

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
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? errorId('name') : undefined}
            className={inputClass('name')}
          />
          {fieldErrors.name && (
            <p id={errorId('name')} className="mt-1.5 text-sm text-red-600">
              {fieldErrors.name}
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
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? errorId('email') : undefined}
            className={inputClass('email')}
          />
          {fieldErrors.email && (
            <p id={errorId('email')} className="mt-1.5 text-sm text-red-600">
              {fieldErrors.email}
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
          aria-invalid={Boolean(fieldErrors.system)}
          aria-describedby={`${fieldId('system')}-help${fieldErrors.system ? ' ' + errorId('system') : ''}`}
          className={inputClass('system')}
        />
        {fieldErrors.system && (
          <p id={errorId('system')} className="mt-1.5 text-sm text-red-600">
            {fieldErrors.system}
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
          aria-invalid={Boolean(fieldErrors.friction)}
          aria-describedby={`${fieldId('friction')}-help${fieldErrors.friction ? ' ' + errorId('friction') : ''}`}
          className={inputClass('friction')}
        />
        {fieldErrors.friction && (
          <p id={errorId('friction')} className="mt-1.5 text-sm text-red-600">
            {fieldErrors.friction}
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

      {hasSubmitError && (
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
          disabled={state.submitting}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-neutral-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.submitting ? 'Sending…' : 'Send Inquiry'}
          {!state.submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
        <p className="text-sm text-neutral-500">
          Required fields are marked <span className="text-amber-700">*</span>.
        </p>
      </div>
    </form>
  );
}
