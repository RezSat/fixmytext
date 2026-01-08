"use client";

import React, { useCallback, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState("Drop a PDF or choose a file.");

  const renderFirstPage = useCallback(async (file: File) => {
    try {
      setStatus("Loading…");

      // IMPORTANT: set workerSrc in the browser
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs"; // or "/pdf.worker.min.mjs"

      const data = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      const page = await pdf.getPage(1);

      const canvas = canvasRef.current!;
      const parent = canvas.parentElement;
      const cssWidth = Math.min(900, parent?.clientWidth ?? 360);

      const baseViewport = page.getViewport({ scale: 1 });
      const scale = cssWidth / baseViewport.width;
      const viewport = page.getViewport({ scale });

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      await page.render({ canvasContext: ctx, viewport }).promise;

      setStatus("Done ✅");
    } catch (e: any) {
      setStatus(`Failed: ${e?.message ?? String(e)}`);
      console.error(e);
    }
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <input
        type="file"
        accept="application/pdf,.pdf"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) renderFirstPage(f);
        }}
      />
      <p>{status}</p>
      <canvas ref={canvasRef} />
    </main>
  );
}
