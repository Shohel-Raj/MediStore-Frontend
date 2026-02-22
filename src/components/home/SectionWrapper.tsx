import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  children: React.ReactNode;
  className?: string; // optional extra styling
}

export default function SectionWrapper({
  title,
  subtitle,
  fallbackTitle,
  fallbackSubtitle,
  children,
  className,
}: Props) {
  const finalTitle = title || fallbackTitle;
  const finalSubtitle = subtitle || fallbackSubtitle;

  return (
    <section
      className={`py-16 ${className ? className : ""} relative`}
      aria-label={finalTitle}
    >
      {/* Optional accent background */}
      <div className="absolute inset-0 bg-background/50 -z-10" />

      <div className="w-11/12 md:w-10/12 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          {/* Accent line above title */}
          <div className="mx-auto md:mx-0 mb-2 h-1 w-20 bg-primary rounded-full" />

          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {finalTitle}
          </h2>

          {finalSubtitle && (
            <p className="mt-2 md:mt-3 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto md:mx-0">
              {finalSubtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </section>
  );
}