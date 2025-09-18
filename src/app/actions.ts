'use server';

import {ContactSchema} from '@/lib/contact';

export type ActionResult =
  | { ok: true }
  | { ok: false; fieldErrors?: Record<string, string>; formError?: string };

export async function submitContact(
  _prev: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    const flat = parsed.error.flatten();
    for (const [field, msgs] of Object.entries(flat.fieldErrors)) {
      if (msgs?.[0]) fieldErrors[field] = msgs[0];
    }
    return {ok: false, fieldErrors};
  }

  // Itt jöhet valós feldolgozás (email / DB / stb.):
  // const {name, email, message} = parsed.data;

  return {ok: true};
}



