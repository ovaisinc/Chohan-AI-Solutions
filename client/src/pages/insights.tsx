import { Link } from "wouter";
import { insights } from "@/data/insights";
import { ArrowRight, Calendar, Sparkles, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function formatDate(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

import { useEffect } from "react";

export default function CaseStudiesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-between">
          <Link href="/">
            <a
              className="flex items-center gap-2 -mt-20 md:-mt-24 -mb-10 md:-mb-20"
              data-testid="link-insights-logo"
            >
              <img
                src="/logo-header.png"
                alt="Chohan"
                className="h-16 md:h-20 w-auto"
                data-testid="img-insights-logo"
              />
              <span className="sr-only">Chohan</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-8 mt-4">
            <a
              href="/#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-insights-services"
            >
              Services
            </a>
            <a
              href="/#process"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-insights-process"
            >
              Process
            </a>
            <a
              href="/#results"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-insights-results"
            >
              Results
            </a>
            <Link href="/insights">
              <span className="text-sm font-medium text-white" data-testid="link-insights-nav-insights">
                Case Studies
              </span>
            </Link>
            <Link href="/contact">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
                data-testid="button-insights-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" data-testid="button-insights-menu">
                  <Menu className="h-6 w-6" data-testid="icon-insights-menu" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-white/10 w-[300px]">
                <div className="sr-only">
                  <span>Menu</span>
                </div>
                <div className="flex flex-col space-y-8 mt-10">
                  <a
                    href="/#services"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-insights-mobile-services"
                  >
                    Services
                  </a>
                  <a
                    href="/#process"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-insights-mobile-process"
                  >
                    Process
                  </a>
                  <a
                    href="/#results"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-insights-mobile-results"
                  >
                    Results
                  </a>
                  <Link href="/insights">
                    <span className="text-lg font-medium text-left text-white" data-testid="link-insights-mobile-insights">
                      Case Studies
                    </span>
                  </Link>
                  <Link href="/contact">
                    <Button
                      className="bg-primary text-white hover:bg-primary/90 rounded-full w-full"
                      data-testid="button-insights-mobile-contact"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm mb-6">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
                    Case Studies
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                  Case Studies & Articles
                </h1>
                <p className="text-gray-400 mt-4 max-w-2xl text-base md:text-lg leading-relaxed">
                  Notes from real-world delivery: what worked, what didn’t, and
                  the systems that produced measurable results.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights
                .slice()
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .map((post) => (
                  <Link key={post.slug} href={`/insights/${post.slug}`}>
                    <a
                      data-testid={`card-insight-${post.slug}`}
                      className="group rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md hover:border-primary/30 hover:bg-black/40 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-[16/9] bg-white/5">
                        <img
                          src={post.heroImageUrl}
                          alt={post.heroImageAlt}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute left-4 top-4 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/70 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span data-testid={`text-date-${post.slug}`}>
                              {formatDate(post.date)}
                            </span>
                          </div>
                          <span className="text-xs text-white/50">
                            {post.readTimeMinutes} min
                          </span>
                        </div>

                        <h2
                          data-testid={`text-title-${post.slug}`}
                          className="mt-5 text-xl font-display font-bold text-white group-hover:text-primary transition-colors"
                        >
                          {post.title}
                        </h2>

                        <p
                          data-testid={`text-summary-${post.slug}`}
                          className="mt-3 text-sm text-gray-400 leading-relaxed"
                        >
                          {post.summary}
                        </p>

                        <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs text-white/50">
                            {post.coverLabel}
                          </span>
                          <span className="inline-flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                            Read
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
