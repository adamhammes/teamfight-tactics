const championHasSynergy = (synergy, champion) => {
  const championSynergies = champion.origin.concat(champion.class);

  return championSynergies.some(
    championSynergy => championSynergy === synergy.name
  );
};

const haveAchievedBonus = (uniqueChampionCount, bonus) => {
  if (bonus.exclusive) {
    return uniqueChampionCount == bonus.needed;
  }

  return uniqueChampionCount >= bonus.needed;
};

const synergyCalculator = (synergies, champions) => {
  const achievedSynergies = [];

  for (const synergy of synergies) {
    const applicableChampions = champions.filter(champion =>
      championHasSynergy(synergy, champion)
    );

    if (applicableChampions.length <= 1) {
      continue;
    }

    const dedupedCount = new Set(
      applicableChampions.map(champion => champion.slug)
    ).size;

    let achievedSynergy = null;

    for (const bonus of synergy.bonuses) {
      if (haveAchievedBonus(dedupedCount, bonus)) {
        achievedSynergy = { synergy, bonus };
      }
    }

    if (achievedSynergy != null) {
      achievedSynergies.push(achievedSynergy);
    }
  }

  return achievedSynergies;
};

export default synergyCalculator;
