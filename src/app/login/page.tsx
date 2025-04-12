import SidebarLayout from "@/components/SidebarLayout";

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for actual authentication logic
    if (email && password) {
      // Simulate successful login
      console.log("Login successful");
      router.push('/'); // Redirect to dashboard
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="flex flex-col items-center space-y-2">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to access your account
            </p>
            {/* Add cursed energy symbols or character silhouettes here */}
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="flex justify-center text-muted-foreground">
              Or sign in with
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
              {/* Add social media integration buttons here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
