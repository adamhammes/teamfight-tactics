import champions from "../../../data/cleaned-data/champion-list.json";
import synergies from "../../../data/cleaned-data/synergies.json";

import synergyCalculator from "../synergy-calculator";

const champion = championSlug => champions.find(c => c.slug == championSlug);

describe("Synergy Calculator", () => {
  it("works for the single ninja bonus", () => {
    const akali = champions.find(c => c.slug == "akali");
    const ninjaSynergy = synergies.find(s => s.key == "ninja");

    const akaliSynergies = synergyCalculator(synergies, [akali]);

    expect(akaliSynergies).toHaveLength(1);

    const expectedSynergy = {
      synergy: ninjaSynergy,
      bonus: ninjaSynergy.bonuses[0]
    };

    expect(akaliSynergies[0]).toEqual(expectedSynergy);
  });

  it("does not give the ninja bonus for two ninjas", () => {
    const calculatedSynergies = synergyCalculator(synergies, [
      champion("akali"),
      champion("zed")
    ]);

    expect(calculatedSynergies).toHaveLength(0);
  });

  it("gives ninja bonus to 4 ninjas", () => {
    const ninjaSynergy = synergies.find(s => s.key == "ninja");
    const calculatedSynergies = synergyCalculator(synergies, [
      champion("akali"),
      champion("zed"),
      champion("shen"),
      champion("kennen")
    ]);

    expect(calculatedSynergies).toHaveLength(1);

    const expectedReturn = {
      synergy: ninjaSynergy,
      bonus: ninjaSynergy.bonuses[1]
    };

    expect(calculatedSynergies[0]).toEqual(expectedReturn);
  });
});
