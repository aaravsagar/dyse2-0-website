import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DiscordCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function DiscordCard({ 
  children, 
  className, 
  animate = true
}: DiscordCardProps) {
  const embedColor = "#F04747"; // fixed red color

  const cardContent = (
    <div
      className={cn(
        "bg-[#2C2F33] rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.2)] overflow-hidden border-l-4",
        className
      )}
      style={{ borderLeftColor: embedColor }}
    >
      {/* Removed the top small bar */}
      <div className="p-4 text-sm text-[#DCDDDE]">
        {children}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
