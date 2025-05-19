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
  const cardContent = (
    <div className={cn(
      "bg-[#2F3136] border border-[#42454A] rounded-md overflow-hidden shadow-lg",
      className
    )}>
      <div className="px-4 py-3 bg-[#36393F]/60 border-b border-[#42454A]">
        <div className="h-2 w-12 bg-[#5865F2] rounded-full" />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}