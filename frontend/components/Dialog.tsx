// Dialog.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utilities";
import { X } from "lucide-react";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
}

const Dialog = ({ open, children }: DialogProps) => {
  return (
    <div role="dialog" aria-modal="true" aria-hidden={!open}>
      {children}
    </div>
  );
};

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onClose, ...props }, ref) => (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        aria-hidden="true" 
        onClick={onClose}
      />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 grid w-full gap-4 rounded-b-lg bg-white p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
          className
        )}
        {...props}
      >
        {children}
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
);
DialogContent.displayName = "DialogContent";

export { Dialog, DialogTrigger, DialogContent };