import Link from "next/link";
import { Mail, Phone, Sparkles } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const lanes = [
  {
    icon: Mail,
    title: "Editorial support",
    body: "Questions about articles, corrections, publication flow, or submission guidance.",
  },
  {
    icon: Sparkles,
    title: "Partnerships",
    body: "Collaborations, sponsorships, and branded article campaign requests.",
  },
  {
    icon: Phone,
    title: "General help",
    body: "Account, publishing, and platform questions that need a direct response.",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      description={`Reach the ${SITE_CONFIG.name} editorial team and support desk.`}
      actions={
        <Button variant="outline" asChild>
          <Link href="/articles">Browse Articles</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          {lanes.map((lane) => (
            <Card key={lane.title} className="border-[#d2daf0] bg-white">
              <CardContent className="p-6">
                <lane.icon className="h-5 w-5 text-[#1f2a52]" />
                <h2 className="mt-3 text-xl font-semibold text-[#1f2a52]">{lane.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#4f5b85]">{lane.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-[#d2daf0] bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-[#1f2a52]">Send a message</h2>
            <p className="mt-2 text-sm text-[#4f5b85]">
              Share your request and we will route it to the right team.
            </p>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#d2daf0] bg-[#f9fbff] px-4 text-sm text-[#1f2a52] outline-none placeholder:text-[#6b78a3]"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-xl border border-[#d2daf0] bg-[#f9fbff] px-4 text-sm text-[#1f2a52] outline-none placeholder:text-[#6b78a3]"
                placeholder="Email address"
              />
              <input
                className="h-12 rounded-xl border border-[#d2daf0] bg-[#f9fbff] px-4 text-sm text-[#1f2a52] outline-none placeholder:text-[#6b78a3]"
                placeholder="Subject"
              />
              <textarea
                className="min-h-[170px] rounded-2xl border border-[#d2daf0] bg-[#f9fbff] px-4 py-3 text-sm text-[#1f2a52] outline-none placeholder:text-[#6b78a3]"
                placeholder="Tell us what you need help with."
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#cd1f6f] px-6 text-sm font-semibold text-white hover:bg-[#aa175c]"
              >
                Send Message
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
