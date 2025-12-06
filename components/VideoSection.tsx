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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Lazy load video source when intersecting, but container always renders
  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoadVideo(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "300px" } // preload earlier if desired
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Render: videoFrame container ALWAYS renders on first paint to reserve height
  // Only the iframe source loads lazily, maintaining identical dimensions at all times
  return (
    <section aria-label="Video" className="video-section">
      <div ref={containerRef} className="videoFrame">
        {shouldLoadVideo ? (
          <iframe
            src={iframeSrc}
            title="Travel video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%" }} />
        )}
      </div>
    </section>
  );
}
