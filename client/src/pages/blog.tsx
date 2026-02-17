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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#090b10]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <a className="flex items-center" data-testid="link-blog-logo">
              <img
                src="/logo-header.png"
                alt="Chohan"
                className="h-10 w-auto md:h-12"
                data-testid="img-blog-logo"
              />
              <span className="sr-only">Chohan</span>
            </a>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="/#services" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Services</a>
            <a href="/#process" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Process</a>
            <a href="/#results" className="text-sm font-medium text-white/80 transition-colors hover:text-white">Results</a>
            <Link href="/insights"><span className="text-sm font-medium text-white/80 transition-colors hover:text-white">Case Studies</span></Link>
            <Link href="/blog"><span className="text-sm font-medium text-white">Blog</span></Link>
            <Link href="/contact">
              <Button className="rounded-full bg-white px-6 text-black hover:bg-gray-200">Contact Us</Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" data-testid="button-blog-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-white/10 bg-[#090b10]">
                <div className="mt-10 flex flex-col space-y-8">
                  <a href="/#services" className="text-left text-lg font-medium transition-colors hover:text-primary">Services</a>
                  <a href="/#process" className="text-left text-lg font-medium transition-colors hover:text-primary">Process</a>
                  <a href="/#results" className="text-left text-lg font-medium transition-colors hover:text-primary">Results</a>
                  <Link href="/insights"><span className="text-left text-lg font-medium transition-colors hover:text-primary">Case Studies</span></Link>
                  <Link href="/blog"><span className="text-left text-lg font-medium text-white">Blog</span></Link>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90">Contact Us</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="relative z-0 pb-24 pt-28 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <header className="mb-16 md:mb-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">
              Insights & Perspectives
            </p>
            <h1 className="text-4xl font-display font-bold tracking-tight md:text-6xl lg:text-7xl leading-[1.05]">
              Chohan AI Insights
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/60 leading-relaxed">
              Executive perspectives on AI strategy, workflow automation, and measurable business performance.
            </p>
            <div className="mt-8 h-px bg-white/10" />
          </header>

          {/* Featured Article */}
          {featuredPost && activeCategory === "All" && (
            <section className="mb-20">
              <Link href={`/blog/${featuredPost.slug}`}>
                <a className="group block">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                      <img
                        src={featuredPost.heroImage}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="eager"
                      />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                          Featured
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/50">
                          {featuredPost.category}
                        </span>
                      </div>
                      <h2 className="text-3xl font-display font-bold leading-tight md:text-4xl group-hover:text-primary transition-colors duration-200">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-5 text-base leading-relaxed text-white/60 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-6 flex items-center gap-5 text-sm text-white/45">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(featuredPost.date)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {featuredPost.readTime} min read
                        </span>
                      </div>
                      <div className="mt-8">
                        <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-primary transition-colors">
                          Read article
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </section>
          )}

          {/* Divider + Category Filter */}
          <div className="mb-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-xl font-display font-semibold tracking-tight">
                {activeCategory === "All" ? "All Articles" : activeCategory}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-white text-black"
                        : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 h-px bg-white/10" />
          </div>

          {/* Article Grid */}
          {gridPosts.length > 0 && (
            <section>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <a className="group block">
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm mb-5">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                          {post.category}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span className="text-xs text-white/40">
                          {post.readTime} min read
                        </span>
                      </div>
                      {/* Title */}
                      <h4 className="text-lg font-display font-semibold leading-snug transition-colors group-hover:text-primary">
                        {post.title}
                      </h4>
                      {/* Excerpt */}
                      <p className="mt-2.5 text-sm leading-relaxed text-white/50 line-clamp-2">
                        {post.excerpt}
                      </p>
                      {/* Date */}
                      <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                        <span>{formatDate(post.date)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {gridPosts.length === 0 && activeCategory !== "All" && (
            <div className="py-20 text-center">
              <p className="text-white/40 text-sm">No articles in this category yet.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <section className="mt-24 border-t border-white/10 pt-16">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-display font-bold md:text-3xl">
                Ready to put AI to work?
              </h3>
              <p className="mt-4 text-base text-white/55 leading-relaxed">
                We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black hover:bg-gray-200">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/insights">
                  <Button variant="outline" className="rounded-full border-white/20 px-8 py-3 text-sm font-medium text-white hover:bg-white/5 hover:border-white/30">
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
