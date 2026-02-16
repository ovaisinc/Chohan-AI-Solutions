import { Link, useRoute } from "wouter";
import { useEffect, Fragment } from "react";
import { blogPosts, blogPostsBySlug } from "@/data/blog";
import { ArrowLeft, Calendar, Clock, Menu, Tag } from "lucide-react";
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

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-gray-300 leading-relaxed">
        {paragraph.join(" ")}
      </p>,
    );
    paragraph = [];
  };

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-2 pl-5 list-disc text-gray-300">
        {bullets.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushBullets();
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushBullets();
      blocks.push(
        <h2 key={`h2-${idx}`} className="text-2xl font-display font-bold text-white pt-3">
          {line.replace("## ", "")}
        </h2>,
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushBullets();
      blocks.push(
        <h3 key={`h3-${idx}`} className="text-xl font-display font-semibold text-white pt-2">
          {line.replace("### ", "")}
        </h3>,
      );
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      bullets.push(line.replace("- ", ""));
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushBullets();

  return blocks.map((block, idx) => <Fragment key={idx}>{block}</Fragment>);
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = slug ? blogPostsBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-black/30 p-8">
          <h1 className="text-2xl font-display font-bold">Post not found</h1>
          <p className="text-gray-400 mt-2">This article may have moved. Browse the full blog archive.</p>
          <Link href="/blog">
            <a className="inline-flex items-center mt-6 text-sm font-medium text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .filter((candidate) => candidate.category === post.category || candidate.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 -mt-20 md:-mt-24 -mb-10 md:-mb-20">
              <img src="/logo-header.png" alt="Chohan" className="h-16 md:h-20 w-auto" />
              <span className="sr-only">Chohan</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-8 mt-4">
            <a href="/#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="/#process" className="text-sm font-medium hover:text-primary transition-colors">Process</a>
            <a href="/#results" className="text-sm font-medium hover:text-primary transition-colors">Results</a>
            <Link href="/insights"><span className="text-sm font-medium hover:text-primary transition-colors">Case Studies</span></Link>
            <Link href="/blog"><span className="text-sm font-medium text-white">Blog</span></Link>
            <Link href="/contact"><Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">Contact Us</Button></Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
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
                  <Link href="/contact"><Button className="bg-primary text-white hover:bg-primary/90 rounded-full w-full">Contact Us</Button></Link>
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
            <Link href="/blog">
              <a className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to blog
              </a>
            </Link>

            <h1 className="mt-6 text-4xl md:text-5xl font-display font-bold leading-tight">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} min read
              </span>
              <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Tag className="h-4 w-4" />
                {post.category}
              </span>
            </div>

            <p className="mt-4 text-sm text-white/70">By {post.author}</p>

            <article className="mt-10 space-y-6 text-base rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8">
              {renderMarkdown(post.content)}
            </article>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center text-xs text-white/80 bg-white/10 border border-white/10 rounded-full px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-display font-bold">Related posts</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <a>
                        <Card className="border-white/10 bg-black/30 hover:border-primary/30 transition-colors">
                          <CardContent className="p-5">
                            <p className="text-[10px] uppercase tracking-wider text-white/50">{related.category}</p>
                            <h3 className="mt-2 text-base font-semibold text-white">{related.title}</h3>
                            <p className="mt-2 text-sm text-gray-400 line-clamp-2">{related.excerpt}</p>
                          </CardContent>
                        </Card>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
