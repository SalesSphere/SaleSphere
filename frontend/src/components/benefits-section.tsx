import { Card, CardContent } from "@/components/ui/card";
import MemoSheild from "@/icons/Sheild";
import MemoEye from "@/icons/Eye";

export function BenefitsSection() {
  const benefits = [
    {
      icon: MemoSheild,
      title: "Enhanced Security",
      description:
        "Data is stored on a blockchain, making it tamper-proof and highly resistant to cyberattacks.",
    },
    {
      icon: MemoEye,
      title: "Transparency and Traceability",
      description:
        "Every inventory movement and transaction is logged on an immutable ledger, ensuring end-to-end visibility.",
    },
    {
      icon: MemoSheild,
      title: "Reduced Operational Costs",
      description:
        "Blockchain minimizes costs from centralized data management and third-party integrations.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-[65rem] mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center rounded-full border-2 px-6 py-2 text-sm font-medium mb-4">
            Benefits
          </div>
          <h2 className="text-3xl font-[500] tracking-tighter sm:text-4xl md:text-5xl">
            Why Settle for Ordinary When You Can Revolutionize Your Inventory
            Management?🌟
          </h2>
          <p className="mx-auto max-w-[750px] text-muted-foreground md:text-xl">
            Unmatched transparency, security, and efficiency. Simplify
            operations, cut costs, and take full control.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border border-[#292D324D] bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#292D3280]">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
