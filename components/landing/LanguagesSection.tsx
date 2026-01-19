const languages = [
    "Hindi",
    "Marathi",
    "Tamil",
    "Telugu",
    "Bengali",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "English",
  ];
  
  export const LanguagesSection = () => {
    return (
      <section id="languages" className="section-padding">
        <div className="container-width">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium mb-4">
              Multi-language Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supported Languages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Translate forms to your native language for complete understanding.
            </p>
          </div>
  
          {/* Language pills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-8">
            {languages.map((language) => (
              <div
                key={language}
                className="glass-card px-6 py-3 rounded-full hover-lift cursor-default"
              >
                <span className="font-medium">{language}</span>
              </div>
            ))}
          </div>
  
          {/* Coming soon badge */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-muted-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
              More languages coming soon
            </span>
          </div>
        </div>
      </section>
    );
  };
  