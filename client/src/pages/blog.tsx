import { Link } from "wouter";
import { useMemo, useEffect, useState } from "react";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Calendar, Clock, Menu, ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function formatDate(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = `/#${id}`;
  };

  const sortedPosts = useMemo(() => {
    return blogPosts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return sortedPosts;
    return sortedPosts.filter((p) => p.category === activeCategory);
  }, [sortedPosts, activeCategory]);

  const featuredPost = sortedPosts[0];
  const gridPosts = activeCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="relative w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-end">
          <a
            href="/"
            className="absolute left-1/2 top-2 -translate-x-1/2 z-[60]"
            data-testid="link-left-logo"
          >
            <img
              src="/logo-left.png"
              alt="Chohan"
              className="h-24 sm:h-28 md:h-44 w-auto max-w-[70vw] object-contain"
              data-testid="img-left-logo"
            />
          </a>

          <div className="hidden md:flex items-center space-x-8 mt-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="button-nav-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="button-nav-process"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("results")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="button-nav-results"
            >
              Results
            </button>
            <Link href="/insights">
              <span
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-nav-insights"
              >
                Case Studies
              </span>
            </Link>
            <Link href="/blog">
              <span
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-nav-blog"
              >
                Blog
              </span>
            </Link>
            <Link href="/contact">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
                data-testid="button-nav-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white rounded-full border border-white/10 bg-black/20 hover:bg-black/30"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" data-testid="icon-mobile-menu" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-white/10 w-[300px]">
                <div className="sr-only">
                  <span>Menu</span>
                </div>
                <div className="flex flex-col space-y-8 mt-10">
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="button-mobile-services"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("process")}
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="button-mobile-process"
                  >
                    Process
                  </button>
                  <button
                    onClick={() => scrollToSection("results")}
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="button-mobile-results"
                  >
                    Results
                  </button>
                  <Link href="/insights">
                    <span
                      className="text-lg font-medium text-left hover:text-primary transition-colors"
                      data-testid="link-mobile-insights"
                    >
                      Case Studies
                    </span>
                  </Link>
                  <Link href="/blog">
                    <span
                      className="text-lg font-medium text-left hover:text-primary transition-colors"
                      data-testid="link-mobile-blog"
                    >
                      Blog
                    </span>
                  </Link>
                  <Link href="/contact">
                    <Button
                      className="bg-primary text-white hover:bg-primary/90 rounded-full w-full"
                      data-testid="button-mobile-contact"
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

      <main className="relative z-0 pb-24 pt-64 md:pt-[25rem]">
        <div className="container mx-auto px-6">
          {/* Header */}
          <header className="mb-12 md:mb-14">
            <p className="mb-4 inline-flex items-center text-[11px] font-medium uppercase tracking-[0.25em] text-gray-400">
              Insights & Perspectives
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight max-w-3xl">
              AI Insights
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-400 leading-relaxed">
              Practical executive guidance on AI implementation, workflow automation, and operational performance.
            </p>
          </header>

          {/* Featured Post */}
          {featuredPost && activeCategory === "All" && (
            <section className="mb-14 md:mb-16 border-t border-white/10 pt-8 md:pt-10">
              <Link href={`/blog/${featuredPost.slug}`}>
                <a className="group block rounded-xl border border-primary/20 bg-white/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.05] md:max-w-[980px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-center p-4 md:p-5">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                        Featured
                      </span>
                      <span className="text-white/20">|</span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                        {featuredPost.category}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-display font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-gray-400 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-6 text-xs text-white/50">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime} min read
                      </span>
                    </div>

                    <span className="mt-7 inline-flex items-center text-sm font-medium text-white/80 group-hover:text-primary transition-colors">
                      Read article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>

                  <div>
                    <div className="relative overflow-hidden rounded-lg border border-white/10 aspect-[16/10]">
                      <img
                        src={featuredPost.heroImage}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    </div>
                  </div>
                  </div>
                </a>
              </Link>
            </section>
          )}

          {/* Category filter */}
          <div className="mb-10 md:mb-12">
            <div className="h-px bg-white/10" />
            <div className="pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm text-white/60 font-medium">
                {activeCategory === "All" ? "All Articles" : activeCategory}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Post Grid */}
          {gridPosts.length > 0 && (
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
                {gridPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <a className="group h-full rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 p-4 md:p-5 flex flex-col">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4 border border-white/10">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      </div>

                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                          {post.category}
                        </span>
                        <span className="text-white/15">•</span>
                        <span className="text-[11px] text-white/45">{post.readTime} min read</span>
                      </div>

                      <h4 className="text-lg font-display font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>

                      <p className="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(post.date)}
                        </span>
                        <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all" />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {gridPosts.length === 0 && activeCategory !== "All" && (
            <div className="py-20 text-center text-sm text-white/40">No articles in this category yet.</div>
          )}

          {/* CTA */}
          <section className="mt-20 md:mt-24 border-t border-white/10 pt-12 md:pt-14">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40 mb-4">Get Started</p>
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight leading-tight">
                Ready to put AI to work?
              </h3>
              <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed">
                We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-7">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/20 text-white hover:bg-white/5 bg-transparent"
                  >
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer (match homepage) */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-display font-bold tracking-tight mb-2">
                <img src="/logo-header.png" alt="Chohan" className="h-40 md:h-48 w-auto mb-4" />
              </div>
              <div className="text-sm text-gray-500">© 2026 Chohan Consulting. All rights reserved.</div>
            </div>

            <div className="flex space-x-8">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-footer-linkedin"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-footer-twitter"
              >
                Twitter
              </a>
              <a
                href="mailto:contact@chohan.ai"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-footer-email"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
