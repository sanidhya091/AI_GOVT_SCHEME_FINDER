import { motion } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Scheme } from "@/mock/schemes";

interface SchemeCardProps {
  scheme: Scheme;
  index: number;
}

const SchemeCard = ({ scheme, index }: SchemeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="rounded-card border border-border bg-card p-5 shadow-card transition-shadow duration-150 hover:shadow-card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                scheme.scheme_type === "central"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              {scheme.scheme_type === "central" ? "Central" : "State"}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {scheme.match_strength}% match
            </span>
          </div>
          <h3 className="font-display text-base font-semibold text-foreground leading-snug">
            {scheme.name}
          </h3>
        </div>

        {/* Match strength bar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
          <span className="text-xs font-bold text-primary tabular-nums">
            {scheme.match_strength}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {scheme.description}
      </p>

      {/* Eligibility reason */}
      <div className="mt-3 rounded-inner bg-secondary/5 border border-secondary/10 px-4 py-3">
        <p className="text-sm text-foreground">
          <span className="font-medium text-secondary">Why you qualify: </span>
          {scheme.eligibility_reason}
        </p>
      </div>

      {/* Expandable steps */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex w-full items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {expanded ? "Hide" : "How to apply"}
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3"
        >
          <ol className="space-y-2">
            {scheme.apply_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </motion.div>
      )}

      {/* Apply button */}
      <a
        href={scheme.application_link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-inner bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
      >
        Apply on official portal
        <ExternalLink className="h-4 w-4" />
      </a>
    </motion.div>
  );
};

export default SchemeCard;
