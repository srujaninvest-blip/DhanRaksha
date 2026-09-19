import React, { useState } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { speakText, stopSpeaking } from "../services/speech";
import { useApp } from "../context/AppContext";

interface Props {
  text: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const AudioNarrationButton: React.FC<Props> = ({
  text,
  label,
  className = "",
  size = "md",
}) => {
  const { language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying || isLoading) {
      stopSpeaking();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      speakText(
        text,
        language,
        () => {
          setIsLoading(false);
          setIsPlaying(true);
        },
        () => {
          setIsLoading(false);
          setIsPlaying(false);
        },
        () => {
          setIsLoading(true);
        }
      );
    }
  };

  const getLabel = () => {
    if (isLoading) {
      if (language === "te") return "సిద్ధమవుతోంది...";
      if (language === "hi") return "लोड हो रहा है...";
      return "Loading...";
    }

    if (isPlaying) {
      if (language === "te") return "ఆపండి";
      if (language === "hi") return "रोकें";
      return "Stop";
    }

    // Translate common passed English labels to user's selected language
    if (label) {
      const lower = label.toLowerCase();
      if (lower.includes("overview") || lower.includes("intro")) {
        if (language === "te") return "పరిచయం వినండి";
        if (language === "hi") return "विवरण सुनें";
        return label;
      }
      if (lower.includes("rule") || lower.includes("safety")) {
        if (language === "te") return "సూత్రాలు వినండి";
        if (language === "hi") return "नियम सुनें";
        return label;
      }
      if (lower.includes("profile")) {
        if (language === "te") return "ప్రొఫైల్ వినండి";
        if (language === "hi") return "प्रोफ़ाइल सुनें";
        return label;
      }
      if (lower === "listen") {
        if (language === "te") return "వినండి";
        if (language === "hi") return "सुनें";
        return "Listen";
      }
      // If label is in Telugu or Hindi or custom, return it directly
      return label;
    }

    if (language === "te") return "వినండి";
    if (language === "hi") return "सुनें";
    return "Listen";
  };

  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-xs gap-1.5"
      : size === "lg"
      ? "px-4 py-2.5 text-base gap-2"
      : "px-3.5 py-1.5 text-sm gap-2";

  return (
    <button
      id={`audio-narrate-${text.slice(0, 10).replace(/[^a-zA-Z0-9]/g, "")}`}
      onClick={handleClick}
      type="button"
      title="Listen to this text read aloud in your language"
      className={`inline-flex items-center rounded-full font-bold transition-all shadow-xs cursor-pointer select-none active:scale-95 ${
        isPlaying
          ? "bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-amber-400/40"
          : isLoading
          ? "bg-emerald-100/80 text-emerald-950 border border-emerald-300 animate-pulse"
          : "bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400"
      } ${sizeClasses} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 text-emerald-800 animate-spin shrink-0" />
          <span className="whitespace-nowrap">{getLabel()}</span>
        </>
      ) : isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-amber-800 shrink-0" />
          <span className="whitespace-nowrap">{getLabel()}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-800 shrink-0" />
          <span className="whitespace-nowrap">{getLabel()}</span>
        </>
      )}
    </button>
  );
};
