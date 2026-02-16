import { Link } from "wouter";
import { useMemo, useState, useEffect } from "react";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Calendar, Clock, Menu, TrendingUp, Mail, Rss } from "lucide-react";
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

function hoursAgo(dateISO: string) {
  const now = new Date();
  const date = new Date(dateISO + "T00:00:00");
  const diffMs = now.getTime() - date.getTime();
  const diffHrs = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const days = Math.floor(diffHrs / 24);
  return `${days}d ago`;
}

function getImageClass(seed: string) {
  const classes = [
    "from-cyan-500/30 via-indigo-500/10 to-black",
    "from-fuchsia-500/30 via-violet-500/10 to-black",
    "from-emerald-500/30 via-teal-500/10 to-black",
    "from-orange-500/30 via-rose-500/10 to-black",
  ];
  const index = Math.abs(seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)) % classes.length;
  return classes[index];
}

type SectionProps = {
  title: string;
  description: string;
  posts: typeof blogPosts;
};

function EditorialSection({ title, description, posts }: SectionProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-white/60 mt-1">{description}</p>
        </div>
        <Link href="/blog">
          <a className="text-sm font-medium text-white/80 hover:text-white inline-flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
        {posts.map((post, idx) => (
          <Link key={`${title}-${post.slug}-${idx}`} href={`/blog/${post.slug}`}>
            <a className="group rounded-2xl border border-white/15 bg-black/45 hover:bg-black/60 hover:border-white/30 transition-all overflow-hidden">
              <div className={`h-36 bg-gradient-to-br ${getImageClass(post.slug)} relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%)]" />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/90">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-display font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-white/65 mt-2 line-clamp-3">{post.excerpt}</p>

                <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const sortedPosts = useMemo(() => {
    return blogPosts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ["All", ...unique];
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return sortedPosts;
    return sortedPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, sortedPosts]);

  const heroPost = filteredPosts[0] ?? sortedPosts[0];
  const secondaryFeatured = (filteredPosts.length > 1 ? filteredPosts : sortedPosts).slice(1, 4);

  const aiNews = sortedPosts.filter((p) => p.category.toLowerCase().includes("ai")).slice(0, 3);
  const caseStudies = sortedPosts
    .filter((p) => p.category.toLowerCase().includes("business") || p.tags.some((t) => /roi|efficiency|case/i.test(t)))
    .slice(0, 3);
  const strategy = sortedPosts.filter((p) => /strategy|implementation|management/i.test(`${p.category} ${p.tags.join(" ")}`)).slice(0, 3);
  const trending = sortedPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#090b10]/90 backdrop-blur-md border-b border-white/10">
        <div className="w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-between">
          <Link href="/">
            <a
              className="flex items-center gap-2 -mt-20 md:-mt-24 -mb-10 md:-mb-20"
              data-testid="link-blog-logo"
            >
              <img
                src="/logo-header.png"
                alt="Chohan"
                className="h-16 md:h-20 w-auto"
                data-testid="img-blog-logo"
              />
              <span className="sr-only">Chohan</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-8 mt-4">
            <a href="/#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="/#process" className="text-sm font-medium hover:text-primary transition-colors">Process</a>
            <a href="/#results" className="text-sm font-medium hover:text-primary transition-colors">Results</a>
            <Link href="/insights"><span className="text-sm font-medium hover:text-primary transition-colors">Case Studies</span></Link>
            <Link href="/blog"><span className="text-sm font-medium text-white">Blog</span></Link>
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">Contact Us</Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" data-testid="button-blog-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#090b10] border-white/10 w-[300px]">
                <div className="flex flex-col space-y-8 mt-10">
                  <a href="/#services" className="text-lg font-medium text-left hover:text-primary transition-colors">Services</a>
                  <a href="/#process" className="text-lg font-medium text-left hover:text-primary transition-colors">Process</a>
                  <a href="/#results" className="text-lg font-medium text-left hover:text-primary transition-colors">Results</a>
                  <Link href="/insights"><span className="text-lg font-medium text-left hover:text-primary transition-colors">Case Studies</span></Link>
                  <Link href="/blog"><span className="text-lg font-medium text-left text-white">Blog</span></Link>
                  <Link href="/contact">
                    <Button className="bg-primary text-white hover:bg-primary/90 rounded-full w-full">Contact Us</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Chohan AI Journal</p>
              <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight">Top Stories & Analysis</h1>
              <p className="text-white/65 mt-4 max-w-3xl text-base md:text-lg leading-relaxed">
                Professional coverage of AI operations, real-world automation outcomes, and practical strategy for modern teams.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                    activeCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/80 border-white/20 hover:border-white/40"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-8">
                {heroPost && (
                  <section className="rounded-2xl border border-white/15 bg-black/50 overflow-hidden">
                    <div className={`h-[280px] md:h-[420px] bg-gradient-to-br ${getImageClass(heroPost.slug)} relative`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">Breaking</span>
                        <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">Featured</span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
                        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(heroPost.date)}</span>
                        <span>•</span>
                        <span>{hoursAgo(heroPost.date)}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{heroPost.readTime} min read</span>
                      </div>

                      <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold leading-tight max-w-4xl">{heroPost.title}</h2>
                      <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed max-w-4xl">{heroPost.excerpt}</p>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-semibold">CE</div>
                          <div>
                            <p className="text-sm font-medium">Written by Chohan AI Editorial</p>
                            <p className="text-xs text-white/60">{heroPost.author}</p>
                          </div>
                        </div>

                        <Link href={`/blog/${heroPost.slug}`}>
                          <a className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors">
                            Read full story <ArrowRight className="h-4 w-4" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </section>
                )}

                <section>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-xl font-display font-semibold">Featured Stories</h3>
                    <Link href="/blog"><a className="text-sm text-white/70 hover:text-white">View All →</a></Link>
                  </div>
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {secondaryFeatured.map((post, idx) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <a className="rounded-2xl border border-white/15 bg-black/40 hover:border-white/35 hover:bg-black/60 transition-all overflow-hidden">
                          <div className={`h-32 bg-gradient-to-br ${getImageClass(post.slug)}`} />
                          <div className="p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-[10px] uppercase tracking-wider border border-white/20 rounded-full px-2 py-1 text-white/75">{idx === 0 ? "Trending" : "New"}</span>
                              <span className="text-[10px] uppercase tracking-wider border border-white/20 rounded-full px-2 py-1 text-white/75">{post.category}</span>
                            </div>
                            <h4 className="font-display text-lg font-semibold leading-tight">{post.title}</h4>
                            <p className="text-sm text-white/65 mt-2 line-clamp-3">{post.excerpt}</p>
                            <div className="mt-4 text-xs text-white/55 inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{post.readTime} min read</div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </section>

                <EditorialSection title="AI News" description="Latest industry updates and market signals." posts={aiNews.length ? aiNews : sortedPosts.slice(0, 3)} />
                <EditorialSection title="Case Studies" description="Client stories, ROI wins, and implementation outcomes." posts={caseStudies.length ? caseStudies : sortedPosts.slice(0, 3)} />
                <EditorialSection title="Strategy" description="How-to guides and practical operating playbooks." posts={strategy.length ? strategy : sortedPosts.slice(0, 3)} />
                <EditorialSection title="Trending" description="Most-read stories from the Chohan AI audience." posts={trending} />
              </div>

              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 self-start">
                <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
                  <h3 className="text-lg font-display font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Trending Now</h3>
                  <div className="mt-4 space-y-4">
                    {trending.map((post, idx) => (
                      <Link key={`trend-${post.slug}`} href={`/blog/${post.slug}`}>
                        <a className="block border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                          <p className="text-[11px] uppercase tracking-wider text-white/50">#{idx + 1} • {post.category}</p>
                          <p className="mt-1 font-medium leading-snug hover:text-primary transition-colors">{post.title}</p>
                          <p className="text-xs text-white/50 mt-1">{post.readTime} min read</p>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
                  <h3 className="text-lg font-display font-semibold">Categories</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {categories.filter((c) => c !== "All").map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80 hover:border-white/40"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
                  <h3 className="text-lg font-display font-semibold flex items-center gap-2"><Mail className="h-5 w-5" /> Subscribe</h3>
                  <p className="text-sm text-white/65 mt-2">Get weekly editorial briefings on AI trends, strategy, and execution.</p>
                  <div className="mt-4 flex gap-2">
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button className="shrink-0">Join</Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/15 bg-black/40 p-5">
                  <h3 className="text-lg font-display font-semibold flex items-center gap-2"><Rss className="h-5 w-5" /> Follow Us</h3>
                  <div className="mt-4 space-y-2 text-sm">
                    <a href="#" className="block text-white/80 hover:text-white">X / Twitter</a>
                    <a href="#" className="block text-white/80 hover:text-white">LinkedIn</a>
                    <a href="#" className="block text-white/80 hover:text-white">YouTube</a>
                    <a href="#" className="block text-white/80 hover:text-white">Newsletter RSS</a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
