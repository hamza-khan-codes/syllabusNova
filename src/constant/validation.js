// constants/createTestValidation.js

export const TEST_VALIDATION = {
  SECTION: {
    REQUIRED: "Please select an exam type.",
  },

  QUESTIONS: {
    MIN: 1,
    MAX: 500,
    REQUIRED: "Number of questions is required.",
    MIN_MSG: "At least 1 question is required.",
    MAX_MSG: "A maximum of 500 questions is allowed.",
  },

  DURATION: {
    MIN: 1,
    MAX: 1500,
    REQUIRED: "Please enter the duration in minutes.",
    MIN_MSG: "Duration must be at least 1 minute.",
    MAX_MSG: "Duration cannot exceed 1500 minutes.",
  },

  PASSING_PERCENTAGE: {
    MIN: 1,
    MAX: 90,
    REQUIRED: "Required",
    MIN_MSG: "Min 1%",
    MAX_MSG: "Max 90%",
  },

  MARKS_PER_QUESTION: {
    MIN: 1,
    MAX: 100,
    REQUIRED: "Required",
    MIN_MSG: "Min 1",
    MAX_MSG: "Max 100",
  },

  NEGATIVE_MARKS: {
    MIN: 1,
    MAX: 100,
    REQUIRED: "Required",
    MIN_MSG: "Min 1",
    MAX_MSG: "Max 100",
  },
};

// section validation

export const SECTION_VALIDATION = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[A-Za-z\s-]+$/,

    REQUIRED: "Please enter the section name.",
    MIN_LENGTH_MSG: "Section name must be at least 3 characters.",
    MAX_LENGTH_MSG: "Section name cannot exceed 50 characters.",
    PATTERN_MSG: "Only letters, spaces, and hyphens (-) are allowed.",
  },

  QUESTIONS: {
    MIN: 1,
    MAX: 90,

    REQUIRED: "Number of questions is required.",
    MIN_MSG: "At least 1 question is required.",
    MAX_MSG: "A maximum of 90 questions is allowed.",
  },

  DURATION: {
    MIN: 1,
    MAX: 300,

    REQUIRED: "Please enter the duration in minutes.",
    MIN_MSG: "Duration must be at least 1 minute.",
    MAX_MSG: "Duration cannot exceed 300 minutes.",
  },
};


export const ADD_NEW_QUESTION = {
  QUESTION: {
    MAX_OPTIONS:4
  }
}
