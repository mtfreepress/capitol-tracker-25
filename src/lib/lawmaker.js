import lawmakersData from '../data-nodes/lawmakers.json';

export const getAllLawmakerKeys = () => {
  return lawmakersData.map(lawmaker => lawmaker.key);
};

export const getLawmakerData = (key) => {
  const lawmaker = lawmakersData.find(lawmaker => lawmaker.key === key);
  
  // If no lawmaker found, return null or handle error
  if (!lawmaker) {
    throw new Error(`Lawmaker with key ${key} not found`);
  }

  return {
    key: lawmaker.key,
    title: lawmaker.title,
    name: lawmaker.name,
    party: lawmaker.party,
    district: lawmaker.district,
    locale: lawmaker.locale,
    committees: lawmaker.committees,
    legislativeHistory: lawmaker.legislativeHistory,
    leadershipTitle: lawmaker.leadershipTitle || null,
    sponsoredBills: lawmaker.sponsoredBills || [],
    phone: lawmaker.phone || null,
    email: lawmaker.email || null,
    articles: lawmaker.articles || [],
    districtLocale: lawmaker.districtLocale || '', // Add districtLocale if used
  };
};
