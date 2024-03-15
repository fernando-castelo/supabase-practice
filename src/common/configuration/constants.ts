import { IConstants } from '../interfaces';

export const getEnv = (): IConstants => ({
  supabase: {
    baseUrl: process.env.SUPABASE_URL,
    token: process.env.SUPABASE_TOKEN,
  },
});
