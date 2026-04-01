# VN Inference Decision Policy

This policy is designed for Vietnamese Bazi consultation workflows where the assistant must avoid unsupported claims.

## Core rules

1. Only evidence-backed claims are valid candidates for conclusion.
2. If confidence is below threshold, ask follow-up questions to validate.
3. Ask only high-value questions and keep question volume bounded.
4. If confidence cannot be raised safely within limits, abstain.

## Constants

- confidence threshold: `0.8`
- max rounds: `2`
- max questions per round: `3`
- max total questions: `6`

## Dynamic question mix

- If `pastValidationScore < 0.6`: target mix is `4 past + 2 present`.
- If `0.6 <= pastValidationScore < 0.8`: target mix is `3 past + 3 present`.
- If `pastValidationScore >= 0.8`: target mix is `2 past + 4 present`.

The policy can also read `askedPastQuestions` and `askedPresentQuestions` to keep the mix balanced across rounds.

## Decision flow

1. Remove any claim that does not have chart evidence.
2. Determine unresolved target claims (`confidence < 0.8`).
3. If none unresolved, return `conclude`.
4. If round or question budget exceeded, return `abstain`.
5. Rank candidate questions by `expectedConfidenceGain`.
6. Allocate question slots by dynamic past/present mix first, then fill remaining slots by gain.
7. Recompute confidence after each round and repeat.

## Notes for product behavior

- Questions should be phrased as neutral validation, not leading assumptions.
- If user-provided birth time is uncertain, generate candidates that best separate hour-based scenarios first.
- Persist `claim -> evidence -> question -> user answer` for auditability.
