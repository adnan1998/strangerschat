// Content filtering system for AdSense compliance
// Blocks sexual, dating, adult, and abusive content

export const BANNED_WORDS = [
  // Adult/Sexual content
  'sex', 'sexy', 'porn', 'nude', 'naked', 'nsfw', 'adult', 'xxx', 'erotic', 'horny',
  'fuck', 'fucking', 'shit', 'damn', 'bitch', 'ass', 'dick', 'cock', 'pussy', 'boobs',
  'tits', 'penis', 'vagina', 'masturbate', 'orgasm', 'cum', 'cumming', 'suck', 'blow',
  
  // Dating related
  'dating', 'hookup', 'hook up', 'one night', 'fwb', 'friends with benefits', 'tinder',
  'match', 'swipe', 'date me',
  'nudes', 'send pics', 'selfie', 'snap', 'snapchat',
  
  // Abusive/Harassment
  'kill yourself', 'kys', 'die', 'suicide', 'hurt yourself', 'abuse', 'rape', 'assault',
  'harass', 'stalk', 'threaten', 'violence', 'hate', 'racist', 'nazi', 'terrorist',
  
  // Slurs and offensive terms
  'nigger', 'faggot', 'retard', 'whore', 'slut', 'cunt', 'motherfucker', 'asshole',
  'bastard', 'prick', 'douche', 'bimbo', 'skank', 'hoe', 'thot',
  
  // Drug related
  'drugs', 'weed', 'cocaine', 'heroin', 'meth', 'cannabis', 'marijuana', 'high',
  'dealer', 'selling drugs', 'buy drugs', 'smoke weed',
  
  // Contact exchange attempts
  'instagram', 'insta', 'facebook', 'twitter', 'discord', 'kik', 'telegram', 'whatsapp',
  'phone number', 'call me', 'text me', 'email', 'contact', 'meet up', 'meet irl',
  
  // Age-related concerns
  'under 18', 'minor', 'kid', 'child', 'teen', 'young', 'school girl', 'school boy',
  'daddy', 'sugar daddy', 'mommy', 'age gap'
];

export const BANNED_USERNAME_WORDS = [
  // Sexual/Adult usernames
  'sexy', 'hot', 'nude', 'naked', 'porn', 'xxx', 'adult', 'nsfw', 'horny', 'kinky',
  'daddy', 'mommy','slave', 'bdsm', 'fetish',
  'cock', 'dick', 'pussy', 'boobs', 'tits', 'ass', 'penis', 'vagina',
  
  // Dating related usernames
  'date', 'hookup',
  
  // Offensive usernames
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'damn', 'hell', 'crap',
  'stupid', 'idiot', 'moron', 'retard', 'gay', 'lesbian', 'trans',
  
  // Slurs and hate speech
  'nigger', 'faggot', 'nazi', 'hitler', 'terrorist', 'racist', 'sexist',
  'homophobe', 'bigot', 'supremacist', 'kkk', 'jihad',
  
  // Age/Minor related
  'teen', 'young', 'kid', 'child', 'minor', 'baby', 'little', 'cute',
  'school', 'college', 'university', 'student'
];

// Username filter function
export function isUsernameAllowed(username: string): { allowed: boolean; reason?: string } {
  const cleanUsername = username.toLowerCase().trim();
  
  // Check for empty or too short usernames
  if (!cleanUsername || cleanUsername.length < 3) {
    return { allowed: false, reason: 'Username must be at least 3 characters long.' };
  }
  
  // Check for too long usernames
  if (cleanUsername.length > 20) {
    return { allowed: false, reason: 'Username must be 20 characters or less.' };
  }
  
  // Check for banned words
  for (const word of BANNED_USERNAME_WORDS) {
    if (cleanUsername.includes(word.toLowerCase())) {
      return { allowed: false, reason: 'Your username contains words that are not allowed.' };
    }
  }
  
  // Check for numbers that might indicate age
  const agePattern = /\b(1[4-7]|[1-9])\b/; // Ages 14-17 or single digits
  if (agePattern.test(cleanUsername)) {
    return { allowed: false, reason: 'Usernames cannot contain age numbers.' };
  }
  
  // Check for contact information patterns
  const contactPatterns = [
    /\b\d{10,}\b/, // Phone numbers
    /\w+@\w+\.\w+/, // Email addresses
    /@\w+/, // Social media handles
  ];
  
  for (const pattern of contactPatterns) {
    if (pattern.test(cleanUsername)) {
      return { allowed: false, reason: 'Usernames cannot contain contact information.' };
    }
  }
  
  return { allowed: true };
}

// Smart word censoring function
function censorWord(word: string): string {
  if (word.length <= 2) return word;
  if (word.length === 3) return word[0] + '*' + word[2];
  
  // For longer words, keep first and last letter, replace middle with asterisks
  const firstLetter = word[0];
  const lastLetter = word[word.length - 1];
  const middleLength = word.length - 2;
  const asterisks = '*'.repeat(middleLength);
  
  return firstLetter + asterisks + lastLetter;
}

// Enhanced message filter with smart censoring
export function filterMessage(message: string): { 
  filteredMessage: string; 
  wasFiltered: boolean; 
  allowed: boolean; 
  reason?: string;
} {
  const originalMessage = message.trim();
  let filteredMessage = originalMessage;
  let wasFiltered = false;
  
  // Check for empty messages
  if (!originalMessage) {
    return { filteredMessage: '', wasFiltered: false, allowed: false, reason: 'Message cannot be empty.' };
  }
  
  // Words that should be completely blocked (severe violations)
  const severeViolations = [
    // Contact sharing attempts
    /\b\d{10,}\b/, // Phone numbers
    /\w+@\w+\.\w+/, // Email addresses
    /@\w+/, // Social media handles
    /discord\.gg\/\w+/, // Discord invites
    /\b(insta|ig|snap|fb|twitter|tiktok)\b.*\w+/, // Social media with username
  ];
  
  for (const pattern of severeViolations) {
    if (pattern.test(filteredMessage.toLowerCase())) {
      return { filteredMessage: '', wasFiltered: false, allowed: false, reason: 'Sharing contact information is not allowed.' };
    }
  }
  
  // Words that should be censored but message allowed
  const censorableWords = [
    // Profanity (less severe)
    'fuck', 'fucking', 'fucked', 'shit', 'damn', 'bitch', 'ass', 'bastard', 'crap',
    'piss', 'pissed', 'hell', 'bloody', 'dammit', 'goddamn', 'wtf',
    
    // Mild sexual terms (censor but allow)
    'sexy', 'hot', 'horny', 'boobs', 'tits', 'butt', 
  ];
  
  // Words that should be completely blocked (severe)
  const blockedWords = [
    // Severe sexual/adult content
    'porn', 'nude', 'naked', 'nsfw', 'adult', 'xxx', 'erotic',
    'cock', 'dick', 'pussy', 'penis', 'vagina', 'masturbate', 'orgasm', 'cum', 'cumming',
    
    // Dating/hookup attempts
    'dating', 'hookup', 'hook up', 'one night', 'fwb', 'friends with benefits', 'tinder',
    'nudes', 'send pics', 'selfie', 'photo', 'picture', 'snap', 'snapchat',
    'date me', 'single', 'relationship', 'boyfriend', 'girlfriend',
    
    // Harassment/violence
    'kill yourself', 'kys', 'die', 'suicide', 'hurt yourself', 'abuse', 'rape', 'assault',
    'harass', 'stalk', 'threaten', 'violence',
    
    // Slurs and severe offensive terms
    'nigger', 'faggot', 'retard', 'whore', 'slut', 'cunt', 'nazi', 'terrorist',
    
    // Drug related
    'drugs', 'weed', 'cocaine', 'heroin', 'meth', 'cannabis', 'marijuana',
    'dealer', 'selling drugs', 'buy drugs',
    
    // Age-related concerns
    'under 18', 'minor', 'kid', 'child', 'teen', 'young', 'daddy', 'mommy'
  ];
  
  // Check for words that should block the message completely
  for (const word of blockedWords) {
    if (filteredMessage.toLowerCase().includes(word.toLowerCase())) {
      return { filteredMessage: '', wasFiltered: false, allowed: false, reason: 'This message violates our content rules.' };
    }
  }
  
  // Censor mild profanity but allow the message
  for (const word of censorableWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(filteredMessage)) {
      filteredMessage = filteredMessage.replace(regex, (match) => censorWord(match));
      wasFiltered = true;
    }
  }
  
  // Check for excessive caps
  const capsRatio = (filteredMessage.match(/[A-Z]/g) || []).length / filteredMessage.length;
  if (filteredMessage.length > 10 && capsRatio > 0.7) {
    return { filteredMessage: '', wasFiltered: false, allowed: false, reason: 'Please avoid excessive capital letters.' };
  }
  
  // Check for repeated characters
  const repeatedPattern = /(.)\1{4,}/;
  if (repeatedPattern.test(filteredMessage)) {
    return { filteredMessage: '', wasFiltered: false, allowed: false, reason: 'Please avoid repeating characters excessively.' };
  }
  
  return { filteredMessage, wasFiltered, allowed: true };
}

// Legacy function for backward compatibility
export function isMessageAllowed(message: string): { allowed: boolean; reason?: string } {
  const result = filterMessage(message);
  return { allowed: result.allowed, reason: result.reason };
}

// Chat room definitions
export const CHAT_ROOMS = [
  // Global room (default)
  { 
    id: 'global', 
    name: 'Global Lobby', 
    icon: '🌍', 
    description: 'Chat with people from around the world',
    category: 'global',
    isDefault: true
  },
  
  // Regional rooms
  { 
    id: 'india', 
    name: 'India Chat', 
    icon: '🇮🇳', 
    description: 'Connect with people from India',
    category: 'regional'
  },
  { 
    id: 'usa', 
    name: 'USA Chat', 
    icon: '🇺🇸', 
    description: 'Chat with people from United States',
    category: 'regional'
  },
  { 
    id: 'uk', 
    name: 'UK Chat', 
    icon: '🇬🇧', 
    description: 'Connect with people from United Kingdom',
    category: 'regional'
  },
  { 
    id: 'canada', 
    name: 'Canada Chat', 
    icon: '🇨🇦', 
    description: 'Chat with people from Canada',
    category: 'regional'
  },
  
  // Interest-based rooms
  { 
    id: 'books', 
    name: 'Books & Reading', 
    icon: '📚', 
    description: 'Discuss books, literature, and reading',
    category: 'interests'
  },
  { 
    id: 'gaming', 
    name: 'Gaming', 
    icon: '🎮', 
    description: 'Talk about games, gaming, and esports',
    category: 'interests'
  },
  { 
    id: 'movies', 
    name: 'Movies & TV', 
    icon: '🎬', 
    description: 'Discuss movies, TV shows, and entertainment',
    category: 'interests'
  },
  { 
    id: 'music', 
    name: 'Music', 
    icon: '🎵', 
    description: 'Share and discuss music of all genres',
    category: 'interests'
  },
  { 
    id: 'technology', 
    name: 'Technology', 
    icon: '💻', 
    description: 'Tech talks, gadgets, and innovation',
    category: 'interests'
  },
  { 
    id: 'sports', 
    name: 'Sports', 
    icon: '⚽', 
    description: 'Sports discussions and fitness talks',
    category: 'interests'
  },
  { 
    id: 'food', 
    name: 'Food & Cooking', 
    icon: '🍕', 
    description: 'Share recipes and food experiences',
    category: 'interests'
  }
];

// Group rooms by category for UI display
export const ROOM_CATEGORIES = {
  global: CHAT_ROOMS.filter(room => room.category === 'global'),
  regional: CHAT_ROOMS.filter(room => room.category === 'regional'),
  interests: CHAT_ROOMS.filter(room => room.category === 'interests')
};

// Get room by ID
export function getRoomById(roomId: string) {
  return CHAT_ROOMS.find(room => room.id === roomId);
}

// Get default room
export function getDefaultRoom() {
  return CHAT_ROOMS.find(room => room.isDefault) || CHAT_ROOMS[0];
}