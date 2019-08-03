import React, { useRef } from "react";

const ChampionSelector = ({ champions, onSelectChampion }) => {
  const inputRef = useRef(null);

  const onInput = e => {
    const value = e.target.value;
    const champion = champions.find(champion => champion.name === value);
    if (champion) {
      onSelectChampion(champion);
    }
  };

  return (
    <>
      <label htmlFor="champion-selector">
        <input ref={inputRef} list="champion-selector" onInput={onInput} />
      </label>
      <datalist id="champion-selector">
        {champions.map(champion => (
          <option key={champion.slug} value={champion.name} />
        ))}
      </datalist>
    </>
  );
};

export default ChampionSelector;
