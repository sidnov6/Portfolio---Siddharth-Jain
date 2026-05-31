/**
 * Case-study content for the flagship finance projects. Drawn from each repo's
 * architecture (determinism boundaries, eval harnesses, CI gates). Numbers are
 * measured/CI-gated; value lines are framed from evals — no invented dollars
 * for personal projects (the one real $ figure lives in the Suzlon role).
 */

export type ArchStep = { label: string; detail: string }
export type Tradeoff = { choice: string; why: string }
export type Eval = { metric: string; value: string; methodology: string }
export type Gate = { name: string; threshold: string; value: string }
export type Proof = { title: string; gates: Gate[]; note: string }

export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  category: string
  color: string
  demoUrl: string
  demoPlatform: string
  github?: string
  problem: string[]
  architecture: ArchStep[]
  tradeoffs: Tradeoff[]
  evals: Eval[]
  proof: Proof
  value: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'regradar',
    title: 'RegRadar — EU Regulatory-Impact Engine',
    tagline: 'An agentic engine that turns the EU regulatory firehose into a verified, ranked, bank-ready action list — without hallucinating a single citation.',
    category: 'RegTech · Agentic AI',
    color: '#0A3B7A',
    demoUrl: 'https://sidnov6-regradar.hf.space',
    demoPlatform: 'Hugging Face Spaces',
    github: 'https://github.com/sidnov6/regradar',
    problem: [
      'The EU ships regulation faster than any compliance team can read it — DORA, MiCA, the AI Act, CRR3, NIS2, each one dozens to hundreds of articles of concrete obligations a bank must translate into systems, controls, and deadlines. Today that translation is manual, slow, and expensive.',
      'The obvious fix — point an LLM at the text — fails in exactly the way a regulated industry can least afford: a fluent, confident claim citing an article that does not say what the model says it does. A citation that does not hold up is not a bug here, it is a liability.',
    ],
    architecture: [
      { label: 'Source-Monitor', detail: 'Watches the EUR-Lex / CELLAR firehose for new and amended acts.' },
      { label: 'Bronze store', detail: 'Raw act pinned by content hash — immutable and idempotent; re-ingesting identical bytes is a no-op.' },
      { label: 'Parser → Silver', detail: 'Formex / EUR-Lex XHTML parsed into a structured article tree.' },
      { label: 'Obligation extractor', detail: 'LLM pulls the concrete "you must…" duties out of each article.' },
      { label: 'Citation verifier', detail: 'Deterministic: rejects any obligation whose anchor quote is not found verbatim in the pinned source; opens a human gate.' },
      { label: 'Impact mapping', detail: 'Maps surviving obligations to the bank\'s controls; gaps surface in red.' },
      { label: 'Prioritization', detail: 'Ranks the gaps by deadline, effort, and risk.' },
      { label: 'Memo + human gate', detail: 'Drafts the gap-assessment memo in EN + DE, approve/reject, DOCX/HTML export.' },
    ],
    tradeoffs: [
      { choice: 'Determinism boundary — LLM extracts and narrates only; all matching, hashing, and scoring is pure Python.', why: 'A model that returns different obligations on Tuesday than Monday is not deployable in compliance. The math has to be reproducible and auditable.' },
      { choice: 'Citation integrity by construction — verify the quote against pinned bytes.', why: '"Please only cite real sources" is a prompt, not a control. A verifier that checks the anchor against the immutable source is.' },
      { choice: 'Provider failover chain: Groq → Gemini → OpenRouter → Ollama → deterministic floor.', why: 'No single point of quota failure. When a free tier caps out, the system degrades and opens a human gate — it does not crash.' },
      { choice: 'Article-capped extraction + exact response cache.', why: 'Keeps the whole thing inside a $0 free-tier token budget; already-extracted articles never re-spend tokens.' },
    ],
    evals: [
      { metric: 'F1', value: '0.957', methodology: 'Live extraction graded vs a hand-labeled DORA oracle (Reg (EU) 2022/2554, 64 EUR-Lex articles), Groq→Gemini failover.' },
      { metric: 'Precision', value: '0.917', methodology: 'Accepted obligations that matched the oracle.' },
      { metric: 'Recall', value: '1.000', methodology: 'Oracle obligations the system recovered.' },
      { metric: 'Citation integrity', value: '100%', methodology: 'Share of cited authorities found verbatim in the pinned source. The verifier rejected 2 ungrounded anchors over-extracted from Article 19 and opened a human gate.' },
    ],
    proof: {
      title: 'Eval-as-CI-gate',
      gates: [
        { name: 'Gap-detection F1', threshold: '≥ regression floor', value: '0.957' },
        { name: 'Citation integrity', threshold: '= 100%', value: '100%' },
        { name: 'Test suite', threshold: 'green, no network/keys', value: '57 passing' },
      ],
      note: 'regradar/eval/run.py runs as a CI gate and exits non-zero on regression — a model or prompt change that drops F1 or citation integrity fails the build.',
    },
    value: 'Turns a multi-day manual gap assessment into a verified, ranked, bilingual memo in minutes — the leverage a bank\'s compliance function pays for, delivered with the auditability a regulator demands.',
  },
  {
    slug: 'creditforge',
    title: 'CreditForge — Bank-Grade Credit Risk Platform',
    tagline: 'The 80% that makes a PD model bank-credible — leakage-safe targets, out-of-time validation, calibration, reason codes, fairness, and drift monitoring.',
    category: 'Credit Risk · ML',
    color: '#0F4C5C',
    demoUrl: 'https://sidnov6-creditforge.hf.space',
    demoPlatform: 'Hugging Face Spaces',
    github: 'https://github.com/sidnov6/CreditForge',
    problem: [
      'Expected Loss is one line — EL = PD × LGD × EAD. You can fit a PD model on a Kaggle dataset in an afternoon and feel like you have done credit risk. You have not. The model is roughly 20% of the work.',
      'The other 80% is the scaffolding that makes a model a validation committee would actually sign off on. The silent killer is leakage: a random train/test split lets the model peek at the future and reports a discrimination score that evaporates the moment it sees next quarter\'s originations.',
    ],
    architecture: [
      { label: 'Bronze', detail: 'Raw Freddie Mac Single-Family loan + monthly-performance panels, vintage-partitioned.' },
      { label: 'Silver', detail: 'Cleaned, point-in-time 12-month default flag, performance joined.' },
      { label: 'Gold', detail: 'Leakage-safe feature matrix + forward target, vintage-tagged.' },
      { label: 'Out-of-time split', detail: 'Train on old vintages, test on newer ones — never a random shuffle.' },
      { label: 'PD models', detail: 'WoE scorecard (logistic, interpretable) + LightGBM challenger.' },
      { label: 'Calibration', detail: 'Isotonic — turns a good ranking into a calibrated probability.' },
      { label: 'LGD + EAD → EL', detail: 'Two-stage LGD and EAD/CCF combined into Expected Loss.' },
      { label: 'Validation + governance', detail: 'Gini/KS/PSI, SHAP reason codes, fairness tests, model card; FastAPI serving + Next.js Risk Cockpit + drift monitoring.' },
    ],
    tradeoffs: [
      { choice: 'Out-of-time vintage split instead of a random split.', why: 'The only honest test of "will this work on loans I have not seen yet." A random split inflates a Gini that does not survive deployment.' },
      { choice: 'Train a WoE scorecard and a LightGBM challenger side by side.', why: 'The scorecard is the interpretable model you defend in the room; the challenger measures how much signal the simple model leaves on the table.' },
      { choice: 'Isotonic calibration as a first-class step.', why: 'A credit decision needs a calibrated probability, not just a rank. A well-ordered but miscalibrated model prices every loan wrong.' },
      { choice: 'Risk Copilot agents orchestrate; the classical ML core computes every number.', why: 'SHAP explains the drivers and the LLM narrates them — it never invents a Gini.' },
    ],
    evals: [
      { metric: 'Discrimination', value: 'Gini / KS', methodology: 'Out-of-time test on Freddie Mac vintages; gains/lift curves.' },
      { metric: 'Calibration', value: 'Isotonic + HL', methodology: 'Reliability curve and Hosmer-Lemeshow — predicted vs realized default rate.' },
      { metric: 'Stability', value: 'PSI / CSI', methodology: 'Population and characteristic drift vs the training distribution.' },
      { metric: 'Governance', value: 'SHAP · reason codes · fairness', methodology: 'Per-applicant adverse-action reason codes, protected-group fairness testing, and a documented model card.' },
    ],
    proof: {
      title: 'CI performance gates',
      gates: [
        { name: 'Discrimination (Gini)', threshold: '≥ threshold', value: 'gated' },
        { name: 'Calibration error', threshold: '≤ threshold', value: 'gated' },
        { name: 'PSI stability', threshold: '≤ threshold', value: 'gated + monitored' },
      ],
      note: 'creditforge/eval gates fail the build on regression, and PSI drift is monitored on a schedule in production — the model cannot silently degrade.',
    },
    value: 'A credit-risk stack that answers the only question that matters inside a bank — "would your model-validation committee sign this off?" — end to end, on real GSE mortgage data.',
  },
  {
    slug: 'aegis',
    title: 'AEGIS Live — Real-Time Streaming AML',
    tagline: 'Real-time AML surveillance that scores live Bitcoin transactions the instant they arrive — a streaming graph + ML ensemble, explained alerts, and drafted SARs.',
    category: 'AML · Streaming',
    color: '#9B2D4F',
    demoUrl: 'https://ui-kappa-kohl.vercel.app/',
    demoPlatform: 'Vercel + HF Spaces',
    github: 'https://github.com/sidnov6/aegis-live',
    problem: [
      'Money laundering is confirmed retrospectively — live blockchain data never arrives with a "laundered: yes/no" label. So a credible system does what every real production AML stack does: it scores in real time, and humans confirm later. Live red flags are predictions; only sanctions exact-hits are ground truth.',
      'The hard part is the combination: resilient live ingestion, an event bus that survives bursts, a sliding-window graph, a graph/ML ensemble, on-chain sanctions screening, and a GenAI SAR layer — all inside a low-latency budget, on free infrastructure.',
    ],
    architecture: [
      { label: 'Resilient WS ingestion', detail: 'BTC mempool + exchange ticker, per-feed reconnect, exponential backoff, heartbeat.' },
      { label: 'Event bus', detail: 'Bounded queue with drop-oldest backpressure and adaptive sampling when it backs up.' },
      { label: 'Rolling graph', detail: 'Sliding-window in-memory transaction graph (NetworkX); nodes age out.' },
      { label: 'Live feature builder', detail: 'Strict train↔live parity — the live builder and the model share one FEATURE_NAMES list.' },
      { label: 'Ensemble scoring', detail: 'Sanctions screen (exact + N-hop) | LightGBM | IsolationForest anomaly → a human-readable reason.' },
      { label: 'Alert engine', detail: 'Threshold + dedup + rate-limit.' },
      { label: 'Explain + SAR', detail: 'Subgraph explanation + LLM-drafted SAR (LiteLLM; deterministic template fallback).' },
      { label: 'WebSocket hub → Wall', detail: 'Pushes to the Surveillance Wall UI; Postgres/SQLite store underneath.' },
    ],
    tradeoffs: [
      { choice: 'LightGBM + set-lookup sanctions on the fast path; heavier graph work off the hot loop.', why: 'A single-digit-millisecond p95 budget, measured and CI-gated. Latency is a feature here.' },
      { choice: 'One FEATURE_NAMES list shared by the live builder and the trained model, enforced by a parity CI gate.', why: 'Train/serve skew is the silent killer of streaming ML — the gate fails the build on drift.' },
      { choice: 'Honest labels — only sanctions exact-hits are "confirmed"; everything else is "risk / suspected".', why: 'Live data has no laundering label; claiming otherwise would be dishonest.' },
      { choice: 'Graceful degradation everywhere: feed down → demo source, model missing → heuristic, LLM down → template SAR, Postgres unset → SQLite.', why: 'A live wall must always have motion; nothing takes the system fully down.' },
    ],
    evals: [
      { metric: 'Fast-path latency', value: 'single-digit-ms p95', methodology: 'p50/p95/p99 measured and displayed; a CI gate enforces the budget.' },
      { metric: 'Detection', value: 'PR-AUC (high)', methodology: 'Synthetic AMLSim-style typologies — fan-in/out, peeling, pass-through — in live-parity features; Elliptic-swappable for labeled history.' },
      { metric: 'Feature parity', value: 'enforced', methodology: 'Live builder and model share FEATURE_NAMES; the parity gate fails the build on drift.' },
    ],
    proof: {
      title: 'Eval / CI gates + nightly lists',
      gates: [
        { name: 'Feature parity', threshold: 'no drift', value: 'gated' },
        { name: 'Fast-path p95', threshold: '≤ ms budget', value: 'gated' },
        { name: 'Detection PR-AUC / recall', threshold: '≥ floor', value: 'gated' },
      ],
      note: 'aegis/eval/gates.py runs in CI on every push; a GitHub Action refreshes the OFAC sanctions list nightly.',
    },
    value: 'Demonstrates the rare full stack — live ingestion, backpressure, a streaming graph, a graph/ML ensemble, sanctions screening, and a GenAI SAR layer — shipped as one low-latency system, solo, for $0.',
  },
  {
    slug: 'recoupe',
    title: 'Recoupe — Autonomous Subrogation',
    tagline: 'Seven agents that read a closed claim, assign fault by jurisdiction, compute what is recoverable, and pursue it — every decision citation-grounded and auditable.',
    category: 'Insurance · Agentic AI',
    color: '#4A1E3F',
    demoUrl: 'https://sidnov6-recoupe.hf.space/#/dashboard',
    demoPlatform: 'Hugging Face Spaces',
    problem: [
      'US property & casualty insurers leave an estimated $15–25B in subrogation recovery on the table every year — not because they cannot recover it, but because human adjusters can only work the biggest files. The long tail of small claims gets dropped at intake.',
      'Subrogation is an ideal agentic testbed: the ground truth is codifiable (negligence law is published, carrier behaviour is observable, recoverable amounts are derivable), and the decisions repeat with the same shape every time.',
    ],
    architecture: [
      { label: 'Intake', detail: 'Reads the claim file and extracts parties, losses, and fault facts (LLM extraction or deterministic heuristics).' },
      { label: 'Liability', detail: 'Assigns the fault percentage under the correct state\'s negligence regime (comparative / modified / contributory).' },
      { label: 'Quantum', detail: 'Computes the recoverable dollar amount given fault, damages, and policy limits.' },
      { label: 'Strategy', detail: 'Decides pursue or drop, with the threshold tunable per carrier.' },
      { label: 'Demand', detail: 'Drafts the demand letter with grounded statutory citations.' },
      { label: 'Negotiation', detail: 'Works counter-offers against carrier-specific settlement behaviour.' },
      { label: 'Litigation', detail: 'Escalates only when the expected value of suit beats settlement.' },
      { label: 'Audit trail', detail: 'Every decision appended with model, confidence, and evidence; streamed live to the UI over SSE.' },
    ],
    tradeoffs: [
      { choice: 'Deterministic skeleton, LLM polish — the math is codified Python; the model extracts and narrates.', why: 'Insurance is regulated. A system that produces different fault percentages run to run is not deployable; output is bit-identical without a key.' },
      { choice: 'A citation-integrity guardrail rejects unsourced authorities before they reach the audit trail.', why: 'Lawyers do not hire researchers who cite cases that do not exist; AI generating legal arguments should meet the same bar.' },
      { choice: 'The codified knowledge base (per-jurisdiction negligence rules + carrier graph) is the moat, not the agent chain.', why: 'Anyone can wire seven LLM calls together; almost nobody builds the per-jurisdiction map underneath.' },
      { choice: 'Audit trail as a first-class product feature.', why: 'The trail — model, confidence, evidence, approver — is what makes a compliance officer say yes.' },
    ],
    evals: [
      { metric: 'Recovery rate', value: 'measured', methodology: 'Actual recovered ÷ truly recoverable, on synthetic claims with known-true values.' },
      { metric: 'Liability MAE', value: 'measured (pts)', methodology: 'Mean absolute error in the fault percentage vs known truth.' },
      { metric: 'Quantum error', value: 'measured %', methodology: 'Mean error on the recoverable dollar amount.' },
      { metric: 'Citation integrity', value: 'tracked', methodology: 'Share of cited authorities that were genuinely retrieved.' },
    ],
    proof: {
      title: 'Self-grading on ground truth',
      gates: [
        { name: 'Liability MAE', threshold: 'tracked', value: 'scored' },
        { name: 'Quantum error', threshold: 'tracked', value: 'scored' },
        { name: 'Citation integrity', threshold: 'tracked', value: 'scored' },
      ],
      note: 'Synthetic claims carry known-true fault and recoverable values, so every agent decision is scored — most agentic demos have no quantitative answer to "how right is it?"',
    },
    value: 'Targets a real $15–25B annual leak with an auditable, citation-grounded pipeline — the long-tail claims humans cannot afford to chase, pursued at machine cost.',
  },
  {
    slug: 'quorum',
    title: 'QUORUM — AI Investment Committee',
    tagline: 'An AI investment committee that argues before it decides — and never makes up a number.',
    category: 'Investing · Multi-Agent',
    color: '#1F3A5F',
    demoUrl: 'https://frontend-nu-ecru-66.vercel.app/',
    demoPlatform: 'Vercel + Render',
    github: 'https://github.com/sidnov6/quorum-investment-committee',
    problem: [
      'Almost every "AI invests for you" demo fails the same way: the model states a number with total confidence and the number is wrong — a made-up P/E, a misremembered drawdown, a hallucinated return. In investing, a confidently wrong number is worse than no answer.',
      'The fix is architectural: split the system in two — deterministic computation underneath, language on top — so the failure mode is structurally impossible.',
    ],
    architecture: [
      { label: 'Universe + screen', detail: '51-name, 11-sector investable universe; point-in-time shortlist of the decision-relevant names.' },
      { label: 'Research briefs', detail: 'Per-name evidence assembled from the tools layer.' },
      { label: 'Bull & Bear', detail: 'Research independently, argue their case, then rebut each other — genuine disagreement, not one prompt nodding along.' },
      { label: 'Macro strategist', detail: 'Adds regime context.' },
      { label: 'Risk officer', detail: 'Computes the downside (vol, beta, VaR, drawdown) and can veto.' },
      { label: 'Portfolio manager', detail: 'Synthesizes the debate into actual weights.' },
      { label: 'Critic', detail: 'Stress-tests for groupthink — then the committee loops or converges.' },
      { label: 'Memo + human gate', detail: 'Allocation, rationale, and surviving dissent; streamed live to the Committee Room over SSE; a paper portfolio advances daily.' },
    ],
    tradeoffs: [
      { choice: 'Determinism boundary — prices (yfinance), fundamentals (SEC EDGAR), macro (FRED), and risk (NumPy/SciPy) are computed in Python; a grounding guardrail rejects any unsourced number; the LLM only narrates.', why: 'This is the whole point: it kills the confident-wrong-number failure that ruins AI-investing demos.' },
      { choice: 'Bull and Bear research independently before they rebut.', why: 'Genuine disagreement has to be engineered — a committee that always agrees is just one opinion in six hats.' },
      { choice: 'Honest backtest — point-in-time, no lookahead, trading costs included, vs SPY; reported as directional.', why: 'Backtests are small-sample and regime-dependent; better to under-claim than oversell an alpha.' },
      { choice: 'Runs with zero keys on free data, with provider failover on top.', why: 'Robustness and $0 — a single rate limit never takes the committee down.' },
    ],
    evals: [
      { metric: 'Backtest', value: 'vs SPY', methodology: '$10k paper book, point-in-time (no lookahead), trading costs included — reported as directionally reasonable, never "beats the market".' },
      { metric: 'Numbers', value: 'deterministic', methodology: 'Every figure computed in Python; a grounding guardrail rejects unsourced numbers before they enter the debate.' },
      { metric: 'Track record', value: 'live daily', methodology: 'The paper portfolio is advanced by a scheduled GitHub Action, accumulating a real history.' },
    ],
    proof: {
      title: 'Honest-by-construction backtest',
      gates: [
        { name: 'Lookahead', threshold: 'none', value: 'point-in-time' },
        { name: 'Trading costs', threshold: 'included', value: 'included' },
        { name: 'Every figure', threshold: 'sourced', value: 'sourced chip' },
      ],
      note: 'Results are reported as directionally reasonable, never as an alpha claim; low-confidence decisions are flagged, not hidden.',
    },
    value: 'Demonstrates the architecture finance AI actually needs — verifiable math underneath, language on top — applied to the hardest possible audience: the markets.',
  },
]

export const getCaseStudy = (slug: string) => CASE_STUDIES.find(c => c.slug === slug)
