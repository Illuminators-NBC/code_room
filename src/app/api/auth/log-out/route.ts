import { createClient } from '@/supabase/client';

export async function POST() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return Response.json({ message: 'Success Log Out!' });
}
