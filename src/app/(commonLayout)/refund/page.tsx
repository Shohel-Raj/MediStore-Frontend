"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const refundData = [
  {
    title: "Eligibility for Refunds",
    content:
      "Refunds are applicable for damaged, defective, or incorrect products. Requests must be submitted within the specified timeframe after delivery.",
  },
  {
    title: "Non-Refundable Items",
    content:
      "Opened medicines, perishable goods, and items without valid proof of purchase are not eligible for refunds.",
  },
  {
    title: "Refund Process",
    content:
      "Approved refunds will be processed to your original payment method within a few business days.",
  },
  {
    title: "Support & Assistance",
    content:
      "For any issues regarding refunds, please contact our support team for quick resolution.",
  },
];

export default function RefundPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center animate-in fade-in duration-700">
          <h1 className="text-4xl font-bold mb-3">Refund Policy</h1>
          <p className="opacity-80">
            Clear and transparent refund guidelines for your peace of mind.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border shadow-sm p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

          <Accordion.Root type="single" collapsible className="space-y-4">
            {refundData.map((item, index) => (
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