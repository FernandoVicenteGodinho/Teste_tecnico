import { Container, Typography } from '@mui/material';
import React from 'react';
import WaveLine from '../components/Waveline';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-gradient-to-t from-[#292929] to-[#1a1a1a]">
      <div className='flex-1 flex flex-col items-center justify-center min-h-full'>
        <div className='text-white'>Teste</div>
      </div>
      <nav className='flex-shrink-0  p-6 min-h-full flex flex-col items-start justify-center flex-1'>
        <ul>
          <li className='mb-8'>
            <p className='text-white brightness-50 text-lg italic'>Sobre mim e porque deveria me contratar</p>
            <a className='text-5xl font-bold text-white mt-2' href=""><h2 className='mt-2'>Acout</h2></a>
          </li>
          <li className='mb-8'>
            <p className='text-white brightness-50 text-lg italic'>Contatos para me contratar</p>
            <a className='text-5xl font-bold text-white' href=""><h2 className='mt-2'>Contact</h2></a>
          </li>
          <li className='mb-8'>
            <p className='text-white brightness-50 text-lg italic'>Entre com seu e-mail e senha</p>

            <a className='text-5xl font-bold text-white' href="/login"><h2 className='mt-2'>Login</h2></a>
          </li>
          <li className='mb-8'>
            <p className='text-white brightness-50 text-lg italic'>Crie sua conta</p>

            <a className='text-5xl font-bold text-white' href="/register"><h2 className='mt-2'>Registrar</h2></a>
          </li>
        </ul>
      </nav>
      <WaveLine />
    </div>
  );
};

export default Home;