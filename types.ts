
export enum GameCategory {
  ALL = "All",
  IQ = "IQ Boosters",
  CREATIVITY = "Creativity Sparks",
  TIMING = "Timing & Reflex",
  MEMORY = "Working Memory",
  LANGUAGE = "Language & Wordplay",
  EQ = "Emotional Intelligence",
  FOCUS = "Focus & Attention",
  DECISION = "Decision Making",
  VISUAL = "Visual Logic",
  STRATEGY = "Strategy & Planning",
}

export enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
  MASTER = "Master",
}

export enum TimeRequirement {
  UNDER_2 = "Under 2 min",
  FROM_2_TO_5 = "2-5 min",
  FROM_5_TO_10 = "5-10 min",
}

export enum GameArchetype {
  MEMORY_MATCH,
  REFLEX_TAP,
  SEQUENCE_MEMORY,
  WORD_SCRAMBLE,
  ODD_ONE_OUT,
  LOGIC_GRID,
  SPATIAL_ROTATION,
  TIMING_RHYTHM,
  STRATEGY_TD,
  DECISION_SCENARIO,
  LANGUAGE_VOCAB,
  FOCUS_ATTENTION,
  PUZZLE_SUDOKU,
  CREATIVITY_WRITING,
  VISUAL_DIFFERENCE,
  STRATEGY_RESOURCE,
}

export interface Game {
  id: number;
  name: string;
  categories: GameCategory[];
  difficulty: Difficulty;
  timeRequired: TimeRequirement;
  levelCount: number;
  archetype: GameArchetype;
  isFeatured?: boolean;
}
