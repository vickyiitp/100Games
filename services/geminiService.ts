// This is a MOCK service. In a real application, you would import and use the @google/genai library here.
// import { GoogleGenAI } from "@google/genai";

// Mock implementation
const MOCK_DESCRIPTIONS: { [key: string]: string } = {
  // Existing
  "NeuroMatch": "Sharpen your visual memory by matching evolving patterns against the clock. A true test of recall and focus.",
  "Logic Grid": "Solve complex logic puzzles by placing nodes on a grid. Each level adds a new rule to challenge your reasoning.",
  "Rhythm Flow": "Tap in sync with cascading neon lights and electronic beats. Miss a beat and the flow breaks!",
  "Creative Canvas": "Unleash your imagination by connecting abstract shapes to form a unique masterpiece based on a simple prompt.",
  "Spatial Shift": "Rotate and flip 3D objects to match a target silhouette. This game will twist your spatial reasoning skills.",
  "Synonym Scramble": "Decode scrambled words to find their synonyms. A fast-paced challenge for vocabulary masters.",
  "Focus Follower": "Keep your cursor on a rapidly moving, shrinking path. One slip and you have to start over.",
  "Decision Dash": "Make split-second choices in branching scenarios. Every decision impacts your path and final score.",
  "Emoji EQ": "Interpret subtle emoji expressions to gauge emotional states. A fun way to boost your emotional intelligence.",
  "PatternMind": "Identify the missing piece in a complex sequence of abstract patterns. Think visually, think fast.",
  "Memory Palace": "Construct a mental palace to remember long sequences of objects. A classic technique turned into a game.",
  "Idea Fusion": "Combine two unrelated concepts to generate innovative ideas. Your creativity is the only limit.",
  "Quick Tap": "Hit targets as they appear, but avoid the decoys. A pure test of your reaction speed.",
  "Strategic Ascent": "Manage resources and make long-term plans to build the tallest tower. One wrong move can be fatal.",
  "Distraction Dodge": "Complete a simple task while bombarded with visual and auditory distractions. Master the art of single-tasking.",

  // IQ Boosters
  "Code Breaker": "Deduce the secret code through logic and elimination. Each guess provides clues to hone your next move.",
  "Sequence Solver": "Find the next item in a challenging series of numbers, shapes, or concepts. A pure test of pattern recognition.",
  "Logic Gates": "Master the fundamentals of digital logic by wiring up circuits to produce a target output. It's electrifying!",
  "Analogy Ace": "Complete the analogy by finding the relationship between concepts. A workout for your verbal reasoning skills.",
  "Number Ninja": "Solve complex arithmetic and logic puzzles with numbers at lightning speed. Become a mathematical master.",
  "Shape Shifter": "Determine which shape logically comes next in a transforming sequence. A challenge of mental rotation and foresight.",
  "Deduction Den": "Use a series of clues to solve a mystery. Who did it? Only pure logic will reveal the truth.",
  "Abstract Flow": "Connect nodes based on a set of abstract rules that change with every level. Go with the logical flow.",
  "Rule Finder": "Observe interactions and deduce the hidden rules of the system. A game of scientific thinking and discovery.",
  "Critical Path": "Find the most efficient path through a network of nodes, optimizing for time and resources. A logistics challenge.",

  // Creativity Sparks
  "Story Spinner": "Weave a compelling narrative from a given set of random words or images. Every game is a new tale.",
  "Metaphor Mix": "Create insightful metaphors by linking seemingly unrelated ideas. A game to spark innovative thinking.",
  "Drawing Duel": "Challenge others or an AI to a timed drawing competition based on a creative prompt. Sketch fast!",
  "Invention Box": "Combine everyday objects in novel ways to solve a specific problem. Think like an inventor.",
  "Lyric Lab": "Craft verses for a song based on a given theme and rhyming scheme. Unleash your inner songwriter.",
  "Sculpt Sphere": "Mold a digital sphere of clay into a masterpiece based on an abstract concept. No prior art skills needed.",
  "Prompt Painter": "Generate a unique piece of art based on a descriptive text prompt. Your words are the brush.",
  "Debate Dynamo": "Formulate a convincing argument for a given topic in a limited time. Sharpen your persuasive skills.",
  "Remix Reality": "Combine and alter images and sounds to create a surreal and unique audio-visual experience.",
  "Brand Builder": "Create a compelling brand identity, from logo to tagline, for a fictional company. A test of creative strategy.",

  // Timing & Reflex
  "Beat Drop": "Tap the screen at the exact moment the beat drops. A test of rhythm and perfect timing.",
  "Target Dash": "Hit targets as they appear on screen as fast as possible. Simple, addictive, and tests pure reflex speed.",
  "Signal Catcher": "Respond to specific audio or visual signals while ignoring distractors. A true test of reaction time.",
  "Drift Dodge": "Navigate a high-speed vehicle through an obstacle course. One wrong move and you're out.",
  "Chrono Stopper": "Try to stop a high-speed timer at exactly the target millisecond. A maddeningly precise challenge.",
  "Reflex Ring": "A circle of lights will flash; hit the correct one before it fades. How fast are your eyes and hands?",
  "Pulse Pounder": "Keep a rhythm going by tapping in time with a progressively faster pulse. Don't lose the beat!",
  "Sequence Speed": "Memorize a sequence of taps and then replicate it as fast as you can. A blend of memory and reflex.",
  "Glitch Guardian": "Prevent system errors by reacting to visual 'glitches' on the screen before they cause a crash.",
  "Ricochet Riot": "Predict the trajectory of ricocheting objects and intercept them at the right moment. A chaotic physics challenge.",

  // Working Memory
  "Grid Recall": "Memorize the pattern of highlighted squares on a grid, then recall it. The grid grows with your skill.",
  "Audio Echo": "Listen to a sequence of sounds and repeat them back in the correct order. A test for your auditory memory.",
  "Path Painter": "Watch a path being drawn, then re-trace it from memory. The paths become longer and more complex.",
  "Card Flip Classic": "The timeless game of matching pairs. Clear the board in as few moves as possible.",
  "N-Back Pro": "Track items in a sequence and identify when one repeats from 'N' steps back. A serious memory workout.",
  "Object Order": "Memorize a series of objects and then list them in the correct order. How many can you hold in mind?",
  "Symbol Span": "Test your short-term memory's capacity by recalling an ever-lengthening sequence of abstract symbols.",
  "Shopping List": "Memorize a grocery list and then pick the items off the shelves. Don't forget the milk!",
  "Location Link": "Remember the location of various items on the screen, which are then hidden. A test of spatial memory.",
  "Face File": "Memorize a set of faces and their names, then correctly identify them. A great social memory booster.",
  
  // Language & Wordplay
  "Word Weaver": "Form as many words as you can from a grid of letters before the timer runs out.",
  "Idiom Decoder": "Guess the common idiom from a literal visual representation. A fun and quirky language puzzle.",
  "Antonym Attack": "Quickly find the opposite of a given word. A fast-paced vocabulary challenge.",
  "Grammar Guardian": "Correct grammatical errors in sentences before they're published. The last line of defense for language!",
  "Word Ladder": "Change one word into another by altering one letter at a time, with each step being a valid word.",
  "Crossword Quest": "A modern take on the classic crossword puzzle, with dynamic clues and adaptive difficulty.",
  "Typing Titan": "Test your typing speed and accuracy with a variety of challenging and fun texts.",
  "Proverb Puzzle": "Complete well-known proverbs that have words missing. A test of cultural and linguistic knowledge.",
  "Definition Detective": "Match the word to its correct, and often obscure, definition. For the true logophile.",
  "Anagram Hunt": "Unscramble the letters to find the hidden word. A classic puzzle for all ages.",

  // Emotional Intelligence
  "Tone Interpreter": "Read a piece of text and determine the emotional tone of the writer. A test of digital empathy.",
  "Microexpression Match": "Identify fleeting facial expressions in a split second. Can you spot a fake smile?",
  "Empathy Exam": "Read a short story about a person's situation and choose the most empathetic response.",
  "Social Scenario": "Navigate tricky social situations by choosing the best course of action. A simulation for real life.",
  "Lie Detector": "Watch video clips of people speaking and use their verbal and non-verbal cues to spot the liar.",
  "Mood Matrix": "Categorize a collage of images and sounds by the primary emotion they evoke.",
  "Perspective Shift": "Re-write a short story from another character's point of view to understand their motivations.",
  "Active Listener": "Listen to a person's story and then answer questions about the key details and emotions they conveyed.",
  "Body Language Blitz": "Quickly interpret the meaning of various poses and gestures in this rapid-fire EQ challenge.",
  "Conflict Resolution": "Mediate a dispute between two characters by finding a fair and empathetic solution.",

  // Focus & Attention
  "Line Follower": "Use your mouse or finger to trace a complex, winding path without touching the edges. A test of fine motor control.",
  "Color Filter": "Identify and click on objects of a specific color while ignoring all others, with colors rapidly changing.",
  "Attention Shift": "Quickly switch your focus between two different tasks based on a changing command cue.",
  "Auditory Ace": "Focus on a specific sound or voice amidst a cacophony of distracting background noises.",
  "Stroop Test Turbo": "A high-speed version of the classic test: read the word, not the color it's written in. A brain-bender!",
  "Zen Zone": "Maintain your focus on a single, calming visual for as long as possible while gentle distractions appear.",
  "Number Hunt": "Quickly find and click on numbers in sequential order as they are scattered among other symbols.",
  "Task Juggler": "Manage multiple simple tasks at once, ensuring none of them fail. A true test of divided attention.",
  
  // Decision Making
  "Scenario Branch": "Navigate a branching narrative where your choices have real consequences on the outcome.",
  "Risk Reward": "Make high-stakes decisions under pressure. Play it safe or risk it all for a big payoff?",
  "Judgment Timer": "Make a binary choice on a complex issue before the timer runs out. Train your intuitive decision-making.",
  "Priority Planner": "Organize a list of tasks by importance and urgency to achieve the best possible outcome.",
  "Ethical Engine": "Face complex moral dilemmas with no easy answers. Your choices define your character.",
  "Investment Sim": "Play the stock market with virtual money. Analyze trends and make smart investments to grow your portfolio.",
  "Rapid Response": "Choose the correct action in a series of fast-paced, emergency-style scenarios.",
  "Negotiation Node": "Engage in a conversation with an AI and negotiate the best possible deal through dialogue choices.",

  // Visual Logic
  "Spot the Pattern": "Analyze a complex visual field and identify the repeating pattern or the element that doesn't fit.",
  "Image Logic": "Determine the relationship between a series of images and choose the one that completes the sequence.",
  "Match Rotations": "Mentally rotate a 3D object to match its silhouette from a different angle. A tough spatial challenge.",
  "Symmetry Master": "Complete an intricate pattern by mirroring it perfectly across one or more axes of symmetry.",
  "Perspective Puzzle": "View a scene from multiple angles to understand its true structure and solve the puzzle.",
  "Find the Difference": "The classic game of spotting the subtle differences between two otherwise identical images.",
  "Color Code": "Deduce the secret color sequence based on clues provided after each guess. A visual Mastermind.",
  "Assembly Line": "Organize a series of operational steps in the correct visual order to build a product.",
  "Shadow Match": "Match an object to its correct shadow, which may be distorted by angle and light source.",

  // Strategy & Planning
  "Multi-Step Maze": "See the entire maze at once, but you must input all your moves before you start. Plan your path carefully.",
  "Resource Router": "Manage a network of resources, routing power, water, and data efficiently to where they are needed most.",
  "Tower Tactics": "A minimalist tower defense game that requires careful planning of placement and upgrades.",
  "Supply Chain": "Optimize a complex supply chain from raw materials to finished product. A game of logistics and foresight.",
  "Hex Grid Hero": "A turn-based strategy game on a hex grid. Outmaneuver your opponent with superior tactics.",
  "Diplomacy Duel": "Form alliances, break treaties, and outwit your opponents in this game of political strategy.",
  "Civ Builder": "A fast-paced civilization-building game where every decision shapes your nation's future.",
  "Fleet Commander": "Design your fleet and command it in battle. The right strategy is more powerful than the biggest ship.",
};


export const generateGameDescription = async (gameName: string): Promise<string> => {
  console.log(`Fetching description for ${gameName}... (mocked)`);
  
  // In a real app, this would be an API call to Gemini
  // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // const response = await ai.models.generateContent({
  //   model: 'gemini-2.5-flash',
  //   contents: `Generate a short, exciting, one-sentence description for a brain-training game called "${gameName}".`
  // });
  // return response.text;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_DESCRIPTIONS[gameName] || "An exciting game to challenge your mind and boost your skills.");
    }, 500 + Math.random() * 500); // Simulate network delay
  });
};
