"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Code2, Keyboard } from "lucide-react";

interface NameInputProps {
  onSubmit: (name: string, minutes: number) => void;
}

export default function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), minutes);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-screen items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-md flex-col space-y-6 rounded-lg border border-cyan-500/20 bg-black/50 p-8 backdrop-blur"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform">
          <motion.div
            className="flex items-center space-x-2 rounded-full bg-cyan-500/10 px-4 py-2 backdrop-blur"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Code2 className="h-5 w-5 text-cyan-500" />
            <span className="text-sm font-semibold text-cyan-500">
              BLIND CODE
            </span>
          </motion.div>
        </div>

        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold tracking-tight text-cyan-500">
            Aceite o Desafio
          </h1>
          <p className="text-center text-sm text-cyan-500/70">
            Programe sem ver o resultado. Teste suas habilidades!
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Keyboard className="h-4 w-4 text-cyan-500/70" />
              <label className="text-sm text-cyan-500/70">Seu Nome</label>
            </div>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="border-cyan-500/20 bg-black/50 text-cyan-500 placeholder:text-cyan-500/50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-cyan-500/70" />
              <label className="text-sm text-cyan-500/70">
                Tempo do Desafio
              </label>
            </div>
            <select
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="w-full rounded-md border border-cyan-500/20 bg-black/50 px-3 py-2 text-cyan-500"
            >
              <option value={3}>3 minutos</option>
              <option value={5}>5 minutos</option>
              <option value={10}>10 minutos</option>
              <option value={15}>15 minutos</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!name.trim()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full bg-cyan-500 text-black transition-colors hover:bg-cyan-600"
        >
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-md bg-cyan-400/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
          Iniciar Desafio
        </Button>
      </motion.form>
    </motion.div>
  );
}
