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
    return blogPosts.slice().sort((a, b) => {
      if (a.date !== b.date) {
        return a.date < b.date ? 1 : -1;
      }

      // Keep original array order when dates are identical
      return blogPosts.indexOf(a) - blogPosts.indexOf(b);
    });
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return sortedPosts;
    return sortedPosts.filter((p) => p.category === activeCategory);
  }, [sortedPosts, activeCategory]);

  const featuredPost = sortedPosts[0];
  const gridPosts = activeCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 border-b border-white/5 bg-[#090b10]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-full flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center" data-testid="link-blog-logo">
              <img
                src="/logo.svg"
                alt="Chohan"
                className="h-10 md:h-14 w-auto object-contain"
                style={{ maxHeight: "56px" }}
                data-testid="img-blog-logo"
              />
            </a>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="/#services" className="text-sm font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Services</a>
            <a href="/#process" className="text-sm font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Process</a>
            <a href="/#results" className="text-sm font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Results</a>
            <Link href="/insights"><span className="text-sm font-medium text-white/55 tracking-wide transition-colors duration-200 hover:text-white">Case Studies</span></Link>
            <Link href="/blog"><span className="text-sm font-medium text-white tracking-wide">Blog</span></Link>
            <Link href="/contact">
              <Button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200">Contact Us</Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" data-testid="button-blog-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-white/5 bg-[#090b10]">
                <div className="mt-12 flex flex-col space-y-7">
                  <a href="/#services" className="text-base font-medium text-white/70 transition-colors hover:text-white">Services</a>
                  <a href="/#process" className="text-base font-medium text-white/70 transition-colors hover:text-white">Process</a>
                  <a href="/#results" className="text-base font-medium text-white/70 transition-colors hover:text-white">Results</a>
                  <Link href="/insights"><span className="text-base font-medium text-white/70 transition-colors hover:text-white">Case Studies</span></Link>
                  <Link href="/blog"><span className="text-base font-medium text-white">Blog</span></Link>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-white text-black hover:bg-white/90 mt-2">Contact Us</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-0 pb-32 pt-28 md:pt-36">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">

          {/* Page Header */}
          <header className="mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5">
              Insights & Perspectives
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Chohan AI Insights
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/45 leading-relaxed">
              Executive perspectives on AI strategy, workflow automation, and measurable business performance.
            </p>
          </header>

          {/* Featured Article Card */}
          {featuredPost && activeCategory === "All" && (
            <section className="mb-20">
              <Link href={`/blog/${featuredPost.slug}`}>
                <a className="group block">
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Text side */}
                      <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                            Featured
                          </span>
                          <span className="text-white/20">|</span>
                          <span className="text-sm text-white/50">
                            {featuredPost.category}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold leading-snug group-hover:text-primary/90 transition-colors duration-300">
                          {featuredPost.title}
                        </h2>
                        <p className="mt-4 text-base text-white/60 line-clamp-3 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <div className="mt-6 flex items-center gap-4 text-sm text-white/40">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(featuredPost.date)}
                          </span>
                          <span className="text-white/20">·</span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {featuredPost.readTime} min read
                          </span>
                        </div>
                        <div className="mt-8">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 text-primary rounded-lg text-sm font-medium group-hover:bg-primary/30 transition-colors duration-200">
                            Read article <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                      {/* Image side */}
                      <div className="aspect-video md:aspect-auto overflow-hidden order-1 md:order-2">
                        <img
                          src={featuredPost.heroImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="eager"
                        />
                      </div>
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
              <h3 className="text-base font-medium text-white/50 tracking-wide">
                {activeCategory === "All" ? "All Articles" : activeCategory}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <a className="group block rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-xl hover:-translate-y-1">
                      {/* Image */}
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
                          <span className="text-primary font-semibold uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span>·</span>
                          <span>
                            {post.readTime} min read
                          </span>
                        </div>
                        {/* Title */}
                        <h4 className="text-lg font-semibold leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-primary/90">
                          {post.title}
                        </h4>
                        {/* Excerpt */}
                        <p className="mt-2 text-sm text-white/50 line-clamp-3">
                          {post.excerpt}
                        </p>
                        {/* Date + Arrow */}
                        <div className="mt-4 flex items-center justify-between text-xs text-white/30">
                          <span>{formatDate(post.date)}</span>
                          <span className="text-white/50 group-hover:text-primary transition-colors duration-200">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {gridPosts.length === 0 && activeCategory !== "All" && (
            <div className="py-24 text-center">
              <p className="text-white/30 text-sm">No articles in this category yet.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <section className="mt-28 border-t border-white/[0.06] pt-16">
            <div className="max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-5">
                Get Started
              </p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">
                Ready to put AI to work?
              </h3>
              <p className="mt-5 text-sm text-white/40 leading-relaxed">
                We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="rounded-full bg-white px-7 py-2.5 text-sm font-medium text-[#090b10] hover:bg-white/90 transition-colors duration-200">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button variant="outline" className="rounded-full border-white/10 px-7 py-2.5 text-sm font-medium text-white/60 hover:bg-white/[0.04] hover:text-white/80 hover:border-white/15 transition-all duration-200">
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
