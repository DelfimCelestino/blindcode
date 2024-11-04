"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import dynamic from "next/dynamic";
import NameInput from "@/components/name-input";
import { cn } from "@/lib/utils";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Cpu className="h-16 w-16 animate-pulse text-cyan-500" />
    </div>
  ),
});

interface ChallengeResult {
  code: string;
  username: string;
  time: string;
  hits: number;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [minutes, setMinutes] = useState(5);

  const handleNameSubmit = (name: string, selectedMinutes: number) => {
    setUsername(name);
    setMinutes(selectedMinutes);
    setIsEditorReady(true);
  };

  const handleChallengeEnd = (code: string) => {
    // Salva o resultado do desafio
    const result: ChallengeResult = {
      code,
      username,
      time: new Date().toISOString(),
      hits: 0,
    };

    try {
      localStorage.setItem(`challenge_${result.time}`, JSON.stringify(result));
    } catch (error) {
      console.error("Erro ao salvar resultado:", error);
    }
  };

  return (
    <main
      className={cn(
        "min-h-screen bg-black text-white",
        "transition-opacity duration-500",
        isEditorReady ? "opacity-100" : "opacity-100"
      )}
    >
      {!username && <NameInput onSubmit={handleNameSubmit} />}
      {username && (
        <Editor
          username={username}
          initialMinutes={minutes}
          onChallengeEnd={handleChallengeEnd}
        />
      )}
    </main>
  );
}
