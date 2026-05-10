import { Layout } from "@/components/layout/Layout";
import { Calendar as CalendarIcon } from "lucide-react";

export default function EconomicCalendar() {
  const events = [
    { time: "08:30", currency: "USD", impact: "High", event: "Non-Farm Employment Change", actual: "275K", forecast: "198K", previous: "229K" },
    { time: "08:30", currency: "USD", impact: "High", event: "Unemployment Rate", actual: "3.9%", forecast: "3.7%", previous: "3.7%" },
    { time: "10:00", currency: "EUR", impact: "Medium", event: "ECB President Lagarde Speaks", actual: "-", forecast: "-", previous: "-" },
    { time: "14:00", currency: "GBP", impact: "High", event: "BOE Interest Rate Decision", actual: "5.25%", forecast: "5.25%", previous: "5.25%" },
    { time: "16:30", currency: "AUD", impact: "Medium", event: "RBA Meeting Minutes", actual: "-", forecast: "-", previous: "-" },
    { time: "18:00", currency: "CAD", impact: "High", event: "BOC Rate Statement", actual: "-", forecast: "-", previous: "-" },
  ];

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Economic Calendar</h1>
            <p className="text-xl text-muted-foreground">
              Track global economic events and plan your trades around high-impact news.
            </p>
          </div>

          <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="text-primary w-6 h-6" />
                <h3 className="font-bold text-xl">Today's Events</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                Timezone: GMT+0
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="p-4 font-semibold text-muted-foreground text-sm">Time</th>
                    <th className="p-4 font-semibold text-muted-foreground text-sm">Cur</th>
                    <th className="p-4 font-semibold text-muted-foreground text-sm">Impact</th>
                    <th className="p-4 font-semibold text-muted-foreground text-sm">Event</th>
                    <th className="p-4 font-semibold text-muted-foreground text-sm text-right">Actual</th>
                    <th className="p-4 font-semibold text-muted-foreground text-sm text-right">Forecast</th>
                    <th className="p-4 font-semibold text-muted-foreground text-sm text-right">Previous</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-medium">{event.time}</td>
                      <td className="p-4 font-bold">{event.currency}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          event.impact === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {event.impact}
                        </span>
                      </td>
                      <td className="p-4 text-white font-medium">{event.event}</td>
                      <td className={`p-4 text-right font-bold ${event.actual !== '-' ? 'text-primary' : 'text-muted-foreground'}`}>{event.actual}</td>
                      <td className="p-4 text-right text-muted-foreground">{event.forecast}</td>
                      <td className="p-4 text-right text-muted-foreground">{event.previous}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-bold text-red-400 mb-2">Important Reminder</h4>
            <p className="text-sm text-red-300">
              Trading 2 minutes before and after high-impact (red) news releases is prohibited on funded accounts. Always check the calendar before executing trades.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
