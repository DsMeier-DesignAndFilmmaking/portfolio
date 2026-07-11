/**
 * RouteFadeIn
 * - Pure-CSS opacity fade played on mount (see .route-fade-in in app/globals.css)
 * - No client hooks: relies on BodyKeyWrapper's existing pathname-keyed remount
 *   (components/BodyKeyWrapper.tsx) to replay the animation on every route change
 */
export default function RouteFadeIn({ children }: { children: React.ReactNode }) {
  return <div className="route-fade-in">{children}</div>;
}
