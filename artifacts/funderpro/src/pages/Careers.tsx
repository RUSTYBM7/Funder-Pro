import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function Careers() {
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      location: "Remote / London",
      type: "Full-time",
      department: "Engineering",
      description: "Join our core engineering team to build scalable trading infrastructure and enhance our bespoke trader dashboard."
    },
    {
      title: "Risk Analyst",
      location: "Dubai",
      type: "Full-time",
      department: "Risk Management",
      description: "Monitor firm-wide exposure, analyze trader performance data, and help refine our proprietary risk management algorithms."
    },
    {
      title: "Customer Success Specialist",
      location: "Remote",
      type: "Full-time",
      department: "Support",
      description: "Provide exceptional support to our global community of traders. Financial markets knowledge is a huge plus."
    },
    {
      title: "Growth Marketing Manager",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      description: "Drive user acquisition through data-driven campaigns, manage affiliate relationships, and oversee brand positioning."
    }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join the Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us build the future of proprietary trading. We're looking for passionate individuals to join our global, remote-first team.
            </p>
          </div>

          <div className="grid gap-6">
            {jobs.map((job, i) => (
              <div key={i} className="bg-card border border-white/10 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="mb-2 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {job.department}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                  </div>
                  <p className="text-muted-foreground max-w-3xl">{job.description}</p>
                </div>
                <div className="shrink-0">
                  <Button className="w-full md:w-auto bg-white text-black hover:bg-gray-200 font-bold px-8">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center p-10 bg-primary/5 border border-primary/20 rounded-3xl">
            <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Don't see a fit?</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented people. Send your resume to careers@funderpro.com and tell us how you can help.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
