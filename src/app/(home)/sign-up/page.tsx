'use client';

import { Button } from '@/components/ui/button';

function SignUpPage() {
  const signUp = async (email: string, password: string) => {
    const data = { email, password };

    const response = await fetch('http://localhost:3000/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const user = await response.json();
    console.log(user);
  };
  return (
    <div>
      SignUpPage
      <Button onClick={() => signUp('exam@exam.com', 'exampassword')}>클릭</Button>
    </div>
  );
}

export default SignUpPage;
