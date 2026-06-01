"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, selected, onSelect }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = selected && selected.toDateString() === date.toDateString();
      days.push(
        <Button
          key={i}
          variant={isSelected ? "default" : "ghost"}
          size="sm"
          className={cn("h-8 w-8 p-0", isSelected && "bg-primary text-primary-foreground")}
          onClick={() => onSelect?.(date)}
        >
          {i}
        </Button>
      );
    }

    return (
      <div ref={ref} className={cn("p-3", className)}>
        <div className="flex items-center justify-between pb-4">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };