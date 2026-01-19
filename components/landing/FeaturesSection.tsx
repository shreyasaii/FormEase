import { ScanLine, Languages, MessageCircle, ListChecks, Download, Globe } from "lucide-react";

const features = [
  {
    icon: ScanLine,
    title: "OCR Scan",
    description: "Upload images or PDFs and extract text automatically with advanced OCR technology.",
  },
  {
    icon: Languages,
    title: "Instant Translation",
    description: "Get accurate translations in seconds, powered by state-of-the-art language models.",
  },
  {
    icon: MessageCircle,
    title: "Simple Explanation",
    description: "Parent Mode breaks down complex legal jargon into easy-to-understand language.",
  },
  {
    icon: ListChecks,
    title: "Checklist Generator",
    description: "Automatically creates a to-do list of documents and steps you need to complete.",
  },
  {
    icon: Download,
    title: "Copy / Download",
    description: "Copy translations to clipboard or download as a document for your records.",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Support for 10+ Indian languages and growing, plus English for reverse translation.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to understand forms
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From scanning to translation to actionable checklists, FormEase handles the entire process.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 hover-lift group text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={24} className="text-background" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
