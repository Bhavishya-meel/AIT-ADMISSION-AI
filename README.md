# AIT Admissions & Campus AI (Monday)

> **"Your journey to AIT starts here."**  
> *Clear answers. Confident decisions. One step closer to AIT.*

An Apple-inspired, AI-powered admission & campus guidance platform customized specifically for the **Army Institute of Technology (AIT), Pune, Maharashtra, India**. Powered by **Monday AI** with dual OpenAI ChatGPT integration and an exhaustive institutional knowledge engine.

![AIT Admissions AI](public/images/ait-campus-hero.jpg)

---

## 🌟 Overview

**AIT Admissions AI** is an ed-tech web application built to transform complex engineering prospectuses, branch curricula, placement histories, and campus regulations into an elegant, conversational, and guided experience for prospective engineering aspirants and their families.

### Key Highlights
- **Apple-Inspired Aesthetic:** Minimalist design, warm-white surface palette (`#F5F5F7`), native Apple system typography, broad realistic shadows, and subtle micro-animations.
- **Monday AI Assistant:** Refined conversational agent integrated with OpenAI ChatGPT (`gpt-4o-mini`, `gpt-4o`, `gpt-3.5-turbo`) and backed by a resilient offline AIT Pune intelligence engine.
- **In-Drawer AI Settings:** Seamless in-browser configuration for OpenAI API keys (persisted in `localStorage` or loaded from `.env`) and model selector.
- **Whole-Site Dynamic Crest & Particle Canvas:** Rich AIT Pune crest with interactive scroll parallax and dark, dense, whole-site interactive floating particles (`z-30`).
- **Interactive Eligibility Wizard:** 5-step conversational questionnaire that guides applicants based on AWES parentage categories (serving Army, retired Army, war widows, Navy/Air Force reciprocal, and civilian clarification).
- **Admission Journey & Checklist:** 6-stage visual timeline accompanied by an interactive document checklist with real-time percentage completion tracking.
- **Branch Explorer:** Comprehensive breakdown of AIT Pune's 5 autonomous undergraduate engineering streams (COMP, IT, E&TC, MECH, A&R) with lab facilities and career avenues.
- **Official Verification Center:** Grounded citations linking directly to [aitpune.com](https://www.aitpune.com/), the [AIT ERP portal](https://erp.aitpune.edu.in:8006/AdmissionLoginStep1.aspx), and [NTA JEE Main](https://jeemain.nta.nic.in/).

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS (Tailwind v4 with `@tailwindcss/vite`)
- **Animation:** Framer Motion, HTML5 Canvas Particle Engine
- **Icons:** Lucide React
- **AI Engine:** OpenAI API (GPT-4o-mini, GPT-4o, GPT-3.5) + Fallback AIT Knowledge Engine

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bhavishya-meel/AIT-ADMISSION-AI.git
   cd AIT-ADMISSION-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **(Optional) Configure OpenAI API Key:**
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
   *Note: You can also enter your OpenAI API key directly inside the Monday chat drawer settings modal in your browser.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── public/
│   └── images/
│       ├── ait-campus-hero.jpg              # Real AIT Pune academic campus visual
│       └── ait-pune-logo.png                # Official AIT Pune crest
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                       # Glassmorphic Apple-style navigation
│   │   ├── HeroSection.tsx                  # Large typography & interactive chat preview
│   │   ├── BackgroundEffects.tsx            # AIT crest scroll animation & whole-site particle canvas
│   │   ├── AdmissionJourney.tsx             # 6-stage visual timeline & stepper
│   │   ├── DocumentChecklist.tsx            # Interactive checklist with progress bar
│   │   ├── BranchExplorer.tsx               # 5 branch cards, filters & deep-dive modal
│   │   ├── EligibilityWizard.tsx            # 5-step conversational questionnaire
│   │   ├── MeetMondaySection.tsx            # Monday capability showcase
│   │   ├── FAQSection.tsx                   # Searchable accordion
│   │   ├── OfficialSourcesSection.tsx        # Verified institutional resources
│   │   ├── ClosingCTA.tsx                   # Call to action
│   │   ├── Footer.tsx                       # Official links & student prototype disclaimer
│   │   ├── ChatDrawer.tsx                   # Slide-over full chat experience with AI settings
│   │   ├── ChatMessageView.tsx              # Markdown message bubble with sources & follow-ups
│   │   └── ChatInput.tsx                    # Multiline composer with keyboard shortcuts
│   ├── data/
│   │   ├── sourceLinks.ts                   # Central verified links & metadata
│   │   ├── programs.ts                      # Academic streams, labs & career pathways
│   │   ├── admissionKnowledge.ts            # Stages, documents, and institutional facts
│   │   └── faqs.ts                          # Categorized FAQ repository
│   ├── hooks/
│   │   └── useChat.ts                       # Chat state, OpenAI & local engine orchestration
│   ├── lib/
│   │   ├── aiService.ts                     # OpenAI ChatGPT client & AIT Pune system prompt
│   │   └── responseEngine.ts                # Natural intent classifier & grounded response logic
│   ├── App.tsx                              # Main application layout
│   ├── index.css                            # Apple design tokens & custom utilities
│   └── main.tsx                             # React entry point
└── package.json
```

---

## 📜 Prototype Disclaimer

*AIT Admissions & Campus AI is an independent student-built prototype created for academic and admission guidance demonstration. It is not an official portal of the Army Institute of Technology (AIT) Pune or the Army Welfare Education Society (AWES), and has not been officially launched or endorsed by the institute. All applicants must consult the official AIT Pune website ([aitpune.com](https://www.aitpune.com/)) and the latest published prospectus for authoritative rules, deadlines, and seat allocations.*
