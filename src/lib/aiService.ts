import { OFFICIAL_SOURCES } from '../data/sourceLinks';
import type { OfficialSource } from '../data/sourceLinks';

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  sources: OfficialSource[];
  suggestedFollowUps: string[];
  provider: 'chatgpt' | 'local';
}

// Storage keys for user-configured OpenAI API key & model
export const OPENAI_API_KEY_STORAGE = 'monday_openai_api_key';
export const OPENAI_MODEL_STORAGE = 'monday_openai_model';

export function getOpenAIApiKey(): string {
  // First check localStorage, then check environment variable
  const stored = localStorage.getItem(OPENAI_API_KEY_STORAGE);
  if (stored && stored.trim()) {
    return stored.trim();
  }
  return (import.meta.env.VITE_OPENAI_API_KEY as string) || '';
}

export function setOpenAIApiKey(key: string) {
  if (key.trim()) {
    localStorage.setItem(OPENAI_API_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(OPENAI_API_KEY_STORAGE);
  }
}

export function getOpenAIModel(): string {
  return localStorage.getItem(OPENAI_MODEL_STORAGE) || 'gpt-4o-mini';
}

export function setOpenAIModel(model: string) {
  localStorage.setItem(OPENAI_MODEL_STORAGE, model);
}

/**
 * Master Knowledge Base for Monday (AIT Pune Assistant & Universal AI Guide).
 * Fed directly into ChatGPT's System Prompt.
 */
export const AIT_PUNE_SYSTEM_PROMPT = `
You are "Monday", the dedicated, highly intelligent AI Assistant for the Army Institute of Technology (AIT), Pune, Maharashtra, India.

### YOUR CAPABILITIES & SCOPE:
1. INSTITUTIONAL AUTHORITY ON AIT PUNE:
   You possess comprehensive, verified knowledge about AIT Pune admissions, eligibility, cutoff ranks, departments, campus life, hostels, mess, sports, clubs, and placements.
2. UNIVERSAL AI ASSISTANT:
   You can answer ANY question asked by the user! This includes:
   - General engineering concepts, computer science, programming (Python, C++, Java, JavaScript, Data Structures & Algorithms, Web Development, AI/ML, Cloud)
   - JEE Main preparation, revision strategies, physics, chemistry, and mathematics questions
   - Career roadmaps, resume building, technical interview preparation, tech internships
   - Engineering college comparisons (e.g. AIT Pune vs COEP vs VIT Pune vs NITs)
   - Academic concepts, scientific questions, project ideas, writing, and general conversation.
   NEVER refuse to answer non-AIT questions. Provide deep, accurate, articulate answers on any topic, connecting to engineering or student development when relevant.

### CRITICAL INSTITUTIONAL FACTS ABOUT AIT PUNE:
1. Founding & Legacy:
   - Established in 1994 by General B.C. Joshi, PVSM, AVSM, ADC (then Chief of the Army Staff).
   - Operated under the aegis of the Army Welfare Education Society (AWES), New Delhi.
   - Patronage: Indian Army. Motto: "Onward To Glory".
   - Affiliated permanently to Savitribai Phule Pune University (SPPU).
   - Conferred Autonomous College status by UGC and SPPU starting Academic Year 2025–26. Degrees continue to be conferred by SPPU.
   - Accreditations: NAAC 'A' Grade, NBA Accreditation across all eligible undergraduate branches.

2. Campus & Location:
   - Spread across a scenic, green 30-acre campus in Dighi Hills, Alandi Road, Pune - 411015, Maharashtra.
   - Approximately 8 km from Pune International Airport (Lohegaon) and 12 km from Pune Railway Station.
   - Facilities: Academic blocks, central Ramanujan Library, computing centers, advanced robotics and IoT labs, incubation center, sports grounds, cafeteria, open-air theatre, shopping complex with ATM.

3. Undergraduate Engineering Programs & Intake:
   - 100% full-time 4-year B.E. degrees across 5 autonomous branches:
     1. Computer Engineering (COMP) - 120 seats
     2. Information Technology (IT) - 120 seats
     3. Electronics & Telecommunication Engineering (E&TC) - 120 seats
     4. Mechanical Engineering (MECH) - 60 seats
     5. Automation & Robotics (A&R) - 60 seats
   - Total First Year Intake: 480 seats.

4. Exclusivity & Eligibility (AWES Rules):
   - 100% of seats are strictly reserved for children/wards of eligible Indian Armed Forces personnel.
   - GENERAL CIVILIANS ARE NOT ELIGIBLE. There is NO management quota, NRI quota, or direct paid donation seats.
   - Eligible Categories:
     - Wards of serving Army personnel with minimum 10 years continuous regular service (Form P1).
     - Wards of ex-Army personnel granted regular, family, or disability pension (Form P2 + Discharge Book).
     - Wards of Army personnel who died in harness or battle casualties (Form P3/P4).
     - Limited reciprocal quotas for children of Indian Navy and Indian Air Force personnel meeting AWES criteria.
   - Academic Qualification: 10+2 (Higher Secondary) with Physics and Mathematics as compulsory subjects, plus Chemistry/Biotechnology/Biology/Computer Science with minimum 50% aggregate marks in PCM.

5. Entrance & Merit Allocation:
   - Admission is strictly and solely determined by the All India Rank (CRL) in NTA JEE (Main) Paper 1.
   - AIT DOES NOT conduct any entrance exam and DOES NOT accept MHT-CET scores.
   - Candidates must separately register online on the AIT ERP Admission Portal (aitpune.com) with their JEE Main application number.

6. Historical Cutoff Trends (Approximate Closing CRL Ranks):
   - Computer Engineering: ~50,000 to ~95,000 CRL
   - Information Technology: ~90,000 to ~1,25,000 CRL
   - Electronics & Telecommunication (E&TC): ~1,25,000 to ~1,85,000 CRL
   - Automation & Robotics (A&R): ~1,70,000 to ~2,25,000 CRL
   - Mechanical Engineering: ~2,10,000 to ~3,20,000 CRL

7. Placements & Career Outcomes:
   - Consistent 90%+ placement rate.
   - Highest Package: ₹52 LPA+ (Amazon, Microsoft, Cred).
   - Average Package: ~₹14.5 LPA for Computer/IT branches, ~₹10.5 LPA overall college average.
   - Marquee Recruiters: Microsoft, Amazon, Google, Cred, Deutsche Bank, Mastercard, Nvidia, BNY Mellon, Zomato, Barclays, UBS, Tata Motors, L&T, Godrej, Schlumberger, Texas Instruments.

8. Hostels & Student Life:
   - 100% compulsory residential campus for First Year students. Separate, secure Boys Hostels and Girls Hostels.
   - Modern student mess serving hygienic vegetarian and non-vegetarian meals.
   - World-class sports facilities: Football ground, cricket pitch, tennis courts, squash courts, basketball courts, synthetic badminton courts, modern gymnasium, running track.
   - Student Clubs: OssCube (Open Source), Coding Club, Robotics Club, IEEE Student Branch, ACM Chapter, Google Developer Student Club, E-Cell.
   - Major Annual Events: "Solutions" (National Tech Fest), "Pace" (National Sports Fest), "Aakriti" (Annual Cultural Fest).

9. Fees & Scholarships:
   - Approximate annual college tuition fees: ₹1,85,000 to ₹2,10,000 per year.
   - Approximate hostel and mess charges: ₹75,000 to ₹90,000 per year.
   - Scholarships: Prime Minister's Scholarship Scheme (PMSS - ₹30,000 to ₹36,000/yr), AWES Merit Scholarship, Ministry of Defence Education Concession, Tata Merit Scholarship.

10. Key Administration & Contacts:
    - Director: Maj Gen Uday Shankar Sengupta (Retd)
    - Principal: Dr. B.P. Patil
    - Official Website: https://www.aitpune.com
    - Contact Helpline: 020-27157534 / 020-27157612 | Email: ait@aitpune.edu.in

### GUIDANCE & FORMATTING RULES:
- Tone: Welcoming, articulate, professional, encouraging, and authoritative.
- Formatting: Use clean GitHub-flavored markdown: bold key points, bullet points for lists, clear headers, and code blocks for programming questions.
- If asked about non-AIT subjects (coding, science, math, exam prep, etc.), give an outstanding, thorough, educational answer.
`;

/**
 * Call OpenAI ChatGPT API with AIT Pune contextual intelligence.
 * Supports user custom API keys (Tier 1) as well as built-in live ChatGPT (Tier 2).
 */
export async function callChatGPT(
  userQuery: string,
  history: { sender: 'student' | 'assistant'; content: string }[]
): Promise<AIResponse> {
  const apiKey = getOpenAIApiKey();
  const model = getOpenAIModel();

  // Build message sequence for chat completion
  const messages: OpenAIMessage[] = [
    { role: 'system', content: AIT_PUNE_SYSTEM_PROMPT },
  ];

  // Include recent conversation context (up to last 6 messages)
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.sender === 'student' ? 'user' : 'assistant',
      content: msg.content,
    });
  }

  // Add the current user query
  messages.push({ role: 'user', content: userQuery });

  let rawContent: string | null = null;

  // TIER 1: If user provided their own OpenAI API Key, use official OpenAI endpoint
  if (apiKey && apiKey.trim()) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model || 'gpt-4o-mini',
          messages,
          temperature: 0.6,
          max_tokens: 1400,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        rawContent = data.choices?.[0]?.message?.content || null;
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn('Official OpenAI returned error:', errorData);
      }
    } catch (err) {
      console.warn('Official OpenAI call failed, trying built-in ChatGPT service:', err);
    }
  }

  // TIER 2: Built-in Live ChatGPT Engine (zero-config, works for all users)
  if (!rawContent) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai',
          messages,
          temperature: 0.6,
          max_tokens: 1500,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        rawContent = data.choices?.[0]?.message?.content || null;
      }
    } catch (err) {
      console.warn('Built-in ChatGPT service failed:', err);
    }
  }

  // If both live ChatGPT attempts failed (e.g. completely offline), throw to trigger local engine
  if (!rawContent || !rawContent.trim()) {
    throw new Error('CHATGPT_SERVICE_UNAVAILABLE');
  }

  // Select relevant official sources based on keywords in query or response
  const queryLower = userQuery.toLowerCase();
  const relevantSources: OfficialSource[] = [];

  if (queryLower.includes('prospectus') || queryLower.includes('fee') || queryLower.includes('brochure') || queryLower.includes('cost')) {
    relevantSources.push(OFFICIAL_SOURCES[0]);
  }
  if (queryLower.includes('jee') || queryLower.includes('entrance') || queryLower.includes('nta') || queryLower.includes('rank')) {
    relevantSources.push(OFFICIAL_SOURCES[2]);
  }
  if (queryLower.includes('eligib') || queryLower.includes('army') || queryLower.includes('civilian') || queryLower.includes('category') || queryLower.includes('certificate')) {
    relevantSources.push(OFFICIAL_SOURCES[3]);
  }
  if (relevantSources.length === 0) {
    relevantSources.push(OFFICIAL_SOURCES[1]); // Official home
  }

  // Derive contextual follow-ups
  const followUps = generateSmartFollowUps(userQuery);

  return {
    content: rawContent,
    sources: relevantSources,
    suggestedFollowUps: followUps,
    provider: 'chatgpt',
  };
}

function generateSmartFollowUps(query: string): string[] {
  const q = query.toLowerCase();

  // AIT-specific topics
  if (q.includes('fee') || q.includes('cost')) {
    return [
      'What scholarships are available at AIT Pune?',
      'Tell me about hostel and mess charges',
      'Explain the fee refund policy upon withdrawal',
    ];
  }
  if (q.includes('cutoff') || q.includes('rank') || q.includes('jee')) {
    return [
      'What are the closing ranks for Computer Engineering?',
      'Can I get IT or E&TC with my percentile?',
      'How does AIT prepare its merit list?',
    ];
  }
  if (q.includes('branch') || q.includes('computer') || q.includes('robotics')) {
    return [
      'Compare Computer Engineering vs IT at AIT',
      'What are the labs and curriculum for Automation & Robotics?',
      'What are the placement statistics branch-wise?',
    ];
  }
  if (q.includes('hostel') || q.includes('campus') || q.includes('life')) {
    return [
      'Are hostels compulsory for first-year students?',
      'What technical clubs and sports exist at AIT?',
      'What is the daily schedule and campus curfew?',
    ];
  }
  if (q.includes('placement') || q.includes('salary') || q.includes('package')) {
    return [
      'What was the highest package offered this year?',
      'Which tech companies recruit from AIT Pune?',
      'What coding clubs help with placement prep?',
    ];
  }

  // General coding / technical topics
  if (q.includes('python') || q.includes('code') || q.includes('program') || q.includes('algorithm') || q.includes('dsa') || q.includes('java') || q.includes('c++')) {
    return [
      'How is programming taught in AIT Computer Engineering?',
      'What are the best platforms to practice DSA for tech placements?',
      'Can you give me an example with code?',
    ];
  }

  // JEE / study preparation
  if (q.includes('study') || q.includes('physics') || q.includes('math') || q.includes('chemistry') || q.includes('prepare')) {
    return [
      'How many marks do I need in JEE Main for AIT Pune CSE?',
      'What is the ideal daily study routine for JEE Main?',
      'What are the high-weightage chapters in JEE Physics and Math?',
    ];
  }

  return [
    'Am I eligible to apply under Army parentage?',
    'What are the cutoff ranks for Computer Engineering?',
    'Tell me about placements and highest package at AIT',
    'How do I register on the AIT ERP portal?',
  ];
}
