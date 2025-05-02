import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const allPokemon = await Promise.all(
          data.results.map(p => fetch(p.url).then(res => res.json()))
        );
        setPokemonList(allPokemon);
      } catch (err) {
        console.error('Failed to fetch Pokémon data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === 'all' || pokemon.types.some(t => t.type.name === typeFilter);
    return matchesName && matchesType;
  });

  return (
    <div className="app-container">
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem 0' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown setTypeFilter={setTypeFilter} />
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p>There was an error loading the Pokémon. Try again later.</p>}
      {!loading && filteredPokemon.length === 0 && <p>No Pokémon found.</p>}

      <div className="card-grid">
        {filteredPokemon.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
