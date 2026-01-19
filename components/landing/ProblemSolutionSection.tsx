import { ArrowRight, CheckCircle2 } from "lucide-react";

const problems = [
  {
    title: "Can't read English forms",
    description: "Parents struggle to understand complex government terminology",
  },
  {
    title: "Errors cause rejection",
    description: "Small mistakes lead to applications being denied",
  },
  {
    title: "No guidance available",
    description: "Unclear what documents are actually needed",
  },
];

const solutions = [
  "Instant translation to your language",
  "Simple step-by-step explanations",
  "Document checklist generator",
];

export const ProblemSolutionSection = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-width">
        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="glass-card rounded-2xl p-6 hover-lift text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-16">
          <div className="glass-card rounded-full p-4">
            <ArrowRight size={24} className="text-foreground rotate-90 md:rotate-0" />
          </div>
        </div>

        {/* Solution */}
        <div className="glass-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium mb-6">
            FormEase Fixes It
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Translation + Explanation + Checklist
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {solutions.map((solution) => (
              <div
                key={solution}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary"
              >
                <CheckCircle2 size={18} className="text-foreground" />
                <span className="font-medium text-sm">{solution}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
