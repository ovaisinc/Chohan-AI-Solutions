import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
  Lightbulb,
  Brain,
  Zap,
  Landmark,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("AI & Automation");
  const [activeIndustry, setActiveIndustry] = useState(
    "Amusement & Entertainment",
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white [content-visibility:auto] [contain-intrinsic-size:1px_2200px]">
      {/* Left-side logo (separate from nav/hero) */}
      <a
        href="/"
        className="absolute left-0 top-0 z-[60] px-3 md:px-4 pt-2 md:pt-1"
        data-testid="link-left-logo"
      >
        <img
          src="/logo-left.png"
          alt="Chohan"
          className="h-32 sm:h-40 md:h-60 w-auto max-w-[70vw] object-contain"
          data-testid="img-left-logo"
        />
      </a>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}
      >
        <div className="w-full max-w-[1920px] mx-auto pl-2 pr-6 md:px-12 pt-4 pb-2 flex items-start justify-end">

          {/* Desktop Nav - Align with top of logo roughly, or centered in the 'bar' visual if logo wasn't there. 
              With items-start, we might want to push it down slightly to center with the text part of logo? 
              Or just keep it at top. User said "align... to the right". 
              Let's add a small mt to align with the visual weight of the logo text if needed, 
              but standard is usually aligned with top or center. 
              Let's use mt-4 to give it a bit of offset from the very top edge so it aligns with the 'Chohan' text likely. 
          */}
          <div className="hidden md:flex items-center space-x-8 mt-4">
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="button-nav-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="button-nav-process"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("results")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="button-nav-results"
            >
              Results
            </button>
            <Link href="/insights">
              <span
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-nav-insights"
              >
                Case Studies
              </span>
            </Link>
            <Link href="/blog">
              <span
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="link-nav-blog"
              >
                Blog
              </span>
            </Link>
            <Link href="/contact">
              <Button
                className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
                data-testid="button-nav-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white rounded-full border border-white/10 bg-black/20 hover:bg-black/30"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-6 w-6" data-testid="icon-mobile-menu" />
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
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="button-mobile-services"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("process")}
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="button-mobile-process"
                  >
                    Process
                  </button>
                  <button
                    onClick={() => scrollToSection("results")}
                    className="text-lg font-medium text-left hover:text-primary transition-colors"
                    data-testid="button-mobile-results"
                  >
                    Results
                  </button>
                  <Link href="/insights">
                    <span
                      className="text-lg font-medium text-left hover:text-primary transition-colors"
                      data-testid="link-mobile-insights"
                    >
                      Case Studies
                    </span>
                  </Link>
                  <Link href="/blog">
                    <span
                      className="text-lg font-medium text-left hover:text-primary transition-colors"
                      data-testid="link-mobile-blog"
                    >
                      Blog
                    </span>
                  </Link>
                  <Link href="/contact">
                    <Button
                      className="bg-primary text-white hover:bg-primary/90 rounded-full w-full"
                      data-testid="button-mobile-contact"
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

      {/* Hero Section */}
      <section className="relative min-h-[64vh] md:min-h-[60vh] flex items-start justify-center pt-24 md:pt-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
                Automation Consulting
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
              data-testid="text-hero-headline"
            >
              Automation For <br />
              <span className="text-gradient-brand">Business Operations</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              data-testid="text-hero-subline"
            >
              Practical workflow automation built for scale, reliability, and performance.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg h-auto"
                  data-testid="button-hero-contact"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" data-testid="icon-hero-contact-arrow" />
                </Button>
              </Link>
              <Button
                onClick={() => scrollToSection("services")}
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/5 text-white rounded-full px-8 py-6 text-lg h-auto bg-transparent"
              >
                View Services
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Strategic AI Implementation
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From strategy to execution, we deliver five focused service lines
              built to drive measurable operational performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <ServiceCard
              title="AI Strategy & Discovery"
              description="We audit your current workflows to identify high-impact automation opportunities before writing a single line of code."
              icon={Lightbulb}
              delay={0.1}
            />
            <ServiceCard
              title="Custom AI Development"
              description="Bespoke LLM agents, RAG systems, and neural networks tailored specifically to your proprietary data and business needs."
              icon={Brain}
              delay={0.2}
              highlight
            />
            <ServiceCard
              title="Workflow Automation"
              description="End-to-end intelligent process automation that connects your existing tools into a seamless, self-optimizing ecosystem."
              icon={Zap}
              delay={0.3}
            />
            <ServiceCard
              title="Data Analytics & Dashboards"
              description="Decision-ready dashboards and KPI systems that unify data across operations, finance, and leadership reporting."
              icon={CheckCircle}
              delay={0.4}
            />
            <ServiceCard
              title="Private Equity Automation"
              description="Automating deal pipeline, CRM systems, portfolio monitoring, and reporting for modern PE teams."
              icon={Landmark}
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Private Equity Fund Automation Section */}
      <section className="py-20 bg-white/2 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/30 mb-4">
                Specialized Offering
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Private Equity Fund Automation
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We help PE funds modernize front-to-back operations with automation systems that improve deal velocity, portfolio visibility, and investor communications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass border-white/10 bg-black/40">
                <CardContent className="p-8">
                  <h3 className="text-xl font-display font-bold mb-4 text-white">
                    What We Do for PE Funds
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li>• Deal pipeline automation (sourcing, screening, tracking)</li>
                    <li>• CRM customization for investor relations</li>
                    <li>• Portfolio company monitoring dashboards</li>
                    <li>• Automated LP reporting and communications</li>
                    <li>• Due diligence workflow automation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass border-primary/30 bg-primary/5">
                <CardContent className="p-8">
                  <h3 className="text-xl font-display font-bold mb-4 text-white">
                    Key Outcomes
                  </h3>
                  <div className="space-y-3 text-sm text-gray-200 mb-6">
                    <p>• Faster deal sourcing and triage across fragmented channels</p>
                    <p>• Better portfolio visibility with live operating dashboards</p>
                    <p>• Automated LP reporting to reduce manual quarterly prep</p>
                  </div>
                  <div className="border border-white/10 rounded-lg p-4 bg-black/30">
                    <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                      Case Study Placeholder
                    </p>
                    <p className="text-sm text-gray-400">
                      Add client story: how a mid-market PE fund reduced deal screening time and improved LP reporting turnaround with custom automation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="process"
        className="py-24 bg-white/2 border-y border-white/5"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                How We Work
              </h2>
              <p className="text-gray-400 max-w-xl">
                A rigorous, engineering-led approach to solving business
                problems.
              </p>
            </div>
            <div className="hidden md:block w-1/3 h-[1px] bg-white/10 mb-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep
              number="01"
              title="Discover"
              description="Deep dive into your operations to map value streams and identify bottlenecks."
            />
            <ProcessStep
              number="02"
              title="Design"
              description="Architecting the solution with a focus on scalability, security, and user experience."
            />
            <ProcessStep
              number="03"
              title="Build"
              description="Rapid agile development of your custom AI solution with regular feedback loops."
            />
            <ProcessStep
              number="04"
              title="Support"
              description="Ongoing maintenance, optimization, and training to ensure long-term success."
            />
          </div>
        </div>
      </section>

      {/* Results / Social Proof */}
      <section id="results" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Real Results, <br />
                Not Just Theory
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Our solutions are measured by their impact on your bottom line.
                We have saved our clients thousands of hours and unlocked
                millions in revenue through strategic automation.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="text-4xl font-display font-bold text-primary mb-2">
                    40%
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Avg. Efficiency Gain
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-secondary mb-2">
                    10x
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    ROI in Year One
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">
                    50+
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Custom Agents Built
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Automated Operations
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10" data-testid="badge-trusted">
                  Trusted by market leaders
                </span>
                <span className="text-xs text-white/40" data-testid="text-trusted-note">
                  Logos shown at right.
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-30"></div>
              <Card className="glass relative z-10 border-white/10 bg-black/40">
                <CardContent className="p-10 sm:p-12">
                  <div className="flex items-start justify-between gap-6 mb-10">
                    <div>
                      <div className="text-base sm:text-lg font-display font-bold text-white">
                        Companies We’ve Partnered With
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        A sample of teams we’ve supported across consulting and delivery.
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        Trusted
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-x-10 gap-y-8 items-center mb-8">
                    {[
                      { src: "/logo-kraft.png", alt: "Kraft" },
                      { src: "/assets/images/logos/citgo.png", alt: "CITGO" },
                      { src: "/assets/images/logos/mckesson.png", alt: "McKesson" },
                      { src: "/assets/images/logos/face.png", alt: "Face Amusement" },
                      { src: "/assets/images/logos/adtime.png", alt: "Adtime Marketing" },
                    ].map((logo, index) => (
                      <div
                        key={logo.alt}
                        className={`flex items-center justify-center ${index < 3 ? "sm:col-span-2" : "sm:col-span-3"}`}
                      >
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className="w-auto max-h-10 sm:max-h-12 opacity-90 hover:opacity-100 transition-opacity duration-200 [filter:drop-shadow(0_0_18px_rgba(255,255,255,0.10))_grayscale(1)_brightness(1.8)] hover:[filter:drop-shadow(0_0_18px_rgba(255,255,255,0.10))_grayscale(0)_brightness(1)]"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end">
                    <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 font-mono">
                      + additional
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass absolute -bottom-6 -right-6 z-0 border-white/10 bg-black/40 w-full opacity-50 scale-95">
                <CardContent className="p-8 h-32"></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" className="py-24 bg-white/2 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Work
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Real-world AI and data solutions delivering measurable impact.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-col items-center space-y-8 mb-16 relative z-20">
            {/* Industry Dropdown */}
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-400 mb-2 text-center">
                Select Industry
              </label>
              <Select
                value={activeIndustry}
                onValueChange={setActiveIndustry}
              >
                <SelectTrigger className="w-full bg-white/5 border-white/10 text-white rounded-lg h-12">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                  {[
                    "Amusement & Entertainment",
                    "Trucking & Logistics",
                    "Auto Dealerships",
                    "Marketing Agencies",
                    "Healthcare & Clinics",
                    "Real Estate",
                    "Finance & Accounting",
                    "SaaS & Technology",
                  ].map((industry) => (
                    <SelectItem
                      key={industry}
                      value={industry}
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Toggles */}
            <div className="bg-white/5 p-1 rounded-full flex items-center space-x-1">
              {["AI & Automation", "Data & Dashboards"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16"
          >
            <AnimatePresence mode="popLayout">
              {projects
                .filter(
                  (project) =>
                    project.industry === activeIndustry &&
                    project.category === activeTab,
                )
                .map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mb-24">
            <Link href="/insights">
              <span
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium group inline-flex items-center justify-center cursor-pointer"
                data-testid="link-view-more-examples"
              >
                View more examples
                <ArrowRight
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  data-testid="icon-view-more-arrow"
                />
              </span>
            </Link>
          </div>

          {/* Metrics Strip */}
          <div className="border-y border-white/10 py-12 bg-black/20 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Workflows Automated
                </div>
              </div>
              <div className="hidden md:block w-px h-full bg-white/10 mx-auto absolute right-0 top-0"></div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">2,000+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Hours Saved
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Industries Supported
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  Enterprise
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Grade Systems
                </div>
              </div>
            </div>
          </div>

          {/* What We Build */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold mb-8">
              What We Build
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-display font-bold tracking-tight mb-2">
                <img
                  src="/logo-header.png"
                  alt="Chohan"
                  className="h-40 md:h-48 w-auto mb-4"
                />
              </div>
              <div className="text-sm text-gray-500">
                © 2026 Chohan Consulting. All rights reserved.
              </div>
            </div>

            <div className="flex space-x-8">
              <a
                href="https://www.linkedin.com/company/chohan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-footer-linkedin"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-footer-twitter"
              >
                Twitter
              </a>
              <a
                href="mailto:contact@chohan.ai"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-footer-email"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  icon: Icon,
  delay,
  highlight = false,
}: {
  title: string;
  description: string;
  icon: any;
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative p-1 rounded-2xl ${highlight ? "bg-gradient-to-b from-white/10 to-transparent" : "bg-transparent"}`}
    >
      <div className="h-full bg-card border border-white/5 rounded-xl p-8 hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
        {highlight && (
          <div className="absolute top-0 right-0 p-3">
            <div className="w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
          </div>
        )}

        <div className="mb-8 relative h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/20 group-hover:bg-primary/10 transition-all duration-500">
          <Icon
            className="h-8 w-8 text-white group-hover:text-primary transition-colors duration-500"
            strokeWidth={1.5}
          />
        </div>

        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-sm">{description}</p>

        <div className="mt-6 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
          Learn more <ChevronRight className="ml-1 w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative pt-6">
      <div className="absolute top-0 left-0 text-6xl font-display font-bold text-white/5 -z-10">
        {number}
      </div>
      <div className="w-full h-[1px] bg-white/10 mb-6 relative">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ProjectCard({
  category,
  title,
  description,
  result,
}: {
  industry: string;
  category: string;
  title: string;
  description: string;
  result: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full"
    >
      <div className="h-full bg-card border border-white/5 rounded-xl p-6 hover:border-primary/30 hover:shadow-[0_0_20px_-10px_rgba(var(--primary-rgb),0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
        <div className="mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
            {category}
          </span>
        </div>
        <h3 className="text-lg font-display font-bold mb-2 text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-1">
          {description}
        </p>
        <div className="pt-3 mt-auto">
          <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {result}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

const projects = [
  // Amusement & Entertainment
  {
    industry: "Amusement & Entertainment",
    category: "AI & Automation",
    title: "Birthday Party Booking Automation",
    description:
      "Automated party inquiries, deposits, confirmations, and scheduling workflows.",
    result: "48% increase in party bookings.",
  },
  {
    industry: "Amusement & Entertainment",
    category: "AI & Automation",
    title: "Digital Waiver & Guest Check-In",
    description:
      "QR-based waiver signing and automated guest data capture at the front desk.",
    result: "70% faster front-desk processing.",
  },
  {
    industry: "Amusement & Entertainment",
    category: "AI & Automation",
    title: "Arcade Loyalty Automation",
    description:
      "Integrated game card usage data with CRM for automated loyalty offers.",
    result: "22% increase in repeat visits.",
  },
  {
    industry: "Amusement & Entertainment",
    category: "Data & Dashboards",
    title: "Venue Executive Dashboard",
    description:
      "Real-time revenue, labor cost, and margin tracking for leadership.",
    result: "Reporting cycle reduced by 70%.",
  },
  {
    industry: "Amusement & Entertainment",
    category: "Data & Dashboards",
    title: "Arcade & F&B Analytics",
    description:
      "Live sales combining game card swipes and food/beverage orders.",
    result: "Improved labor efficiency by 18%.",
  },
  {
    industry: "Amusement & Entertainment",
    category: "Data & Dashboards",
    title: "Attraction Utilization Tracker",
    description: "Heatmaps + usage metrics for lanes, zones, and attractions.",
    result: "Reduced manual reporting workload by 50%.",
  },

  // Trucking & Logistics
  {
    industry: "Trucking & Logistics",
    category: "AI & Automation",
    title: "Invoice Matching Automation",
    description:
      "Automated contract-to-invoice reconciliation using OCR and workflow logic.",
    result: "92% reduction in manual review time.",
  },
  {
    industry: "Trucking & Logistics",
    category: "AI & Automation",
    title: "Dispatch & Status Update Automation",
    description:
      "Automated pickup/delivery status messaging to customers and internal teams.",
    result: "60% faster response times.",
  },
  {
    industry: "Trucking & Logistics",
    category: "AI & Automation",
    title: "POD & Document Collection Workflow",
    description:
      "Automated document chasing, intake, and shipment file organization.",
    result: "75% fewer missing documents.",
  },
  {
    industry: "Trucking & Logistics",
    category: "Data & Dashboards",
    title: "Ops Performance Dashboard",
    description:
      "On-time %, exceptions, and shipment health monitoring in one view.",
    result: "Reduced escalations by 30%.",
  },
  {
    industry: "Trucking & Logistics",
    category: "Data & Dashboards",
    title: "Profit Per Load Dashboard",
    description:
      "Margin tracking by lane, customer, and carrier with trend insights.",
    result: "Improved margin visibility across all loads.",
  },
  {
    industry: "Trucking & Logistics",
    category: "Data & Dashboards",
    title: "Billing & Aging Dashboard",
    description: "Real-time AR aging, payment status, and billing pipeline.",
    result: "Faster collections and cleaner billing workflow.",
  },

  // Auto Dealerships
  {
    industry: "Auto Dealerships",
    category: "AI & Automation",
    title: "Lead Intake & Routing Automation",
    description:
      "Auto-capture leads from web/forms and route to the right rep instantly.",
    result: "35% faster lead response times.",
  },
  {
    industry: "Auto Dealerships",
    category: "AI & Automation",
    title: "Service Appointment Booking Automation",
    description: "Automated scheduling, reminders, and confirmation workflows.",
    result: "25% fewer no-shows.",
  },
  {
    industry: "Auto Dealerships",
    category: "AI & Automation",
    title: "Follow-Up & Reactivation Campaigns",
    description:
      "Automated SMS/email follow-ups for quotes, service, and trade-ins.",
    result: "3x engagement rate.",
  },
  {
    industry: "Auto Dealerships",
    category: "Data & Dashboards",
    title: "Sales Funnel Dashboard",
    description: "Lead-to-sale conversion tracking by source and rep.",
    result: "Increased pipeline visibility.",
  },
  {
    industry: "Auto Dealerships",
    category: "Data & Dashboards",
    title: "Service Department KPI Dashboard",
    description: "Daily RO volume, show rate, and technician utilization.",
    result: "Improved scheduling and throughput.",
  },
  {
    industry: "Auto Dealerships",
    category: "Data & Dashboards",
    title: "Marketing Source Performance",
    description: "ROI dashboard for paid channels, calls, and form leads.",
    result: "Better budget allocation decisions.",
  },

  // Marketing Agencies
  {
    industry: "Marketing Agencies",
    category: "AI & Automation",
    title: "Client Reporting Automation",
    description: "Automated weekly/monthly report generation and delivery.",
    result: "40% less manual reporting work.",
  },
  {
    industry: "Marketing Agencies",
    category: "AI & Automation",
    title: "Lead Capture & CRM Automation",
    description: "Form capture → enrichment → CRM entry → follow-up sequences.",
    result: "2x faster lead handoff.",
  },
  {
    industry: "Marketing Agencies",
    category: "AI & Automation",
    title: "Campaign QA & Alerting",
    description:
      "Automated anomaly alerts for spend spikes and performance drops.",
    result: "Issues caught 3x faster.",
  },
  {
    industry: "Marketing Agencies",
    category: "Data & Dashboards",
    title: "Multi-Client Performance Dashboard",
    description: "Consolidated KPIs across client accounts with drilldowns.",
    result: "Faster executive reporting.",
  },
  {
    industry: "Marketing Agencies",
    category: "Data & Dashboards",
    title: "Paid Ads ROI Dashboard",
    description: "CAC, ROAS, conversion rate trends and insights.",
    result: "Improved optimization decisions.",
  },
  {
    industry: "Marketing Agencies",
    category: "Data & Dashboards",
    title: "Content & Social Analytics",
    description: "Engagement, growth, and content performance by channel.",
    result: "Clearer content direction.",
  },

  // Healthcare & Clinics
  {
    industry: "Healthcare & Clinics",
    category: "AI & Automation",
    title: "Patient Intake Automation",
    description: "Digital intake forms + auto-upload into clinic systems/CRM.",
    result: "60% reduction in admin time.",
  },
  {
    industry: "Healthcare & Clinics",
    category: "AI & Automation",
    title: "Appointment Reminders & Confirmations",
    description: "Automated SMS reminders, confirmations, and reschedule flows.",
    result: "25% fewer no-shows.",
  },
  {
    industry: "Healthcare & Clinics",
    category: "AI & Automation",
    title: "Insurance Eligibility / Benefits Workflow",
    description: "Automated benefits checks and documentation routing.",
    result: "Faster verification turnaround.",
  },
  {
    industry: "Healthcare & Clinics",
    category: "Data & Dashboards",
    title: "Clinic Operations Dashboard",
    description: "Volume, utilization, and throughput tracking by provider.",
    result: "Improved scheduling decisions.",
  },
  {
    industry: "Healthcare & Clinics",
    category: "Data & Dashboards",
    title: "Revenue & Billing Dashboard",
    description: "Claims pipeline, denials, and collections visibility.",
    result: "Cleaner revenue tracking.",
  },
  {
    industry: "Healthcare & Clinics",
    category: "Data & Dashboards",
    title: "Patient Retention Dashboard",
    description: "Recall/overdue segments and reactivation effectiveness.",
    result: "Higher retention visibility.",
  },

  // Real Estate
  {
    industry: "Real Estate",
    category: "AI & Automation",
    title: "Lead Intake & Qualification Automation",
    description: "Capture and qualify inbound leads, route to agent/team.",
    result: "50% faster response times.",
  },
  {
    industry: "Real Estate",
    category: "AI & Automation",
    title: "Showing Scheduling Automation",
    description: "Auto-scheduling + confirmations + follow-up messages.",
    result: "More booked showings.",
  },
  {
    industry: "Real Estate",
    category: "AI & Automation",
    title: "Tenant Maintenance Ticket Automation",
    description: "Intake, triage, and vendor routing for maintenance requests.",
    result: "40% faster resolution time.",
  },
  {
    industry: "Real Estate",
    category: "Data & Dashboards",
    title: "Portfolio Performance Dashboard",
    description: "Rent collected, occupancy, and NOI trends by property.",
    result: "Better owner reporting.",
  },
  {
    industry: "Real Estate",
    category: "Data & Dashboards",
    title: "Leasing Pipeline Dashboard",
    description: "Leads → tours → applications → signed leases tracking.",
    result: "Improved leasing visibility.",
  },
  {
    industry: "Real Estate",
    category: "Data & Dashboards",
    title: "Maintenance & Vendor Dashboard",
    description: "Ticket volume, SLA, vendor performance, cost tracking.",
    result: "Reduced operational friction.",
  },

  // Finance & Accounting
  {
    industry: "Finance & Accounting",
    category: "AI & Automation",
    title: "Invoice Matching Automation",
    description: "OCR + rules to reconcile invoices to contracts/POs.",
    result: "92% reduction in manual review time.",
  },
  {
    industry: "Finance & Accounting",
    category: "AI & Automation",
    title: "Month-End Close Automation",
    description: "Automated reconciliations and journal prep workflows.",
    result: "Close cycle reduced by 30%.",
  },
  {
    industry: "Finance & Accounting",
    category: "AI & Automation",
    title: "Document Extraction & Filing",
    description:
      "Extract key fields and auto-file into organized folders/systems.",
    result: "80% less manual data entry.",
  },
  {
    industry: "Finance & Accounting",
    category: "Data & Dashboards",
    title: "Executive Finance Dashboard",
    description: "Revenue, margin, spend, and forecast in one view.",
    result: "Faster decision-making.",
  },
  {
    industry: "Finance & Accounting",
    category: "Data & Dashboards",
    title: "Spend & Vendor Analytics",
    description: "Vendor trends, leakage detection, and cost optimization views.",
    result: "Identified cost savings opportunities.",
  },
  {
    industry: "Finance & Accounting",
    category: "Data & Dashboards",
    title: "AR/AP Operations Dashboard",
    description: "Aging, payment status, and cash flow visibility.",
    result: "Cleaner cash operations.",
  },

  // SaaS & Technology
  {
    industry: "SaaS & Technology",
    category: "AI & Automation",
    title: "AI-Powered Customer Support Automation",
    description:
      "Implemented intelligent chatbots and ticket routing to reduce response times and improve customer satisfaction.",
    result: "70% reduction in response time.",
  },
];

const features = [
  {
    title: "Invoice Automation Systems",
    description: "End-to-end financial reconciliation",
  },
  {
    title: "AI Scheduling & Booking Systems",
    description: "Autonomous calendar management",
  },
  {
    title: "CRM Intake Pipelines",
    description: "Smart lead qualification & routing",
  },
  {
    title: "Executive Analytics Dashboards",
    description: "Real-time business intelligence",
  },
  {
    title: "Internal AI Assistants",
    description: "Custom knowledge base agents",
  },
];
