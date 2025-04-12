
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Location, getNearbyGyms } from "@/services/gym-locator";

export default function GymLocatorPage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    async function loadGyms() {
      if (userLocation) {
        const nearbyGyms = await getNearbyGyms(userLocation);
        setGyms(nearbyGyms);
      }
    }
    loadGyms();
  }, [userLocation]);

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Gym Locator</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px', width: '100%', backgroundColor: 'gray' }}>
            {/* Placeholder for Map */}
            Map will be displayed here
          </div>
          {gyms.length > 0 ? (
            <ul>
              {gyms.map((gym, index) => (
                <li key={index}>
                  {gym.name} - Latitude: {gym.location.lat}, Longitude: {gym.location.lng}
                </li>
              ))}
            </ul>
          ) : (
            <p>No gyms found nearby.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
