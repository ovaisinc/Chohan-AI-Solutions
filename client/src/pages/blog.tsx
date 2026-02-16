import { Link } from "wouter";
import { useMemo, useState, useEffect } from "react";
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
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ["All", ...unique];
  }, []);

  const filteredPosts = useMemo(() => {
    const sorted = blogPosts.slice().sort((a, b) => (a.date < b.date ? 1 : -1));
    if (activeCategory === "All") return sorted;
    return sorted.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
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
              <SheetContent side="right" className="bg-background border-white/10 w-[300px]">
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

      <section className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">Blog</h1>
            <p className="text-gray-400 mt-4 max-w-2xl text-base md:text-lg leading-relaxed">
              Weekly insights on AI trends, automation strategy, and practical playbooks for operations teams.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm border transition-colors ${
                    activeCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/80 border-white/10 hover:border-white/25"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <a className="block">
                    <Card className="h-full border-white/10 bg-black/30 hover:border-primary/30 hover:bg-black/40 transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between gap-3 text-xs text-gray-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.date)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {post.readTime} min
                          </span>
                        </div>

                        <div className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 w-fit">
                          {post.category}
                        </div>

                        <h2 className="mt-4 text-xl font-display font-bold text-white leading-tight">{post.title}</h2>
                        <p className="mt-3 text-sm text-gray-400 leading-relaxed flex-grow">{post.excerpt}</p>

                        <div className="mt-6 pt-4 border-t border-white/10 inline-flex items-center text-sm font-medium text-white/80 group">
                          Read article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
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
