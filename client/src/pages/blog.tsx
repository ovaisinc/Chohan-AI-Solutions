import { Link } from "wouter";
import { useMemo, useEffect } from "react";
import { blogPosts } from "@/data/blog";
import { ArrowRight, Calendar, Clock, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function formatDate(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const sortedPosts = useMemo(() => {
    return blogPosts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden selection:bg-primary selection:text-white">
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

      <main className="relative z-0 pb-16 pt-28 md:pt-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 md:mb-12">
            <h1 className="text-4xl font-display font-bold tracking-tight md:text-5xl">Chohan AI Insights</h1>
            <p className="mt-3 max-w-4xl text-base text-white/70 md:text-lg">
              Executive perspectives on AI strategy, workflow automation, and measurable business performance.
            </p>
          </header>

          {featuredPost && (
            <section className="mb-12 md:mb-16">
              <Card className="overflow-hidden border-white/15 bg-black/45">
                <div className="relative aspect-video w-full">
                  <img
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                  <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8">
                    <span className="inline-flex rounded-full border border-white/35 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wide text-white/90">
                      Featured
                    </span>
                    <h2 className="mt-3 max-w-4xl text-2xl font-display font-bold leading-tight md:text-4xl">
                      {featuredPost.title}
                    </h2>
                  </div>
                </div>

                <CardContent className="p-5 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/65 md:text-sm">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(featuredPost.date)}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{featuredPost.readTime} min read</span>
                    <span className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/75">
                      {featuredPost.category}
                    </span>
                  </div>

                  <p className="mt-4 max-w-4xl text-base leading-relaxed text-white/75 md:text-lg">{featuredPost.excerpt}</p>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="mt-6 rounded-full">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          )}

          {remainingPosts.length > 0 && (
            <section>
              <h3 className="mb-5 text-2xl font-display font-semibold tracking-tight">Latest Articles</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <a className="group block">
                      <Card className="h-full overflow-hidden border-white/15 bg-black/40 transition-all duration-200 hover:border-white/25 hover:bg-black/55">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={post.heroImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                        <CardContent className="p-5">
                          <span className="inline-flex rounded-full border border-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/75">
                            {post.category}
                          </span>
                          <h4 className="mt-3 text-lg font-display font-semibold leading-snug transition-colors group-hover:text-primary">
                            {post.title}
                          </h4>
                          <p className="mt-2 line-clamp-3 text-sm text-white/65">{post.excerpt}</p>
                          <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(post.date)}</span>
                            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime} min read</span>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
