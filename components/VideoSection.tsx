// components/VideoSection.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = {
  iframeSrc: string;
  // optionally expose known aspect ratio or fallback height in px
  aspectRatio?: number; // width / height, e.g., 16/9 => 16/9
  fallbackHeight?: number; // px fallback if aspect-ratio not available
};

export default function VideoSection({ iframeSrc, aspectRatio = 16 / 9, fallbackHeight = 360 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasLoadedIframe, setHasLoadedIframe] = useState(false);
  const [lockedHeight, setLockedHeight] = useState<number | null>(null);

  // Lazy load when intersecting (optional): keeps behavior but placeholder keeps layout
  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setHasLoadedIframe(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "300px" } // preload earlier if desired
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // ResizeObserver: lock container height so layout doesn't shift after iframe load
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    // start by using aspect-ratio to reserve space; if browser doesn't support or if iframe changes, use ResizeObserver
    // compute fallback height based on width and aspect ratio
    const computeAndLock = () => {
      const width = node.getBoundingClientRect().width || node.offsetWidth;
      if (width) {
        const h = Math.round(width / aspectRatio);
        setLockedHeight(h);
      }
    };

    // Initial compute
    computeAndLock();

    const ro = new ResizeObserver(() => {
      computeAndLock();
    });
    ro.observe(node);

    return () => ro.disconnect();
  }, [aspectRatio]);

  // Render: placeholder always present (prevents shift). Only swap in iframe when `hasLoadedIframe` true.
  return (
    <section aria-label="Video" className="video-section">
      <div
        ref={containerRef}
        className="video-container"
        style={
          lockedHeight
            ? { height: lockedHeight }
            : {
                // fallback if ResizeObserver didn't run quickly enough — reserve by aspect-ratio
                aspectRatio: `${aspectRatio}`,
                minHeight: fallbackHeight,
              }
        }
      >
        {!hasLoadedIframe && (
          <div className="video-placeholder" aria-hidden>
            {/* Optionally show a poster image or loader */}
          </div>
        )}

        {hasLoadedIframe && (
          <iframe
            src={iframeSrc}
            title="Travel video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              // iframe loaded — we already locked height via ResizeObserver; nothing further required
            }}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        )}
      </div>
    </section>
  );
}
