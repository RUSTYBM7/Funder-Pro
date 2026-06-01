"use client";

import * as React from "react";
import * as Sonner from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner.Toaster>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner.Toaster
      className={className}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-xl",
          title: "text-sm font-medium text-card-foreground",
          description: "text-sm text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground h-8 px-3 rounded-md text-sm font-medium",
          cancelButton: "bg-secondary text-secondary-foreground h-8 px-3 rounded-md text-sm font-medium",
          success: "border-green-600/30 bg-green-600/10",
          error: "border-red-600/30 bg-red-600/10",
          warning: "border-yellow-600/30 bg-yellow-600/10",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };