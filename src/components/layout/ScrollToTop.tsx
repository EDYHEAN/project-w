"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);
  return null;
}
