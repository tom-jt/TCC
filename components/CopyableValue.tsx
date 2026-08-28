"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

interface CopyableValueProps {
  value: string;
  /** What is being copied, for the button's accessible name. */
  label: string;
}

/**
 * A value with a copy button beside it.
 *
 * Used for the WeChat IDs: nobody retypes a WeChat ID by hand off a phone
 * screen, so leaving them as plain text meant the two most-used contact
 * channels on the site were the two hardest to act on.
 */
const CopyableValue = ({ value, label }: CopyableValueProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be refused (insecure origin, permissions). The ID
      // is still on screen to read, so there is nothing useful to say here.
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      {value}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className="cursor-pointer text-neutral-500 hover:text-neutral-900 dark:hover:text-zinc-50 transition-colors"
      >
        {copied ? (
          <Check size={14} aria-hidden="true" />
        ) : (
          <Copy size={14} aria-hidden="true" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ""}
      </span>
    </span>
  );
};

export default CopyableValue;
