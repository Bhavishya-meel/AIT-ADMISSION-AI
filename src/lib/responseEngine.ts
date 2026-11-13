import { OFFICIAL_SOURCES } from '../data/sourceLinks';
import type { OfficialSource } from '../data/sourceLinks';

export interface ChatMessage {
  id: string;
  sender: 'student' | 'assistant';
  content: string;
  timestamp: string;
  sources?: OfficialSource[];
  suggestedFollowUps?: string[];
  isTyping?: boolean;
  provider?: 'chatgpt' | 'local';
}

export interface AssistantResponse {
  content: string;
  sources: OfficialSource[];
  suggestedFollowUps: string[];
  provider?: 'chatgpt' | 'local';
}

/**
 * Highly refined, deep local response engine for Monday - AIT Admissions & Campus AI.
 * Covers everything about Army Institute of Technology, Pune:
 * admissions, cutoffs, engineering streams, placements, packages, hostels, mess, clubs,
 * sports, fees, scholarships, leadership, and campus rules.
 */
export function generateMondayResponse(userQuery: string): AssistantResponse {
  const query = userQuery.toLowerCase().trim();

  // 1. Greetings & Persona Check
  if (
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste|monday|who are you)\b/i.test(query) &&
    query.length < 35
  ) {
    return {
      content: `Hello! I'm **Monday**, your dedicated AI Assistant for the **Army Institute of Technology (AIT), Pune**.\n\nI can answer anything you need regarding:\n- **Admissions & Eligibility:** Army parentage categories (Serving, ESM, Gallantry, Navy/Air Force quotas), civilian restrictions, and Form P1–P4 requirements.\n- **JEE Main Merit & Cutoffs:** CRL rank distributions across Computer, IT, E&TC, Mech, and Robotics.\n- **Autonomous Curriculum:** Benefits of AIT's autonomy starting AY 2025–26, updated syllabus, and SPPU degree affiliation.\n- **Placements & Internships:** Marquee recruiters (Microsoft, Amazon, Cred, Nvidia), ₹52+ LPA highest package, and ₹14.5 LPA CS/IT averages.\n- **Campus & Residential Life:** Hostels, mess, sports complexes, technical clubs (OssCube, Robotics, ACM), and annual fests (Solutions, Pace, Aakriti).\n- **Fees & Scholarships:** College fees, hostel charges, PMSS scheme, and AWES merit grants.\n\nWhat would you like to explore first?`,
      sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
      suggestedFollowUps: [
        'Am I eligible to apply to AIT?',
        'What are the cutoff ranks for Computer Engineering?',
        'Tell me about placements and highest package at AIT',
        'Explain the hostel and campus facilities at AIT',
      ],
      provider: 'local',
    };
  }

  // 2. Civilians / Management Quota / General Category
  if (
    query.includes('civilian') ||
    query.includes('management quota') ||
    query.includes('direct admission') ||
    query.includes('without defense') ||
    query.includes('non defence') ||
    query.includes('non-defense') ||
    query.includes('parents not in army') ||
    query.includes('father not in army') ||
    query.includes('private quota') ||
    query.includes('donation')
  ) {
    return {
      content: `**AIT Pune does not offer admission to general civilian applicants.**\n\nUnder the constitution and regulations of the **Army Welfare Education Society (AWES)**, **100% of seats** are reserved exclusively for the children and wards of eligible Indian Armed Forces personnel (primarily the Indian Army, with designated reciprocal quotas for Indian Navy and Indian Air Force wards as published in the official prospectus).\n\n**Key Facts:**\n- There is **no management quota**, NRI quota, donation seats, or direct commercial admission.\n- Every applicant must possess an authentic Armed Forces service or relationship certificate (such as Form P1 for serving personnel, Form P2 for ex-servicemen, etc.).\n- Admission is granted purely on merit based on the **All India Rank (CRL)** in NTA JEE (Main) Paper 1.\n\n*If one of your parents served in the Indian Army, Navy, or Air Force, please tell me their service status so I can guide you on the specific certificate!*`,
      sources: [OFFICIAL_SOURCES[3], OFFICIAL_SOURCES[1]],
      suggestedFollowUps: [
        'My father is in the Army. Can I apply?',
        'Can children of Navy or Air Force apply?',
        'Where can I read the full eligibility rules?',
      ],
      provider: 'local',
    };
  }

  // 3. Army Serving Personnel Wards
  if (
    query.includes('serving') ||
    query.includes('father is in army') ||
    query.includes('father in army') ||
    query.includes('mother in army') ||
    query.includes('serving army') ||
    query.includes('form p1') ||
    query.includes('subedar') ||
    query.includes('havildar') ||
    query.includes('colonel') ||
    query.includes('major') ||
    query.includes('sepoy') ||
    query.includes('jco') ||
    query.includes('naik')
  ) {
    return {
      content: `**Yes! Children of serving Indian Army personnel are fully eligible to apply for AIT Pune.**\n\nHere are the specific requirements:\n\n1. **Service Tenure:** The parent must have completed a minimum of **10 years of continuous regular service** in the Indian Army at the time of admission.\n2. **Serving Certificate (Form P1):** You must obtain Form P1 (Children of Serving Army Personnel) signed by the **Commanding Officer (CO) / OC Unit**, stamped with the official unit seal and round stamp.\n3. **Academic Criteria:** Passed 10+2 with Physics and Mathematics as compulsory subjects, plus Chemistry/CS/Bio, with at least 50% aggregate marks in the PCM group.\n4. **Entrance Exam:** You must appear for **NTA JEE (Main) Paper 1**. Admission is granted strictly on JEE Main All India Rank (CRL).\n5. **Registration:** Complete online registration on the AIT ERP Admission Portal (*aitpune.com*) before the deadline.\n\n*Tip: Download Form P1 directly from Appendix A of the official AIT prospectus.*`,
      sources: [OFFICIAL_SOURCES[3], OFFICIAL_SOURCES[1]],
      suggestedFollowUps: [
        'What is Form P1 and where do I get it signed?',
        'How do I register on the AIT ERP portal?',
        'What are the cutoffs for Computer Engineering?',
      ],
      provider: 'local',
    };
  }

  // 4. Retired / Ex-Servicemen Wards
  if (
    query.includes('retired') ||
    query.includes('ex-servicemen') ||
    query.includes('ex serviceman') ||
    query.includes('pensioner') ||
    query.includes('discharge') ||
    query.includes('form p2') ||
    query.includes('esm') ||
    query.includes('pension')
  ) {
    return {
      content: `**Yes! Children of retired Indian Army personnel (Ex-Servicemen) are fully eligible.**\n\n**Category Guidelines for Ex-Servicemen:**\n1. **Qualifying Service:** The parent must have been granted a regular pension, liberalized family pension, or disability pension at the time of release/discharge.\n2. **Mandatory Documentation (Form P2):**\n   - Completed **Form P2** signed by the respective **Secretary, Zila Sainik Welfare Office (ZSWO)** or the Record Office / MP Dte.\n   - Copy of the parent's **Discharge Book / Service Book** showing the candidate's name endorsed as a recognized child.\n   - Copy of the **Pension Payment Order (PPO)**.\n3. **Merit Criteria:** 100% based on All India Rank in NTA JEE (Main) Paper 1.\n\n*Make sure your name is clearly recorded in the parent's service discharge book before verification!*`,
      sources: [OFFICIAL_SOURCES[3], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'What documents must I submit with Form P2?',
        'Explain the step-by-step registration on AIT ERP',
        'What scholarships are available for ESM wards?',
      ],
      provider: 'local',
    };
  }

  // 5. Placements, Packages, Salary & Top Companies
  if (
    query.includes('placement') ||
    query.includes('package') ||
    query.includes('highest') ||
    query.includes('salary') ||
    query.includes('companies') ||
    query.includes('recruiter') ||
    query.includes('lpa') ||
    query.includes('job') ||
    query.includes('internship') ||
    query.includes('amazon') ||
    query.includes('microsoft') ||
    query.includes('google')
  ) {
    return {
      content: `**AIT Pune Placement Highlights & Statistics:**\n\nAIT Pune maintains an exceptional placement track record, consistently achieving **90%+ overall placement rate** across branches.\n\n**Key Placement Figures:**\n- **Highest Package:** **₹52+ LPA** (international / off-campus offers reaching even higher with leading product firms like Amazon, Microsoft, and Cred).\n- **Average Package (Computer Engineering & IT):** **~₹14.5 LPA**\n- **Overall College Average Package:** **~₹10.5 LPA**\n- **Median Package:** **~₹8.5 LPA to ₹9.0 LPA**\n\n**Marquee Tech Recruiters:**\n- Microsoft, Amazon, Google, Cred, Nvidia, Deutsche Bank, Mastercard, BNY Mellon, Barclays, Zomato, UBS, Schlumberger, Texas Instruments, Oracle, Publicis Sapient, Josh Technology.\n\n**Core & Automotive Recruiters (E&TC, Mech, Robotics):**\n- Tata Motors, L&T Technology Services, Godrej, Bosch, Siemens, Mahindra & Mahindra, Bharat Forge, Cummins.\n\n**Why AIT Placements are so Strong:**\n- Robust coding culture fostered by student clubs like **OssCube** and **Coding Club**.\n- High discipline, problem-solving mindset, and leadership qualities valued by top engineering employers.\n- Dedicated Training & Placement Cell (TPO) with continuous pre-placement aptitude training and mock interviews.`,
      sources: [OFFICIAL_SOURCES[1], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'Compare Computer Engineering vs IT placements at AIT',
        'What coding clubs and technical opportunities exist at AIT?',
        'What are the cutoffs for Computer Engineering?',
      ],
      provider: 'local',
    };
  }

  // 6. Cutoffs, Ranks, Percentiles & JEE Main Merit
  if (
    query.includes('cutoff') ||
    query.includes('cut off') ||
    query.includes('closing rank') ||
    query.includes('opening rank') ||
    query.includes('percentile') ||
    query.includes('rank') ||
    query.includes('marks') ||
    query.includes('jee main') ||
    query.includes('crl')
  ) {
    return {
      content: `**AIT Pune Cutoff Trends & JEE Main Merit List:**\n\nAdmission to AIT Pune is governed **100% by All India Rank (CRL)** in NTA JEE (Main) Paper 1. AIT does not accept MHT-CET or state quotas.\n\n**Historical Closing Ranks (General Army Category):**\n1. **Computer Engineering (120 seats):**\n   - Typical Closing CRL: **~50,000 – 95,000** (~93.5 – 96.5 percentile)\n2. **Information Technology (120 seats):**\n   - Typical Closing CRL: **~90,000 – 1,25,000** (~91.5 – 93.5 percentile)\n3. **Electronics & Telecommunication (E&TC - 120 seats):**\n   - Typical Closing CRL: **~1,25,000 – 1,85,000** (~87.0 – 91.5 percentile)\n4. **Automation & Robotics (A&R - 60 seats):**\n   - Typical Closing CRL: **~1,70,000 – 2,25,000** (~84.0 – 88.0 percentile)\n5. **Mechanical Engineering (60 seats):**\n   - Typical Closing CRL: **~2,10,000 – 3,20,000** (~78.0 – 85.0 percentile)\n\n*Note: Cutoffs fluctuate every year depending on the number of registered candidates, JEE paper difficulty, and seat intake. AIT publishes separate merit lists for Army, Navy, and Air Force wards.*`,
      sources: [OFFICIAL_SOURCES[2], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'How does AIT prepare its institutional merit list?',
        'Can I get IT or E&TC with 88 percentile in JEE Main?',
        'What is the counseling and seat allocation procedure?',
      ],
      provider: 'local',
    };
  }

  // 7. Hostels, Mess, Campus Life & Rules
  if (
    query.includes('hostel') ||
    query.includes('mess') ||
    query.includes('food') ||
    query.includes('room') ||
    query.includes('curfew') ||
    query.includes('out pass') ||
    query.includes('campus life') ||
    query.includes('gym') ||
    query.includes('sports') ||
    query.includes('wifi') ||
    query.includes('residential') ||
    query.includes('girls hostel') ||
    query.includes('boys hostel')
  ) {
    return {
      content: `**Campus Life, Hostels & Residential Facilities at AIT Pune:**\n\nAIT Pune is a **100% residential campus for First Year students**, creating a close-knit, disciplined, and supportive camaraderie.\n\n**Hostel Accommodation:**\n- **Separate Hostels:** Dedicated, secure hostels for boys and girls with 24x7 security, CCTV surveillance, and biometric attendance.\n- **Room Setup:** 2 to 3 students per room in the First Year, equipped with individual beds, study tables, wardrobes, and high-speed Wi-Fi connectivity.\n- **Modern Amenities:** Water coolers with RO purification, hot water geysers, laundromat facilities, and reading/recreation halls.\n\n**Mess & Dining:**\n- Student-managed mess committee ensuring hygienic, nutritious, and balanced meals.\n- Four daily services: Breakfast, Lunch, Evening Snacks/Tea, and Dinner (both Vegetarian and Non-Vegetarian options provided).\n\n**Sports & Wellness:**\n- Full-size Football and Cricket ground, synthetic Tennis and Basketball courts, Squash court, Badminton courts, and a fully equipped modern Gymnasium.\n- On-campus Medical Inspection (MI) room with an attending doctor and emergency ambulance available 24x7.\n\n**Discipline & Timings:**\n- Evening in-time / curfew is strictly maintained (typically ~21:00 to 21:30 hrs) for student safety.\n- Out-passes and weekend leave are issued through the digital hostel ERP system with parental approval.`,
      sources: [OFFICIAL_SOURCES[1], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'How much are the hostel and mess fees at AIT?',
        'What clubs and extracurricular activities exist at AIT?',
        'Is ragging completely banned at AIT Pune?',
      ],
      provider: 'local',
    };
  }

  // 8. Autonomy & SPPU Affiliation
  if (
    query.includes('autonomous') ||
    query.includes('autonomy') ||
    query.includes('sppu') ||
    query.includes('pune university') ||
    query.includes('degree') ||
    query.includes('syllabus') ||
    query.includes('curriculum') ||
    query.includes('ugc')
  ) {
    return {
      content: `**AIT Pune Autonomous Status (Starting AY 2025–26):**\n\nThe University Grants Commission (UGC) and Savitribai Phule Pune University (SPPU) have conferred **Autonomous College Status** upon AIT Pune starting from the Academic Year 2025–26.\n\n**Key Advantages of Autonomy for Students:**\n1. **Modern, Industry-Driven Curriculum:** AIT can directly update its syllabus with modern specializations like Artificial Intelligence, Cloud Computing, VLSI Chip Design, EV Technologies, and Industrial Robotics without waiting for lengthy university approval cycles.\n2. **Flexible Examination & Continuous Evaluation:** Continuous internal assessments, practical project evaluations, and timely semester examinations with faster grade publication.\n3. **Prestigious SPPU Degree:** Even with autonomy, the final engineering degree is awarded directly by **Savitribai Phule Pune University (SPPU)**, recognized globally for higher education and government credentials.\n4. **Interdisciplinary Minors & Honors:** Students can pursue Honors in specialized fields (like Cyber Security, Data Science, or Robotics) along with their major branch.\n5. **Expanded Internship Windows:** Autonomous calendar accommodates semester-long corporate internships in leading tech companies during the final year.`,
      sources: [OFFICIAL_SOURCES[1], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'What engineering branches are offered at AIT?',
        'How does autonomy improve placements for students?',
        'Explain the admission process for the upcoming cycle',
      ],
      provider: 'local',
    };
  }

  // 9. Engineering Branches (COMP, IT, E&TC, MECH, A&R)
  if (
    query.includes('branch') ||
    query.includes('computer engineering') ||
    query.includes('information technology') ||
    query.includes('electronics') ||
    query.includes('e&tc') ||
    query.includes('mechanical') ||
    query.includes('automation') ||
    query.includes('robotics') ||
    query.includes('stream') ||
    query.includes('seats') ||
    query.includes('intake')
  ) {
    return {
      content: `**Undergraduate Engineering Branches at AIT Pune (Total Intake: 480 Seats):**\n\n1. **Computer Engineering (COMP - 120 Seats):**\n   - Focus on AI/ML, Data Science, Algorithms, Systems Programming, and Distributed Systems.\n   - Highest placements and competitive coding culture (OssCube, ACM Chapter).\n\n2. **Information Technology (IT - 120 Seats):**\n   - Focus on Cloud Architecture, Full-Stack Web Technologies, Cyber Security, and Mobile Computing.\n   - Equal career opportunities and salary parity with Computer Engineering.\n\n3. **Electronics & Telecommunication (E&TC - 120 Seats):**\n   - Focus on VLSI Design, Embedded Systems, Signal Processing, IoT, and 5G Communications.\n   - Strong dual placement capability in both core hardware firms and top software giants.\n\n4. **Automation & Robotics (A&R - 60 Seats):**\n   - Cutting-edge interdisciplinary branch blending ROS (Robot Operating System), Computer Vision, Mechatronics, and Industrial Automation.\n   - Specialized industrial robotics labs and competition teams.\n\n5. **Mechanical Engineering (MECH - 60 Seats):**\n   - Strong emphasis on CAD/CAM, Thermal Systems, Renewable Energy, and Automotive Engineering.\n   - Home to SAE BAJA and Formula Student racing teams winning national championships.`,
      sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
      suggestedFollowUps: [
        'Compare Computer Engineering vs IT at AIT',
        'What are the cutoffs for each branch?',
        'Tell me about placements across branches',
      ],
      provider: 'local',
    };
  }

  // 10. Fees, Costs, Deposits & Refunds
  if (
    query.includes('fee') ||
    query.includes('cost') ||
    query.includes('expense') ||
    query.includes('tuition') ||
    query.includes('caution money') ||
    query.includes('deposit') ||
    query.includes('refund') ||
    query.includes('installment')
  ) {
    return {
      content: `**Fee Structure & Financial Details for AIT Pune (Approximate Annual):**\n\n**1. College / Academic Fees:**\n- **Tuition & Development Fee:** Approximately **₹1,85,000 – ₹2,10,000 per year** (covers tuition, library access, laboratory facilities, autonomous exam fee, and university dues).\n\n**2. Hostel & Mess Charges:**\n- **Hostel Rent & Maintenance:** Approximately **₹40,000 – ₹45,000 per year**.\n- **Mess Charges:** Approximately **₹35,000 – ₹45,000 per year** (actual charges reconciled based on operating costs).\n- **Refundable Caution Deposit:** ~₹10,000 (one-time refundable security deposit at joining).\n\n**3. Mode of Payment:**\n- Remittance is done via online ERP portal through net banking, debit/credit cards, or NEFT/RTGS challans.\n\n**4. Refund Rules:**\n- Governed strictly by AICTE/UGC and AWES refund guidelines. If a candidate withdraws before the official cutoff date, fees are refunded after statutory administrative deductions as specified in the prospectus.`,
      sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
      suggestedFollowUps: [
        'What scholarships are available at AIT Pune?',
        'Can I get an education loan for AIT Pune?',
        'What is the deadline for fee payment?',
      ],
      provider: 'local',
    };
  }

  // 11. Scholarships & Financial Aid
  if (
    query.includes('scholarship') ||
    query.includes('pmss') ||
    query.includes('financial aid') ||
    query.includes('tata') ||
    query.includes('loan') ||
    query.includes('concession') ||
    query.includes('fee waiver')
  ) {
    return {
      content: `**Scholarships & Financial Assistance at AIT Pune:**\n\nAIT students have access to extensive central, defense, and institutional scholarships:\n\n1. **Prime Minister's Scholarship Scheme (PMSS):**\n   - Available for wards of Ex-Servicemen and Ex-Coast Guard personnel.\n   - Grant of **₹36,000/year for girls** and **₹30,000/year for boys** throughout the 4-year degree.\n\n2. **AWES Education Scholarships (ESSA):**\n   - Annual cash awards granted by Army Welfare Education Society based on academic merit in university examinations.\n\n3. **Ministry of Defence (MoD) Education Concessions:**\n   - Full fee concessions for children of Armed Forces personnel killed in action or disabled in combat.\n\n4. **Tata Merit Scholarships & Corporate Grants:**\n   - Merit-cum-means scholarships awarded to deserving engineering students.\n\n5. **AIT Alumni Endowments:**\n   - Over 15+ specialized scholarships founded by alumni batches for meritorious and financially needy cadets.\n\n6. **Education Loans:**\n   - SBI branch located right at Dighi offers pre-approved education loan packages under defense scholar schemes at subsidized interest rates.`,
      sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
      suggestedFollowUps: [
        'How do I apply for the PMSS scholarship at AIT?',
        'What are the college fees for the current academic year?',
        'Explain the documents required during physical reporting',
      ],
      provider: 'local',
    };
  }

  // 12. Student Clubs, Events & Extracurriculars
  if (
    query.includes('club') ||
    query.includes('event') ||
    query.includes('fest') ||
    query.includes('solutions') ||
    query.includes('pace') ||
    query.includes('aakriti') ||
    query.includes('osscube') ||
    query.includes('robotics club') ||
    query.includes('baja') ||
    query.includes('sports club')
  ) {
    return {
      content: `**Student Clubs, Technical Communities & Annual Fests at AIT Pune:**\n\nAIT boasts a thriving, student-led campus ecosystem with active technical, cultural, and sports clubs:\n\n**Technical & Coding Communities:**\n- **OssCube:** The premier Open Source Software club driving open-source contributions, hackathons, and Google Summer of Code (GSoC) mentorship.\n- **AIT Coding Club:** Organizes regular competitive programming contests on Codeforces/LeetCode and weekly algorithms sessions.\n- **Robotics Club & SAE BAJA Team:** Designs custom all-terrain vehicles (ATVs) and autonomous robots, regularly ranking in top spots nationally.\n- **IEEE & ACM Student Chapters:** Conducts technical workshops, expert guest lectures, and paper presentations.\n- **E-Cell (Entrepreneurship Cell):** Cultivates student startups, pitch competitions, and angel funding connections.\n\n**Annual Flagship Festivals:**\n1. **Solutions:** National-level annual technical symposium featuring hackathons, coding sprints, robotics battles, and gaming tournaments.\n2. **Pace:** High-energy inter-college sports festival drawing teams from across Western India for cricket, football, basketball, and athletics.\n3. **Aakriti:** Vibrant multi-day cultural fest celebrating music, dance, theatre, fashion, and literary arts.`,
      sources: [OFFICIAL_SOURCES[1], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'Tell me about the hostel life and campus environment',
        'What are the placement opportunities from student clubs?',
        'What are the cutoffs for Computer Engineering?',
      ],
      provider: 'local',
    };
  }

  // 13. Navy and Air Force Wards
  if (query.includes('navy') || query.includes('air force') || query.includes('airforce') || query.includes('iaf')) {
    return {
      content: `**Eligibility for Children of Indian Navy and Air Force Personnel:**\n\nYes, wards of Indian Navy and Indian Air Force personnel are eligible under designated reciprocal quota arrangements:\n\n1. **Eligible Categories:**\n   - Children of Navy/Air Force personnel who have served on active attachment with the Indian Army for a specified duration.\n   - Children of Navy/Air Force personnel under the mutual reciprocity arrangement between AWES, NES (Navy Education Society), and IAFBA.\n2. **Mandatory Documentation:** Official service certificate signed by the respective service headquarters / Record Office certifying the relationship and qualifying criteria.\n3. **Merit List:** Separate merit rankings are generated for Navy and Air Force applicants based on their JEE (Main) All India Rank (CRL).\n\n*Refer directly to Section 3 of the AIT Pune Prospectus for the precise reciprocal seat breakdown.*`,
      sources: [OFFICIAL_SOURCES[3], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'How many reciprocal seats are allocated for Navy/Air Force?',
        'How do I register on the AIT ERP portal?',
        'What documents must I prepare for verification?',
      ],
      provider: 'local',
    };
  }

  // 14. Documents Checklist & Form P1 to P4
  if (
    query.includes('document') ||
    query.includes('certificate') ||
    query.includes('checklist') ||
    query.includes('form') ||
    query.includes('verification') ||
    query.includes('affidavit') ||
    query.includes('tc') ||
    query.includes('migration')
  ) {
    return {
      content: `**Mandatory Document Checklist for AIT Pune Admission:**\n\nEnsure you have original and attested copies of these documents ready:\n\n**1. Category & Defense Relationship Certificates (Mandatory):**\n- **Form P1:** For children of Serving Army personnel (signed by CO/OC Unit with round stamp).\n- **Form P2:** For children of Ex-Servicemen (signed by ZSWO / Record Office) + Discharge Book + PPO.\n- **Form P3:** For Gallantry Award winners / Battle Casualties.\n- **Form P4:** For disabled personnel or special cases.\n\n**2. Academic Credentials:**\n- Class 10 (SSC) Marksheet & Passing Certificate (Age proof).\n- Class 12 (HSC) Marksheet & Passing Certificate (PCM aggregate ≥ 50%).\n- School Leaving / Transfer Certificate (TC) & Migration Certificate.\n- Gap Certificate affidavit (on stamp paper, if taking a drop year).\n\n**3. Entrance Examination Proof:**\n- NTA JEE (Main) Admit Card & Official Scorecard showing All India Rank (CRL).\n\n**4. Identity & Medical Fitness:**\n- Domicile / Nationality Certificate or Indian Passport.\n- Medical Fitness Certificate signed by a registered medical practitioner in the prescribed format.`,
      sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[3]],
      suggestedFollowUps: [
        'Where can I download the Form P1 format?',
        'What is the gap certificate format?',
        'Explain the online ERP registration steps',
      ],
      provider: 'local',
    };
  }

  // 15. Leadership, Administration & How to Contact
  if (
    query.includes('director') ||
    query.includes('principal') ||
    query.includes('contact') ||
    query.includes('address') ||
    query.includes('location') ||
    query.includes('phone') ||
    query.includes('email') ||
    query.includes('reach') ||
    query.includes('where is ait')
  ) {
    return {
      content: `**AIT Pune Leadership, Location & Contact Details:**\n\n**Key Institutional Leadership:**\n- **Director:** Maj Gen Uday Shankar Sengupta (Retd)\n- **Principal:** Dr. B.P. Patil\n- **Affiliating University:** Savitribai Phule Pune University (SPPU)\n- **Governing Body:** Army Welfare Education Society (AWES), New Delhi\n\n**Campus Address:**\n- Army Institute of Technology (AIT), Dighi Hills, Alandi Road, Pune - 411015, Maharashtra, India.\n\n**How to Reach:**\n- **From Pune Railway Station:** ~12 km (approx 30–40 mins by cab/auto).\n- **From Pune International Airport (Lohegaon):** ~8 km (approx 20 mins).\n- Located conveniently along the Alandi Road with regular PMPML bus services connecting to Shivajinagar and Pune Station.\n\n**Official Helplines:**\n- **Admissions Office:** 020-27157534 / 020-27157612\n- **Email:** ait@aitpune.edu.in | admissions@aitpune.edu.in\n- **Website:** https://www.aitpune.com`,
      sources: [OFFICIAL_SOURCES[1], OFFICIAL_SOURCES[0]],
      suggestedFollowUps: [
        'What are the visiting hours for the admissions office?',
        'What are the hostel and mess facilities at AIT?',
        'What engineering branches are offered at AIT Pune?',
      ],
      provider: 'local',
    };
  }

  // 16. Comprehensive Open Fallback (Synthesizes facts for any question)
  return {
    content: `**Guidance from Monday (AIT Pune Assistant):**\n\nRegarding your query about **"${userQuery}"**:\n\n- **Official Institutional Rule:** AIT Pune operates strictly under the **Army Welfare Education Society (AWES)** and **Savitribai Phule Pune University (SPPU)** as an **Autonomous Engineering College**.\n- **Undergraduate Admissions:** 100% based on All India Rank (CRL) in NTA JEE (Main) Paper 1 across 5 branches (Computer, IT, E&TC, Mechanical, and Automation & Robotics).\n- **Exclusivity:** Only children and wards of eligible Armed Forces personnel (Army, Navy, Air Force) are eligible; general civilian admissions are not accepted.\n- **Campus & Career:** 100% residential for First Year students in Dighi Hills, Pune, featuring modern hostels, ₹52+ LPA highest placement record, and robust technical clubs like OssCube.\n\nIf you have a specific question about cutoff ranks, Form P1–P4 certificates, autonomous curriculum, hostel facilities, or fees, let me know and I will give you the exact breakdown!`,
    sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
    suggestedFollowUps: [
      'Am I eligible to apply to AIT Pune?',
      'What are the JEE Main cutoff ranks for each branch?',
      'Tell me about AIT Pune placements and recruiters',
      'What documents and certificates are required?',
    ],
    provider: 'local',
  };
}

// Keep backwards-compatible alias for any legacy imports
export const generateAstraResponse = generateMondayResponse;
