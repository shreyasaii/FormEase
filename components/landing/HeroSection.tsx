"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, FileText, Languages, Sparkles, ArrowRight } from "lucide-react";

const trustBadges = [
  { label: "Fast OCR" },
  { label: "Works on mobile" },
  { label: "Privacy-first" },
];

export const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 md:pt-36 pb-20">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full bg-foreground/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-24 h-[380px] w-[380px] rounded-full bg-foreground/5 blur-3xl" />

      <div className="container-width relative px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 backdrop-blur mb-6 shadow-sm">
            <Sparkles size={16} className="text-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Scan • Translate • Understand
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Understand Any{" "}
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Form
            </span>{" "}
            in Your Language
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Upload a form photo or PDF → get instant translation + simple step-by-step explanation.
            No more confusion with government or college forms.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <Button
              variant="default"
              size="lg"
              className="group rounded-2xl px-6"
              onClick={() => router.push("/app")}
            >
              Try Demo
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-6 bg-background/50 backdrop-blur hover:bg-foreground"
              onClick={() => router.push("/app")}
            >
              Upload Form
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-14">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 backdrop-blur shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-foreground/70" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Mock UI Preview (below) */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-0 rounded-[32px] bg-foreground/10 blur-2xl" />

            <div className="relative glass-card rounded-[32px] p-6 md:p-8 border border-border/70 shadow-xl text-left">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-foreground flex items-center justify-center shadow-md">
                    <FileText size={20} className="text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">Form Analysis</h3>
                    <p className="text-xs text-muted-foreground">
                      OCR + Translation + Checklist
                    </p>
                  </div>
                </div>

                <span className="text-xs px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur">
                  Ready 
                </span>
              </div>

              {/* Extracted Text */}
              <div className="rounded-2xl p-4 mb-4 border border-border bg-background/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Extracted Text</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  Please provide proof of residence including utility bill dated within last 3 months...
                </p>
              </div>

              {/* Translated Text */}
              <div className="rounded-2xl p-4 mb-4 border border-border bg-background/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-2">
                  <Languages size={16} className="text-foreground" />
                  <span className="text-sm font-medium">Translated Text</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  कृपया निवास का प्रमाण प्रदान करें जिसमें पिछले 3 महीनों के भीतर का उपयोगिता बिल शामिल हो...
                </p>
              </div>

              {/* Checklist */}
              <div className="rounded-2xl p-4 border border-border bg-background/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-3">
                  <Check size={16} className="text-foreground" />
                  <span className="text-sm font-medium">Checklist</span>
                </div>

                <div className="space-y-2">
                  {[
                    "Get electricity or water bill",
                    "Must be from last 90 days",
                    "Your name must be on it",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 bg-secondary/60"
                    >
                      <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                        <Check size={12} className="text-background" />
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro footer */}
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Parent mode: ON</span>
                <span>Language: Hindi</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              Built for real-world government + college forms 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
