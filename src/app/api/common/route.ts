import { createClient } from '@/supabase/server';

export async function GET() {
  const supabase = createClient();

  try {
    const { data: prefixes, error: prefixError } = await supabase.from('prefix').select('prefix');
    if (prefixError) {
      throw new Error(`Failed to fetch prefixes: ${prefixError.message}`);
    }

    const { data: names, error: nameError } = await supabase.from('name').select('name');
    if (nameError) {
      throw new Error(`Failed to fetch names: ${nameError.message}`);
    }

    if (prefixes && names) {
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)].prefix;
      const randomName = names[Math.floor(Math.random() * names.length)].name;
      const nickname = `${randomPrefix} ${randomName}`;

      return new Response(JSON.stringify({ nickname }), { status: 200 });
    } else {
      throw new Error('Failed to generate nickname: No data available');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
