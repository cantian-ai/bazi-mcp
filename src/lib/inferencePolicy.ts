export const CONFIDENCE_THRESHOLD = 0.8;
export const MAX_ROUNDS = 2;
export const MAX_QUESTIONS_PER_ROUND = 3;
export const MAX_TOTAL_QUESTIONS = 6;

export type Claim = {
  claimId: string;
  confidence: number;
  evidenceFromChart: boolean;
};

export type QuestionScope = 'past' | 'present';

export type CandidateQuestion = {
  questionId: string;
  questionText: string;
  claimIds: string[];
  expectedConfidenceGain: number;
  scope?: QuestionScope;
};

export type PolicyInput = {
  round: number;
  totalQuestionsAsked: number;
  askedPastQuestions?: number;
  askedPresentQuestions?: number;
  pastValidationScore?: number;
  presentStateClarity?: number;
  claims: Claim[];
  targetClaimIds?: string[];
  candidateQuestions?: CandidateQuestion[];
};

export type QuestionMix = {
  strategy: 'past_heavy' | 'balanced' | 'present_heavy';
  scores: {
    pastValidationScore: number;
    presentStateClarity: number;
  };
  targetTotals: {
    past: number;
    present: number;
  };
  remainingTargets: {
    past: number;
    present: number;
  };
  suggestedThisRound: {
    past: number;
    present: number;
  };
};

export type PolicyOutput = {
  action: 'conclude' | 'ask' | 'abstain';
  threshold: number;
  unresolvedClaimIds: string[];
  concludedClaimIds: string[];
  selectedQuestions: CandidateQuestion[];
  questionMix: QuestionMix;
  reason: string;
  limits: {
    maxRounds: number;
    maxQuestionsPerRound: number;
    maxTotalQuestions: number;
  };
};

const clampConfidence = (value: number) => {
  if (Number.isNaN(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
};

const getMixPlan = (pastValidationScore: number) => {
  if (pastValidationScore < 0.6) {
    return {
      strategy: 'past_heavy' as const,
      targetTotals: { past: 4, present: 2 },
    };
  }
  if (pastValidationScore < 0.8) {
    return {
      strategy: 'balanced' as const,
      targetTotals: { past: 3, present: 3 },
    };
  }
  return {
    strategy: 'present_heavy' as const,
    targetTotals: { past: 2, present: 4 },
  };
};

const buildEmptyQuestionMix = (
  pastValidationScore: number,
  presentStateClarity: number,
  strategy: 'past_heavy' | 'balanced' | 'present_heavy',
  targetTotals: { past: number; present: number },
): QuestionMix => ({
  strategy,
  scores: {
    pastValidationScore,
    presentStateClarity,
  },
  targetTotals,
  remainingTargets: {
    past: 0,
    present: 0,
  },
  suggestedThisRound: {
    past: 0,
    present: 0,
  },
});

const sortQuestions = (questions: CandidateQuestion[]) =>
  questions.sort((a, b) => {
    if (b.expectedConfidenceGain !== a.expectedConfidenceGain) {
      return b.expectedConfidenceGain - a.expectedConfidenceGain;
    }
    return a.questionId.localeCompare(b.questionId);
  });

const pickQuestions = (
  questions: CandidateQuestion[],
  count: number,
): { selected: CandidateQuestion[] } => {
  return { selected: questions.slice(0, count) };
};

export const decideInferenceAction = (input: PolicyInput): PolicyOutput => {
  const {
    round,
    totalQuestionsAsked,
    askedPastQuestions = 0,
    askedPresentQuestions = 0,
    pastValidationScore = 0.5,
    presentStateClarity = 0.5,
    claims,
    targetClaimIds = [],
    candidateQuestions = [],
  } = input;

  const normalizedPastScore = clampConfidence(pastValidationScore);
  const normalizedPresentClarity = clampConfidence(presentStateClarity);
  const mixPlan = getMixPlan(normalizedPastScore);

  const evidenceBackedClaims = claims
    .filter((claim) => claim.evidenceFromChart)
    .map((claim) => ({
      ...claim,
      confidence: clampConfidence(claim.confidence),
    }));

  const targetIds =
    targetClaimIds.length > 0 ? new Set(targetClaimIds) : new Set(evidenceBackedClaims.map((claim) => claim.claimId));

  const targetClaims = evidenceBackedClaims.filter((claim) => targetIds.has(claim.claimId));

  if (targetClaims.length === 0) {
    return {
      action: 'abstain',
      threshold: CONFIDENCE_THRESHOLD,
      unresolvedClaimIds: [],
      concludedClaimIds: [],
      selectedQuestions: [],
      questionMix: buildEmptyQuestionMix(
        normalizedPastScore,
        normalizedPresentClarity,
        mixPlan.strategy,
        mixPlan.targetTotals,
      ),
      reason: 'No evidence-backed claims available. Do not conclude or ask leading questions.',
      limits: {
        maxRounds: MAX_ROUNDS,
        maxQuestionsPerRound: MAX_QUESTIONS_PER_ROUND,
        maxTotalQuestions: MAX_TOTAL_QUESTIONS,
      },
    };
  }

  const concludedClaimIds = targetClaims
    .filter((claim) => claim.confidence >= CONFIDENCE_THRESHOLD)
    .map((claim) => claim.claimId);

  const unresolvedClaimIds = targetClaims
    .filter((claim) => claim.confidence < CONFIDENCE_THRESHOLD)
    .map((claim) => claim.claimId);

  if (unresolvedClaimIds.length === 0) {
    return {
      action: 'conclude',
      threshold: CONFIDENCE_THRESHOLD,
      unresolvedClaimIds,
      concludedClaimIds,
      selectedQuestions: [],
      questionMix: buildEmptyQuestionMix(
        normalizedPastScore,
        normalizedPresentClarity,
        mixPlan.strategy,
        mixPlan.targetTotals,
      ),
      reason: 'All target claims reached confidence threshold.',
      limits: {
        maxRounds: MAX_ROUNDS,
        maxQuestionsPerRound: MAX_QUESTIONS_PER_ROUND,
        maxTotalQuestions: MAX_TOTAL_QUESTIONS,
      },
    };
  }

  if (round > MAX_ROUNDS) {
    return {
      action: 'abstain',
      threshold: CONFIDENCE_THRESHOLD,
      unresolvedClaimIds,
      concludedClaimIds,
      selectedQuestions: [],
      questionMix: buildEmptyQuestionMix(
        normalizedPastScore,
        normalizedPresentClarity,
        mixPlan.strategy,
        mixPlan.targetTotals,
      ),
      reason: 'Maximum question rounds reached before threshold.',
      limits: {
        maxRounds: MAX_ROUNDS,
        maxQuestionsPerRound: MAX_QUESTIONS_PER_ROUND,
        maxTotalQuestions: MAX_TOTAL_QUESTIONS,
      },
    };
  }

  const remainingBudget = Math.max(0, MAX_TOTAL_QUESTIONS - Math.max(0, totalQuestionsAsked));
  if (remainingBudget === 0) {
    return {
      action: 'abstain',
      threshold: CONFIDENCE_THRESHOLD,
      unresolvedClaimIds,
      concludedClaimIds,
      selectedQuestions: [],
      questionMix: buildEmptyQuestionMix(
        normalizedPastScore,
        normalizedPresentClarity,
        mixPlan.strategy,
        mixPlan.targetTotals,
      ),
      reason: 'Total question budget reached before threshold.',
      limits: {
        maxRounds: MAX_ROUNDS,
        maxQuestionsPerRound: MAX_QUESTIONS_PER_ROUND,
        maxTotalQuestions: MAX_TOTAL_QUESTIONS,
      },
    };
  }

  const unresolvedSet = new Set(unresolvedClaimIds);
  const rankedQuestions = sortQuestions(
    candidateQuestions
      .map((question) => ({
        ...question,
        expectedConfidenceGain: clampConfidence(question.expectedConfidenceGain),
        scope: question.scope ?? 'past',
      }))
      .filter((question) => question.claimIds.some((claimId) => unresolvedSet.has(claimId))),
  );

  if (rankedQuestions.length === 0) {
    return {
      action: 'abstain',
      threshold: CONFIDENCE_THRESHOLD,
      unresolvedClaimIds,
      concludedClaimIds,
      selectedQuestions: [],
      questionMix: buildEmptyQuestionMix(
        normalizedPastScore,
        normalizedPresentClarity,
        mixPlan.strategy,
        mixPlan.targetTotals,
      ),
      reason: 'No high-value validation question can improve unresolved claims.',
      limits: {
        maxRounds: MAX_ROUNDS,
        maxQuestionsPerRound: MAX_QUESTIONS_PER_ROUND,
        maxTotalQuestions: MAX_TOTAL_QUESTIONS,
      },
    };
  }

  const roundSlots = Math.min(MAX_QUESTIONS_PER_ROUND, remainingBudget, rankedQuestions.length);
  const pastRemainingTarget = Math.max(0, mixPlan.targetTotals.past - Math.max(0, askedPastQuestions));
  const presentRemainingTarget = Math.max(0, mixPlan.targetTotals.present - Math.max(0, askedPresentQuestions));

  const pastCandidates = rankedQuestions.filter((question) => question.scope === 'past');
  const presentCandidates = rankedQuestions.filter((question) => question.scope === 'present');

  const pastPickCount = Math.min(roundSlots, pastRemainingTarget, pastCandidates.length);
  const presentPickCount = Math.min(roundSlots - pastPickCount, presentRemainingTarget, presentCandidates.length);

  const pastPicked = pickQuestions(pastCandidates, pastPickCount);
  const presentPicked = pickQuestions(presentCandidates, presentPickCount);

  const selectedQuestions = [...pastPicked.selected, ...presentPicked.selected];
  const selectedIds = new Set(selectedQuestions.map((question) => question.questionId));

  if (selectedQuestions.length < roundSlots) {
    const fallback = sortQuestions(
      rankedQuestions.filter((question) => !selectedIds.has(question.questionId)),
    ).slice(0, roundSlots - selectedQuestions.length);
    selectedQuestions.push(...fallback);
  }

  const suggestedPast = selectedQuestions.filter((question) => question.scope === 'past').length;
  const suggestedPresent = selectedQuestions.filter((question) => question.scope === 'present').length;

  return {
    action: 'ask',
    threshold: CONFIDENCE_THRESHOLD,
    unresolvedClaimIds,
    concludedClaimIds,
    selectedQuestions,
    questionMix: {
      strategy: mixPlan.strategy,
      scores: {
        pastValidationScore: normalizedPastScore,
        presentStateClarity: normalizedPresentClarity,
      },
      targetTotals: {
        past: mixPlan.targetTotals.past,
        present: mixPlan.targetTotals.present,
      },
      remainingTargets: {
        past: pastRemainingTarget,
        present: presentRemainingTarget,
      },
      suggestedThisRound: {
        past: suggestedPast,
        present: suggestedPresent,
      },
    },
    reason: `Ask ${selectedQuestions.length} high-value validation question(s) based on ${mixPlan.strategy} mix.`,
    limits: {
      maxRounds: MAX_ROUNDS,
      maxQuestionsPerRound: MAX_QUESTIONS_PER_ROUND,
      maxTotalQuestions: MAX_TOTAL_QUESTIONS,
    },
  };
};
