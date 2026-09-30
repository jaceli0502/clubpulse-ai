// Product guardrails, not universal statistical guarantees.
export const RULES = Object.freeze({comparisons:5, correlation:10, forecast:12, training:8, testCases:4, moderate:20, group:3, followup:3, maxRows:2000, maxBytes:3*1024*1024, maxCategories:20, healthChange:10, anomalyZ:3.5});
export const confidence = (n, missing=0, errorRatio=0) => ({level:n>=RULES.moderate&&missing<=.2&&errorRatio<=.3?'Moderate':'Low',reason:`Based on ${n} meetings${missing?`, ${Math.round(missing*100)}% incomplete optional data`:''}. These are observational patterns, not causal evidence.`});
