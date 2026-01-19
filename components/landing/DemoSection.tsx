"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

export const DemoSection = () => {
  const router = useRouter();

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-width">
        <div className="glass-card rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Before/After Preview */}
            <div className="space-y-4">
              {/* Before */}
              <div className="bg-background rounded-2xl p-5 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Original Form
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <FileText size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "The applicant must furnish a notarized affidavit attesting to domicile status,
                    accompanied by documentary evidence of continuous residence..."
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                  <ArrowRight size={20} className="text-background rotate-90" />
                </div>
              </div>

              {/* After */}
              <div className="bg-background rounded-2xl p-5 border border-foreground">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="text-xs font-medium text-foreground uppercase tracking-wide">
                    Translated + Explained
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  "आवेदक को अपने पते का शपथ पत्र देना होगा। साथ में ये दस्तावेज दें:"
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    Aadhaar card copy
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span>
                    Electricity bill (last 3 months)
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See it in action
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Try our demo with a sample form to see how FormEase translates
                and simplifies complex documents in seconds.
              </p>

              <Button
                variant="default"
                size="lg"
                onClick={() => router.push("/app?demo=true")}
                className="group"
              >
                Try Demo
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
