import { Language } from "../types";

// Speech Recognition API interface types
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as IWindow;
  return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window;
}

let activeRecognition: any = null;

export function startSpeechRecognition(
  language: Language,
  onResult: (transcript: string) => void,
  onError: (error: string) => void,
  onEnd: () => void
): () => void {
  if (!isSpeechRecognitionSupported()) {
    onError("Voice input is not supported in this browser.");
    onEnd();
    return () => {};
  }

  const win = window as IWindow;
  const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
  const recognition = new SpeechRec();
  activeRecognition = recognition;

  recognition.continuous = false;
  recognition.interimResults = true;

  // Language mapping
  const langCode = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
  recognition.lang = langCode;

  recognition.onresult = (event: any) => {
    let finalTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    if (finalTranscript.trim()) {
      onResult(finalTranscript.trim());
    }
  };

  recognition.onerror = (event: any) => {
    console.warn("Speech recognition error:", event.error);
    if (event.error === "not-allowed") {
      onError("Microphone permission was denied. Please allow microphone access.");
    } else if (event.error === "no-speech") {
      onError("No speech was detected. Please try tapping and speaking again.");
    } else {
      onError(`Speech recognition error: ${event.error}`);
    }
    onEnd();
  };

  recognition.onend = () => {
    activeRecognition = null;
    onEnd();
  };

  try {
    recognition.start();
  } catch (err) {
    console.warn("Recognition start error:", err);
    onError("Could not start microphone.");
    onEnd();
  }

  return () => {
    try {
      recognition.stop();
    } catch {
      // ignore
    }
    activeRecognition = null;
  };
}

export function stopSpeechRecognition() {
  if (activeRecognition) {
    try {
      activeRecognition.stop();
    } catch {
      // ignore
    }
    activeRecognition = null;
  }
}

let activeAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

// Text to Speech playback with native voice + streaming TTS fallback
export function speakText(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onLoading?: () => void
): void {
  stopSpeaking();

  // Clean markdown or special characters
  const cleanText = text
    .replace(/[#*_`~•|]/g, " ")
    .replace(/₹/g, language === "te" ? " రూపాయలు " : language === "hi" ? " रुपये " : " Rupees ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) {
    onEnd?.();
    return;
  }

  onLoading?.();

  // For Telugu and Hindi, try high-fidelity server TTS first with automatic browser synthesis fallback
  if (language === "te" || language === "hi") {
    playServerTts(
      cleanText,
      language,
      onStart,
      onEnd,
      () => {
        // Fallback to browser synthesis if server audio encounters any error
        tryBrowserSpeech(cleanText, language, onStart, onEnd);
      }
    );
    return;
  }

  // For English: Try browser synthesis first, fallback to server TTS
  tryBrowserSpeech(cleanText, language, onStart, onEnd, () => {
    playServerTts(cleanText, language, onStart, onEnd);
  });
}

function tryBrowserSpeech(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onErrorFallback?: () => void
): void {
  if (!isSpeechSynthesisSupported()) {
    onErrorFallback?.() || onEnd?.();
    return;
  }

  try {
    const langCode = language === "te" ? "te-IN" : language === "hi" ? "hi-IN" : "en-IN";
    const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();

    const matchedVoice = voices.find(
      (v) =>
        v.lang.toLowerCase() === langCode.toLowerCase() ||
        v.lang.toLowerCase().startsWith(language.toLowerCase()) ||
        v.name.toLowerCase().includes(language === "te" ? "telugu" : language === "hi" ? "hindi" : "english")
    );

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.lang = langCode;

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    let ended = false;
    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      if (!ended) {
        ended = true;
        activeUtterance = null;
        onEnd?.();
      }
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      if (!ended) {
        ended = true;
        activeUtterance = null;
        if (onErrorFallback) {
          onErrorFallback();
        } else {
          onEnd?.();
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("SpeechSynthesis exception:", err);
    if (onErrorFallback) {
      onErrorFallback();
    } else {
      onEnd?.();
    }
  }
}

function playServerTts(
  text: string,
  language: Language,
  onStart?: () => void,
  onEnd?: () => void,
  onFallback?: () => void
): void {
  try {
    const speechText = text.slice(0, 1400);
    const audioUrl = `/api/tts?text=${encodeURIComponent(speechText)}&lang=${language}`;
    const audio = new Audio(audioUrl);
    activeAudio = audio;

    let hasStarted = false;

    audio.onplaying = () => {
      if (!hasStarted) {
        hasStarted = true;
        onStart?.();
      }
    };

    audio.onplay = () => {
      if (!hasStarted) {
        hasStarted = true;
        onStart?.();
      }
    };

    audio.onended = () => {
      activeAudio = null;
      onEnd?.();
    };

    audio.onerror = (e) => {
      console.warn("Server TTS audio error:", e);
      activeAudio = null;
      if (onFallback) {
        onFallback();
      } else {
        onEnd?.();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Audio play promise error:", err);
        activeAudio = null;
        if (onFallback) {
          onFallback();
        } else {
          onEnd?.();
        }
      });
    }
  } catch (e) {
    console.warn("Server TTS instantiation error:", e);
    activeAudio = null;
    if (onFallback) {
      onFallback();
    } else {
      onEnd?.();
    }
  }
}

export function stopSpeaking(): void {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }

  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
      activeUtterance = null;
    } catch {
      // ignore
    }
  }
}
