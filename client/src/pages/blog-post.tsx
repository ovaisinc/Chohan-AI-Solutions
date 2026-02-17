import { Link, useRoute } from "wouter";
import { useEffect, Fragment } from "react";
import { blogPosts, blogPostsBySlug } from "@/data/blog";
import { ArrowLeft, ArrowRight, Calendar, Clock, Menu, Tag } from "lucide-react";
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

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ");
    // Handle bold text within paragraphs
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-white/70 leading-[1.8] text-[17px]">
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>,
    );
    paragraph = [];
  };

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-3 pl-0 text-white/70 text-[17px] leading-[1.8]">
        {bullets.map((item, idx) => {
          // Handle bold text in bullet items
          const parts = item.split(/(\*\*[^*]+\*\*)/g);
          return (
            <li key={idx} className="flex gap-3">
              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                {parts.map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </span>
            </li>
          );
        })}
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
        <h2 key={`h2-${idx}`} className="text-2xl font-display font-bold text-white pt-6 pb-1">
          {line.replace("## ", "")}
        </h2>,
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushBullets();
      blocks.push(
        <h3 key={`h3-${idx}`} className="text-xl font-display font-semibold text-white pt-4 pb-1">
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
      <div className="min-h-screen bg-[#090b10] text-white flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-3xl font-display font-bold">Article not found</h1>
          <p className="text-white/50 mt-3">This article may have been moved or removed.</p>
          <Link href="/blog">
            <Button className="mt-8 rounded-full bg-white px-6 text-black hover:bg-gray-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </Button>
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
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#090b10]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <a className="flex items-center">
              <img
                src="/logo-header.png"
                alt="Chohan"
                className="h-10 w-auto md:h-12"
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
                <Button variant="ghost" size="icon" className="text-white">
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

          {/* Back Link */}
          <Link href="/blog">
            <a className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </a>
          </Link>

          {/* Article Header */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                {post.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-xs text-white/40">
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-4xl font-display font-bold leading-[1.1] md:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>

            <p className="mt-6 text-lg text-white/55 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
              <span className="text-white/40">
                By {post.author}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12 aspect-[21/9] w-full overflow-hidden rounded-sm">
            <img
              src={post.heroImage}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_280px]">
            {/* Main Content */}
            <article className="max-w-3xl space-y-5">
              {renderMarkdown(post.content)}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                {/* Tags */}
                <div className="mb-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex text-xs text-white/60 border border-white/10 rounded-full px-3 py-1.5 hover:border-white/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-white/10 pt-8">
                  <p className="text-sm font-display font-semibold text-white mb-2">
                    Need help with AI strategy?
                  </p>
                  <p className="text-xs text-white/45 leading-relaxed mb-5">
                    We help leadership teams design and implement AI initiatives that deliver measurable results.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-white px-6 text-sm text-black hover:bg-gray-200">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile Tags */}
          <div className="mt-12 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex text-xs text-white/60 border border-white/10 rounded-full px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-24 border-t border-white/10 pt-16">
              <h2 className="text-xl font-display font-semibold mb-10">Related Articles</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <a className="group block">
                      <div className="grid grid-cols-[1fr] gap-5 sm:grid-cols-[200px_1fr] items-start">
                        <div className="aspect-[16/10] w-full overflow-hidden rounded-sm">
                          <img
                            src={related.heroImage}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                            {related.category}
                          </span>
                          <h3 className="mt-2 text-base font-display font-semibold leading-snug transition-colors group-hover:text-primary">
                            {related.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/45 line-clamp-2">{related.excerpt}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA (mobile) */}
          <section className="mt-20 border-t border-white/10 pt-16 lg:hidden">
            <h3 className="text-2xl font-display font-bold">
              Ready to put AI to work?
            </h3>
            <p className="mt-4 text-base text-white/55 leading-relaxed">
              We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black hover:bg-gray-200">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
