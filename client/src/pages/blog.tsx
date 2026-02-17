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
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

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
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#090b10]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-6 lg:px-8">
          <Link href="/">
            <a className="flex items-center" data-testid="link-blog-logo">
              <img
                src="/logo.svg"
                alt="Chohan"
                className="h-7 w-auto md:h-8"
                data-testid="img-blog-logo"
              />
            </a>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="/#services" className="text-[13px] font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Services</a>
            <a href="/#process" className="text-[13px] font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Process</a>
            <a href="/#results" className="text-[13px] font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Results</a>
            <Link href="/insights"><span className="text-[13px] font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Case Studies</span></Link>
            <Link href="/blog"><span className="text-[13px] font-medium text-white tracking-wide">Blog</span></Link>
            <Link href="/contact">
              <Button className="rounded-full bg-white px-5 py-2 text-[13px] font-medium text-black hover:bg-white/90 transition-colors duration-200">Contact Us</Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" data-testid="button-blog-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] border-white/[0.06] bg-[#090b10]">
                <div className="mt-12 flex flex-col space-y-7">
                  <a href="/#services" className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">Services</a>
                  <a href="/#process" className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">Process</a>
                  <a href="/#results" className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">Results</a>
                  <Link href="/insights"><span className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">Case Studies</span></Link>
                  <Link href="/blog"><span className="text-[15px] font-medium text-white">Blog</span></Link>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-white text-black hover:bg-white/90 mt-2">Contact Us</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-0 pb-32 pt-[120px] md:pt-[140px]">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8">

          {/* Page Header */}
          <header className="mb-16 md:mb-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35 mb-5">
              Insights & Perspectives
            </p>
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-display font-bold tracking-[-0.02em] leading-[1.08]">
              Chohan AI Insights
            </h1>
            <p className="mt-6 max-w-xl text-[15px] text-white/45 leading-[1.7]">
              Executive perspectives on AI strategy, workflow automation, and measurable business performance.
            </p>
          </header>

          {/* Featured Article — text-dominant layout */}
          {featuredPost && activeCategory === "All" && (
            <section className="mb-20 border-t border-white/[0.06] pt-10">
              <Link href={`/blog/${featuredPost.slug}`}>
                <a className="group block">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-14 items-start">
                    {/* Content — left, text-first */}
                    <div className="flex flex-col justify-center order-2 lg:order-1">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                          Featured
                        </span>
                        <span className="text-white/20">|</span>
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-display font-bold leading-[1.2] tracking-[-0.01em] group-hover:text-primary/90 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 text-[15px] leading-[1.75] text-white/45 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-6 flex items-center gap-6 text-[12px] text-white/30">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {formatDate(featuredPost.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {featuredPost.readTime} min read
                        </span>
                      </div>
                      <div className="mt-8">
                        <span className="inline-flex items-center text-[13px] font-medium text-white/70 group-hover:text-primary transition-colors duration-300">
                          Read article
                          <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
                    {/* Image — right, contained */}
                    <div className="relative aspect-[4/3] w-full max-w-[380px] overflow-hidden rounded-[3px] order-1 lg:order-2">
                      <img
                        src={featuredPost.heroImage}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="eager"
                      />
                    </div>
                  </div>
                </a>
              </Link>
            </section>
          )}

          {/* Divider + Category Filter */}
          <div className="mb-14">
            <div className="h-px bg-white/[0.06]" />
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-8">
              <h3 className="text-[15px] font-medium text-white/50 tracking-wide">
                {activeCategory === "All" ? "All Articles" : activeCategory}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-[6px] text-[12px] font-medium tracking-wide transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-white text-[#090b10]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Article Grid */}
          {gridPosts.length > 0 && (
            <section>
              <div className="grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <a className="group block py-10 border-t border-white/[0.06]">
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3px] mb-5">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                          {post.category}
                        </span>
                        <span className="text-white/15">|</span>
                        <span className="text-[11px] text-white/30 tracking-wide">
                          {post.readTime} min read
                        </span>
                      </div>
                      {/* Title */}
                      <h4 className="text-[17px] font-display font-semibold leading-[1.35] tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary/90">
                        {post.title}
                      </h4>
                      {/* Excerpt */}
                      <p className="mt-3 text-[13px] leading-[1.7] text-white/35 line-clamp-2">
                        {post.excerpt}
                      </p>
                      {/* Date + Arrow */}
                      <div className="mt-5 flex items-center justify-between text-[11px] text-white/25">
                        <span>{formatDate(post.date)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary/70" />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {gridPosts.length === 0 && activeCategory !== "All" && (
            <div className="py-24 text-center">
              <p className="text-white/30 text-[13px]">No articles in this category yet.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <section className="mt-28 border-t border-white/[0.06] pt-16">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-5">
                Get Started
              </p>
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-display font-bold tracking-[-0.01em] leading-[1.2]">
                Ready to put AI to work?
              </h3>
              <p className="mt-5 text-[14px] text-white/40 leading-[1.75]">
                We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="rounded-full bg-white px-7 py-2.5 text-[13px] font-medium text-[#090b10] hover:bg-white/90 transition-colors duration-200">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button variant="outline" className="rounded-full border-white/[0.1] px-7 py-2.5 text-[13px] font-medium text-white/60 hover:bg-white/[0.04] hover:text-white/80 hover:border-white/[0.15] transition-all duration-200">
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
