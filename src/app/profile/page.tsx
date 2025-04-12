
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://picsum.photos/500/500" alt="User Avatar" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Yuji Itadori</h2>
              <p className="text-sm text-muted-foreground">yuji.itadori@example.com</p>
            </div>
          </div>
          <div className="grid gap-4 mt-4">
            <div>
              <h3 className="text-md font-semibold">Fitness Goals</h3>
              <p>Become the strongest sorcerer and maintain a healthy lifestyle.</p>
            </div>
            <div>
              <h3 className="text-md font-semibold">Progress Metrics</h3>
              <p>Weight: 70 kg | Height: 173 cm | Fitness Level: Intermediate</p>
            </div>
            <div>
              <h3 className="text-md font-semibold">Workout History</h3>
              <p>5 days a week | Strength training and Cursed Energy exercises</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
