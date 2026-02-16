import { Link, useRoute } from "wouter";
import { useEffect } from "react";
import { insightsBySlug } from "@/data/insights";
import { ArrowLeft, Calendar, Clock, Menu, Tag } from "lucide-react";
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

function renderParagraphs(text: string) {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, idx) => (
      <p
        key={idx}
        data-testid={`text-paragraph-${idx}`}
        className="text-gray-300 leading-relaxed"
      >
        {p}
      </p>
    ));
}

export default function InsightDetailPage() {
  const [, params] = useRoute("/insights/:slug");
  const slug = params?.slug;
  const post = slug ? insightsBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-black/30 p-8">
          <h1 className="text-2xl font-display font-bold">Insight not found</h1>
          <p className="text-gray-400 mt-2">
            The link may be outdated. Browse the full Case Studies library.
          </p>
          <Link href="/insights">
            <a
              data-testid="link-back-insights"
              className="inline-flex items-center mt-6 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-between">
          <Link href="/">
            <a
              className="flex items-center gap-2 -mt-20 md:-mt-24 -mb-10 md:-mb-20"
              data-testid="link-insight-logo"
            >
              <img
                src="/logo-header.png"
                alt="Chohan"
                className="h-16 md:h-20 w-auto"
                data-testid="img-insight-logo"
              />
              <span className="sr-only">Chohan</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-8 mt-4">
            <a
              href="/#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-insight-services"
            >
              Services
            </a>
            <a
              href="/#process"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-insight-process"
            >
              Process
            </a>
            <a
              href="/#results"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-insight-results"
            >
              Results
            </a>
            <Link href="/insights">
              <span className="text-sm font-medium text-white" data-testid="link-insight-nav-insights">
                Case Studies
              </span>
            </Link>
            <Link href="/contact">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
                data-testid="button-insight-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" data-testid="button-insight-menu">
                  <Menu className="h-6 w-6" data-testid="icon-insight-menu" />
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
                    data-testid="link-insight-mobile-services"
                  >
                    Services
                  </a>
                  <a
                    href="/#process"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-insight-mobile-process"
                  >
                    Process
                  </a>
                  <a
                    href="/#results"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-insight-mobile-results"
                  >
                    Results
                  </a>
                  <Link href="/insights">
                    <span className="text-lg font-medium text-left text-white" data-testid="link-insight-mobile-insights">
                      Case Studies
                    </span>
                  </Link>
                  <Link href="/contact">
                    <Button
                      className="bg-primary text-white hover:bg-primary/90 rounded-full w-full"
                      data-testid="button-insight-mobile-contact"
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

      <section className="relative pt-24 md:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(90,158,217,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(7,41,93,0.45),transparent_55%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Link href="/insights">
              <a
                data-testid="link-insights"
                className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Case Studies
              </a>
            </Link>

            <h1
              data-testid="text-insight-title"
              className="mt-6 text-4xl md:text-5xl font-display font-bold leading-tight"
            >
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Calendar className="h-4 w-4" />
                <span data-testid="text-insight-date">{formatDate(post.date)}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Clock className="h-4 w-4" />
                <span data-testid="text-insight-readtime">
                  {post.readTimeMinutes} min read
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Tag className="h-4 w-4" />
                <span data-testid="text-insight-category">{post.category}</span>
              </span>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
              <div className="relative aspect-[16/9]">
                <img
                  src={post.heroImageUrl}
                  alt={post.heroImageAlt}
                  className="absolute inset-0 w-full h-full object-cover opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-6 bottom-6 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/70 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
                  {post.coverLabel}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white/60">
                      Summary
                    </h2>
                    <p className="text-gray-300 mt-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white/60">
                      Highlights
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {post.highlights.map((h, idx) => (
                        <li
                          key={idx}
                          data-testid={`text-highlight-${idx}`}
                          className="text-sm text-gray-300"
                        >
                          • <span className="text-white/90">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <article className="mt-10 space-y-6 text-base">
              {renderParagraphs(post.content)}
            </article>

            <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
              <Link href="/insights">
                <a
                  data-testid="link-back"
                  className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Case Studies
                </a>
              </Link>
              <Link href="/">
                <a
                  data-testid="link-home"
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Home
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
