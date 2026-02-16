export type BlogPost = {
  title: string;
  slug: string;
  date: string; // ISO format
  author: string;
  category: string;
  excerpt: string; // 2-3 sentence summary
  readTime: number; // minutes
  content: string; // markdown-style content
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "AI Market Pulse: What's Moving This Week",
    slug: "ai-market-pulse-whats-moving-this-week",
    date: "2026-02-17",
    author: "Chohan AI Team",
    category: "AI News",
    excerpt:
      "This week, enterprise AI budgets kept rising while buyers became more selective about implementation speed and measurable outcomes. Open-source models gained momentum in pilot programs, but security and governance remained top concerns. The strongest winners were companies shipping practical workflow automation instead of generic AI demos.",
    readTime: 6,
    tags: ["AI trends", "market analysis"],
    content: `## Weekly Snapshot

The AI market is still moving fast, but the tone has changed. Leaders are no longer asking, “Should we use AI?” They are asking, “Where does AI create measurable value in the next 90 days?”

## What We Are Seeing

- More mid-market companies are approving automation budgets tied to revenue operations and support teams.
- Procurement cycles are shorter for scoped workflow projects than for broad “AI transformation” initiatives.
- Teams that start with one high-friction process are expanding faster than teams trying to redesign everything at once.

## Why This Matters

The next phase of AI adoption is execution quality. Organizations with clean data, clear ownership, and a realistic rollout plan are moving ahead. Everyone else is stuck in pilot mode.

## Practical Takeaway

If you are evaluating projects this quarter, prioritize one workflow where cycle time and error rate are already tracked. Baseline it, automate it, then expand from proof to program.`,
  },
  {
    title: "3 Automation Mistakes Costing You $10K/Year",
    slug: "3-automation-mistakes-costing-you-10k-per-year",
    date: "2026-02-15",
    author: "Chohan AI Team",
    category: "Business Tips",
    excerpt:
      "Most automation failures are not caused by bad tools; they come from process design mistakes that quietly drain time and money. We repeatedly see teams over-automate unstable workflows, ignore exception handling, and skip adoption planning. Fixing these three issues can recover thousands in annual productivity and reduce operational risk.",
    readTime: 7,
    tags: ["automation", "ROI", "efficiency"],
    content: `## Mistake 1: Automating a Broken Process

If the manual workflow is inconsistent, automation only scales the inconsistency. Start by documenting who does what, when, and why. Remove redundant steps before introducing new tooling.

## Mistake 2: Ignoring Exceptions

Many workflows work 80% of the time and fail in edge cases. If no exception path exists, your team spends more time firefighting than before.

- Define what should happen when data is missing.
- Route uncertain records to a human review queue.
- Capture failure reasons so you can improve rules over time.

## Mistake 3: No Adoption Plan

Even great automations fail when teams do not trust the output. Launch with short training, transparent rules, and clear ownership.

## Quick ROI Framework

Use this simple model:

- Hours saved per week × blended hourly cost
- Error reduction impact
- Time-to-cash or response-time improvements

When you quantify these early, automation becomes a business decision instead of a tech experiment.`,
  },
  {
    title: "Why Most AI Projects Fail (And How to Fix It)",
    slug: "why-most-ai-projects-fail-and-how-to-fix-it",
    date: "2026-02-10",
    author: "Chohan AI Team",
    category: "Strategy",
    excerpt:
      "AI projects usually fail because strategy, data readiness, and ownership are misaligned from day one. Teams chase model sophistication before defining success metrics and operational constraints. A phased delivery model with clear accountability can dramatically improve win rates and long-term adoption.",
    readTime: 8,
    tags: ["AI implementation", "project management"],
    content: `## The Real Failure Pattern

Most failed AI initiatives look successful in the first month: exciting demos, broad stakeholder interest, and fast experimentation. Problems start when teams move from prototype to production.

## Root Causes

### 1) Undefined Success Metrics

Without measurable targets, teams cannot decide whether to iterate, pause, or scale.

### 2) Weak Data Foundations

Poor data quality breaks model confidence and stakeholder trust.

### 3) Unclear Ownership

If no one owns outcomes, everyone owns opinions.

## The Fix: A 4-Phase Delivery Model

- **Discover:** define use case, baseline metrics, and constraints.
- **Design:** map data flows, edge cases, and review points.
- **Deploy:** launch a scoped workflow with monitoring.
- **Expand:** scale only after proving value and stability.

## Final Thought

Winning AI programs are not built by chasing novelty. They are built by combining technical capability with operational discipline and clear business accountability.`,
  },
];

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
);
