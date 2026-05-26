import type { Post } from './posts'

const now = new Date().toISOString()

export const SEED_POSTS: Post[] = [
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
