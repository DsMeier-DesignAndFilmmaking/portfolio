"use client";

import { motion } from "framer-motion";
import MetricDisplay from "./MetricDisplay";
import { DashboardMetric } from "@/types/dashboard";
import { MetricsGridSkeleton } from "./LoadingSkeleton";
import { StaggerContainer } from "./MicroInteractions";

interface QuickMetricsProps {
  metrics: DashboardMetric[];
  loading?: boolean;
  className?: string;
}

export default function QuickMetrics({
  metrics,
  loading = false,
  className = "",
}: QuickMetricsProps) {
  if (loading) {
    return (
      <MetricsGridSkeleton 
        count={4}
        className={className}
      />
    );
  }

  return (
    <div 
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
      role="region"
      aria-label="Quick metrics overview"
    >
      <StaggerContainer
        staggerDelay={100}
        className="contents"
      >
        {metrics.map((metric) => (
          <MetricDisplay
            key={metric.id}
            metric={metric}
            size="md"
            showSparkline={true}
          />
        ))}
      </StaggerContainer>
    </div>
  );
}
