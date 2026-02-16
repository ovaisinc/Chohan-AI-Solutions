# Chohan AI Consulting Website

## Overview
Professional consulting website for Chohan AI (chohan.ai) showcasing automation services, case studies, and contact capabilities.

## Recent Changes
- **2026-01-31**: Contact form now uses FormSubmit.co (no backend/API keys required) - submissions go directly to contact@chohan.ai
- **2026-01-31**: Removed Calendly integration, replaced with direct contact page
- **2026-01-31**: Fixed scroll-to-top behavior for Case Studies pages
- **2026-01-31**: Improved mobile logo sizing and performance optimizations

## Project Architecture

### Pages
- `/` - Home page with hero, services, process, results sections
- `/insights` - Case Studies listing page
- `/insights/:slug` - Individual case study detail pages
- `/contact` - Contact form page

### Contact Form Setup
The contact form uses **FormSubmit.co** for email delivery:
- Form POSTs to `https://formsubmit.co/contact@chohan.ai`
- After submission, redirects to `/contact?submitted=true`
- Success state displays confirmation message
- No backend API or email service API keys required

### Key Files
- `client/src/pages/home.tsx` - Main landing page
- `client/src/pages/contact.tsx` - Contact form with FormSubmit
- `client/src/pages/insights.tsx` - Case studies listing
- `client/src/pages/insight-detail.tsx` - Individual case study
- `client/src/data/insights.ts` - Case study content data

### Assets
- `/logo-left.png` - Large left-side logo on home page
- `/logo-header.png` - Header/nav logo
- `/logo-mark.png` - Logo mark only

## User Preferences
- No external booking systems (no Calendly)
- Direct contact preferred (email/phone displayed prominently)
- Mobile-friendly with appropriately sized logos
- Clean, professional dark theme
