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
          <div className="max-w-6xl mx-auto">
            <header className="mb-10 md:mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Chohan AI Insights</h1>
              <p className="mt-3 text-white/70 max-w-3xl text-base md:text-lg">
                Executive perspectives on AI strategy, workflow automation, and measurable business performance.
              </p>
            </header>

            {featuredPost && (
              <section className="mb-12 md:mb-16">
                <Card className="overflow-hidden border-white/15 bg-black/45">
                  <div className="relative h-[260px] md:h-[420px]">
                    <img
                      src={featuredPost.heroImage}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                    <div className="absolute left-5 right-5 bottom-5 md:left-8 md:right-8 md:bottom-8">
                      <span className="inline-flex rounded-full border border-white/35 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wide text-white/90">
                        Featured
                      </span>
                      <h2 className="mt-3 text-2xl md:text-4xl font-display font-bold leading-tight max-w-4xl">
                        {featuredPost.title}
                      </h2>
                    </div>
                  </div>

                  <CardContent className="p-5 md:p-8">
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-white/65">
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(featuredPost.date)}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{featuredPost.readTime} min read</span>
                      <span className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/75">
                        {featuredPost.category}
                      </span>
                    </div>

                    <p className="mt-4 text-white/75 text-base md:text-lg leading-relaxed max-w-4xl">{featuredPost.excerpt}</p>

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
                <h3 className="text-2xl font-display font-semibold tracking-tight mb-5">Latest Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <a className="group block">
                        <Card className="h-full overflow-hidden border-white/15 bg-black/40 hover:bg-black/55 hover:border-white/25 transition-all duration-200">
                          <div className="h-44 overflow-hidden">
                            <img
                              src={post.heroImage}
                              alt={post.title}
                              className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          <CardContent className="p-5">
                            <span className="inline-flex rounded-full border border-white/20 px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/75">
                              {post.category}
                            </span>
                            <h4 className="mt-3 text-lg font-display font-semibold leading-snug group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <p className="mt-2 text-sm text-white/65 line-clamp-3">{post.excerpt}</p>
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
        </div>
      </main>
    </div>
  );
}
