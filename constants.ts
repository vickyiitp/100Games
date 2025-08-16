
import { Game, GameCategory, Difficulty, TimeRequirement, GameArchetype } from './types';

export const CATEGORIES: GameCategory[] = [
  GameCategory.ALL,
  GameCategory.IQ,
  GameCategory.MEMORY,
  GameCategory.TIMING,
  GameCategory.CREATIVITY,
  GameCategory.FOCUS,
  GameCategory.STRATEGY,
  GameCategory.VISUAL,
  GameCategory.LANGUAGE,
  GameCategory.EQ,
  GameCategory.DECISION,
];

export const GAMES: Game[] = [
  // Existing Games
  { id: 1, name: "NeuroMatch", categories: [GameCategory.MEMORY, GameCategory.FOCUS], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 120, archetype: GameArchetype.MEMORY_MATCH, isFeatured: true },
  { id: 2, name: "Logic Grid", categories: [GameCategory.IQ, GameCategory.STRATEGY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.LOGIC_GRID },
  { id: 3, name: "Rhythm Flow", categories: [GameCategory.TIMING, GameCategory.FOCUS], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.UNDER_2, levelCount: 180, archetype: GameArchetype.TIMING_RHYTHM, isFeatured: true },
  { id: 4, name: "Creative Canvas", categories: [GameCategory.CREATIVITY, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 5, name: "Spatial Shift", categories: [GameCategory.VISUAL, GameCategory.IQ], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 200, archetype: GameArchetype.SPATIAL_ROTATION, isFeatured: true },
  { id: 6, name: "Synonym Scramble", categories: [GameCategory.LANGUAGE, GameCategory.IQ], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 130, archetype: GameArchetype.WORD_SCRAMBLE },
  { id: 7, name: "Focus Follower", categories: [GameCategory.FOCUS, GameCategory.TIMING], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 110, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 8, name: "Decision Dash", categories: [GameCategory.DECISION, GameCategory.STRATEGY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 160, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 9, name: "Emoji EQ", categories: [GameCategory.EQ, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 100, archetype: GameArchetype.LANGUAGE_VOCAB, isFeatured: true },
  { id: 10, name: "PatternMind", categories: [GameCategory.IQ, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 140, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 11, name: "Memory Palace", categories: [GameCategory.MEMORY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 220, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 12, name: "Idea Fusion", categories: [GameCategory.CREATIVITY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 13, name: "Quick Tap", categories: [GameCategory.TIMING, GameCategory.FOCUS], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 250, archetype: GameArchetype.REFLEX_TAP },
  { id: 14, name: "Strategic Ascent", categories: [GameCategory.STRATEGY, GameCategory.DECISION], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 180, archetype: GameArchetype.STRATEGY_RESOURCE },
  { id: 15, name: "Distraction Dodge", categories: [GameCategory.FOCUS, GameCategory.TIMING], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 170, archetype: GameArchetype.FOCUS_ATTENTION },

  // IQ Boosters (10)
  { id: 16, name: "Code Breaker", categories: [GameCategory.IQ, GameCategory.STRATEGY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 160, archetype: GameArchetype.LOGIC_GRID },
  { id: 17, name: "Sequence Solver", categories: [GameCategory.IQ], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 180, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 18, name: "Logic Gates", categories: [GameCategory.IQ], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 120, archetype: GameArchetype.LOGIC_GRID },
  { id: 19, name: "Analogy Ace", categories: [GameCategory.IQ, GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.LANGUAGE_VOCAB },
  { id: 20, name: "Number Ninja", categories: [GameCategory.IQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 250, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 21, name: "Shape Shifter", categories: [GameCategory.IQ, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 150, archetype: GameArchetype.SPATIAL_ROTATION },
  { id: 22, name: "Deduction Den", categories: [GameCategory.IQ, GameCategory.STRATEGY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.LOGIC_GRID },
  { id: 23, name: "Abstract Flow", categories: [GameCategory.IQ], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 130, archetype: GameArchetype.LOGIC_GRID },
  { id: 24, name: "Rule Finder", categories: [GameCategory.IQ], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 170, archetype: GameArchetype.LOGIC_GRID },
  { id: 25, name: "Critical Path", categories: [GameCategory.IQ, GameCategory.STRATEGY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 110, archetype: GameArchetype.STRATEGY_RESOURCE },

  // Creativity Sparks (10)
  { id: 26, name: "Story Spinner", categories: [GameCategory.CREATIVITY, GameCategory.LANGUAGE], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 100, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 27, name: "Metaphor Mix", categories: [GameCategory.CREATIVITY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 120, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 28, name: "Drawing Duel", categories: [GameCategory.CREATIVITY, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 29, name: "Invention Box", categories: [GameCategory.CREATIVITY, GameCategory.IQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 90, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 30, name: "Lyric Lab", categories: [GameCategory.CREATIVITY, GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 110, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 31, name: "Sculpt Sphere", categories: [GameCategory.CREATIVITY, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 32, name: "Prompt Painter", categories: [GameCategory.CREATIVITY], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 33, name: "Debate Dynamo", categories: [GameCategory.CREATIVITY, GameCategory.DECISION], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 130, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 34, name: "Remix Reality", categories: [GameCategory.CREATIVITY, GameCategory.VISUAL], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 80, archetype: GameArchetype.CREATIVITY_WRITING },
  { id: 35, name: "Brand Builder", categories: [GameCategory.CREATIVITY, GameCategory.STRATEGY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.CREATIVITY_WRITING },

  // Timing & Reflex (10)
  { id: 36, name: "Beat Drop", categories: [GameCategory.TIMING], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.TIMING_RHYTHM },
  { id: 37, name: "Target Dash", categories: [GameCategory.TIMING, GameCategory.FOCUS], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 300, archetype: GameArchetype.REFLEX_TAP },
  { id: 38, name: "Signal Catcher", categories: [GameCategory.TIMING], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 180, archetype: GameArchetype.REFLEX_TAP },
  { id: 39, name: "Drift Dodge", categories: [GameCategory.TIMING, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 220, archetype: GameArchetype.REFLEX_TAP },
  { id: 40, name: "Chrono Stopper", categories: [GameCategory.TIMING], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.UNDER_2, levelCount: 150, archetype: GameArchetype.TIMING_RHYTHM },
  { id: 41, name: "Reflex Ring", categories: [GameCategory.TIMING, GameCategory.FOCUS], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 190, archetype: GameArchetype.REFLEX_TAP },
  { id: 42, name: "Pulse Pounder", categories: [GameCategory.TIMING], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 280, archetype: GameArchetype.TIMING_RHYTHM },
  { id: 43, name: "Sequence Speed", categories: [GameCategory.TIMING, GameCategory.MEMORY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 200, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 44, name: "Glitch Guardian", categories: [GameCategory.TIMING, GameCategory.FOCUS], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 160, archetype: GameArchetype.REFLEX_TAP },
  { id: 45, name: "Ricochet Riot", categories: [GameCategory.TIMING, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 240, archetype: GameArchetype.REFLEX_TAP },

  // Working Memory (10)
  { id: 46, name: "Grid Recall", categories: [GameCategory.MEMORY, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 47, name: "Audio Echo", categories: [GameCategory.MEMORY], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 180, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 48, name: "Path Painter", categories: [GameCategory.MEMORY, GameCategory.VISUAL], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 130, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 49, name: "Card Flip Classic", categories: [GameCategory.MEMORY], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.MEMORY_MATCH },
  { id: 50, name: "N-Back Pro", categories: [GameCategory.MEMORY, GameCategory.FOCUS], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 100, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 51, name: "Object Order", categories: [GameCategory.MEMORY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 160, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 52, name: "Symbol Span", categories: [GameCategory.MEMORY, GameCategory.FOCUS], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 140, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 53, name: "Shopping List", categories: [GameCategory.MEMORY, GameCategory.LANGUAGE], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 170, archetype: GameArchetype.MEMORY_MATCH },
  { id: 54, name: "Location Link", categories: [GameCategory.MEMORY, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.MEMORY_MATCH },
  { id: 55, name: "Face File", categories: [GameCategory.MEMORY, GameCategory.EQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 120, archetype: GameArchetype.MEMORY_MATCH },

  // Language & Wordplay (10)
  { id: 56, name: "Word Weaver", categories: [GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 140, archetype: GameArchetype.WORD_SCRAMBLE },
  { id: 57, name: "Idiom Decoder", categories: [GameCategory.LANGUAGE], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.UNDER_2, levelCount: 160, archetype: GameArchetype.LANGUAGE_VOCAB },
  { id: 58, name: "Antonym Attack", categories: [GameCategory.LANGUAGE, GameCategory.TIMING], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.LANGUAGE_VOCAB },
  { id: 59, name: "Grammar Guardian", categories: [GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.LANGUAGE_VOCAB },
  { id: 60, name: "Word Ladder", categories: [GameCategory.LANGUAGE, GameCategory.IQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 130, archetype: GameArchetype.WORD_SCRAMBLE },
  { id: 61, name: "Crossword Quest", categories: [GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.WORD_SCRAMBLE },
  { id: 62, name: "Typing Titan", categories: [GameCategory.LANGUAGE, GameCategory.TIMING], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 250, archetype: GameArchetype.TIMING_RHYTHM },
  { id: 63, name: "Proverb Puzzle", categories: [GameCategory.LANGUAGE, GameCategory.CREATIVITY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 120, archetype: GameArchetype.LANGUAGE_VOCAB },
  { id: 64, name: "Definition Detective", categories: [GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 180, archetype: GameArchetype.LANGUAGE_VOCAB },
  { id: 65, name: "Anagram Hunt", categories: [GameCategory.LANGUAGE], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 190, archetype: GameArchetype.WORD_SCRAMBLE },

  // Emotional Intelligence (10)
  { id: 66, name: "Tone Interpreter", categories: [GameCategory.EQ, GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 120, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 67, name: "Microexpression Match", categories: [GameCategory.EQ, GameCategory.VISUAL], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.UNDER_2, levelCount: 140, archetype: GameArchetype.VISUAL_DIFFERENCE },
  { id: 68, name: "Empathy Exam", categories: [GameCategory.EQ, GameCategory.DECISION], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 69, name: "Social Scenario", categories: [GameCategory.EQ], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 130, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 70, name: "Lie Detector", categories: [GameCategory.EQ, GameCategory.FOCUS], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 110, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 71, name: "Mood Matrix", categories: [GameCategory.EQ, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 160, archetype: GameArchetype.VISUAL_DIFFERENCE },
  { id: 72, name: "Perspective Shift", categories: [GameCategory.EQ, GameCategory.CREATIVITY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 90, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 73, name: "Active Listener", categories: [GameCategory.EQ, GameCategory.MEMORY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 120, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 74, name: "Body Language Blitz", categories: [GameCategory.EQ, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 150, archetype: GameArchetype.VISUAL_DIFFERENCE },
  { id: 75, name: "Conflict Resolution", categories: [GameCategory.EQ, GameCategory.DECISION], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.DECISION_SCENARIO },
  
  // Focus & Attention (8 - 2 added earlier)
  { id: 76, name: "Line Follower", categories: [GameCategory.FOCUS, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 180, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 77, name: "Color Filter", categories: [GameCategory.FOCUS, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 78, name: "Attention Shift", categories: [GameCategory.FOCUS], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 79, name: "Auditory Ace", categories: [GameCategory.FOCUS], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 160, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 80, name: "Stroop Test Turbo", categories: [GameCategory.FOCUS, GameCategory.LANGUAGE], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.UNDER_2, levelCount: 220, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 81, name: "Zen Zone", categories: [GameCategory.FOCUS], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.FOCUS_ATTENTION },
  { id: 82, name: "Number Hunt", categories: [GameCategory.FOCUS, GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 250, archetype: GameArchetype.REFLEX_TAP },
  { id: 83, name: "Task Juggler", categories: [GameCategory.FOCUS, GameCategory.DECISION], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 120, archetype: GameArchetype.FOCUS_ATTENTION },

  // Decision Making (8)
  { id: 84, name: "Scenario Branch", categories: [GameCategory.DECISION, GameCategory.STRATEGY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 85, name: "Risk Reward", categories: [GameCategory.DECISION], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.UNDER_2, levelCount: 180, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 86, name: "Judgment Timer", categories: [GameCategory.DECISION, GameCategory.TIMING], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.REFLEX_TAP },
  { id: 87, name: "Priority Planner", categories: [GameCategory.DECISION, GameCategory.STRATEGY], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 140, archetype: GameArchetype.STRATEGY_RESOURCE },
  { id: 88, name: "Ethical Engine", categories: [GameCategory.DECISION, GameCategory.EQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 90, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 89, name: "Investment Sim", categories: [GameCategory.DECISION, GameCategory.STRATEGY], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 110, archetype: GameArchetype.STRATEGY_RESOURCE },
  { id: 90, name: "Rapid Response", categories: [GameCategory.DECISION, GameCategory.TIMING], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 240, archetype: GameArchetype.REFLEX_TAP },
  { id: 91, name: "Negotiation Node", categories: [GameCategory.DECISION, GameCategory.LANGUAGE], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 130, archetype: GameArchetype.DECISION_SCENARIO },

  // Visual Logic (9)
  { id: 92, name: "Spot the Pattern", categories: [GameCategory.VISUAL, GameCategory.FOCUS], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 190, archetype: GameArchetype.VISUAL_DIFFERENCE },
  { id: 93, name: "Image Logic", categories: [GameCategory.VISUAL, GameCategory.IQ], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 160, archetype: GameArchetype.SEQUENCE_MEMORY },
  { id: 94, name: "Match Rotations", categories: [GameCategory.VISUAL, GameCategory.IQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 140, archetype: GameArchetype.SPATIAL_ROTATION },
  { id: 95, name: "Symmetry Master", categories: [GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 220, archetype: GameArchetype.SPATIAL_ROTATION },
  { id: 96, name: "Perspective Puzzle", categories: [GameCategory.VISUAL, GameCategory.IQ], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 120, archetype: GameArchetype.SPATIAL_ROTATION },
  { id: 97, name: "Find the Difference", categories: [GameCategory.VISUAL, GameCategory.FOCUS], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 180, archetype: GameArchetype.VISUAL_DIFFERENCE },
  { id: 98, name: "Color Code", categories: [GameCategory.VISUAL, GameCategory.MEMORY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.UNDER_2, levelCount: 210, archetype: GameArchetype.LOGIC_GRID },
  { id: 99, name: "Assembly Line", categories: [GameCategory.VISUAL, GameCategory.STRATEGY], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 130, archetype: GameArchetype.LOGIC_GRID },
  { id: 100, name: "Shadow Match", categories: [GameCategory.VISUAL], difficulty: Difficulty.EASY, timeRequired: TimeRequirement.UNDER_2, levelCount: 200, archetype: GameArchetype.SPATIAL_ROTATION },

  // Strategy & Planning (8)
  { id: 101, name: "Multi-Step Maze", categories: [GameCategory.STRATEGY, GameCategory.VISUAL], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 150, archetype: GameArchetype.LOGIC_GRID },
  { id: 102, name: "Resource Router", categories: [GameCategory.STRATEGY, GameCategory.DECISION], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 110, archetype: GameArchetype.STRATEGY_RESOURCE },
  { id: 103, name: "Tower Tactics", categories: [GameCategory.STRATEGY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 170, archetype: GameArchetype.STRATEGY_TD },
  { id: 104, name: "Supply Chain", categories: [GameCategory.STRATEGY, GameCategory.IQ], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 100, archetype: GameArchetype.STRATEGY_RESOURCE },
  { id: 105, name: "Hex Grid Hero", categories: [GameCategory.STRATEGY, GameCategory.VISUAL], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 120, archetype: GameArchetype.LOGIC_GRID },
  { id: 106, name: "Diplomacy Duel", categories: [GameCategory.STRATEGY, GameCategory.EQ], difficulty: Difficulty.HARD, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 90, archetype: GameArchetype.DECISION_SCENARIO },
  { id: 107, name: "Civ Builder", categories: [GameCategory.STRATEGY, GameCategory.DECISION], difficulty: Difficulty.MASTER, timeRequired: TimeRequirement.FROM_5_TO_10, levelCount: 80, archetype: GameArchetype.STRATEGY_RESOURCE, isFeatured: true },
  { id: 108, name: "Fleet Commander", categories: [GameCategory.STRATEGY], difficulty: Difficulty.MEDIUM, timeRequired: TimeRequirement.FROM_2_TO_5, levelCount: 160, archetype: GameArchetype.STRATEGY_TD },
];
