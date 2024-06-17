'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  MdOutlineAlternateEmail,
  MdOutlineEmail,
  MdOutlinePermIdentity,
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function GetInTouchForm(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/get-in-touch', {
      method: 'POST',
      body: JSON.stringify({
        name: data?.name,
        email: data?.email,
        message: data?.message,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(
        'Não foi possível fazer contato. Aguarde e tente de novo.',
      );
    }

    toast.success('Contato enviado!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    setValue('email', '');
    setValue('name', '');
    setValue('message', '');
    setLoading(false);
  });

  return (
    <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Nome
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdOutlinePermIdentity />
          </div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
            {...register('name')}
          />
        </div>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdOutlineAlternateEmail />
          </div>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
            {...register('email')}
          />
        </div>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Mensagem
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <MdOutlineEmail />
          </div>
          <textarea
            rows={3}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
            {...register('message')}
          />
        </div>
      </div>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        type="submit"
      >
        {loading ? (
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <>Enviar</>
        )}
      </button>
    </form>
  );
}
