'use client';

import { useLoginContext } from '@/context/LoginProvider';
import { FormState } from '@/types/signUpFormType';
import { useRouter } from 'next/navigation';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useLoginContext();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const initialState = {
    email: '',
    pw: '',
    nickname: ''
  };
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formState.email || !formState.pw) {
        return alert('Please Enter Email and Password');
      }
      const { nickname, ...loginState } = formState;
      const data = await fetch('/api/auth/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginState)
      }).then((res) => res.json());
      if (data.errorMsg) {
        alert(data.errorMsg);
        return;
      }
      alert('success login');
      login();
      setFormState(initialState);
      router.replace('/');
      return;
    }
    if (!formState.email || !formState.pw || !formState.nickname) {
      return alert('Please Enter All Blanks');
    }
    const data = await fetch('api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formState)
    }).then((res) => res.json());
    if (data.errorMsg) {
      alert(data.errorMsg);
      return;
    }
    alert('Success Register');
    setFormState(initialState);
    setIsLogin(false);
  };
  return (
    <div>
      <h1>{isLogin ? '로그인' : '회원가입'}</h1>
      <form onSubmit={onSubmitHandler}>
        <section>
          <label htmlFor="email">email: </label>
          <input id="email" name="email" value={formState.email} onChange={handleInputChange} />
        </section>
        <section>
          <label htmlFor="pw">pw: </label>
          <input id="pw" name="pw" type="password" value={formState.pw} onChange={handleInputChange} />
        </section>
        {!isLogin && (
          <section>
            <label htmlFor="nickname">nickname: </label>
            <input id="nickname" name="nickname" value={formState.nickname} onChange={handleInputChange} />
          </section>
        )}
        <button>{isLogin ? '로그인' : '회원가입'}</button>
        <button type="button" onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? '회원가입으로' : '로그인으로'}
        </button>
      </form>
    </div>
  );
}
