"use client";

import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CommunityPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold transition-opacity duration-500">Community Briefings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Interactive forums and real-time chat channels (themed as 'sorcerer briefings') where users can share tips, experiences, and motivation.</p>

            {/* Chat Interface */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Real-time Chat</h3>
              <div
                ref={chatContainerRef}
                className="h-64 overflow-y-auto p-2 border rounded bg-secondary text-secondary-foreground"
              >
                <ScrollArea className="h-full w-full rounded-md border">
                  {messages.map((message, index) => (
                    <div key={index} className="mb-1 p-2 rounded-md bg-accent text-accent-foreground">
                      {message}
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <div className="flex mt-2">
                <Input
                  type="text"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 mr-2"
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>

            {/* Placeholder for forums */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Forums</h3>
              <p>Coming soon: Interactive forums to share tips and experiences.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
