import React from "react";
import { Link } from "gatsby";

export default () => (
  <ul>
    <li>
      <Link to="/champions">champions</Link>
    </li>
    <li>
      <Link to="/items">items</Link>
    </li>
    <li>
      <Link to="/synergies">synergies</Link>
    </li>
    <li>
      <Link to="/synergy-explorer">synergy explorer</Link>
    </li>
  </ul>
);
