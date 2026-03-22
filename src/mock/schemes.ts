export interface Scheme {
  id: number;
  name: string;
  description: string;
  state: string;
  scheme_type: "central" | "state";
  eligibility_reason: string;
  apply_steps: string[];
  application_link: string;
  match_strength: number; // 0-100
}

export interface UserProfile {
  age: number;
  state: string;
  income: number;
  occupation: string;
  category: string;
  gender: string;
  disability: boolean;
}

export const mockUserProfile: UserProfile = {
  age: 22,
  state: "Maharashtra",
  income: 200000,
  occupation: "student",
  category: "OBC",
  gender: "male",
  disability: false,
};

export const mockSchemes: Scheme[] = [
  {
    id: 1,
    name: "Rajarshi Shahu Maharaj Scholarship",
    description: "Scholarship for OBC students in Maharashtra pursuing higher education with full tuition fee coverage.",
    state: "Maharashtra",
    scheme_type: "state",
    eligibility_reason: "You qualify because you are an OBC student under 30 with family income below ₹8 lakh.",
    match_strength: 95,
    apply_steps: [
      "Visit the MahaEschol portal",
      "Register with your Aadhaar number",
      "Upload income and caste certificate",
      "Submit application before the deadline",
    ],
    application_link: "https://mahaeschol.maharashtra.gov.in",
  },
  {
    id: 2,
    name: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to small and marginal farmer families across India.",
    state: "All India",
    scheme_type: "central",
    eligibility_reason: "Your family income of ₹2,00,000 makes you eligible for this central scheme.",
    match_strength: 82,
    apply_steps: [
      "Visit the PM-KISAN portal",
      "Click on 'New Farmer Registration'",
      "Enter Aadhaar, bank, and land details",
      "Submit and note your registration number",
    ],
    application_link: "https://pmkisan.gov.in",
  },
  {
    id: 3,
    name: "National Scholarship Portal — Post-Matric",
    description: "Central scholarship for post-matric students from OBC, SC, ST, and minority communities.",
    state: "All India",
    scheme_type: "central",
    eligibility_reason: "As an OBC student aged 22 with income below ₹2.5 lakh, you meet all criteria.",
    match_strength: 90,
    apply_steps: [
      "Register on the National Scholarship Portal",
      "Select 'Post-Matric Scholarship for OBC'",
      "Fill in academic and income details",
      "Upload required documents and submit",
    ],
    application_link: "https://scholarships.gov.in",
  },
  {
    id: 4,
    name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    description: "Free health insurance up to ₹1.5 lakh for families with annual income below ₹1 lakh in Maharashtra.",
    state: "Maharashtra",
    scheme_type: "state",
    eligibility_reason: "Your state is Maharashtra and your family income qualifies for this health coverage scheme.",
    match_strength: 68,
    apply_steps: [
      "Visit the nearest government hospital",
      "Carry your yellow/orange ration card",
      "Show Aadhaar for identity verification",
      "Get enrolled at the Arogya Mitra counter",
    ],
    application_link: "https://www.jeevandayee.gov.in",
  },
  {
    id: 5,
    name: "PMEGP — Employment Generation Programme",
    description: "Financial assistance for setting up micro-enterprises with subsidies up to 35% of project cost.",
    state: "All India",
    scheme_type: "central",
    eligibility_reason: "As a young person above 18, you're eligible to apply for a micro-enterprise subsidy.",
    match_strength: 55,
    apply_steps: [
      "Visit the PMEGP e-portal",
      "Register and fill the online application",
      "Submit your project report",
      "Await approval from the District Task Force",
    ],
    application_link: "https://www.kviconline.gov.in/pmegpeportal",
  },
];
