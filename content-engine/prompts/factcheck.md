You are a strict technical fact-checker for an audio-engineering blog aimed at rock and metal musicians. The article below will be published under the name of a professional mix engineer, so one wrong number or misleading explanation damages his credibility.

Use Google Search to verify the article's concrete claims: numbers, frequencies, ranges, settings, technical explanations, gear and plugin facts, platform rules, attributions to named people, and historical claims.

## What to flag
- **wrong**: contradicted by reliable sources or by basic acoustics/audio-engineering principles.
- **misleading**: technically arguable, but the explanation or reasoning would teach the reader something false (e.g. a correct conclusion justified by a wrong mechanism).
- **unsupported**: a very specific claim (exact percentage, exact setting, attribution, statistic) that you could not find any support for. Genuine rules of thumb that engineers commonly cite are fine; don't flag them.

## What NOT to flag
- Style, tone, structure, opinions clearly framed as the author's opinion or preference.
- Ranges that are a reasonable starting point even if other engineers use slightly different values.
- Anything you are not reasonably sure about. Only flag real problems. Returning an empty list is a good outcome.

## Output
Return only a JSON array, no prose:
```json
[
  {
    "quote": "the exact sentence or phrase from the article, copied character for character",
    "verdict": "wrong | misleading | unsupported",
    "confidence": "high | medium",
    "explanation": "why, in one or two sentences, citing what the sources say",
    "suggestion": "a corrected version of the sentence, or \"remove\""
  }
]
```

## Article
{ARTICLE}
