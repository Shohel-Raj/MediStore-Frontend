"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const termsData = [
  {
    title: "Use of Service",
    content:
      "You agree to use this platform only for lawful purposes and in a way that does not violate any regulations.",
  },
  {
    title: "Account Responsibility",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials.",
  },
  {
    title: "Product Information",
    content:
      "We aim to provide accurate product information, but we do not guarantee complete accuracy at all times.",
  },
  {
    title: "Limitation of Liability",
    content:
      "We are not responsible for any indirect or consequential damages arising from platform usage.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to update these terms at any time. Continued use means acceptance.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center animate-in fade-in duration-700">
          <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
          <p className="opacity-80">
            Please read these terms carefully before using our platform.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

          <Accordion.Root type="single" collapsible className="space-y-4">
            {termsData.map((item, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="border rounded-xl px-4"
              >
                <Accordion.Trigger className="w-full flex items-center justify-between py-4 font-medium text-left">
                  {item.title}
                  <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>

                <Accordion.Content className="pb-4 text-sm opacity-80 animate-in fade-in">
                  {item.content}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

        </div>
      </div>
    </div>
  );
}