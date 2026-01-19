import { Upload, Languages, ClipboardList } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your form",
    description: "Take a photo or upload a PDF of any government or college form.",
  },
  {
    number: "02",
    icon: Languages,
    title: "Translate to your language",
    description: "Select your preferred language and get instant, accurate translation.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Get simplified instructions",
    description: "Receive easy explanations and a checklist of required documents.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-secondary/50">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to understand any form in your language.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="glass-card rounded-3xl p-8 text-center hover-lift relative">
                {/* Number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-sm font-bold text-background">
                  {step.number}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6 mt-4">
                  <step.icon size={32} className="text-foreground" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
