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
      <p key={`p-${blocks.length}`} className="text-white/60 leading-[1.85] text-[16px]">
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="text-white/85 font-semibold">{part.slice(2, -2)}</strong>;
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
      <ul key={`ul-${blocks.length}`} className="space-y-3.5 pl-0 text-white/60 text-[16px] leading-[1.85]">
        {bullets.map((item, idx) => {
          const parts = item.split(/(\*\*[^*]+\*\*)/g);
          return (
            <li key={idx} className="flex gap-4">
              <span className="mt-[12px] h-[5px] w-[5px] shrink-0 rounded-full bg-primary/60" />
              <span>
                {parts.map((part, i) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="text-white/85 font-semibold">{part.slice(2, -2)}</strong>;
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
        <h2 key={`h2-${idx}`} className="text-[22px] font-display font-bold text-white/95 pt-8 pb-1 tracking-[-0.01em]">
          {line.replace("## ", "")}
        </h2>,
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushBullets();
      blocks.push(
        <h3 key={`h3-${idx}`} className="text-[18px] font-display font-semibold text-white/85 pt-5 pb-1">
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
          <h1 className="text-2xl font-display font-bold">Article not found</h1>
          <p className="text-white/40 mt-3 text-[14px]">This article may have been moved or removed.</p>
          <Link href="/blog">
            <Button className="mt-8 rounded-full bg-white px-6 text-[13px] text-black hover:bg-white/90">
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
    <div className="min-h-screen bg-background text-white overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="relative mx-auto flex w-full max-w-[1920px] items-center justify-end px-6 md:px-12 py-4">
          <Link href="/">
            <a className="absolute left-1/2 top-2 -translate-x-1/2 shrink-0 flex items-center" data-testid="link-blog-post-logo">
              <img src="/logo-left.png" alt="Chohan" className="h-48 sm:h-56 md:h-[22rem] w-auto max-w-[70vw] object-contain" data-testid="img-blog-post-logo" />
            </a>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="/#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="/#process" className="text-sm font-medium hover:text-primary transition-colors">Process</a>
            <a href="/#results" className="text-sm font-medium hover:text-primary transition-colors">Results</a>
            <Link href="/insights"><span className="text-sm font-medium hover:text-primary transition-colors">Case Studies</span></Link>
            <Link href="/blog"><span className="text-sm font-medium text-white">Blog</span></Link>
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6">Contact Us</Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white rounded-full border border-white/10 bg-black/20 hover:bg-black/30">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-white/10 w-[300px]">
                <div className="mt-10 flex flex-col space-y-8">
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
      </header>

      <main className="relative z-0 pb-32 pt-64 md:pt-[25rem]">
        <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8">

          {/* Back Link */}
          <Link href="/blog">
            <a className="inline-flex items-center text-[12px] font-medium text-white/35 hover:text-white/70 transition-colors duration-200 mb-14 tracking-wide uppercase">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
              All Insights
            </a>
          </Link>

          {/* Article Header */}
          <div className="max-w-[680px]">
            <div className="flex items-center gap-3 mb-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                {post.category}
              </span>
              <span className="text-white/15">|</span>
              <span className="text-[11px] text-white/30 tracking-wide">
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-[clamp(2rem,4.5vw,2.75rem)] font-display font-bold leading-[1.12] tracking-[-0.02em]">
              {post.title}
            </h1>

            <p className="mt-7 text-[16px] text-white/45 leading-[1.75]">
              {post.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-[12px] text-white/30 pb-10 border-b border-white/[0.06]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {post.readTime} min read
              </span>
              <span className="text-white/25">
                {post.author}
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-14 aspect-[2/1] max-w-[760px] overflow-hidden rounded-[4px]">
            <img
              src={post.heroImage}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Article Content */}
          <div className="mt-20 grid grid-cols-1 gap-20 lg:grid-cols-[1fr_240px]">
            {/* Main Content */}
            <article className="max-w-[680px] space-y-6">
              {renderMarkdown(post.content)}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                {/* Tags */}
                <div className="mb-12">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-5">
                    Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex text-[11px] text-white/40 border border-white/[0.08] rounded-full px-3.5 py-1.5 hover:border-white/[0.15] transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-white/[0.06] pt-10">
                  <p className="text-[14px] font-display font-semibold text-white/80 mb-2.5">
                    Need help with AI strategy?
                  </p>
                  <p className="text-[12px] text-white/35 leading-[1.7] mb-6">
                    We help leadership teams design and implement AI initiatives that deliver measurable results.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full rounded-full bg-white px-6 text-[12px] font-medium text-[#090b10] hover:bg-white/90 transition-colors duration-200">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile Tags */}
          <div className="mt-16 lg:hidden">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-5">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex text-[11px] text-white/40 border border-white/[0.08] rounded-full px-3.5 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-28 border-t border-white/[0.06] pt-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25 mb-3">
                Continue Reading
              </p>
              <h2 className="text-[20px] font-display font-semibold mb-12 tracking-[-0.01em]">Related Articles</h2>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <a className="group block">
                      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6 items-start">
                        <div className="aspect-[16/10] w-full sm:w-[200px] shrink-0 overflow-hidden rounded-[3px]">
                          <img
                            src={related.heroImage}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                        <div className="pt-0.5">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                            {related.category}
                          </span>
                          <h3 className="mt-2.5 text-[15px] font-display font-semibold leading-[1.35] tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary/90">
                            {related.title}
                          </h3>
                          <p className="mt-2.5 text-[12px] text-white/35 leading-[1.6] line-clamp-2">{related.excerpt}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA (mobile) */}
          <section className="mt-24 border-t border-white/[0.06] pt-16 lg:hidden">
            <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-display font-bold tracking-[-0.01em]">
              Ready to put AI to work?
            </h3>
            <p className="mt-5 text-[14px] text-white/40 leading-[1.75]">
              We help leadership teams design, implement, and scale AI initiatives that deliver measurable business outcomes.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button className="rounded-full bg-white px-7 py-2.5 text-[13px] font-medium text-[#090b10] hover:bg-white/90 transition-colors duration-200">
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
