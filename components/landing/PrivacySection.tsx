const privacyPoints = [
    {
      title: "Files not stored",
      description: "Your uploaded forms are processed and immediately deleted. We don't keep copies.",
    },
    {
      title: "Secure processing",
      description: "All data transmission is encrypted. Your information stays private and protected.",
    },
    {
      title: "Built for impact",
      description: "Created to solve real problems for families navigating complex bureaucracy.",
    },
  ];
  
  export const PrivacySection = () => {
    return (
      <section id="privacy" className="section-padding">
        <div className="container-width">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium mb-4">
              Privacy & Safety
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your privacy is our priority
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              FormEase is designed with your security in mind. We process your forms without storing them.
            </p>
          </div>
  
          {/* Privacy cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {privacyPoints.map((point) => (
              <div
                key={point.title}
                className="glass-card rounded-2xl p-6 text-center hover-lift"
              >
                <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  