import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    id: 1,
    title: "How do I book a ride?",
    content:
      "Simply open the app, enter your pickup and drop-off locations, and choose your ride option. Confirm and your driver will be on the way.",
  },
  {
    id: 2,
    title: "Is my payment information secure?",
    content:
      "Yes. We use industry-standard encryption and trusted payment gateways to keep your information safe.",
  },
  {
    id: 3,
    title: "Can I schedule a ride in advance?",
    content:
      "Yes, you can schedule rides ahead of time for important events like airport pickups or meetings.",
  },
  {
    id: 4,
    title: "What if I need to cancel my ride?",
    content:
      "You can cancel anytime before your driver arrives. Depending on timing, a small cancellation fee may apply.",
  },
  {
    id: 5,
    title: "Do you provide 24/7 service?",
    content:
      "Yes, our rides are available 24 hours a day, 7 days a week across all supported cities.",
  },
];

export default function Questions() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        {items.map((item) => (
          <AccordionItem value={item.id.toString()} key={item.id} className="py-2">
            <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
