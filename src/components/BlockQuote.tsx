import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BlockQuoteProps {
  anchorName: string;
  anchorLink: string;
  className?: string;
}

export default function BlockQuote({
  anchorName,
  anchorLink,
}: BlockQuoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={cn(
        "rounded-sm bg-muted px-2 py-1 flex max-w-fit shadow-md cursor-pointer"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(anchorLink, '_blank')}
    >
      <span className="flex items-center">
        <span className={cn("text-foreground text-xs font-medium",isHovered && "underline")}>{anchorName}</span>
        <ArrowRight
          className={cn(
            "text-foreground/60 transition-transform duration-300 w-4 h-4",
            isHovered && "translate-x-1"
          )}
        />
      </span>
    </span>
  );
}
