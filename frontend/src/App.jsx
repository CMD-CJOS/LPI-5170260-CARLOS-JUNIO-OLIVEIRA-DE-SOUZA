import { useState } from "react";
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import Footer from './components/Footer';
import { vagasMock } from './data/vagasMock';
import './App.css';


function filtrarVagas(termo) {
  const busca = termo.trim().toLowerCase();
  if (!busca) return vagasMock;

  return vagasMock.filter((vaga) => {
    const text = [
      vaga.titulo,
      vaga.empresa_nome,
      vaga.cidade,
      ...vaga.tecnologias.split(','),

    ]
    .join(' ')
    .toLowerCase();
    return  text.includes(busca);
  })
}

export default function App() {
  const [busca, setBusca] = useState('');
  const vagasFiltradas = filtraVagas(busca);

  const contagem = !busca.trim() 
  ? `${vagasFiltradas.length} Vagas Disponiveis`
  : `${vagasFiltradas.length} Vaga(s) encontrada(s) para "${busca}"`;

  return (
    <>
    <Header />
      <main className='main'>
        <SearchBar value={busca} onChange={setBusca}/>
      </main>
      <Footer/>
    </>
  )


}