"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Trusted Online Medicine Shop",
    subtitle: "Buy OTC medicines safely with fast delivery & verified sellers.",
    image: "/hero/hero-1.jpg",
    ctaPrimary: { label: "Shop Now", href: "/shop" },
    ctaSecondary: { label: "View Products", href: "/products" },
  },
  {
    id: 2,
    title: "Fast Delivery, Secure Checkout",
    subtitle: "Smooth ordering experience with Stripe payment support.",
    image: "/hero/hero-2.jpg",
    ctaPrimary: { label: "Explore Medicines", href: "/products" },
    ctaSecondary: { label: "How It Works", href: "/about" },
  },
  {
    id: 3,
    title: "Verified Sellers & Quality Products",
    subtitle: "Shop confidently with authentic products and reliable vendors.",
    image: "/hero/hero-3.jpg",
    ctaPrimary: { label: "Browse Categories", href: "/categories" },
    ctaSecondary: { label: "Contact Us", href: "/contact" },
  },
];

export default function HeroSlider() {
  const [api, setApi] = React.useState<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        className="relative w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="p-0">
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  // fully responsive height (mobile -> desktop)
                  "h-[clamp(420px,60vh,820px)]"
                )}
              >
                {/* Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Theme-friendly overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20 dark:from-background/95 dark:via-background/70 dark:to-background/30" />

                {/* Content */}
                <div className="absolute inset-0">
                  <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    <div
                      className={cn(
                        "w-full max-w-xl",
                        // center content on small screens
                        "text-center sm:text-left"
                      )}
                    >
                      <h1
                        className={cn(
                          "font-bold leading-tight tracking-tight",
                          // fluid responsive typography
                          "text-[clamp(1.8rem,4vw,3.4rem)]"
                        )}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={cn(
                          "mt-4 text-muted-foreground",
                          "text-[clamp(0.95rem,2vw,1.125rem)]"
                        )}
                      >
                        {slide.subtitle}
                      </p>

                      {/* CTA */}
                      <div
                        className={cn(
                          "mt-7 flex flex-col gap-3",
                          "sm:flex-row sm:flex-wrap sm:justify-start",
                          // center buttons on mobile
                          "items-center sm:items-start"
                        )}
                      >
                        <Link
                          href={slide.ctaPrimary.href}
                          className={cn(
                            "inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90",
                            // full width on very small screens
                            "w-full max-w-[260px] sm:w-auto"
                          )}
                        >
                          {slide.ctaPrimary.label}
                        </Link>

                        <Link
                          href={slide.ctaSecondary.href}
                          className={cn(
                            "inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-6 text-sm font-medium shadow-sm transition hover:bg-accent",
                            "w-full max-w-[260px] sm:w-auto"
                          )}
                        >
                          {slide.ctaSecondary.label}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="left-3 hidden sm:flex lg:left-4" />
        <CarouselNext className="right-3 hidden sm:flex lg:right-4" />

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center px-3">
          <div className="flex items-center gap-2 rounded-full bg-background/70 px-3 py-2 backdrop-blur dark:bg-background/50">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  selectedIndex === i
                    ? "bg-primary"
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
