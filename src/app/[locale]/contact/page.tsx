'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ContactSchema, type ContactInput, type ContactErrorCode} from '@/lib/contact';
import {submitContact} from '@/app/actions';
import {useTranslations} from 'next-intl';
import {Toaster, toast} from 'sonner';

export default function ContactPage() {
  const t = useTranslations('Contact');

  // A Zod hibakódok lokalizált feliratai (típusos, nincs any)
  const errorLabels: Record<ContactErrorCode, string> = {
    name_short: t('errors.name_short'),
    email_invalid: t('errors.email_invalid'),
    message_short: t('errors.message_short')
  };

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset
  } = useForm<ContactInput>({resolver: zodResolver(ContactSchema)});

  const onSubmit = async (values: ContactInput) => {
    const fd = new FormData();
    fd.append('name', values.name);
    fd.append('email', values.email);
    fd.append('message', values.message);

    const res = await submitContact(null, fd);

    if (res.ok) {
      toast.success(t('success'));
      reset();
      return;
    }

    if (res.fieldErrors) {
      // A szerver action kódjai is ContactErrorCode-ok
      Object.values(res.fieldErrors).forEach((code) => {
        const key = code as ContactErrorCode;
        toast.error(errorLabels[key] ?? t('errors.message_short'));
      });
    }
  };

  // Segédfüggvény: RHF hiba kód → lokalizált szöveg
  const renderError = (code?: string) => {
    if (!code) return null;
    const key = code as ContactErrorCode;
    return <span className="text-red-600 text-sm">{errorLabels[key]}</span>;
  };

  return (
    <section className="max-w-lg grid gap-4">
      <Toaster richColors />
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <label className="grid gap-1">
          <span>{t('name')}</span>
          <input className="border rounded px-3 py-2" {...register('name')} />
          {renderError(errors.name?.message)}
        </label>

        <label className="grid gap-1">
          <span>{t('email')}</span>
          <input className="border rounded px-3 py-2" type="email" {...register('email')} />
          {renderError(errors.email?.message)}
        </label>

        <label className="grid gap-1">
          <span>{t('message')}</span>
          <textarea className="border rounded px-3 py-2" rows={5} {...register('message')} />
          {renderError(errors.message?.message)}
        </label>

        <button
          className="px-4 py-2 rounded border disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('sending') : t('send')}
        </button>
      </form>
    </section>
  );
}


