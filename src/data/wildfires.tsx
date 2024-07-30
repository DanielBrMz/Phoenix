export interface WildfiresData {
  [key: string]: {
    [key: string]: string[];
  };
}

const wildfiresData: WildfiresData = {
  "United States": {
    California: ["Fire1", "Fire2", "Fire3"],
    "New York": ["Fire1", "Fire2"],
    Texas: ["Fire1", "Fire2", "Fire3", "Fire4"],
  },
  Canada: {
    Ontario: ["Fire1", "Fire2"],
    Quebec: ["Fire1", "Fire3"],
    "British Columbia": ["Fire1"],
  },
  Mexico: {
    Jalisco: ["Fire1", "Fire2", "Fire3"],
    "Nuevo Leon": ["Fire1", "Fire2"],
    Chihuahua: ["Fire1"],
  },
  Brazil: {
    "Rio de Janeiro": ["Fire1", "Fire2"],
    "Sao Paulo": ["Fire1", "Fire2", "Fire3"],
    "Minas Gerais": ["Fire1", "Fire2"],
  },
};

export default wildfiresData;
