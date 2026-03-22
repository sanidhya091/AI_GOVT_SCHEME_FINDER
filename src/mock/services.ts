import { mockUserProfile, mockSchemes, type UserProfile, type Scheme } from "./schemes";

// TODO: replace with POST /api/extract when backend is ready
export async function extractUserProfile(_message: string): Promise<UserProfile> {
  // Simulates AI entity extraction from natural language
  await delay(800);
  return mockUserProfile;
}

// TODO: replace with GET /api/schemes when backend is ready
export async function getEligibleSchemes(_profile: UserProfile): Promise<Scheme[]> {
  // Simulates eligibility engine matching
  await delay(1500);
  return mockSchemes.sort((a, b) => b.match_strength - a.match_strength);
}

// TODO: replace with POST /api/chat when backend is ready
export async function getBotResponse(_userMessage: string, _conversationStep: number): Promise<string> {
  await delay(600);
  // Mock responses handled by the chat component directly
  return "";
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
