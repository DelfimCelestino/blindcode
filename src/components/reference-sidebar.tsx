"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Palette, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ColorReference {
  name: string;
  value: string;
}

interface AssetReference {
  name: string;
  path: string;
  description: string;
}

const colors: ColorReference[] = [
  { name: "Azul Principal", value: "#1e40af" },
  { name: "Ciano Secundário", value: "#22d3ee" },
  { name: "Roxo Destaque", value: "#7c3aed" },
  { name: "Fundo Escuro", value: "#0f172a" },
  { name: "Texto Cinza", value: "#94a3b8" },
];

const assets: AssetReference[] = [
  {
    name: "Padrão de Fundo",
    path: "/background.png",
    description: "Padrão principal de fundo",
  },
  {
    name: "Imagem Principal",
    path: "/hero.jpg",
    description: "Imagem da seção principal",
  },
  {
    name: "Logo Escuro",
    path: "/logo-dark.svg",
    description: "Logo para modo escuro",
  },
  {
    name: "Conjunto de Ícones",
    path: "/icons/",
    description: "Diretório com todos os ícones",
  },
];

export default function ReferenceSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 z-50 border-cyan-500/20 bg-black/50 hover:bg-cyan-500/10"
      >
        <ChevronRight className="h-4 w-4 text-cyan-500" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed right-0 top-0 z-50 h-screen w-80 border-l border-cyan-500/20 bg-black/90 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <h2 className="text-lg font-semibold text-cyan-500">
                Referências
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-cyan-500/10"
              >
                <X className="h-4 w-4 text-cyan-500" />
              </Button>
            </div>

            <div className="mt-4 space-y-6">
              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-cyan-500" />
                  <h3 className="text-sm font-medium text-cyan-500">
                    Paleta de Cores
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.value}
                      className="group rounded border border-cyan-500/20 p-2"
                      onClick={() => navigator.clipboard.writeText(color.value)}
                    >
                      <div
                        className="mb-1 h-8 rounded"
                        style={{ backgroundColor: color.value }}
                      />
                      <p className="text-xs text-cyan-500">{color.name}</p>
                      <p className="text-xs text-cyan-500/70">{color.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-cyan-500" />
                  <h3 className="text-sm font-medium text-cyan-500">
                    Recursos
                  </h3>
                </div>
                <div className="space-y-2">
                  {assets.map((asset) => (
                    <div
                      key={asset.path}
                      onClick={() => setSelectedImage(asset.path)}
                      className="cursor-pointer rounded border border-cyan-500/20 p-2 hover:bg-cyan-500/10"
                    >
                      <p className="text-sm text-cyan-500">{asset.name}</p>
                      <p className="text-xs text-cyan-500/70">{asset.path}</p>
                      <p className="text-xs text-cyan-500/50">
                        {asset.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[80vh] max-w-[80vw] rounded-lg border border-cyan-500/20 bg-black/90 p-4"
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-[70vh] rounded"
              />
              <p className="mt-2 text-center text-sm text-cyan-500">
                {selectedImage}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
