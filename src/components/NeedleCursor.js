import React, { useEffect, useState, useCallback } from "react";
import needleCursor from "../assets/images/needle2.png"; // Importez l'image

export default function NeedleCursor({ size = 32 }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    document.body.style.cursor = `url('${needleCursor}'), auto`; // Utilisez l'image importée

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [size]); // Supprimez imageUrl des dépendances car il n'est plus utilisé

  return null;
}