"use client";
import { useLayoutEffect } from "react";

export default function HomeScrollReset() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
