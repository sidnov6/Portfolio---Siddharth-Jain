import type { Post } from './posts'

const now = new Date().toISOString()

export const SEED_POSTS: Post[] = [
  {
    slug: 'regradar-agentic-eu-regulation-citation-integrity',
    title: 'RegRadar: An Agentic Engine That Reads EU Regulation Without Hallucinating a Single Citation',
    excerpt: 'Every act in the EU regulatory firehose carries concrete obligations a bank must implement. RegRadar extracts them, maps them to systems, ranks them by deadline, and drafts the gap-assessment memo — with every claim verified, programmatically, against the live EUR-Lex source. Here is the architecture that makes it trustworthy.',
    date: '2026-05-30T09:00:00.000Z',
    tags: ['Agentic AI', 'RegTech', 'EU Regulation', 'RAG', 'Compliance'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `The EU publishes regulation faster than any compliance team can read it. DORA, MiCA, the AI Act, CRR3, NIS2 — each one is dozens or hundreds of articles, each article packed with concrete obligations a bank has to translate into systems, controls, and deadlines. Today that translation is done by humans with highlighters and Word documents. It is slow, it is expensive, and it does not scale to the volume coming. That is the gap I built **RegRadar** to close.

[Try the live demo →](https://sidnov6-regradar.hf.space)

## What RegRadar does

RegRadar is an **agentic regulatory-impact engine**. Point it at a regulation and it runs the full chain end-to-end, watchable live in the browser:

> raw document → verified obligations → impact map → ranked actions → drafted memo → human gate

A pipeline of specialized agents does the work. A **Source-Monitor** watches the EU firehose via the CELLAR / EUR-Lex endpoints. A **Parser** turns the raw legal text into a structured article tree. An **Obligation extractor** pulls the concrete "you must…" duties out of each article. An **Impact-Mapping** agent matches every obligation to the bank's controls and surfaces the gaps. A **Prioritization** agent ranks what is left by deadline, effort, and risk. Finally a **Memo** agent drafts the gap-assessment write-up — in English *and* German — and hands it to a human for approval before anything is exported.

## The killer feature: citation integrity by construction

Here is the failure mode that kills most "AI reads your documents" products: the model produces a confident, fluent claim and cites an article that does not say what the model says it says. In a regulated industry that is not a bug — it is a liability.

RegRadar's answer is a **programmatic citation verifier**. No obligation is trusted until its anchor quote is found, verbatim, in the cited article of the source — and the source is *hash-pinned*, so the bytes the verifier checks against can never silently drift. If the quote is not there, the obligation is rejected before it ever reaches the user, and a human gate opens.

> The LLM is the feature extractor. It is not the source of truth. The pinned legal text is.

This is the same **determinism boundary** I keep coming back to across my agentic projects (it is the backbone of [Recoupe](/blog/building-recoupe-subrogation-agents) too): parsing, hashing, citation matching, and scoring are pure, deterministic Python. The language model only *extracts and narrates*. It never decides what is true.

## The numbers

I hand-labeled an oracle for DORA (Regulation (EU) 2022/2554) — all 64 real articles, pulled live from the EUR-Lex legal-content endpoint — so the system can be graded rather than vibe-checked. On a full live extraction (Groq → Gemini failover):

- **Precision 0.917**
- **Recall 1.000**
- **F1 0.957**
- **100% citation integrity** on accepted obligations

The detail I am proudest of: the verifier *rejected two ungrounded anchors* the model over-extracted from Article 19's list items, and opened a human gate — exactly the intended behaviour. No unverified legal claim reaches the user. A system that knows what it does not know is worth more than one that is confidently wrong.

## Robustness was the actual product

Most of the engineering was not prompt-writing. It was making the thing not fall over:

- **No single point of quota failure.** The model router fails over Groq → Gemini → OpenRouter → Ollama → and finally a deterministic mock floor. When Groq's free tier hits its daily token cap, the system degrades — it does not crash. The output fails schema validation, the guardrail flags it, a human gate opens.
- **Immutable, idempotent ingestion.** Documents land in a Bronze store pinned by content hash. Re-ingesting identical bytes is a no-op. Same hash, same pin, every time.
- **An exact response cache** so already-extracted articles never re-spend tokens.
- **Eval-as-a-CI-gate.** The eval harness exits non-zero on regression, so a model or prompt change that drops F1 fails the build.
- **Secrets hygiene and zero hardcoding** — keys only in a gitignored env file, every threshold in one config module.

The whole thing is a single FastAPI service that serves both the API and a dark "command-center" console over Server-Sent Events — five screens where you can watch the agents think, see verified obligation anchors highlighted in the source text, and approve or reject the generated memo. One deployable unit, running on a $0 free-tier stack.

## What this taught me

1. **Citation integrity has to be enforced in code, not requested in a prompt.** "Please only cite real sources" is not a control. A verifier that checks the quote against pinned bytes is.
2. **For any regulated workflow, separate the verifiable from the generative.** Run the math and the matching deterministically; let the LLM narrate on top.
3. **Degrade, do not crash.** Free-tier quotas, flaky providers, and bad model output are not edge cases — they are Tuesday. Design the failure path first.

RegTech is one of those domains that looks unglamorous and turns out to be exactly where agentic AI earns its keep: codifiable rules, repeatable decisions, a real ground truth to grade against, and a regulator demanding explainability. RegRadar is my bet on what that future looks like.

[Try the live demo →](https://sidnov6-regradar.hf.space) · [Source on GitHub →](https://github.com/sidnov6/regradar)
`,
  },
  {
    slug: 'creditforge-bank-grade-credit-risk-el-pd-lgd-ead',
    title: 'CreditForge: What It Actually Takes to Build a Credit-Risk Model a Bank Would Sign Off On',
    excerpt: 'EL = PD × LGD × EAD is one line. The 80% that makes a credit model bank-credible is everything around it — leakage-safe point-in-time targets, out-of-time validation, calibration, reason codes, fairness, and drift monitoring. Here is the full stack.',
    date: '2026-05-29T09:00:00.000Z',
    tags: ['Credit Risk', 'Machine Learning', 'Basel', 'Model Validation', 'FinTech'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `Expected Loss is one line of arithmetic:

> EL = PD × LGD × EAD

Probability of default, times loss given default, times exposure at default. You can fit a PD model on a Kaggle dataset in an afternoon and feel like you have done credit risk. You have not. The model is maybe **20% of the work**. The other 80% — the part that makes a credit model something a bank's model-validation committee would actually sign off on — is the scaffolding around it. That scaffolding is what I built **CreditForge** to demonstrate.

[Try the live demo →](https://sidnov6-creditforge.hf.space)

## The keystone: leakage discipline

The single thing that separates a credible credit model from a leaky toy is *point-in-time correctness*. Features must use only information available at the observation date. The target looks forward 12 months. And the train/test split is **out-of-time** — old loan vintages train the model, newer vintages test it — never a random shuffle.

Why this matters: a random split lets the model peek at the future. It learns from loans that defaulted next to loans that did not, in the same period, and reports a Gini that evaporates the moment you deploy it on next quarter's originations. Out-of-time validation is the only honest test of "will this work on loans I have not seen yet." It is the keystone, and almost every notebook-grade credit model gets it wrong.

## PD: a scorecard and a challenger, on purpose

CreditForge trains two PD models side by side:

- A **WoE scorecard** — weight-of-evidence binning plus logistic regression. It is monotonic, interpretable, and the format regulators have trusted for decades. This is the model you can defend in a room.
- A **LightGBM challenger** — the gradient-boosted model that tells you how much signal a more flexible learner can find, so you know what the interpretable scorecard is leaving on the table.

Both are then passed through **isotonic calibration**, because a credit decision needs a *calibrated probability*, not just a good ranking. A model that ranks borrowers perfectly but predicts 5% when the true rate is 15% will price every loan wrong. Discrimination tells you the order; calibration tells you the level. You need both, and most people only measure the first.

## LGD, EAD, and the full lifecycle

PD is one of three terms. CreditForge models **LGD** with a two-stage approach and **EAD/CCF**, then combines all three into Expected Loss. The whole thing runs as a data lifecycle, not an agent graph:

> Bronze (raw, vintage-partitioned) → Silver (cleaned, point-in-time flag, performance joined) → Gold (leakage-safe feature matrix + target) → out-of-time split → PD scorecard + challenger → calibration → LGD + EAD → Expected Loss → validation → governance → serving + drift monitoring

It reads the **Freddie Mac Single-Family** loan and monthly-performance schema. Until you drop real GSE files in, a seeded synthetic generator produces the same schema, so the entire stack runs offline and reproducibly.

## Validation and governance — the part that proves maturity

This is where bank-credible diverges from Kaggle-credible. CreditForge ships a full validation and governance suite:

- **Discrimination** — Gini, KS, gains/lift curves.
- **Calibration** — reliability curves and Hosmer-Lemeshow.
- **Stability** — PSI and CSI to catch population and characteristic drift.
- **Benchmarking** — the challenger as a yardstick for the scorecard.
- **Adverse-action reason codes** — because if you decline someone for credit, regulation says you must tell them *why*, per-applicant.
- **Fairness testing** across protected groups, plus a **model card** documenting it all.
- **CI performance gates** — Gini, calibration, and PSI thresholds that fail the build on regression, so the model cannot silently degrade.
- **Scheduled drift monitoring** in production.

## The Risk Copilot

On top of the platform sits a small **agent team** — a Portfolio Analyst, a Model Validator, and a Fairness Officer — each with a focused toolbelt over the *real* platform tools: scoring, portfolio slices, validation metrics, SHAP drivers, fairness checks. An orchestrator routes a question to the right specialist, and answers come back with interactive charts the agents emit and a transparent tool trace.

The discipline here is the same one that runs through everything I build: **the numbers come from the models, never from the LLM.** The agents orchestrate and explain; the classical ML core computes. SHAP explains the drivers; the LLM narrates them. It never invents a Gini.

The whole app ships as one Docker image — FastAPI serving the API under one path, a pre-built Next.js "Risk Cockpit" served at the root, one origin, no CORS — deployed free on Hugging Face Spaces.

## What this taught me

1. **The model is the easy 20%.** Leakage discipline, out-of-time validation, calibration, reason codes, fairness, and drift monitoring are the 80% that make it real.
2. **Calibration beats raw discrimination for decisions.** A well-ordered but miscalibrated model prices everything wrong.
3. **Explainability is not a nice-to-have in lending — it is the law.** Reason codes and a model card are product requirements, not afterthoughts.

Credit risk is exactly where machine learning meets regulation, and that intersection is where the interesting, durable engineering lives. CreditForge is my full-stack answer to the question "could you actually build this inside a bank?"

[Try the live demo →](https://sidnov6-creditforge.hf.space) · [Source on GitHub →](https://github.com/sidnov6/CreditForge)
`,
  },
  {
    slug: 'quorum-multi-agent-investment-committee-deterministic',
    title: 'QUORUM: An AI Investment Committee That Argues Before It Decides — and Never Makes Up a Number',
    excerpt: 'Most "AI investing" demos fail the same way: a confident model recalls a wrong figure. QUORUM splits the system in two — Python computes every number deterministically, the LLM only argues and narrates. Six agents debate from real market data and converge on a documented allocation.',
    date: '2026-05-30T14:00:00.000Z',
    tags: ['Agentic AI', 'Quant', 'Multi-Agent', 'Investing', 'LLMs'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `There is one failure mode that quietly ruins almost every "AI invests for you" demo: the model states a number with total confidence, and the number is wrong. A made-up P/E. A misremembered drawdown. A return it hallucinated. In investing, a confidently wrong number is worse than no answer at all. **QUORUM** is built from the ground up to make that failure structurally impossible.

[Try the live demo →](https://frontend-nu-ecru-66.vercel.app/)

## What QUORUM is

QUORUM is a **simulated investment committee** of specialized AI agents that argue from real market data, debate across structured rounds, and converge on a documented allocation — with a human holding the final gate. It is decision-support, not financial advice, and no real capital is ever traded. The portfolio is paper-only. The value is in the *agentic engineering* and the *transparency of the reasoning*, not in any return claim.

The committee has six seats:

- A **Bull** and a **Bear** who research independently, argue their case, then rebut each other.
- A **Macro Strategist** who adds regime context.
- A **Quant / Risk Officer** who computes the downside — and can **veto**.
- A **Portfolio Manager** who synthesizes the debate into actual weights.
- A **Critic** who stress-tests the decision for groupthink.

## The debate loop

The committee runs a cyclic debate rather than a single pass:

> Research briefs → Bull & Bear argue independently, then rebut → Macro adds regime context → Risk Officer computes downside and can veto → PM synthesizes weights → Critic stress-tests for groupthink → loop or converge.

The genuine independence matters. The Bull and the Bear build their cases *separately* before they ever see each other's arguments, so the disagreement is real, not two faces of the same prompt nodding along. That tension is the whole point — a committee that always agrees is just one opinion wearing six hats.

## The determinism boundary

Here is the architectural choice that makes QUORUM trustworthy. **Every number comes from Python. The LLM never computes and never recalls a figure.**

The tools layer fetches and computes deterministically: prices via yfinance, fundamentals from SEC EDGAR, news, macro series from FRED, and risk metrics (volatility, beta, VaR, drawdown) in NumPy/SciPy, all behind a point-in-time snapshot cache. A **grounding guardrail** rejects any unsourced number before it can enter the debate. The language model's only job is to *interpret and narrate* the figures the tools hand it.

> This kills the number-one failure of AI-investing demos: confident wrong numbers. Prices, ratios, vol, VaR, weights — all of it is validated Python. The LLM argues; it does not calculate.

It is the same principle behind my other agentic systems — [RegRadar](/blog/regradar-agentic-eu-regulation-citation-integrity) verifying every legal citation against pinned source text, [Recoupe](/blog/building-recoupe-subrogation-agents) computing recoverable amounts deterministically. Separate the verifiable math from the generative language, every time.

## Honest by construction

The backtest is deliberately unflattering to itself: a $10k portfolio, **point-in-time with no lookahead**, trading costs included, benchmarked against SPY. Results are reported as "directionally reasonable," never "beats the market," because backtests are small-sample and regime-dependent and I would rather under-claim than oversell. The system also flags its own low-confidence decisions instead of hiding them.

A live paper portfolio advances daily via a scheduled GitHub Actions job, so there is an actual track record accumulating over time rather than a one-shot demo.

## Runs with zero keys

QUORUM degrades gracefully all the way down. With **no API keys at all**, the committee runs on deterministic, evidence-grounded agent logic over free data (yfinance + SEC EDGAR) and completes end-to-end. Drop in a Gemini, Groq, OpenAI, or Anthropic key and the model router upgrades the debate prose to real LLM reasoning — but the numbers stay deterministic either way. The router fails over across providers so a single rate limit never takes the system down.

The backend is FastAPI streaming the live debate to a Next.js "Committee Room" over Server-Sent Events, with SQLite persistence underneath. You can watch the committee convene, see the Bull on the left and the Bear on the right, and every figure shows up as a sourced chip you can trace back to its origin.

## What this taught me

1. **Genuine disagreement is a feature you have to engineer.** Independent research before rebuttal is what makes a multi-agent debate more than theater.
2. **The LLM is the narrator, not the strategy.** The moment you let it compute, you have reintroduced the exact failure you were trying to avoid.
3. **Honesty is an architecture, not a disclaimer.** Point-in-time backtests, sourced numbers, flagged low-confidence calls, and a paper-only design build trust into the system rather than apologizing for it afterward.

The pattern generalizes well past investing: any domain where an AI has to reason over numbers that *must* be right is a domain where you split the system in two — deterministic computation underneath, language on top. QUORUM is that idea applied to the hardest possible audience: the markets.

[Try the live demo →](https://frontend-nu-ecru-66.vercel.app/) · [Source on GitHub →](https://github.com/sidnov6/quorum-investment-committee)
`,
  },
  {
    slug: 'building-recoupe-subrogation-agents',
    title: 'Building Recoupe — Why Subrogation Is the Best Vertical to Pressure-Test Agentic AI',
    excerpt: 'A multi-agent system that reads insurance claims, assigns fault by jurisdiction, computes what is recoverable, and pursues it — with grounded citations and an append-only audit trail. Here is what I learned shipping it.',
    date: '2026-05-28T09:00:00.000Z',
    tags: ['Agentic AI', 'Insurance', 'RAG', 'Multi-Agent'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `US property & casualty insurers leave an estimated **$15–25 billion** in subrogation recovery on the table every year. Not because they cannot — because they will not. Human adjusters can only work the biggest files. The long tail of small claims, where the math says *"you could probably recover $2K but it takes a paralegal three hours and a $400 demand letter,"* gets dropped at intake. That is the gap I built **Recoupe** to close.

[Try the live demo →](https://sidnov6-recoupe.hf.space/#/dashboard)

## What subrogation actually is

When your insurer pays a claim and someone else is legally at fault — the other driver, a landlord's negligence, a defective product — the insurer has a legal right to recover from the at-fault party. This is *subrogation*. In practice it is one of the most underbuilt workflows in insurance: most carriers run it on people, spreadsheets, and intuition about which files are worth pursuing.

Two things make it the perfect AI test bed:

1. **The ground truth is codifiable.** Negligence law is published. Carrier settlement behaviour is observable. Recoverable amounts are derivable from medical, repair, and wage-loss numbers already sitting in the claim file.
2. **The decisions repeat.** A claim has the same shape every time — facts, jurisdiction, damages, fault, deadlines. Repetition is exactly what agents are good at.

## What Recoupe is

Recoupe is an **autonomous subrogation pipeline** built as a chain of seven specialized agents, each with a single job:

- **Intake Agent** — reads the claim file (LLM extraction via Groq when connected, deterministic heuristics otherwise) and extracts parties, losses, and fault facts.
- **Liability Agent** — assigns the fault percentage under the correct state's negligence regime (comparative, modified, or contributory).
- **Quantum Agent** — computes the recoverable dollar amount given fault, damages, and policy limits.
- **Strategy Agent** — decides *pursue* or *drop*, with the threshold tunable per carrier.
- **Demand Agent** — drafts the demand letter with grounded statutory citations.
- **Negotiation Agent** — works counter-offers against carrier-specific settlement behaviour.
- **Litigation Agent** — escalates only when the expected value of suit beats settlement.

Each agent runs in sequence, writes its findings to an append-only audit trail, and the next agent reads from that trail rather than re-prompting the model. The whole pipeline streams to the UI via Server-Sent Events so a user can watch the agents think.

## The two design choices that mattered most

### 1. Deterministic skeleton, LLM polish

When no Groq API key is configured, every agent runs on deterministic heuristics — the same numerical formulas, the same citation database, the same audit trail. Output is bit-identical between runs. The LLM is layered on top for narrative explanation, document extraction, and edge-case reasoning.

Why this matters: insurance is a regulated industry. A model that produces different fault percentages on Tuesday than it did on Monday is not deployable. By making the math deterministic and the language model an *explainer on top*, the system is auditable without losing the value of LLMs where they actually help.

> The LLM is not the strategy. It is the feature extractor and the narrator. The strategy is the codified math underneath.

### 2. Citation integrity as a first-class metric

Every statutory claim the system makes must trace to a real source in the knowledge base. The guardrail layer rejects unsourced citations before they reach the audit trail. The analytics dashboard tracks **citation integrity %** as a top-line metric, right alongside dollar recovery and win rate.

Lawyers do not hire researchers who cite cases that do not exist. The same standard should apply to AI systems generating legal arguments — and almost no production GenAI system today actually enforces this.

## The codified moat

The "Intelligence" tab in Recoupe exposes the layer that actually does the work:

- **Negligence rules** — comparative vs contributory negligence, made-whole doctrine, anti-subrogation rule, statutes of limitations, tolling rules — per US jurisdiction.
- **Carrier graph** — observed settlement behaviour, typical offer-to-demand ratios, escalation thresholds for the major carriers.
- **RAG collections** — the retrievable corpus the agents draw citations from.

The agents are only as good as this knowledge base. Most of the actual work in shipping Recoupe was not LLM engineering — it was building this layer.

## How the dashboard grades itself

Recoupe runs against synthetic claims with **known-true** fault and recoverable values, which means the agents can be scored. The metrics on the analytics page:

- **Total recovered** ($)
- **Identified recoverable** ($) — the system's estimate of what was on the table
- **Recovery rate %** — actual recovered divided by truly recoverable
- **Win rate %** — claims that ended in a settlement above zero
- **Quantum error %** — mean error on the recoverable dollar amount
- **Liability MAE** — mean absolute error in fault percentage, in points
- **Citation integrity %** — share of cited authorities that were genuinely retrieved

This is the part I am proudest of. Most agentic systems do not have a quantitative answer to *"how right is it?"* Recoupe does, because the domain itself gives you a ground truth to measure against.

## What this taught me about agentic AI

Three lessons that generalize beyond insurance:

1. **The agents are not the moat. The codified knowledge base is.** Anyone can wire seven LLM calls into a chain. Almost nobody can build the per-jurisdiction negligence map.
2. **Deterministic skeleton + LLM polish beats LLM end-to-end.** For any regulated workflow, separate the math you can verify from the language that needs explaining. Run them on different layers.
3. **Audit trails are a product feature, not an afterthought.** Every decision Recoupe makes records the model used, the confidence, the evidence retrieved, and the approver if any. That trail is what makes a compliance officer say yes.

## Where systems like this go next

Subrogation is one of dozens of insurance workflows that look identical from a build-perspective: codifiable rules, repeatable decisions, clear ground truth, regulatory pressure for explainability. Bad-faith review, coordination of benefits recovery, fraud triage, reinsurance allocation — same shape.

The next decade of insurance technology will not be won by chatbots bolted onto policy admin systems. It will be won by autonomous pipelines, grounded in the codified law of each jurisdiction, that recover the money humans cannot afford to chase.

[Try the live demo →](https://sidnov6-recoupe.hf.space/#/dashboard)
`,
  },
  {
    slug: 'jpmorgan-ai-bet-banking-future',
    title: "JPMorgan's $2B AI Bet: What 2,000 Use Cases Tell Us About Banking's Next Decade",
    excerpt: "Jamie Dimon spent $2B on AI in 2024 and built 2,000+ use cases. Here's what that signals for every engineer wanting to work in banking.",
    date: '2026-05-22T09:00:00.000Z',
    tags: ['JPMorgan', 'GenAI', 'Banking', 'Career'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `In his 2024 annual letter, Jamie Dimon dropped a number that should make every AI engineer pay attention: JPMorgan has **2,000+ AI/ML use cases in production**, an estimated $1.5B in annual value from AI by 2026, and they shipped an internal LLM Suite to 60,000+ employees. This is not a pilot. It is the new operating model of finance.

## The number that matters

Most banks talk about AI. JPMorgan is operationalizing it at a scale no other financial institution comes close to. Dimon's phrasing was deliberate:

> AI may prove to be as transformational as some of the major technological inventions of the past several hundred years — printing press, electricity, the internet.
>
> — Jamie Dimon, JPMorgan Chase Annual Letter, 2024

When the CEO of the largest US bank compares your industry to electricity, it is no longer a question of *if* AI changes banking — it is a question of who builds it and who consumes it.

**Key numbers:**

- **$2B** — 2024 AI spend
- **2,000+** — Use cases in production
- **60K+** — Employees on LLM Suite
- **$1.5B** — Estimated annual value by 2026

## The four pillars JPMorgan is betting on

Reading between the lines of Dimon's letter and JPMorgan's public AI roadmap, four categories absorb the bulk of those 2,000 use cases:

1. **Coding productivity** — internal GitHub Copilot-style tools. Goldman reports 20%+ productivity gains. JPMorgan numbers are similar.
2. **Document intelligence** — extracting structured data from 10-Ks, prospectuses, contracts, KYC documents at industrial scale.
3. **Customer service** — chatbots that actually work, augmenting (not replacing) human bankers.
4. **Risk and compliance** — AML, fraud detection, transaction monitoring with model-driven anomaly detection.

## Why this matters for engineers right now

Banks were never the first place AI engineers wanted to work. The work felt slow, the regulatory burden heavy, the codebases ancient. That changed in 2024. Here is what I see:

- Pay packages for senior AI engineers at banks are now competitive with Big Tech — JPMorgan, Goldman, and Morgan Stanley are aggressively hiring AI/ML talent at $300K-$500K total comp for senior roles.
- The interesting problems have moved. Building a recommendation system at a tech company is solved. Building a regulator-defensible LLM that explains its credit decisions is not.
- Career velocity is real. Banks have hierarchy, but the AI organizations inside them are flat, small, and visible to the C-suite.

## The skill that actually matters

It is not LangChain. It is not RAG. Those are commodities now.

The skill that distinguishes engineers JPMorgan wants to hire is **finance fluency** — the ability to read a balance sheet, understand what a default swap is, know why a regulator cares about model interpretability. The technical bar is table stakes. The differentiator is whether you can sit in a meeting with a credit risk officer and not need an interpreter.

That is why I am pairing my AI engineering with CFA Level 1. Not because the charter alone gets you a job — it does not. But because the curriculum forces you to speak the language of capital markets, and that conversation is where the real AI work in finance is happening.

---

The next decade of AI engineering will not be won at OpenAI or Anthropic. It will be won inside the institutions that move capital — and JPMorgan just published the playbook. If you want to build production-grade AI for trillion-dollar systems, this is the moment to start speaking the language.
`,
  },
  {
    slug: 'bloomberg-terminal-eaten-by-agents',
    title: 'The Bloomberg Terminal Is About to Be Eaten by an Agent',
    excerpt: 'The $32K/year Terminal is the most valuable software seat in finance. AI agents can replicate 70% of its workflows for $99/month. Here is how the disruption plays out.',
    date: '2026-05-18T09:00:00.000Z',
    tags: ['Bloomberg', 'Agentic AI', 'Fintech', 'Disruption'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `Bloomberg LP generates over $13 billion a year from Terminal subscriptions. At roughly $32,000 per seat, it is the largest enterprise software product most people outside finance have never seen. For the first time in 40 years, that moat is starting to look porous — and the threat is not another terminal. It is an agent.

## What the Terminal actually is

Strip away the four-screen setup and the keyboard with custom keys, and the Terminal is three things stacked: a data firehose, a chat network, and a workflow shell. Traders use 5-10% of its capability. Equity analysts maybe 20%. Most of what gets paid for is not used by any one person — but the union of what 350,000 people across finance need keeps the bundle locked in.

That is the bundle agentic AI is about to unbundle.

## The agent-shaped threat

Three classes of tools are converging:

1. **Data agents** — AlphaSense, Daloopa, Hebbia. They ingest filings, transcripts, news, and respond to natural-language queries with cited answers. Bloomberg Anywhere did this with key combinations. Agents do it in plain English.
2. **Coding agents** — Cursor, Claude Code, Devin. Quants and analysts can now build internal tools without engineering teams. Less reason to depend on Bloomberg-supplied workflow primitives.
3. **Research agents** — OpenAI Deep Research, Perplexity Finance, Anthropic Computer Use. Synthesizing across 100 documents to produce a fundamental thesis is exactly the workflow Bloomberg charges for.

**Numbers worth knowing:**

- **$13B** — Bloomberg Terminal annual revenue
- **350K** — Subscribers globally
- **$32K** — Per seat per year
- **70%** — Workflows reproducible by agents (estimated)

## Why now and not in 2019

The agent threat to Bloomberg has been theoretical since the GPT-3 era. What changed in 2024-2026 is three things at once:

- Frontier models can read 10-Ks, prospectuses, and ISDA agreements with high reliability.
- Tool-use protocols (MCP, OpenAI function calling) make it trivial for agents to query real-time market data sources outside Bloomberg.
- Alt-data providers (Refinitiv, FactSet, S&P, plus open APIs) have caught up enough to be a credible data layer.

You can now build a Bloomberg-replacement agent in a weekend. The hard part is not the AI — it is the regulatory and data licensing layer.

## What gets disrupted first

Not the trading floor. Order management systems, IB chat, and execution venues are deeply embedded and regulated. The first dominoes will be:

- **Junior equity analysts** — comp models, transcript analysis, peer comparables. All commoditized by agents.
- **Private equity associates** — diligence workflows, deal sourcing, market sizing.
- **Wealth management research** — Morgan Stanley already deployed AI assistants to all 16,000 advisors. They are not buying more Bloomberg seats.

## The Bloomberg counter-play

Bloomberg knows this. Their BloombergGPT (500B parameters, finance-trained, 2023) was a defensive move. Expect them to make their data layer the platform that other agents are *built on top of* — pivoting from terminal vendor to data-and-protocol vendor. The same playbook Stripe ran on banking.

The question is whether they can do it before a $99/month Daloopa-style agent reaches good-enough parity for the bottom 60% of their users.

---

Every dominant enterprise software product gets attacked by a leaner alternative. The Terminal has had a 40-year reign. The agentic moment is the first credible attempt to unbundle it. If you are building in fintech, this is the most valuable problem on the table right now.
`,
  },
  {
    slug: 'goldman-indexgpt-agentic-wealth',
    title: "Why Goldman's IndexGPT Is the First Real Glimpse of Agentic Wealth Management",
    excerpt: 'Goldman patented IndexGPT in 2024 — an AI system that constructs custom investment indices on demand. It is a tiny product. It is also the future of wealth management.',
    date: '2026-05-12T09:00:00.000Z',
    tags: ['Goldman Sachs', 'WealthTech', 'Agentic AI', 'Robo-Advisors'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `In May 2024, Goldman Sachs received a patent for "IndexGPT" — an AI system that generates customized investment indices on demand from a user's natural-language preferences. The headlines treated it as a curiosity. They missed what it actually is: **the first credible product blueprint for AI-native wealth management at scale.**

## The bigger story behind a small patent

IndexGPT itself is narrow — give it a theme ("clean energy companies headquartered in the EU with positive free cash flow") and it constructs an index, backtests it, and offers it as a tradeable product. What matters is the architecture pattern: a customer expresses a preference in English, an AI agent translates that into a portfolio construction task, executes it, and explains it.

That is wealth management in three sentences. Currently a $90 trillion industry built on humans doing exactly that workflow for HNW clients at 1% management fees.

> Wealth management may well be the most powerful AI use case in our industry. We are only scratching the surface.
>
> — Ted Pick, CEO, Morgan Stanley, Q1 2024 earnings call

## Why wealth management is the killer use case

Four reasons agentic AI eats wealth management before it eats trading or risk:

1. **The workflow is conversational** — clients describe goals in words. AI is uniquely good at translating language into structured intent.
2. **The data is largely public** — securities, fund performance, macro indicators. No proprietary tick data is needed for portfolio construction.
3. **Personalization is the moat** — a $500K client today gets a templated 60/40 portfolio. AI can deliver a $5M-client experience at scale.
4. **The economics are devastating** — a robo-advisor charging 0.25% can profitably serve a client a traditional advisor charging 1% cannot touch.

## The chain of disruption

Goldman's IndexGPT is patent number one. Expect to see:

- Vanguard and BlackRock launching their own conversational portfolio agents within 18 months
- Existing robo-advisors (Betterment, Wealthfront) pivoting to agent-first interfaces
- A wave of fintech startups building "wealth managers for the next 100 million" — people who never qualified for one before
- Regulatory pressure on agent explainability — what did the AI consider when recommending this allocation?

## What an "AI-native" advisor stack looks like

If you were architecting an agentic wealth manager from scratch in 2026, the stack is roughly:

- **Frontier LLM** for conversation and reasoning (Claude, GPT-4.5 class)
- **Tool layer** exposing portfolio construction, optimization, tax-loss harvesting, rebalancing
- **Market data layer** — securities master, fundamentals, real-time prices via Polygon/Tradier/internal
- **RAG layer** over the user's own history, prior conversations, life events
- **Compliance layer** — every recommendation logged, attributable, replayable
- **Execution layer** — broker-dealer integration to actually trade

This is exactly what I want to spend the next decade building.

---

The first wave of robo-advisors automated the 60/40 portfolio. The second wave will give every retail investor what only ultra-high-net-worth clients had: a thoughtful, personalized, always-on financial advisor. IndexGPT is the first patent in a much longer arc.
`,
  },
  {
    slug: 'quant-ml-revolution-llm-era',
    title: 'The Quant ML Revolution: How Two Sigma and Renaissance Are Rebuilding for the LLM Era',
    excerpt: 'Traditional factor investing is dying. The funds that survive the next decade will be the ones that figured out how to ingest unstructured data at scale. Here is the shift in progress.',
    date: '2026-05-06T09:00:00.000Z',
    tags: ['Quant', 'Hedge Funds', 'LLMs', 'Alt Data'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `For 30 years, quant funds won by being better at the same game: clean numerical data in, statistical models, signal out. **That game is ending.** The next generation of alpha is hiding in unstructured data — earnings call tone, supply chain disruption, satellite imagery, executive language patterns — and the only credible way to extract it at scale is LLMs.

## Why traditional factors broke

Fama-French five-factor models, momentum, low-vol, quality — these were once edge. Now they are commodities. Every quant fund on earth runs the same regressions on the same Compustat data and gets the same answers. The result is well-documented:

- Sharpe ratios on classic factor strategies have collapsed since 2015
- The capacity-weighted edge for "smart beta" ETFs is functionally zero after fees
- Even AQR and Two Sigma have publicly acknowledged the "alpha decay" problem

Edge moved to data nobody else has — and increasingly, to data nobody else can process.

## The alt-data tidal wave

The alternative data industry is now a ~$15B market. Funds buy:

- **Satellite imagery** of parking lots, oil tanks, shipping ports
- **Credit card aggregates** showing real-time consumer spend
- **Web scraping** of pricing, hiring, supply chain mentions
- **Geolocation data** from mobile devices
- **Social sentiment** from Reddit, X, Stocktwits
- **Earnings call audio** — tone, hesitation, pace, deflection

The first three were already in fund pipelines by 2018. The last three required language and audio models to be useful. That capability arrived in 2023-2024.

## What changed in 2024-2026

Three shifts converged to make LLMs production-ready for quant:

1. **Context windows expanded** — 200K+ tokens means a model can read a full 10-K in one pass without chunking artifacts.
2. **Cost collapsed** — what cost $0.06 per 1K tokens in 2022 costs $0.001 in 2026. Processing every earnings call from the S&P 500 in real time is now affordable for any fund.
3. **Fine-tuning matured** — funds train domain-specific models on their own historical research, creating proprietary signal extractors.

> We treat language models the way we treated statistical arbitrage in the 1990s — a new way to find patterns nobody else can see at scale.
>
> — Renaissance Technologies internal memo, paraphrased from a 2024 Bloomberg report

## What an LLM-augmented quant stack looks like

If you joined a forward-looking quant fund in 2026, the AI layer of the stack likely looks like this:

1. **Ingestion** — every public filing, earnings call, news release, central bank speech, regulatory announcement, plus internal alt-data feeds
2. **Feature extraction** — LLMs extract structured signals (sentiment, hedging language, capex changes, supply chain mentions, executive turnover hints)
3. **Time-series alignment** — features joined to prices, fundamentals, and other signals at minute or daily resolution
4. **Backtest engine** — proprietary, walk-forward, with realistic frictions
5. **Portfolio construction** — risk-aware optimizer applying the new signals on top of traditional factor exposures
6. **Execution** — smart order routing, TCA, slippage modeling

Notice the change: **the LLM is not the strategy. It is the feature extractor.** The strategy still relies on statistical edge — but the features it operates on are richer, faster, and less crowded than anyone competing on Compustat data alone.

## What this means for engineers

Quant funds were historically Python-and-C++ shops. The skill stack to be hired at one in 2026 looks different:

- Production LLM engineering (prompt design, evaluation, fine-tuning) — not just calling APIs
- Real-time data engineering — Kafka, Spark Streaming, low-latency pipelines
- Classical statistics and time-series modeling — the LLM is a tool, not the answer
- Some financial intuition — knowing why a 0.5% mention of "supply chain" on an earnings call is signal

---

The next 10 years of quant will not be won by whoever has the smartest model. It will be won by whoever ingests the broadest data, extracts the cleanest signals, and operates with the lowest latency. LLMs are the picks-and-shovels — and the gold rush is real.
`,
  },
  {
    slug: 'mcp-death-of-fintech-apis',
    title: 'MCP and the Quiet Death of Fintech APIs as We Know Them',
    excerpt: "Anthropic's Model Context Protocol launched in late 2024. Most people read it as a developer convenience. Inside fintech, it is the start of a much bigger rewrite.",
    date: '2026-04-28T09:00:00.000Z',
    tags: ['MCP', 'Fintech', 'APIs', 'Anthropic'],
    published: true,
    createdAt: now,
    updatedAt: now,
    body: `In November 2024, Anthropic released the **Model Context Protocol** — an open standard for connecting AI assistants to data sources and tools. Developers welcomed it as a cleaner alternative to writing one-off LangChain integrations. What happened next inside fintech is more interesting: every serious team started asking what their stack looks like if MCP becomes the way AI agents access bank data, market data, and trading systems.

## What MCP actually is

Strip the protocol-spec language away and MCP is a contract: a server exposes capabilities (tools, resources, prompts) in a standardized way, and any MCP-aware client (Claude Desktop, Cursor, an internal agent) can discover and use them.

It is conceptually similar to LSP (Language Server Protocol) for code editors. Once the protocol exists, the ecosystem flips: instead of every editor implementing every language and every language integrating with every editor (an N x M problem), you implement the protocol once.

## Why this matters for fintech

Fintech is the API-economy poster child. Plaid, Truelayer, Stripe, Yodlee, MX — these are companies whose entire value is being the connective tissue between consumer-facing apps and bank backends. Every one of them exposes REST APIs, has an SDK in 6 languages, charges per call or per connected account, and has documentation that takes a week to ramp on.

Now imagine: every bank, every brokerage, every data provider, every accounting system exposes an MCP server. An AI agent can discover capabilities, authenticate, and execute workflows without anyone writing custom integration code.

Two questions follow:

1. What happens to fintech aggregators whose moat is integration breadth?
2. What new businesses become possible when an end user's AI agent can directly talk to their bank, broker, and accountant?

## The optimistic case for incumbents

Plaid does not lose by MCP existing — they lose if they fail to **become the dominant MCP server for banking**. Their data, normalization, identity verification, and compliance work are still valuable. The question is whether they package it as MCP-native or keep insisting agents talk to their REST endpoints.

Same for Stripe: a Stripe MCP server that exposes payments, subscriptions, treasury, issuing in a way an agent can reason about is more valuable than a REST API. The early signals from Stripe's Agentic Toolkit (released late 2024) suggest they see this.

## The disruption case

The companies that should be worried are the ones whose value is mostly "we built integrations with 12,000 banks." If every bank exposes its own MCP server (which they will, because the alternative is fighting the entire AI ecosystem), the aggregator moat erodes fast.

On the other side, a wave of new fintech products becomes possible:

- **True "set-it-and-forget-it" finance agents** — your AI handles bill pay, savings allocation, tax optimization, with explicit auditable actions.
- **Bookkeeping that closes itself** — accounting agents that pull data from every source, categorize, reconcile.
- **Compliance copilots** — agents that query bank, brokerage, and regulatory systems to generate filings.
- **Cross-institutional portfolio analysis** — your agent sees everything (held-away assets, real estate, crypto, alternatives) and gives unified advice.

## What I am paying attention to

Three things to watch in 2026-2027:

1. Which big bank (JPMorgan, Citi, BofA, Goldman) is the first to ship a public MCP server for retail banking. That moment is the inflection point.
2. Whether OpenAI standardizes on MCP or forks the protocol. The ecosystem needs the convergence.
3. Regulatory response — the SEC and OCC will have opinions about AI agents executing trades or moving money. The early frameworks here will shape the next decade.

---

Every shift in how software talks to software creates a generation of new companies and kills a generation of incumbents. SOAP to REST. Monoliths to microservices. REST to GraphQL. MCP is the next of these — and fintech, being the most API-dependent industry, is where the shift hits hardest first.
`,
  },
]
