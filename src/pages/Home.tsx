import React from 'react';
import WaveLine from '../components/Waveline';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-gradient-to-t from-[#292929] to-[#1a1a1a]">
      <div className='flex-1 flex flex-col items-center justify-center min-h-full p-20'>
        <div className='text-white'>Me chamo Fernando e sou desenvolvedor FullStack a 5 anos e agradeço a oportunidade de poder fazer o teste tecnico.</div>
      </div>
      <nav className='flex-shrink-0  p-6 min-h-full flex flex-col items-start justify-center flex-1'>
        <ul>
          <li className='mb-8'>
            <p className='text-white brightness-50 text-lg italic'>Projeto no github</p>
            <a className='text-5xl font-bold text-white mt-2' target="_blank"
              href="https://github.com/FernandoVicenteGodinho/Teste_tecnico"><h2 className='mt-2'>Github</h2></a>
          </li>
          <li className='mb-8'>
            <p className='text-white brightness-50 text-lg italic'>Meus contatos</p>
            <a className='text-5xl font-bold text-white' target="_blank" href="https://www.linkedin.com/in/fernando-vicente-godinho-76a018143/"><h2 className='mt-2'>Contact</h2></a>
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