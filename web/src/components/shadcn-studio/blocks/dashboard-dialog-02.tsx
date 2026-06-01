"use client";

import * as React from "react";
import { DashboardDialog } from "./dashboard-dialog-01";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type Variant = "danger" | "warning" | "success";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: Variant;
}

const variantStyles = {
  danger: {
    icon: XCircle,
    iconColor: "text-red-500",
    buttonClass: "bg-red-500 hover:bg-red-600 text-white",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    buttonClass: "bg-yellow-500 hover:bg-yellow-600 text-black",
  },
  success: {
    icon: CheckCircle,
    iconColor: "text-primary",
    buttonClass: "bg-primary hover:bg-primary/90 text-primary-foreground",
  },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "warning",
}: ConfirmationDialogProps) {
  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <DashboardDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={
        <div className="flex gap-2 w-full justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border text-muted-foreground hover:text-white"
          >
            {cancelLabel}
          </Button>
          <Button
            className={style.buttonClass}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4`}
        >
          <Icon className={`h-8 w-8 ${style.iconColor}`} />
        </div>
      </div>
    </DashboardDialog>
  );
}

export default ConfirmationDialog;