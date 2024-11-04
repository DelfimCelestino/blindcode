"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { Cpu, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "@/components/sparkles";
import HitCounter from "@/components/hit-counter";
import ReferenceSidebar from "@/components/reference-sidebar";

// Tema cyberpunk
const cyberpunkTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#000000",
    foreground: "#22d3ee",
    caret: "#22d3ee",
    selection: "#22d3ee20",
    selectionMatch: "#22d3ee40",
    lineHighlight: "#22d3ee10",
  },
  styles: [
    { tag: t.comment, color: "#6b7280" },
    { tag: t.variableName, color: "#22d3ee" },
    { tag: [t.string, t.special(t.brace)], color: "#34d399" },
    { tag: t.number, color: "#f472b6" },
    { tag: t.bool, color: "#f472b6" },
    { tag: t.null, color: "#f472b6" },
    { tag: t.keyword, color: "#818cf8" },
    { tag: t.operator, color: "#22d3ee" },
    { tag: t.className, color: "#fbbf24" },
    { tag: t.definition(t.typeName), color: "#fbbf24" },
    { tag: t.typeName, color: "#fbbf24" },
    { tag: t.angleBracket, color: "#22d3ee" },
    { tag: t.tagName, color: "#818cf8" },
    { tag: t.attributeName, color: "#34d399" },
    { tag: t.bracket, color: "#22d3ee" },
  ],
});

interface EditorProps {
  username: string;
  initialMinutes: number;
  onChallengeEnd: (code: string) => void;
}

export default function Editor({
  username,
  initialMinutes,
  onChallengeEnd,
}: EditorProps) {
  const [code, setCode] = useState("");
  const [isTypingFast, setIsTypingFast] = useState(false);
  const [hits, setHits] = useState(0);
  const [isCombo, setIsCombo] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const controls = useAnimation();
  const editorRef = useRef<HTMLDivElement>(null);
  const lastKeysRef = useRef<number[]>([]);
  const comboTimeoutRef = useRef<NodeJS.Timeout>();

  // Efeito para contagem de hits e combos
  useEffect(() => {
    if (isFinished) return;

    const now = Date.now();
    lastKeysRef.current.push(now);
    setHits((prev) => prev + 1);

    if (lastKeysRef.current.length > 5) {
      lastKeysRef.current.shift();
    }

    if (lastKeysRef.current.length >= 2) {
      const timeSpan = now - lastKeysRef.current[0];
      const avgSpeed = timeSpan / lastKeysRef.current.length;
      setIsTypingFast(avgSpeed < 100);

      if (avgSpeed < 100) {
        setIsCombo(true);
        if (comboTimeoutRef.current) {
          clearTimeout(comboTimeoutRef.current);
        }
        comboTimeoutRef.current = setTimeout(() => {
          setIsCombo(false);
        }, 1000);
      }
    }
  }, [code, isFinished]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleChallengeEnd();
    }
  }, [timeLeft, isFinished]);

  const handleChallengeEnd = () => {
    setIsFinished(true);
    const formattedCode = code.trim();
    onChallengeEnd(formattedCode);
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-screen flex-col bg-black p-4"
      >
        <div className="mb-4 flex items-center justify-between border-b border-cyan-500/20 p-4">
          <div className="flex items-center space-x-4">
            <Cpu className="h-6 w-6 text-cyan-500" />
            <span className="text-lg font-semibold text-cyan-500">
              {username} Result
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-cyan-500">Final Hits: {hits}</span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-4">
          <div className="rounded-lg border border-cyan-500/20 bg-black/50 p-4">
            <h2 className="mb-2 text-sm font-semibold text-cyan-500">
              Your Code
            </h2>
            <pre className="overflow-auto">
              <code className="text-sm text-cyan-500">{code}</code>
            </pre>
          </div>
          <div className="rounded-lg border border-cyan-500/20 bg-black/50 p-4">
            <h2 className="mb-2 text-sm font-semibold text-cyan-500">Result</h2>
            <div
              className="preview-content overflow-auto text-cyan-500"
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      ref={editorRef}
      className="relative flex h-screen flex-col overflow-hidden bg-black"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center justify-between border-b border-cyan-500/20 bg-black/90 px-4 py-2 backdrop-blur",
          isTypingFast && "shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        )}
      >
        <div className="flex items-center space-x-4">
          <Cpu className="h-6 w-6 text-cyan-500" />
          <span className="text-lg font-semibold text-cyan-500">
            {username}
          </span>
          <div className="flex items-center space-x-2 border-l border-cyan-500/20 pl-4">
            <Clock className="h-5 w-5 text-cyan-500" />
            <span className="text-sm font-mono text-cyan-500">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <HitCounter hits={hits} isCombo={isCombo} />
          <Button
            variant="outline"
            onClick={handleChallengeEnd}
            className="border-cyan-500/20 bg-black/50 hover:bg-cyan-500/10"
          >
            Finish Challenge
          </Button>
        </div>
      </motion.div>

      <motion.div
        animate={controls}
        className={cn(
          "flex-1 transition-all duration-200",
          isTypingFast && "shadow-[0_0_30px_rgba(34,211,238,0.3)]"
        )}
      >
        <CodeMirror
          value={code}
          height="100%"
          theme={cyberpunkTheme}
          extensions={[html(), css()]}
          onChange={(value) => setCode(value)}
          className={cn(
            "h-full text-lg",
            isTypingFast && "transition-all duration-200"
          )}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: false,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: false,
            lintKeymap: false,
          }}
        />
      </motion.div>

      <ReferenceSidebar />

      {isTypingFast && <Sparkles />}

      {isTypingFast && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-40"
        >
          <div className="absolute inset-0 bg-cyan-500/5" />
        </motion.div>
      )}
    </div>
  );
}
