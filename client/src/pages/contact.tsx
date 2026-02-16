import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, ArrowRight, Menu, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("submitted") === "true") {
      setSubmitted(true);
      window.history.replaceState({}, "", "/contact");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-between">
          <Link href="/">
            <a
              className="flex items-center gap-2 -mt-20 md:-mt-24 -mb-10 md:-mb-20"
              data-testid="link-contact-logo"
            >
              <img
                src="/logo-header.png"
                alt="Chohan"
                className="h-16 md:h-20 w-auto"
                data-testid="img-contact-logo"
              />
              <span className="sr-only">Chohan</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center space-x-8 mt-4">
            <a
              href="/#services"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-contact-services"
            >
              Services
            </a>
            <a
              href="/#process"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-contact-process"
            >
              Process
            </a>
            <a
              href="/#results"
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-contact-results"
            >
              Results
            </a>
            <Link href="/insights">
              <span
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-contact-insights"
              >
                Case Studies
              </span>
            </Link>
            <Link href="/contact">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
                data-testid="button-contact-nav-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  data-testid="button-contact-menu"
                >
                  <Menu className="h-6 w-6" data-testid="icon-contact-menu" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background border-white/10 w-[300px]"
              >
                <div className="sr-only">
                  <span>Menu</span>
                </div>
                <div className="flex flex-col space-y-8 mt-10">
                  <a
                    href="/#services"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-contact-mobile-services"
                  >
                    Services
                  </a>
                  <a
                    href="/#process"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-contact-mobile-process"
                  >
                    Process
                  </a>
                  <a
                    href="/#results"
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="link-contact-mobile-results"
                  >
                    Results
                  </a>
                  <Link href="/insights">
                    <span
                      className="text-lg font-medium text-left hover:text-primary transition-colors"
                      data-testid="link-contact-mobile-insights"
                    >
                      Case Studies
                    </span>
                  </Link>
                  <Link href="/contact">
                    <Button
                      className="bg-primary text-white hover:bg-primary/90 rounded-full w-full"
                      data-testid="button-contact-mobile-contact"
                    >
                      Contact Us
                    </Button>
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
            <div className="flex items-center justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span
                    className="text-xs font-medium uppercase tracking-wider text-gray-300"
                    data-testid="text-contact-pill"
                  >
                    Contact
                  </span>
                </div>
                <h1
                  className="text-4xl md:text-5xl font-display font-bold leading-tight"
                  data-testid="text-contact-headline"
                >
                  Contact Us
                </h1>
                <p
                  className="mt-3 text-gray-400 text-lg max-w-2xl"
                  data-testid="text-contact-description"
                >
                  Tell us what you want to automate. We'll respond with a clear plan and next steps.
                </p>
              </div>

              <Link href="/">
                <a
                  className="hidden md:inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
                  data-testid="link-contact-back"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" data-testid="icon-contact-back" />
                  Back to Home
                </a>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-black/30 p-6">
                <div
                  className="text-sm font-semibold text-white mb-4"
                  data-testid="text-contact-direct"
                >
                  Direct
                </div>

                <a
                  href="mailto:contact@chohan.ai"
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/8 transition-colors"
                  data-testid="link-contact-email"
                >
                  <div className="mt-1 h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-white/70 text-sm" data-testid="icon-contact-email">
                      @
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-white/50">Email</div>
                    <div
                      className="text-sm font-medium text-white truncate"
                      data-testid="text-contact-email"
                    >
                      contact@chohan.ai
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+16306314308"
                  className="mt-3 group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/8 transition-colors"
                  data-testid="link-contact-phone"
                >
                  <div className="mt-1 h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-white/70 text-sm" data-testid="icon-contact-phone">
                      #
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-white/50">Phone</div>
                    <div
                      className="text-sm font-medium text-white"
                      data-testid="text-contact-phone"
                    >
                      (630) 631-4308
                    </div>
                  </div>
                </a>

                <div className="mt-6 text-xs text-white/40" data-testid="text-contact-note">
                  Typical response time: same day.
                </div>
              </div>

              <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-black/30 p-6">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="div-contact-success">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h2>
                    <p className="text-gray-400 max-w-md">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 bg-white text-black hover:bg-gray-200 rounded-full px-6"
                      data-testid="button-contact-another"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                <form
                  action="https://formsubmit.co/contact@chohan.ai"
                  method="POST"
                  className="space-y-4"
                  data-testid="form-contact"
                >
                  <input type="hidden" name="_next" value={`${window.location.origin}/contact?submitted=true`} />
                  <input type="hidden" name="_subject" value="Chohan - New Contact Request" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-white/80 mb-2"
                        htmlFor="contact-name"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Your name"
                        data-testid="input-contact-name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-white/80 mb-2"
                        htmlFor="contact-email"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="you@company.com"
                        data-testid="input-contact-email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-white/80 mb-2"
                        htmlFor="contact-phone"
                      >
                        Phone (optional)
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="(630) 631-4308"
                        data-testid="input-contact-phone"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-white/80 mb-2"
                        htmlFor="contact-company"
                      >
                        Company (optional)
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Company name"
                        data-testid="input-contact-company"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-white/80 mb-2"
                      htmlFor="contact-message"
                    >
                      What are you trying to automate?
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Example: We want to automate intake, follow-ups, and scheduling between email and our CRM..."
                      data-testid="input-contact-message"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="text-xs text-white/40" data-testid="text-contact-privacy">
                      Your message will be sent directly to our team.
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-white text-black hover:bg-gray-200 rounded-full px-8"
                      data-testid="button-contact-submit"
                    >
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" data-testid="icon-contact-submit" />
                    </Button>
                  </div>
                </form>
                )}
              </div>
            </div>

            <div className="mt-10 md:hidden">
              <Link href="/">
                <a
                  className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors"
                  data-testid="link-contact-back-mobile"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" data-testid="icon-contact-back-mobile" />
                  Back to Home
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-display font-bold tracking-tight mb-2">
                <img
                  src="/logo-header.png"
                  alt="Chohan"
                  className="h-24 md:h-28 w-auto mb-3"
                  data-testid="img-contact-footer-logo"
                />
              </div>
              <div className="text-sm text-gray-500" data-testid="text-contact-footer-copyright">
                © 2026 Chohan Consulting. All rights reserved.
              </div>
            </div>

            <div className="flex space-x-8">
              <a
                href="mailto:contact@chohan.ai"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-contact-footer-email"
              >
                Email
              </a>
              <a
                href="tel:+16306314308"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-contact-footer-phone"
              >
                Call
              </a>
              <Link href="/insights">
                <a
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="link-contact-footer-case-studies"
                >
                  Case Studies
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
