import React from "react";

import Select from "react-select";

const ChampionSelector = ({ champions, onSelectChampion }) => {
  const options = champions.map(champion => ({
    label: champion.name,
    value: champion
  }));

  const onChange = option => onSelectChampion(option.value);

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      onChange={onChange}
      name="champion"
      placeholder="Add a champion..."
      options={options}
    />
  );
};

export default ChampionSelector;
