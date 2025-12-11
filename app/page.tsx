// app/page.tsx or src/app/page.tsx (Next.js 13+)

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Navbar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-400/40">
              <span className="text-sm font-semibold text-emerald-300">L</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                LendFlow
              </h1>
              <p className="text-xs text-slate-400">
                AI-powered loan assistant
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#how-it-works" className="hover:text-slate-100">
              How it works
            </a>
            <a href="#features" className="hover:text-slate-100">
              Features
            </a>
            <a href="#security" className="hover:text-slate-100">
              Security
            </a>
            <Link
              href="/loan/chat"
              className="rounded-full border border-emerald-300/60 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-200 hover:bg-emerald-400/20"
            >
              Launch chat
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 md:flex-row md:items-center">
        {/* Left */}
        <section className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Instant, guided loan decisions</span>
          </div>

          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Get your loan eligibility
            <span className="block text-emerald-300">in a single chat.</span>
          </h2>

          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            Talk to our AI loan assistant to check eligibility, upload
            documents, and move through verification and underwriting — all
            from one conversation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/loan/chat"
              className="rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
            >
              Start your loan journey
            </Link>
            <button className="text-sm text-slate-300 hover:text-slate-100">
              View demo journey →
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-300 md:text-sm">
            <div>
              <p className="text-lg font-semibold text-emerald-300">5 min</p>
              <p className="text-slate-400">Average time to decision</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-emerald-300">24/7</p>
              <p className="text-slate-400">Assistant availability</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-emerald-300">₹0</p>
              <p className="text-slate-400">Application fees</p>
            </div>
          </div>
        </section>

        {/* Right – Chat preview / journey card */}
        <section className="mt-8 flex-1 md:mt-0">
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl backdrop-blur">
            {/* Glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-transparent to-sky-500/20 blur-3xl" />

            <div className="relative space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-slate-100">
                    Loan assistant
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    Guiding you through eligibility → documents → approval
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] text-emerald-200">
                  Secure • 256-bit
                </span>
              </div>

              {/* Journey steps */}
              <div id="how-it-works" className="space-y-3">
                <p className="text-xs font-medium text-slate-300">
                  Your loan journey
                </p>
                <ol className="space-y-3 text-xs text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-[11px] text-emerald-200">
                      1
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">
                        Chat & Pre-check
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Share basic details to get a real-time eligibility
                        estimate.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-sky-400/20 text-[11px] text-sky-200">
                      2
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">
                        Verification
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Upload KYC and income documents directly within chat.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-400/20 text-[11px] text-purple-200">
                      3
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">
                        Underwriting & Offer
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Get a conditional approval and next steps instantly.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Fake chat preview */}
              <div className="mt-4 space-y-2 rounded-2xl bg-slate-900/80 p-3 text-[11px]">
                <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-slate-500">
                  Live preview
                </div>
                <div className="space-y-2">
                  <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-slate-100">
                    Hi! Let’s check your home loan eligibility. What’s your
                    monthly income?
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-2xl bg-emerald-500 px-3 py-2 text-right text-slate-950">
                    Around ₹80,000 with fixed salary.
                  </div>
                  <div className="max-w-[80%] rounded-2xl bg-slate-800 px-3 py-2 text-slate-100">
                    Great. Based on your details, you may be eligible up to
                    <span className="font-semibold text-emerald-300">
                      {" "}
                      ₹32L
                    </span>
                    . Let’s verify your documents next.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Features & Security (simple sections) */}
      <section
        id="features"
        className="border-t border-white/5 bg-slate-950/60 py-10"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            {
              title: "Guided journey",
              desc: "No confusing forms — the assistant asks, you answer.",
            },
            {
              title: "Real-time decisions",
              desc: "Chat connects to our backend for instant eligibility and underwriting.",
            },
            {
              title: "Human in the loop",
              desc: "Seamless handoff to human agents when needed.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300"
            >
              <p className="mb-1 text-sm font-semibold text-slate-50">
                {item.title}
              </p>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="security" className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 text-xs text-slate-400 md:flex-row md:items-center">
          <p>Bank-grade encryption • RBI-compliant data practices</p>
          <p>© {new Date().getFullYear()} LendFlow. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
