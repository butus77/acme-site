import {z} from 'zod';

export type ContactErrorCode = 'name_short' | 'email_invalid' | 'message_short';

export const ContactSchema = z.object({
  name: z.string().min(2, {message: 'name_short'}),
  email: z.string().email({message: 'email_invalid'}),
  message: z.string().min(10, {message: 'message_short'})
});

export type ContactInput = z.infer<typeof ContactSchema>;


