"use client";

import * as React from "react";
import * as CommandPrimitive from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandRoot>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandRoot>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandRoot
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-card",
      className
    )}
    {...props}
  />
));
Command.displayName = "Command";

const CommandDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.CommandDialog>) => (
  <CommandPrimitive.CommandDialog {...props}>{children}</CommandPrimitive.CommandDialog>
);

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandInput>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-border px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
    <CommandPrimitive.CommandInput
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm text-card-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandList>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandList
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = "CommandList";

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandEmpty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandEmpty
    ref={ref}
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandGroup>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandGroup>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandGroup
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-card-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandItem>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-secondary data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.CommandSeparator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.CommandSeparator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.CommandSeparator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};