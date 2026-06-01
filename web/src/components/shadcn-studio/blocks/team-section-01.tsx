"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
}

const team: TeamMember[] = [
  { name: "Alexandra Reid", role: "CEO", initials: "AR", color: "#00E27A" },
  { name: "Marcus Chen", role: "CTO", initials: "MC", color: "#3B82F6" },
  { name: "Sofia Rodriguez", role: "Head of Trading", initials: "SR", color: "#8B5CF6" },
  { name: "James Wright", role: "Compliance", initials: "JW", color: "#F59E0B" },
];

export function TeamSection() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Meet Our Team</h2>
        <p className="text-sm text-muted-foreground">The experts behind FunderPro Integrations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((member) => (
          <Card key={member.name} className="card-glass p-6 text-center">
            <Avatar className="h-16 w-16 mx-auto mb-4">
              <AvatarFallback
                className="text-lg font-bold"
                style={{ backgroundColor: `${member.color}20`, color: member.color }}
              >
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-white mb-1">{member.name}</h3>
            <Badge variant="outline" className="border-border text-muted-foreground text-xs">
              {member.role}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TeamSection;