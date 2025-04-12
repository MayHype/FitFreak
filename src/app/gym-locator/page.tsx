'use client';

import SidebarLayout from "@/components/SidebarLayout";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Location, getNearbyGyms } from "@/services/gym-locator";
import { useToast } from "@/hooks/use-toast";

export default function GymLocatorPage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError("Failed to get your location. Please enable location services.");
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get your location. Please enable location services.",
          });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Geolocation is not supported by this browser.",
      });
    }
  }, [toast]);

  useEffect(() => {
    async function loadGyms() {
      if (userLocation) {
        try {
          const nearbyGyms = await getNearbyGyms(userLocation);
          setGyms(nearbyGyms);
          setLoading(false);
        } catch (e) {
          console.error("Error loading gyms:", e);
          setError("Failed to load gyms. Please try again later.");
          setLoading(false);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load gyms. Please try again later.",
          });
        }
      }
    }

    loadGyms();
  }, [userLocation, toast]);

  let mapUrl = `https://maps.google.com/maps?q=gyms+near+${userLocation?.lat},${userLocation?.lng}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Gym Locator</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {userLocation && (
              <div className="w-full aspect-video rounded-md overflow-hidden">
                <iframe
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={mapUrl}
                  title="Gyms Near Me"
                ></iframe>
              </div>
            )}

            {gyms.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {gyms.map((gym, index) => (
                  <li key={index} className="p-4 border rounded-md">
                    <h3 className="font-semibold">{gym.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Latitude: {gym.location.lat}, Longitude: {gym.location.lng}
                    </p>
                    {gym.reviews && gym.reviews.length > 0 && (
                      <>
                        <h4 className="font-semibold mt-2">Reviews:</h4>
                        <ul className="list-disc pl-5">
                          {gym.reviews.map((review, i) => (
                            <li key={i} className="text-sm">{review}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : !loading && !error && (
              <p className="mt-4">No gyms found nearby.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
