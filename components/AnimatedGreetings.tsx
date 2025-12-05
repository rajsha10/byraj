import React, { useState, useEffect } from "react";
import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

const GREETINGS = [
  "નમસ્તે",
  "Hello",
  "নমস্কার",
  "வணக்கம்",
  "ನಮಸ್ಕಾರ",
  "నమస్కారం",
  "Bonjour",
  "Hola",
  "こんにちは",
  "Guten Tag",
  "Olá",
  "नमस्कार"
];

const AnimatedGreetings = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [nextText, setNextText] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentGreeting = GREETINGS[currentIndex];
    const nextGreeting = GREETINGS[(currentIndex + 1) % GREETINGS.length];

    if (!isTransitioning) {
      if (splitter.splitGraphemes(currentText).length < splitter.splitGraphemes(currentGreeting).length) {
        const timeout = setTimeout(() => {
          const graphemes = splitter.splitGraphemes(currentGreeting);
          setCurrentText(graphemes.slice(0, splitter.splitGraphemes(currentText).length + 1).join(""));
        }, 150);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setProgress(0);
          setIsTransitioning(true);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      const oldChars = splitter.splitGraphemes(currentGreeting);
      const newChars = splitter.splitGraphemes(nextGreeting);
      const maxLen = Math.max(oldChars.length, newChars.length);

      if (progress > maxLen) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % GREETINGS.length);
        setCurrentText(nextGreeting);
        setNextText("");
        setIsTransitioning(false);
        return;
      }

      const timeout = setTimeout(() => {
        setCurrentText(oldChars.slice(progress).join(""));
        setNextText(newChars.slice(0, progress).join(""));
        setProgress((p) => p + 1);
      }, 120);

      return () => clearTimeout(timeout);
    }
  }, [currentText, isTransitioning, currentIndex, progress]);

  return (
    <div className="text-lg md:text-2xl text-foreground">
      <span className="text-red-900 dark:text-cyan-300">
        &lt;h4&gt;&nbsp;
      </span>
      <span className="text-muted-foreground">{nextText}</span>
      <span>{currentText}</span>
      <span className="text-red-900 dark:text-cyan-300">
        &nbsp;&lt;/h4&gt;
      </span>
    </div>
  );
};

export default AnimatedGreetings;