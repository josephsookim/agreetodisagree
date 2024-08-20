"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  const [messages, setMessages] = useState([
    "Embrace the journey, not just the destination.",
    "Creativity is intelligence having fun.",
    "The only way to do great work is to love what you do.",
    "Believe you can, and you're halfway there.",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleVote = (type) => {
    console.log(`Voted ${type} for message: ${messages[currentIndex]}`);
  };

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, newMessage.trim()]);
      setNewMessage("");
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex flex-col items-center justify-center bg-primary text-primary-foreground">
        <div className="text-6xl font-bold mb-8">{messages[currentIndex]}</div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" onClick={() => handleVote("up")}>
            <Image src="/thumbs-up.svg" alt="Thumbs Up" width={24} height={24} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleVote("down")}>
            <Image src="/thumbs-down.svg" alt="Thumbs Down" width={24} height={24} />
          </Button>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 px-6 flex justify-end">
        <Button variant="ghost" size="icon" onClick={() => setShowModal(true)}>
          <Image src="/add-button.svg" alt="Add Message" width={24} height={24} />
        </Button>
      </footer>
      {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 z-60">
          <h2 className="text-lg font-semibold">Add a New Message</h2>
          <Textarea
            placeholder="Enter your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMessage}>Add Message</Button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
