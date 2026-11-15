"use client";

import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = `Your Library | ${title}`;
  }, [title]);
}