import { Link, useRoute } from "wouter";
import { useEffect, Fragment } from "react";
import { blogPosts, blogPostsBySlug } from "@/data/blog";
import { ArrowLeft, ArrowRight, Calendar, Clock, Menu } from "lucide-react";
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
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    blocks.push(
      <p key={`p-${blocks.length}`} className="text-base md:text-lg leading-relaxed text-white/70">
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="text-white/90 font-semibold">{part.slice(2, -2)}</strong>;
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
      <ul key={`ul-${blocks.length}`} className="space-y-3.5 pl-0 text-white/70 text-base md:text-lg leading-relaxed">
        {bullets.map((item, idx) => {
          const parts = item.split(/(\*\*[^*]+\*\*)/g);
          return (
            <li key={idx} className="flex gap-4">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span>
                {parts.map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="text-white/90 font-semibold">{part.slice(2, -2)}</strong>;
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
        <h2 key={`h2-${idx}`} className="text-xl md:text-2xl font-bold text-white/95 pt-8 pb-1 tracking-tight">
          {line.replace("## ", "")}
        </h2>,
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushBullets();
      blocks.push(
        <h3 key={`h3-${idx}`} className="text-lg font-semibold text-white/85 pt-5 pb-1">
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
          <h1 className="text-2xl font-bold">Article not found</h1>
          <p className="text-white/40 mt-3 text-sm">This article may have been moved or removed.</p>
          <Link href="/blog">
            <Button className="mt-8 rounded-full bg-white px-6 text-sm text-black hover:bg-white/90">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
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
    <div className="min-h-screen bg-[#090b10] text-white overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 border-b border-white/5 bg-[#090b10]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-full flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center">
              <img
                src="/logo.svg"
                alt="Chohan"
                className="h-10 md:h-14 w-auto object-contain"
                style={{ maxHeight: "56px" }}
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
                <Button variant="ghost" size="icon" className="text-white">
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
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">

          {/* Back Link */}
          <Link href="/blog">
            <a className="inline-flex items-center text-xs font-medium text-white/35 hover:text-white/70 transition-colors duration-200 mb-14 tracking-wider uppercase">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
              All Insights
            </a>
          </Link>

          {/* Article Header */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary/90">
                {post.category}
              </span>
              <span className="text-white/15">|</span>
              <span className="text-xs text-white/30 tracking-wide">
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
              {post.title}
            </h1>

            <p className="mt-7 text-base md:text-lg text-white/45 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/30 pb-10 border-b border-white/[0.06]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
              <span className="text-white/25">
                {post.author}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-14 w-full max-w-3xl overflow-hidden rounded-xl bg-black/20" style={{ aspectRatio: "16/9" }}>
            <img
              src={post.heroImage}
              alt={post.title}
              className="h-full w-full object-contain object-center"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Main Content — 2/3 width */}
            <article className="lg:col-span-2 max-w-2xl space-y-6">
              {renderMarkdown(post.content)}
            </article>

            {/* Sidebar — 1/3 width */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32">
                {/* Tags */}
                <div className="mb-12">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-5">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-white/[0.06] pt-10">
                  <p className="text-sm font-semibold text-white/80 mb-2.5">
                    Need help with AI strategy?
                  </p>
                  <p className="text-xs text-white/35 leading-relaxed mb-6">
                    We help leadership teams design and implement AI initiatives that deliver measurable results.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-white px-6 text-xs font-medium text-[#090b10] hover:bg-white/90 transition-colors duration-200">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile Tags */}
          <div className="mt-16 pt-8 border-t border-white/10 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-5">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-28 border-t border-white/[0.06] pt-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/25 mb-3">
                Continue Reading
              </p>
              <h2 className="text-xl font-semibold mb-12 tracking-tight">Related Articles</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <a className="group block rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-xl">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.heroImage}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                          {related.category}
                        </span>
                        <h3 className="mt-2 text-base font-semibold leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-primary/90">
                          {related.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/40 line-clamp-2">{related.excerpt}</p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA (mobile) */}
          <section className="mt-24 border-t border-white/[0.06] pt-16 lg:hidden">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ready to put AI to work?
            </h3>
            <p className="mt-5 text-sm text-white/40 leading-relaxed">
              We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button className="rounded-full bg-white px-7 py-2.5 text-sm font-medium text-[#090b10] hover:bg-white/90 transition-colors duration-200">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
