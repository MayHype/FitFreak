
/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a gym with its location and user reviews.
 */
export interface Gym {
  /**
   * The name of the gym.
   */
  name: string;
  /**
   * The location of the gym.
   */
  location: Location;
  /**
   * User reviews for the gym.
   */
  reviews: string[];
}

/**
 * Asynchronously retrieves a list of nearby gyms for a given location.
 *
 * @param location The location for which to search for gyms.
 * @returns A promise that resolves to an array of Gym objects.
 */
export async function getNearbyGyms(location: Location): Promise<Gym[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Cursed Energy Training Center',
      location: { lat: location.lat + 0.01, lng: location.lng + 0.01 },
      reviews: ['Great equipment', 'Friendly staff', 'Unleash your cursed technique here!'],
    },
    {
      name: 'Domain Expansion Fitness',
      location: { lat: location.lat - 0.01, lng: location.lng - 0.01 },
      reviews: ['State-of-the-art facilities', 'Expert trainers', 'Expand your fitness domain!'],
    },
    {
      name: 'Jujutsu Body Forging',
      location: { lat: location.lat + 0.02, lng: location.lng - 0.01 },
      reviews: ['Intensive workout programs', 'Personalized training sessions', 'Forge your body with Jujutsu!'],
    },
  ];
}
