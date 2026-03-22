import { motion, AnimatePresence } from "framer-motion";

interface ProfileChip {
  label: string;
  value: string;
}

interface ProfileChipsProps {
  chips: ProfileChip[];
}

const ProfileChips = ({ chips }: ProfileChipsProps) => {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <AnimatePresence>
        {chips.map((chip, i) => (
          <motion.span
            key={chip.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: i * 0.1,
            }}
          >
            <span className="text-muted-foreground">{chip.label}:</span>
            <span className="tabular-nums">{chip.value}</span>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProfileChips;
