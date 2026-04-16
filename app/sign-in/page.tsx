'use client';

import { useFormState } from 'react-dom';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignInPage() {
  const [state, formAction] = useFormState(
    async (prevState: { error?: string }, formData: FormData) => {
      const res = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (!res?.ok) {
        return { error: 'Invalid credentials' };
      }

      window.location.href = '/';
      return prevState;
    },
    { error: undefined }
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-24">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-zinc-950 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sign in to your account
          </h2>
        </div>

        <form action={formAction} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-50"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-zinc-900 dark:text-zinc-50 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-transparent"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-50"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-zinc-900 dark:text-zinc-50 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-transparent"
              />
            </div>
          </div>

          {state.error && (
            <div className="text-sm text-red-600 dark:text-red-400">
              {state.error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
