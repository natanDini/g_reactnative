import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Erro ao buscar Pokémon:', error));
  }, [pokemonId]);

  const nextPokemon = () => {
    setPokemonId(pokemonId + 1);
  };

  const prevPokemon = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  const searchPokemon = () => {
    if (search.trim() !== '') {
      fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Pokémon não encontrado');
          }
          return response.json();
        })
        .then(data => {
          setPokemon(data);
          setPokemonId(data.id);
          setError('');
        })
        .catch(() => {
          setError('Pokémon não encontrado!');
          setTimeout(() => setError(''), 3000);
        });
    }
  };

  return (
    <div className="App">
      <h2>Pokédex</h2>
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Digite o nome ou ID..." 
      />
      <button onClick={searchPokemon}>Buscar</button>
      {error && <div className="toast">{error}</div>}
      {pokemon && (
        <div id='pokedex'>
          <h3>{pokemon.name.toUpperCase()}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          <button onClick={prevPokemon}>◀</button>
          <button onClick={nextPokemon}>▶</button>
        </div>
      )}
    </div>
  );
}

export default App;