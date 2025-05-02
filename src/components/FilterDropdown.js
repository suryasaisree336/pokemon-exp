import React from 'react';

const types = [
  'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon',
  'dark', 'steel', 'fairy'
];

const FilterDropdown = ({ setTypeFilter }) => {
  return (
    <select onChange={e => setTypeFilter(e.target.value)} className="filter-dropdown">
      {types.map(type => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
