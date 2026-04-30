export interface Question {
  id: string;
  text: string;
  keywords: string[];
  feedbackStrong: string[];
  feedbackAverage: string[];
  feedbackWeak: string[];
  tip: string;
}

export interface InterviewCategory {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  colorFrom: string;
  colorTo: string;
  glowColor: string;
  botIntro: string;
  questions: Question[];
}

export const INTERVIEW_CATEGORIES: InterviewCategory[] = [
  {
    id: "frontend",
    name: "Frontend Developer",
    shortName: "Frontend",
    emoji: "⚡",
    tagline: "React · JavaScript · CSS · Performance",
    description: "Tackle real-world frontend challenges covering React, JS, and web performance.",
    difficulty: "Intermediate",
    colorFrom: "#f59e0b",
    colorTo: "#ef4444",
    glowColor: "rgba(245, 158, 11, 0.3)",
    botIntro:
      "Hello! I'm your AI interviewer for this **Frontend Developer** session 🎯\n\nWe'll cover 5 questions on React, JavaScript, CSS, and performance optimization. Take your time — quality answers matter more than speed!\n\nYou can respond using the **microphone** or by **typing** your answer. I'll analyze your response and give you detailed feedback. Let's start! 🚀",
    questions: [
      {
        id: "f1",
        text: "Can you explain the difference between `useMemo` and `useCallback` in React? When would you use each one?",
        keywords: ["usememo", "usecallback", "memoize", "cache", "re-render", "dependency", "performance", "function", "value", "referential equality"],
        feedbackStrong: [
          "Excellent answer! 🌟 You clearly distinguished that `useMemo` caches computed **values** while `useCallback` caches **function references**. Your real-world use cases show deep understanding. Impressive!",
          "Brilliant! 🎉 You nailed both hooks — mentioning dependency arrays and referential equality is exactly what senior engineers talk about. Well done!",
        ],
        feedbackAverage: [
          "Good effort! 👍 You got the basics right. To level up, emphasize that `useMemo` memoizes computed values and `useCallback` memoizes function references — both helping avoid unnecessary re-renders when dependencies haven't changed.",
          "Decent answer! 💡 You're on the right track. Try to mention the concept of **referential equality** in JavaScript — that's why these hooks are needed when passing props to child components.",
        ],
        feedbackWeak: [
          "Let's build on this! 💪 `useMemo` is used to memoize expensive computed values, while `useCallback` is used to memoize function definitions. Both accept dependency arrays and only recompute when dependencies change. Try revisiting the React docs!",
          "Almost there! 🔥 The core idea: both hooks prevent unnecessary work, but `useMemo` returns a **value** (like a filtered array) and `useCallback` returns a **function**. A super useful tip for your next answer!",
        ],
        tip: "Think about dependency arrays and when JavaScript creates new object/function references on every render.",
      },
      {
        id: "f2",
        text: "What is event delegation in JavaScript, and why is it useful? Can you give a practical example?",
        keywords: ["event delegation", "event bubbling", "parent", "child", "performance", "dynamic", "listener", "propagation", "target"],
        feedbackStrong: [
          "Perfect answer! ⚡ You explained event bubbling, attaching the listener to a parent element, and the performance benefit with dynamic content. That's exactly the complete picture!",
          "Outstanding! 🏆 You covered delegation, bubbling, and practical uses like lists with dynamic items. You also mentioned `event.target` — great depth!",
        ],
        feedbackAverage: [
          "Good answer! 👌 You got the main concept. To strengthen it: mention that delegation works because of **event bubbling** — events propagate from child to parent. Also highlight that it helps with **dynamically added elements** that don't exist when the page loads.",
          "Solid foundation! 🌱 You understand the concept. Try adding a concrete example — like attaching one click handler to a `<ul>` instead of one per `<li>` — to really sell your understanding.",
        ],
        feedbackWeak: [
          "Great start! 🎯 Event delegation means attaching ONE event listener to a **parent** element instead of many to children. When a child is clicked, the event bubbles up to the parent. This is great for performance and for dynamically created elements!",
          "Good attempt! 💡 The key insight is: instead of adding listeners to every list item, add ONE to the parent list. Less memory usage, and it works for items added later too!",
        ],
        tip: "Think about what happens when you have 1000 list items — attaching 1000 event listeners vs just 1 on the parent.",
      },
      {
        id: "f3",
        text: "How do you optimize the performance of a slow React application? Walk me through your debugging and optimization process.",
        keywords: ["profiler", "memo", "lazy", "code splitting", "virtualization", "re-render", "bundle", "optimization", "performance", "devtools", "suspense", "memoization"],
        feedbackStrong: [
          "Fantastic answer! 🚀 You covered profiling with React DevTools, `React.memo`, `useMemo`/`useCallback`, code splitting with `React.lazy`, list virtualization, and bundle analysis. That's a complete playbook!",
          "Superb! 🌟 Systematic approach: profile first, then fix. Mentioning virtualization for large lists, lazy loading, and avoiding prop drilling shows senior-level thinking!",
        ],
        feedbackAverage: [
          "Good thinking! 👍 You touched on key points. A complete answer also includes: **profiling with React DevTools Profiler** first (don't optimize blindly!), then applying `React.memo`, code splitting, and list virtualization for large datasets.",
          "Nice approach! 🎯 You're thinking about the right things. Add to your answer: always start by **identifying the bottleneck** with the Profiler, then consider if unnecessary re-renders, large bundle size, or unvirtualized lists are the culprit.",
        ],
        feedbackWeak: [
          "Let's expand on this! 💡 Key optimizations include: 1️⃣ Profile with React DevTools Profiler, 2️⃣ Prevent re-renders with `React.memo` + `useMemo`, 3️⃣ Code split with `React.lazy + Suspense`, 4️⃣ Virtualize long lists with `react-window`. This is a common interview topic!",
          "Building blocks! 🔥 Performance optimization starts with **measuring**, not guessing. Use the React DevTools Profiler to find slow components, then apply targeted fixes like memoization or lazy loading.",
        ],
        tip: "Interviewers love systematic approaches: measure → identify → fix → verify. Never optimize without profiling first!",
      },
      {
        id: "f4",
        text: "Explain the CSS Box Model. What's the difference between `box-sizing: content-box` and `box-sizing: border-box`?",
        keywords: ["content", "padding", "border", "margin", "box-sizing", "border-box", "content-box", "width", "height", "layout"],
        feedbackStrong: [
          "Spot on! 🎨 You correctly explained all four layers (content, padding, border, margin) and the key difference: `content-box` adds padding/border **on top of** the width, while `border-box` **includes** them in the width. Great practical knowledge!",
          "Perfect! ✨ You nailed the box model and explained why most developers set `* { box-sizing: border-box }` globally — makes sizing predictable. Excellent!",
        ],
        feedbackAverage: [
          "Good foundation! 👍 You got most of it. Remember the key distinction: with `content-box`, a 200px wide element with 20px padding is actually **240px** wide on screen. With `border-box`, it stays 200px. This is why `border-box` is the modern default!",
          "Solid answer! 💡 You covered the layers well. Emphasize the **practical impact**: content-box makes width calculations confusing (need to add padding/border mentally), while border-box makes it intuitive — what you set is what you get.",
        ],
        feedbackWeak: [
          "Let's build! 📐 The Box Model has 4 layers from inside out: Content → Padding → Border → Margin. The `box-sizing` property determines if padding/border are **included in** the width (border-box) or **added to** it (content-box). Border-box is much more predictable!",
          "Good start! 🌱 Key concept: `box-sizing: border-box` means if you set `width: 200px`, the element will always be 200px regardless of padding/border. It's more intuitive and most modern projects use it as the global default.",
        ],
        tip: "Almost every CSS reset or framework sets `* { box-sizing: border-box }` — understanding why shows real-world CSS knowledge.",
      },
      {
        id: "f5",
        text: "What are JavaScript closures and why are they useful? Provide a practical use case.",
        keywords: ["closure", "scope", "function", "variable", "encapsulation", "private", "outer", "lexical", "module", "factory"],
        feedbackStrong: [
          "Brilliant explanation! 🧠 You correctly defined closures as functions retaining access to their outer scope even after the outer function returns, and gave solid use cases like data privacy/encapsulation and function factories. That's complete!",
          "Excellent! ⚡ You covered lexical scoping, the closure mechanism, and practical patterns like module pattern or memoization. Strong JavaScript fundamentals!",
        ],
        feedbackAverage: [
          "Good answer! 👌 You have the concept. Strengthen it with: closures are how JavaScript achieves **private variables** — since there's no true `private` keyword in JS without classes. The counter example or memoization functions are great patterns to mention.",
          "Nice! 🎯 You understand what closures do. A complete answer connects closures to real patterns: **IIFE (Immediately Invoked Function Expressions)**, function factories, or `useCallback` in React — which uses closures under the hood!",
        ],
        feedbackWeak: [
          "Great attempt! 💡 A closure is when an inner function retains access to variables from its outer function's scope, even after the outer function finishes executing. Classic example: a `makeCounter()` function that returns a `count` function — the inner function 'closes over' the `count` variable.",
          "Building blocks! 🔥 Think of it this way: if function B is defined inside function A, function B can always 'remember' and access A's variables. This is a closure. It's the basis of patterns like module pattern and private data in JS.",
        ],
        tip: "Closures are the foundation for module patterns, data privacy, and are used constantly in React hooks (useCallback, useState callbacks).",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Engineer",
    shortName: "Backend",
    emoji: "🔧",
    tagline: "APIs · Databases · Architecture · Security",
    description: "Deep-dive into APIs, databases, authentication, and distributed systems.",
    difficulty: "Intermediate",
    colorFrom: "#10b981",
    colorTo: "#059669",
    glowColor: "rgba(16, 185, 129, 0.3)",
    botIntro:
      "Welcome! I'm your Backend Engineering interviewer 🔧\n\n5 questions covering APIs, databases, authentication, and distributed architecture. These questions reflect what top-tier companies ask in real interviews.\n\nAnswer using the **microphone** or **type** your response. I'll give you structured feedback after each answer. Ready? Let's begin! 💪",
    questions: [
      {
        id: "b1",
        text: "What is the difference between REST and GraphQL? When would you choose one over the other?",
        keywords: ["rest", "graphql", "endpoint", "query", "overfetching", "underfetching", "flexible", "schema", "mutation", "subscription", "http"],
        feedbackStrong: [
          "Excellent! 🏆 You nailed the key differences: REST uses multiple fixed endpoints while GraphQL uses a single endpoint with flexible queries. You correctly identified overfetching/underfetching as GraphQL's main motivation. Great answer!",
          "Superb! 🌟 Covering overfetching, schema introspection, real-time subscriptions, and when REST is actually better (simple CRUD APIs) shows balanced, senior-level thinking!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To round it out: the biggest GraphQL advantage is clients request **exactly the data they need** (solving REST's over/under-fetching). The biggest REST advantage is simplicity, caching, and familiarity. Mention specific use cases: GraphQL for complex frontends, REST for simple services.",
          "Nice! 💡 You've got the basics. Add: GraphQL has a **type system and schema** which enables great tooling and self-documentation. But REST scales caching more easily (CDNs cache GET requests naturally). Trade-offs matter in real answers!",
        ],
        feedbackWeak: [
          "Let's build on this! 📡 REST uses multiple URLs (endpoints) where each represents a resource. GraphQL uses **one endpoint** where clients write queries describing exactly what data they want — no more, no less. REST is simpler; GraphQL is more flexible for complex data needs.",
          "Good start! 🔥 Key distinction: with REST, you might need 3 API calls to fetch a user, their posts, and their followers. With GraphQL, that's **one query**. GraphQL solves overfetching (getting too much data) and underfetching (needing multiple requests).",
        ],
        tip: "Mention specific scenarios: REST for public APIs (easier to document, cache), GraphQL for complex product frontends with many related data types.",
      },
      {
        id: "b2",
        text: "Explain database indexing. How does it work, and what are the trade-offs of using too many indexes?",
        keywords: ["index", "b-tree", "query", "performance", "read", "write", "lookup", "trade-off", "storage", "slow", "insert", "update"],
        feedbackStrong: [
          "Spot-on! 🎯 You explained B-tree structure, O(log n) lookups, and the critical trade-off: indexes speed up reads but slow down writes and consume storage. Mentioning composite indexes and cardinality shows depth!",
          "Outstanding! ⚡ Covering the data structure (B-tree), the write penalty on INSERT/UPDATE/DELETE, storage costs, and the importance of the query planner — that's a comprehensive senior engineer answer!",
        ],
        feedbackAverage: [
          "Good answer! 👌 To strengthen: indexes are typically implemented as **B-trees** (balanced tree) which allow O(log n) lookups instead of O(n) full table scans. The trade-off: every write (INSERT/UPDATE/DELETE) must also update the index. Too many indexes → slow writes!",
          "Nice foundation! 💡 You're right about the performance boost. Add the key trade-offs: **storage overhead** (indexes take disk space), **write overhead** (every modification updates all relevant indexes), and **maintenance** (indexes can become fragmented over time).",
        ],
        feedbackWeak: [
          "Let's expand! 📊 An index is like a book's index page — instead of scanning every row (full table scan), the database jumps directly to the relevant rows. Internally it's often a **B-tree** structure. Trade-offs: faster reads, but slower writes and more storage since every index must be updated on INSERT/UPDATE/DELETE.",
          "Building blocks! 🏗️ Think of indexing like sorting a phonebook by last name. Finding 'Smith' is fast because it's sorted! But every time someone new signs up, you need to re-insert them in sorted order (write overhead). That's the fundamental trade-off.",
        ],
        tip: "Always mention the read/write trade-off and that high-write tables (like logs) should have minimal indexes.",
      },
      {
        id: "b3",
        text: "How do you implement authentication and authorization in a RESTful API? Explain JWT tokens and their advantages.",
        keywords: ["jwt", "token", "authentication", "authorization", "header", "bearer", "refresh", "expire", "payload", "secret", "stateless", "oauth", "session"],
        feedbackStrong: [
          "Excellent! 🔐 You correctly separated **authentication** (who are you?) from **authorization** (what can you do?), explained JWT structure (header.payload.signature), the stateless advantage for scaling, and the security considerations. Complete answer!",
          "Perfect! 🌟 Covering JWT's three parts, signing with a secret, stateless verification, expiration with refresh tokens, and HTTPS requirement — that's what security-conscious engineers know!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To complete it: JWT structure is `header.payload.signature` — the signature is cryptographically signed with a secret key, so the server can verify it without database lookup (stateless). Add: always use short expiry + refresh tokens, and **always use HTTPS**!",
          "Nice! 💡 You've got the JWT concept. Distinguish: **Authentication** = verifying identity (login), **Authorization** = checking permissions (can this user access this resource?). JWT handles authentication; role-based checks handle authorization. These are different concerns!",
        ],
        feedbackWeak: [
          "Let's build on this! 🔑 Authentication verifies who you are; authorization checks what you're allowed to do. JWT (JSON Web Token) is a self-contained token with: `header` (algorithm), `payload` (user data), and `signature` (cryptographic verification). The server signs it; future requests just verify the signature — no database lookup needed (stateless)!",
          "Good start! 🛡️ The flow: 1) User logs in → server creates a signed JWT → returns to client. 2) Client sends JWT in `Authorization: Bearer <token>` header on future requests. 3) Server verifies signature — no session storage needed. That's the beauty of JWT: it's **stateless** and scales well!",
        ],
        tip: "Interviewers love when you mention access token expiry (short: 15min), refresh tokens (longer lived), and storing tokens in httpOnly cookies vs localStorage.",
      },
      {
        id: "b4",
        text: "Explain the CAP theorem. As a backend engineer, how does it influence your choice of database?",
        keywords: ["cap", "consistency", "availability", "partition", "tolerance", "distributed", "trade-off", "sql", "nosql", "mongodb", "postgres", "cassandra", "eventual"],
        feedbackStrong: [
          "Brilliant! 🧠 You correctly explained that in a distributed system you can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance. And since P is unavoidable in real networks, the real choice is CP vs AP. Excellent real-world application!",
          "Outstanding! ⚡ Covering CP (consistent but may be unavailable), AP (always available but possibly stale), real database examples (MongoDB=CP, Cassandra=AP), and when to choose each — that's senior-level distributed systems knowledge!",
        ],
        feedbackAverage: [
          "Good answer! 👌 To sharpen: since **network partitions happen in any real distributed system**, you always need Partition Tolerance. So the real trade-off is **CP** (Consistency + Partition: may reject requests to stay consistent) vs **AP** (Availability + Partition: always responds but data may be stale).",
          "Nice foundation! 💡 Real examples help: **PostgreSQL** prioritizes consistency (CP). **Cassandra** prioritizes availability with eventual consistency (AP). The question to ask: 'Is it worse to show stale data, or to show an error?' — that guides your choice!",
        ],
        feedbackWeak: [
          "Let's explore! 🌐 CAP says a distributed database can only guarantee **2 of**: Consistency (all nodes see same data), Availability (always responds), Partition Tolerance (works despite network splits). Since network partitions are inevitable, you choose: **CP** (consistent but might fail) or **AP** (always responds but might return stale data).",
          "Good attempt! 🔥 Simplified: imagine two database servers that lose connection. CP databases **refuse to respond** until they sync (banking apps need this). AP databases **respond immediately** with potentially stale data (social media can tolerate this). Choose based on your app's tolerance for inconsistency!",
        ],
        tip: "Mention a real-world example: banking needs CP (can't have two accounts show different balances), while a social media feed can tolerate eventual consistency (AP).",
      },
      {
        id: "b5",
        text: "What are microservices? What are their benefits and challenges compared to a monolithic architecture?",
        keywords: ["microservice", "monolith", "service", "independent", "scale", "deploy", "communicate", "api", "latency", "complexity", "docker", "kubernetes", "fault isolation"],
        feedbackStrong: [
          "Perfect answer! 🏗️ You covered independent deployability, technology flexibility, fault isolation, and horizontal scaling. And importantly, you acknowledged the challenges: network latency, distributed transactions, and operational complexity. Balanced thinking!",
          "Excellent! 🌟 Comparing monolith vs microservices with real trade-offs (simple to start vs scalable at scale), mentioning service discovery, API gateways, and eventual consistency shows real-world architectural maturity!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Add the key challenges: **distributed transactions** are hard (no simple rollback), **network latency** adds up with many service calls, and **operational overhead** increases (you need CI/CD, containers, monitoring per service). Microservices aren't always better — start with a monolith!",
          "Nice! 💡 You've got the benefits down. Balance with challenges: microservices introduce **network calls** instead of in-process calls (slower), require **service discovery**, and make debugging harder (requests span multiple services). 'Microservices as default' is actually an anti-pattern — you earn them!",
        ],
        feedbackWeak: [
          "Let's build on this! 📦 A **monolith** is one big application. **Microservices** split it into small, independent services (user service, payment service, etc.), each with its own database and deployable independently. Benefits: scale individual services, different tech stacks, fault isolation. Challenges: network overhead, complex deployments, distributed transactions.",
          "Good start! 🔧 Think of it like: instead of one big restaurant that does everything, microservices are specialized food stalls. Each can be scaled, updated, or replaced independently. But coordinating them (which table goes where, how do they talk?) adds complexity!",
        ],
        tip: "Martin Fowler's advice: 'Don't start with microservices. Start with a monolith, understand the domain, then split when you feel the pain.' Interviewers love this nuance.",
      },
    ],
  },
  {
    id: "system-design",
    name: "System Design",
    shortName: "System Design",
    emoji: "🏗️",
    tagline: "Scale · Architecture · Distributed Systems",
    description: "Design scalable systems and distributed architectures like senior engineers.",
    difficulty: "Advanced",
    colorFrom: "#3b82f6",
    colorTo: "#6366f1",
    glowColor: "rgba(99, 102, 241, 0.3)",
    botIntro:
      "Welcome to the System Design interview! 🏗️\n\nThis session covers 5 architectural challenges — the kind asked at FAANG and top-tier companies. There's no single right answer; I'm evaluating your **thought process**, trade-offs, and ability to reason at scale.\n\nAnswer using the **microphone** or **type** your response. Think out loud — it shows your reasoning! 🧠",
    questions: [
      {
        id: "sd1",
        text: "How would you design a URL shortener like bit.ly? Walk me through the key components and how you'd handle scale.",
        keywords: ["hash", "database", "redirect", "cache", "unique", "base62", "collision", "sharding", "load balancer", "cdn", "analytics", "counter"],
        feedbackStrong: [
          "Excellent design! 🏆 You covered hashing (base62 encoding), collision handling, database design, caching with Redis for hot URLs, load balancing, and analytics tracking. That's a production-ready design!",
          "Outstanding! ⚡ Mentioning base62 encoding for short codes, Redis for 301 vs 302 redirects and caching, read-heavy optimization, and database sharding by hash shows senior system design thinking!",
        ],
        feedbackAverage: [
          "Good design! 👍 To complete it: the core is a **hash function** (e.g., MD5 first 6 chars or base62 encoded ID) → stored in DB (shortCode → longURL). Add a **Redis cache** for popular URLs (the top 20% handle 80% of traffic). Handle collisions by appending a counter or retrying with different seeds.",
          "Nice start! 💡 You have the basics. Also discuss: **301 vs 302 redirects** (301 is permanent and browsers cache it — good for performance but makes analytics harder; 302 always checks the server — better for tracking). And **analytics**: how do you count clicks efficiently without slowing down redirects?",
        ],
        feedbackWeak: [
          "Let's design together! 🔗 Key components: 1) **Short code generation** — hash the URL (MD5) and take first 6 chars, or use base62(autoincrement ID). 2) **Database** — store shortCode → longURL mapping. 3) **Cache** (Redis) — cache hot URLs for instant redirect. 4) **Load balancer** — distribute traffic. That's the core!",
          "Building blocks! 🏗️ The core question: how to generate a unique short code? Option A: hash the URL. Option B: auto-increment a counter and base62-encode it (0-9, a-z, A-Z = 62 chars). 6 chars = 62^6 = ~56 billion unique URLs. Then store in DB and add a cache for popular ones!",
        ],
        tip: "Always start with requirements (read/write ratio, scale, analytics needed), then design the happy path, then handle edge cases and scale.",
      },
      {
        id: "sd2",
        text: "Explain the difference between horizontal and vertical scaling. When would you use each approach?",
        keywords: ["horizontal", "vertical", "scale out", "scale up", "server", "cpu", "memory", "load balancer", "stateless", "sharding", "replication", "cost"],
        feedbackStrong: [
          "Perfect explanation! 📈 You correctly defined vertical (bigger machine) vs horizontal (more machines) scaling, their limits (vertical hits hardware ceilings), cost curves (horizontal gets cheaper at scale), and the need for stateless services to scale horizontally. Complete answer!",
          "Excellent! 🌟 Covering vertical scaling's simplicity (no code changes needed) vs horizontal's complexity (need load balancers, stateless design, session management) but infinite growth potential — that's the nuanced answer engineers give!",
        ],
        feedbackAverage: [
          "Good answer! 👌 Add the nuance: vertical scaling is **simpler** (no code changes, no load balancer needed) but has a **hard ceiling** (you can't add infinite RAM/CPU). Horizontal scaling requires your application to be **stateless** (don't store user session on the server itself) — that's the key architectural constraint.",
          "Nice! 💡 Real-world guidance: start with vertical scaling (simpler, cheaper at small scale). As you grow, the cost curve flips — many small machines become cheaper than one massive one. But horizontal scaling requires designing for **state management** (use Redis for sessions, S3 for files).",
        ],
        feedbackWeak: [
          "Let's clarify! ⬆️ **Vertical scaling (scale up)**: make the existing server more powerful (add CPU, RAM). Simple, but limited by hardware ceiling. **Horizontal scaling (scale out)**: add more servers behind a load balancer. Nearly unlimited growth, but requires stateless app design. Most modern systems eventually go horizontal!",
          "Good start! 🖥️ Think of it like: vertical = upgrade your car engine. Horizontal = buy more cars and coordinate them. Vertical is simpler but there's a limit to how big one car can get. Horizontal needs a dispatch system (load balancer) but can grow indefinitely!",
        ],
        tip: "Mention that most applications start vertical (simple) and migrate to horizontal. Stateless application design is the prerequisite for horizontal scaling.",
      },
      {
        id: "sd3",
        text: "How would you design a distributed caching system? What are the key challenges and eviction strategies?",
        keywords: ["cache", "redis", "memcached", "eviction", "lru", "lfu", "ttl", "invalidation", "consistency", "distributed", "hash", "hit rate", "miss", "warm"],
        feedbackStrong: [
          "Brilliant! 🧠 You covered cache types (L1/L2, distributed), eviction policies (LRU for recency, LFU for frequency), TTL-based expiry, cache invalidation strategies (write-through, write-back, write-around), and consistency challenges. That's expert-level caching knowledge!",
          "Outstanding! ⚡ Mentioning consistent hashing for distributing keys across Redis nodes, cache stampede prevention, hot key problems, and cache warming — that's senior distributed systems thinking!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To go deeper: the hardest part of caching is **cache invalidation** — when does the cache know it has stale data? Common strategies: **TTL** (auto-expire after X seconds), **write-through** (update cache on every write), **write-back** (async cache updates). Also mention **LRU** (Least Recently Used) as the most common eviction policy.",
          "Nice foundation! 💡 Add eviction policies: **LRU** evicts the least recently accessed item (good for temporal locality), **LFU** evicts least frequently accessed (better for repeated popular items). And the key challenge: **cache invalidation** — how do you ensure the cache reflects the source of truth?",
        ],
        feedbackWeak: [
          "Let's explore! 💾 A cache stores frequently accessed data in fast memory (Redis, Memcached) to avoid slow database queries. Key decisions: 1) **What to cache?** — hot read data. 2) **How long?** — TTL (Time To Live). 3) **What to evict when full?** — LRU (remove least recently used). The hard problem: keeping cache consistent with the database!",
          "Good attempt! 🔥 Core idea: cache = fast temporary storage. Store results of expensive queries. Read from cache first; if missing (cache miss), read DB and store in cache. **LRU eviction** = when cache is full, remove the item not used for the longest time. **TTL** = auto-expire items after N seconds.",
        ],
        tip: "The hardest part of caching is cache invalidation — Phil Karlton famously said it's one of the two hardest problems in CS. Mention write-through vs write-back vs TTL strategies.",
      },
      {
        id: "sd4",
        text: "Design a notification system that can send real-time notifications to millions of users across email, SMS, and push. How do you ensure reliability?",
        keywords: ["queue", "kafka", "rabbitmq", "worker", "retry", "idempotent", "fan-out", "websocket", "push", "email", "sms", "reliability", "delivery", "deduplication"],
        feedbackStrong: [
          "Excellent architecture! 🔔 You covered the event-driven queue approach (Kafka/RabbitMQ), fan-out for multi-channel delivery, worker pools per channel, retry with exponential backoff, idempotency keys to prevent duplicates, and delivery tracking. Production-ready design!",
          "Outstanding! 🌟 Mentioning the message queue for decoupling producers from consumers, dead letter queues for failed messages, deduplication, rate limiting per user, and delivery receipts shows you've thought about reliability deeply!",
        ],
        feedbackAverage: [
          "Good design! 👍 Key addition: use a **message queue** (Kafka, RabbitMQ) between your app and notification workers. This decouples systems and handles traffic spikes (queue absorbs bursts). Add: **retry with exponential backoff** for failed deliveries, **idempotency keys** to prevent duplicate sends if retried, and **dead letter queues** for messages that keep failing.",
          "Nice! 💡 To ensure reliability: 1) **Queue everything** — don't call SMS/email APIs synchronously. 2) **Retry failed deliveries** with backoff. 3) **Track delivery status** (sent, delivered, failed). 4) **Idempotency keys** ensure retries don't send duplicates. These are the production-critical details!",
        ],
        feedbackWeak: [
          "Let's design! 🔔 Core pattern: **event-driven with message queues**. When a notification should be sent, publish an event to a queue (Kafka/RabbitMQ). Workers consume from the queue and call the appropriate channel API (SendGrid for email, Twilio for SMS, FCM for push). If delivery fails, retry! This decouples and makes it reliable.",
          "Building blocks! 📨 Think: 1) **Producer** (your app) publishes notification events to a queue. 2) **Consumer workers** read from queue and send via each channel. 3) **Retry logic** handles failures. 4) **Status tracking** in a DB. The queue is key — it handles traffic spikes and retries without losing messages.",
        ],
        tip: "Reliability comes from queues (durability), retries (resilience), idempotency (correctness), and monitoring. Always mention all four when discussing reliability.",
      },
      {
        id: "sd5",
        text: "How do you approach database sharding? Explain different sharding strategies and when to use them.",
        keywords: ["sharding", "horizontal", "partition", "shard key", "hash", "range", "directory", "hotspot", "rebalancing", "consistent hashing", "query", "join"],
        feedbackStrong: [
          "Impressive! 🗄️ You covered hash sharding (uniform distribution), range sharding (good for range queries), directory-based sharding (flexible but has single point of failure risk), hotspot problems, consistent hashing for rebalancing, and cross-shard query challenges. Complete answer!",
          "Excellent! ⚡ Mentioning hash vs range sharding trade-offs, consistent hashing for minimal reshuffling when adding nodes, and the challenges of cross-shard JOINs and distributed transactions — that's senior DB architecture knowledge!",
        ],
        feedbackAverage: [
          "Good answer! 👌 Key detail: **hash sharding** distributes evenly but makes range queries hard (all shards must be queried). **Range sharding** is great for date-based queries but can create hotspots (everyone writes to 'this month's shard'). Add: **consistent hashing** minimizes data movement when adding/removing shards.",
          "Nice! 💡 Critical challenge with sharding: **hotspots**. If you shard by user_id modulo 10, and user 1234 has millions of followers, all requests to that user hit one shard. Mention hotspot mitigation (add a random suffix, virtual nodes) — this separates candidates from standout answers!",
        ],
        feedbackWeak: [
          "Let's learn! 📊 Sharding splits a large database table across multiple servers. Each server holds a **shard** (subset of data). **Shard key** determines which server holds which data. Strategies: **Hash** (hash the shard key → uniform distribution), **Range** (by date, alphabetical → good for range queries but can cause hotspots). Cross-shard queries are the main challenge!",
          "Good start! 🏗️ Think of sharding like splitting a phone book: A-M on server 1, N-Z on server 2 (range sharding). Or: hash the user ID and put odd IDs on server 1, even on server 2 (hash sharding). The challenge: lookups and queries that span both servers are expensive!",
        ],
        tip: "Always discuss the trade-off between hash sharding (even distribution, hard range queries) and range sharding (natural range queries, hotspot risk). Consistent hashing shows deep knowledge.",
      },
    ],
  },
  {
    id: "behavioral",
    name: "Behavioral (HR)",
    shortName: "Behavioral",
    emoji: "💬",
    tagline: "STAR Method · Leadership · Soft Skills",
    description: "Ace behavioral questions with the STAR framework and compelling stories.",
    difficulty: "Beginner",
    colorFrom: "#ec4899",
    colorTo: "#db2777",
    glowColor: "rgba(236, 72, 153, 0.3)",
    botIntro:
      "Hello! I'm your Behavioral Interview coach 💬\n\nThese questions focus on your **past experiences** and how you handle real situations. Use the **STAR framework**: Situation, Task, Action, Result.\n\nBe specific, use 'I' not 'we', quantify results where possible, and keep stories to 2-3 minutes. Ready to practice telling your story? 🌟",
    questions: [
      {
        id: "bh1",
        text: "Tell me about yourself. How would you describe your professional journey and what brings you to this role?",
        keywords: ["experience", "background", "role", "achieve", "skill", "passion", "goal", "team", "project", "learn", "growth"],
        feedbackStrong: [
          "Wonderful introduction! 🌟 You structured your story well: past experience → current skills → future goals. You connected your background to this specific role and showed genuine enthusiasm. Memorable and professional!",
          "Excellent! ✨ Clear narrative arc, specific achievements mentioned, and a strong 'why this role' connection. You sounded confident without rambling — that's the perfect 'tell me about yourself' answer!",
        ],
        feedbackAverage: [
          "Good start! 👍 To make it stronger: follow the **Present-Past-Future** structure. Start with your current role/situation, briefly explain your journey (past), then pivot to your excitement about this specific role (future). Keep it to 2 minutes and always end with **why this role** — that's what interviewers really want to know!",
          "Nice! 💡 Your answer is solid. Level it up by: 1) Mentioning 1-2 **specific achievements** (not just responsibilities), 2) Connecting your skills to what **this company** needs, 3) Showing genuine enthusiasm for the role. Personalization to the specific job is what makes answers memorable!",
        ],
        feedbackWeak: [
          "Great start! 🎤 Try this structure: **Present** (current role and 1-2 achievements) → **Past** (brief background, how you got here) → **Future** (why you're excited about this opportunity). Keep it under 2 minutes, be specific, and end with a strong connection to why THIS role/company excites you!",
          "Good attempt! 💡 Remember: 'Tell me about yourself' is not asking for your life story. It's your **professional elevator pitch**. Focus on: what you do, what you're good at, a quick achievement, and why you want this specific role. Practice it until it feels natural!",
        ],
        tip: "Interviewers use this to evaluate your communication skills and self-awareness. Have a crisp 90-second version memorized. Always end with why this specific role.",
      },
      {
        id: "bh2",
        text: "Describe a time when you faced a significant challenge or failure on a project. How did you handle it and what did you learn?",
        keywords: ["challenge", "failure", "learn", "overcome", "mistake", "improve", "reflect", "action", "result", "responsibility", "change"],
        feedbackStrong: [
          "Authentic and powerful! 🌟 You took ownership without making excuses, clearly explained what went wrong, the specific actions you took to address it, and most importantly — what you learned and changed as a result. That's exactly the vulnerability + growth mindset interviewers want to see!",
          "Excellent! ✨ Strong use of the STAR framework: clear Situation and Task, specific Actions, tangible Results, and a genuine Lesson. Owning the failure while showing growth makes you highly credible. Interviewers trust people who can reflect critically!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Two things to strengthen: 1) Make sure the **failure is real** — interviewers see through 'humble brag' failures like 'I worked too hard.' Pick a genuine mistake. 2) Spend more time on the **lesson and what changed** — that's the most important part. What do you do differently now?",
          "Nice! 💡 Good use of STAR. To elevate: be more specific about the **impact** of the failure (what went wrong, what was the cost?) and most importantly, explain the **concrete behavioral change** you made. 'I now do X every time' is much stronger than 'I learned to communicate better.'",
        ],
        feedbackWeak: [
          "Good attempt! 💪 Use the **STAR framework**: **S**ituation (context), **T**ask (what was your responsibility), **A**ction (what you specifically did), **R**esult (what happened, what you learned). The key: choose a REAL failure, take ownership, show what you learned and changed. Interviewers want growth mindset, not perfection!",
          "Let's structure this! 🔥 For failure questions: 1) Describe a real mistake (not a humble brag). 2) Own it completely — no blame on others. 3) Explain the specific actions you took to fix it. 4) Share what concrete change you made. End on an **upward trajectory** — you're better because of it!",
        ],
        tip: "Avoid: choosing a failure that's actually a strength ('I care too much!'), blaming others, or choosing something too trivial. Pick a real, meaningful mistake with genuine learning.",
      },
      {
        id: "bh3",
        text: "Tell me about a time you had a conflict with a team member or manager. How did you resolve it?",
        keywords: ["conflict", "disagreement", "resolve", "communication", "listen", "compromise", "understand", "perspective", "professional", "outcome", "feedback"],
        feedbackStrong: [
          "Excellent! 🤝 You showed emotional intelligence by seeking to understand their perspective first, described a professional conversation focused on the work (not personal), found a solution that respected both viewpoints, and maintained the relationship. That's conflict resolution at its best!",
          "Outstanding! ✨ You demonstrated self-awareness (acknowledging your own role in the conflict), empathy (understanding their perspective), and professionalism (keeping it about the work). The positive outcome and stronger relationship shows real maturity!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To make it stronger: show that you **sought to understand** their perspective before trying to be understood (the 'seek first to understand' principle). What was their reasoning? Being able to articulate their viewpoint shows empathy and makes your answer much more credible.",
          "Nice! 💡 Good story. Level up by: 1) Being specific about **what you said** in the difficult conversation (this shows you can actually have hard conversations), 2) Showing you **owned your part** in the conflict — was there anything you could have done differently? 3) Describing the **relationship after** — ideally stronger.",
        ],
        feedbackWeak: [
          "Let's strengthen this! 💼 For conflict questions: 1) Choose a **real conflict**, not a minor disagreement. 2) Show you **initiated the conversation** professionally (you didn't wait or escalate to management first). 3) Show empathy — explain their perspective. 4) Describe the **resolution** — what was agreed. 5) End with the relationship being **preserved or stronger**. Interviewers are checking emotional intelligence!",
          "Good start! 🗣️ Structure: S (what was the conflict about), T (your goal was resolution not winning), A (I initiated a private conversation, listened to their perspective, shared mine, found common ground), R (we agreed on X, relationship was preserved). Never say 'I went to my manager' as a first step — that shows low EQ!",
        ],
        tip: "Golden rule: never make the other person look bad. Show you can see their perspective and that the relationship was preserved. Emotional intelligence is what they're testing.",
      },
      {
        id: "bh4",
        text: "Describe a situation where you had to lead a project or initiative without formal authority. How did you get others on board?",
        keywords: ["lead", "influence", "persuade", "stakeholder", "buy-in", "vision", "collaborate", "communicate", "result", "align", "initiative", "impact"],
        feedbackStrong: [
          "Impressive leadership story! 🚀 You demonstrated leading through influence — building consensus, addressing concerns, communicating the vision compellingly, and achieving results without relying on authority. That's the kind of cross-functional leadership that drives real impact!",
          "Excellent! 🌟 You showed clear initiative, stakeholder mapping (knowing who to influence and how), transparent communication, handling resistance gracefully, and measurable outcomes. This is exactly the 'leadership' story senior roles require!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Strengthen the 'how you got buy-in' section: be specific about **what you said/did** to persuade. Did you show data? Address concerns individually? Connect to people's personal goals? Show a quick win first? The specific tactics are what prove you can actually influence without authority.",
          "Nice! 💡 Good story structure. To level up: show that you understood **what each stakeholder cared about** and tailored your message accordingly. A great influencer doesn't have one pitch — they connect their idea to what matters to EACH person they need on board.",
        ],
        feedbackWeak: [
          "Let's build on this! 👑 For leadership without authority questions, show: 1) You saw an opportunity or problem others missed. 2) You had a **clear vision** and communicated it. 3) You **identified key stakeholders** and understood their motivations. 4) You **addressed concerns** proactively. 5) You delivered **results** that validated the initiative. Influence = vision + communication + persistence!",
          "Good attempt! 🔥 Key insight: leading without authority is about **persuasion and trust**, not position. What data or reasoning did you use? How did you address skeptics? What's in it for them? A great answer shows you can get things done in any organizational structure!",
        ],
        tip: "Companies want leaders at every level. This question tests if you can drive impact without relying on 'because I'm the boss.' Specific persuasion tactics are gold here.",
      },
      {
        id: "bh5",
        text: "Where do you see yourself in 5 years? How does this role fit into your long-term career goals?",
        keywords: ["goal", "grow", "skill", "leadership", "impact", "learn", "contribute", "career", "develop", "advance", "vision", "role"],
        feedbackStrong: [
          "Thoughtful and strategic! 🎯 You showed ambition with a realistic trajectory, connected your 5-year goals to skills you'd develop in this specific role, and demonstrated alignment between your growth and the company's needs. That's exactly the answer that builds interviewer confidence!",
          "Excellent! ✨ You were honest and aspirational — showing growth ambition while connecting it to delivering real value in this role first. You avoided both extremes: too vague ('I just want to grow') and too specific ('I want your boss's job'). Perfect balance!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To elevate it: be **more specific** about what skills/experiences you want to build (especially ones you'd gain from this role), and **connect your growth to company value** — 'As I grow, I'll be able to contribute to X, which aligns with the company's direction of Y.' This shows your growth benefits them too!",
          "Nice! 💡 Your answer is honest and realistic. Strengthen by: 1) Naming **specific skills** you want to develop (that this role provides). 2) Showing understanding of the **company's trajectory** and how you align with it. 3) Demonstrating you're focused on **doing great work first** before thinking about advancement.",
        ],
        feedbackWeak: [
          "Let's frame this! 🗺️ Great 5-year answers balance: **ambition** (I want to grow into X) + **realistic path** (starting by mastering Y in this role) + **company alignment** (that growth will enable me to contribute Z to the company). Avoid: 'I want your job,' 'I'm not sure,' or answers that show no ambition at all!",
          "Good attempt! 🎯 The interviewer is checking: Will you stay? Are you coachable? Are your goals aligned with what we can offer? Structure: 'In the short term, I want to [specific skill/impact in this role]. In 5 years, I see myself [realistic aspiration that connects to this company's path].' Show you've thought about it!",
        ],
        tip: "Avoid the extremes: 'I have no idea' (no ambition) or 'I want to be CEO' (unrealistic). The best answer shows growth ambition that connects to value you'd bring to the company.",
      },
    ],
  },
  {
    id: "data-science",
    name: "Data Science / ML",
    shortName: "Data Science",
    emoji: "📊",
    tagline: "ML · Statistics · Python · Analytics",
    description: "Prove your ML and statistics fundamentals with real interview questions.",
    difficulty: "Advanced",
    colorFrom: "#a855f7",
    colorTo: "#7c3aed",
    glowColor: "rgba(168, 85, 247, 0.3)",
    botIntro:
      "Welcome! I'm your Data Science & ML interviewer 📊\n\n5 questions covering machine learning fundamentals, statistics, and practical ML engineering. These come from DS interviews at top tech companies.\n\nAnswer using the **microphone** or **type** your response. Show your reasoning process — even partial knowledge demonstrates thinking ability! 🧪",
    questions: [
      {
        id: "ds1",
        text: "What is overfitting in machine learning? How do you detect it and what techniques do you use to prevent it?",
        keywords: ["overfitting", "underfitting", "regularization", "dropout", "validation", "cross-validation", "bias", "variance", "l1", "l2", "data augmentation", "early stopping"],
        feedbackStrong: [
          "Excellent! 🧠 You covered overfitting definition (high train accuracy, poor generalization), detection via validation/test set performance gap, and prevention techniques including regularization (L1/L2), dropout, early stopping, data augmentation, and cross-validation. Complete ML answer!",
          "Outstanding! 🌟 Connecting overfitting to the bias-variance tradeoff, then discussing regularization penalties, dropout as a form of ensemble learning, and the importance of a held-out test set — that's research-level understanding!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To deepen: frame overfitting in terms of **bias-variance tradeoff** — overfitting = low bias, high variance (model fits training noise). Prevention: **L2 regularization** (shrink weights toward zero), **dropout** (randomly disable neurons during training), **early stopping** (stop before training loss diverges from validation loss). These are the key prevention techniques!",
          "Nice! 💡 Good foundation. Add detection: plot **training loss vs validation loss** over epochs — if training loss keeps decreasing while validation loss starts increasing, you're overfitting. This learning curve is the classic diagnostic tool that every DS practitioner should know!",
        ],
        feedbackWeak: [
          "Let's build on this! 📈 Overfitting = model memorizes training data but fails on new data. Detection: **training accuracy >> validation accuracy** gap. Prevention: 1) More training data, 2) **Regularization** (L1/L2 add penalty for large weights), 3) **Dropout** (randomly turn off neurons), 4) **Early stopping** (stop training when validation loss increases). These are fundamental!",
          "Good attempt! 🔥 Think of overfitting like a student memorizing textbook answers vs understanding concepts. They ace practice tests but fail novel exams. The fix: make the model 'understand' patterns, not memorize details. Techniques: more data, regularization (penalty for complexity), and early stopping!",
        ],
        tip: "Bias-variance tradeoff is the theoretical framework behind overfitting. Always mention it — it shows conceptual depth beyond just knowing the techniques.",
      },
      {
        id: "ds2",
        text: "Explain the difference between supervised, unsupervised, and reinforcement learning. Give examples of each.",
        keywords: ["supervised", "unsupervised", "reinforcement", "label", "cluster", "classification", "regression", "reward", "agent", "environment", "k-means", "neural network"],
        feedbackStrong: [
          "Comprehensive! 📊 You clearly distinguished all three paradigms with strong examples: supervised (labeled data for classification/regression), unsupervised (finding patterns/clusters without labels), and reinforcement (agent-environment-reward learning loop). Real examples like spam detection, customer segmentation, and game AI show applied knowledge!",
          "Excellent! 🌟 Adding semi-supervised learning and self-supervised learning (like BERT pre-training) as bridging concepts shows you're up-to-date with modern ML. Strong answer with concrete, industry-relevant examples!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Strengthen with concrete examples per type: **Supervised** = spam email classifier (labeled spam/not-spam data), house price prediction. **Unsupervised** = customer segmentation (k-means clustering), anomaly detection. **Reinforcement** = AlphaGo, self-driving cars, recommendation systems with feedback loops. Concrete examples always elevate ML answers!",
          "Nice! 💡 You've got the framework right. Add: the key difference is **what information is available during training**. Supervised = labeled examples. Unsupervised = only features, no labels (must find structure). Reinforcement = only feedback signal (rewards/penalties) after taking actions in an environment.",
        ],
        feedbackWeak: [
          "Let's clarify! 🤖 Three paradigms: **Supervised** (you provide labeled training data — inputs + correct outputs — model learns to predict). **Unsupervised** (no labels — model finds hidden structure/patterns on its own, like clustering). **Reinforcement** (agent learns by trial-and-error in an environment, maximizing cumulative reward). Classic examples: spam filter (supervised), customer segments (unsupervised), game AI (reinforcement).",
          "Good start! 🧠 Simple analogy: Supervised = learning with a teacher (you're told if you're right/wrong). Unsupervised = learning by observation without a teacher. Reinforcement = learning like a child — try things, get feedback (reward or punishment), adjust. Each has very different use cases!",
        ],
        tip: "Modern DS interviews often ask about semi-supervised and self-supervised learning (like transformers). Knowing these shows you're current with the field.",
      },
      {
        id: "ds3",
        text: "How do you handle class imbalance in a machine learning dataset? What metrics would you use beyond accuracy?",
        keywords: ["imbalance", "oversample", "undersample", "smote", "precision", "recall", "f1", "auc", "roc", "class weight", "threshold", "minority", "majority"],
        feedbackStrong: [
          "Excellent! 🎯 You covered both data-level techniques (oversampling with SMOTE, undersampling) and algorithm-level techniques (class weights, threshold adjustment), and correctly identified that accuracy is meaningless for imbalanced data — precision, recall, F1, and AUC-ROC are the right metrics. Production-level knowledge!",
          "Outstanding! 🌟 Mentioning SMOTE for synthetic minority oversampling, cost-sensitive learning, adjusting the decision threshold, and business context (false positive vs false negative cost) — that shows real DS practitioner experience!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Key additions: 1) **SMOTE** (Synthetic Minority Oversampling Technique) — creates synthetic examples of minority class, better than random duplication. 2) **Class weights** in sklearn (`class_weight='balanced'`) is the simplest fix. 3) For metrics: **F1 score** balances precision/recall, **AUC-ROC** measures ranking quality. Accuracy can be 99% on a dataset with 99% one class — it's meaningless!",
          "Nice! 💡 Add the metric discussion: with 99% majority class, a model predicting majority every time has 99% accuracy but zero utility. Use **Precision** (of positive predictions, how many were right?), **Recall** (of actual positives, how many did we catch?), and **F1** (harmonic mean). The trade-off depends on business cost of false positives vs false negatives!",
        ],
        feedbackWeak: [
          "Let's explore! ⚖️ Class imbalance = one class has far more examples than others (e.g., fraud detection: 99% normal, 1% fraud). Techniques: 1) **Oversample minority** (add copies or use SMOTE to generate synthetic samples). 2) **Undersample majority** (randomly remove). 3) **Class weights** (penalize model more for misclassifying minority). Metrics: never use accuracy — use **F1, Precision, Recall, or AUC-ROC**!",
          "Good attempt! 🔥 Imagine a fraud detector: if it always says 'not fraud' it's 99.9% accurate but useless! That's why accuracy fails for imbalanced data. Use **Recall** (did we catch all the fraud?) and **Precision** (was our fraud alert right?). Trade-off based on which error is costlier. For the dataset, use SMOTE or class weighting!",
        ],
        tip: "Always mention the business context when discussing metrics: a medical diagnosis model should optimize recall (never miss a positive case), while a spam filter can sacrifice recall to keep precision high (don't block real emails).",
      },
      {
        id: "ds4",
        text: "Explain gradient descent and its variants (SGD, mini-batch, Adam). What are the trade-offs?",
        keywords: ["gradient", "descent", "learning rate", "sgd", "adam", "mini-batch", "batch", "momentum", "convergence", "loss", "optimizer", "update", "stochastic"],
        feedbackStrong: [
          "Brilliant! ⚡ You correctly explained gradient descent as following the negative gradient of the loss surface, and distinguished the variants: batch GD (stable but slow), SGD (fast but noisy), mini-batch (the practical sweet spot), and Adam (adaptive learning rates + momentum for robust convergence). Complete answer!",
          "Excellent! 🧠 Covering learning rate sensitivity, the saddle point problem, Adam's adaptive per-parameter learning rates, and why Adam converges faster in practice — that's deep optimization knowledge that impresses ML interviewers!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Strengthen by contrasting: **Batch GD** = compute gradient on all data (stable but slow, requires all data in memory). **SGD** = one sample at a time (fast but very noisy). **Mini-batch** = small batches (practical balance). **Adam** = adapts learning rate per parameter using momentum + second-moment estimates. Adam is the most used optimizer in deep learning!",
          "Nice! 💡 Key insight to add: **learning rate** is the most critical hyperparameter in GD. Too high = overshoot minimum. Too low = very slow convergence. Adam helps by **adapting** the learning rate automatically per parameter — that's why it's robust and widely used!",
        ],
        feedbackWeak: [
          "Let's build! 📉 Gradient descent = iteratively moving in the direction that decreases the loss function most. Think: hiking down a hill by always stepping in the steepest downward direction. Variants: **Batch** (use all data per step — accurate but slow), **SGD** (one sample — fast but noisy), **Mini-batch** (small batches — the practical standard), **Adam** (adapts learning rate automatically — most popular in DL).",
          "Good attempt! 🔥 Simple analogy: gradient descent is how neural networks learn. Take a step in the direction that reduces error, repeat. **SGD** is fast but jittery (like hiking in fog, only looking at your feet). **Adam** is smoother — it remembers past steps and adjusts step size automatically. That's why it's the default optimizer!",
        ],
        tip: "Adam is the most commonly used optimizer in practice. Being able to explain WHY (adaptive learning rates + momentum reduces oscillation) distinguishes you from candidates who just know WHAT.",
      },
      {
        id: "ds5",
        text: "What is cross-validation? Why is it important and how does k-fold cross-validation work?",
        keywords: ["cross-validation", "k-fold", "train", "test", "validation", "generalization", "overfitting", "bias", "fold", "hyperparameter", "evaluate"],
        feedbackStrong: [
          "Perfect! 🎯 You explained why a single train/test split is insufficient (high variance in performance estimate), how k-fold works (data split into k folds, model trained k times each with a different fold as validation), and its benefits: better generalization estimate, uses all data for both training and validation. Well done!",
          "Excellent! 🌟 Mentioning the trade-off (k=5 is faster, k=10 has lower bias in estimate), stratified k-fold for imbalanced data, and using cross-validation for hyperparameter tuning (but still needing a held-out test set!) shows complete knowledge!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Add the core motivation: a **single train/test split** is unreliable — what if you got lucky/unlucky with how data was split? K-fold reduces this variance by training k models on different splits and averaging performance. Also mention: **stratified k-fold** maintains class proportions in each fold — important for imbalanced datasets!",
          "Nice! 💡 Key point to add: cross-validation is used for **model selection and hyperparameter tuning** (on the training set), but you still need a **separate, never-touched test set** for final evaluation. Using your CV test folds for final reporting is data leakage! This distinction matters a lot.",
        ],
        feedbackWeak: [
          "Let's build on this! 📊 Problem with one train/test split: random variation in performance. **k-fold cross-validation** solution: split data into k equal folds. Train k different models, each using k-1 folds for training and 1 fold for validation (cycling through all folds). Average the k validation scores for a robust performance estimate. Common k values: 5 or 10!",
          "Good attempt! 🔥 Think of it like this: instead of testing a model on 1 specific 20% of data (lucky/unlucky), you test it on every 20% slice of data and average. That gives you a much more reliable estimate of how the model will perform on new data. k=5 means 5 different validation experiments on your training data!",
        ],
        tip: "Always mention: CV is for model selection/tuning, not for final performance reporting. Final evaluation should be on a completely held-out test set that was never used during development.",
      },
    ],
  },
  {
    id: "product-manager",
    name: "Product Manager",
    shortName: "Product",
    emoji: "🎯",
    tagline: "Strategy · Metrics · User Research · Roadmap",
    description: "Practice PM interviews covering product sense, metrics, and strategy.",
    difficulty: "Intermediate",
    colorFrom: "#06b6d4",
    colorTo: "#0284c7",
    glowColor: "rgba(6, 182, 212, 0.3)",
    botIntro:
      "Welcome! I'm your Product Manager interviewer 🎯\n\n5 questions covering product strategy, metrics, user research, and execution. PM interviews test your **product sense**, data-driven thinking, and stakeholder communication.\n\nAnswer using the **microphone** or **type** your response. Structure your answers and think out loud! 🚀",
    questions: [
      {
        id: "pm1",
        text: "How do you prioritize features on a product roadmap when you have limited engineering resources?",
        keywords: ["priority", "impact", "effort", "rice", "moscow", "user", "business", "data", "stakeholder", "value", "framework", "metric", "tradeoff"],
        feedbackStrong: [
          "Excellent PM thinking! 🎯 You used a structured framework (RICE, ICE, or MoSCoW), balanced user needs with business goals, considered effort and ROI, involved stakeholders, and acknowledged trade-offs explicitly. That's product leadership!",
          "Outstanding! 🌟 Mentioning RICE scoring (Reach × Impact × Confidence / Effort), qualitative user research to validate assumptions, business metric impact, and the importance of saying 'no' clearly — that's PM excellence!",
        ],
        feedbackAverage: [
          "Good approach! 👍 To strengthen: name a **specific framework** (RICE = Reach × Impact × Confidence / Effort is the gold standard at companies like Intercom). Also mention: involve engineering early to understand true effort, always tie to **strategic OKRs**, and explain clearly to stakeholders WHY deprioritized items aren't in the roadmap.",
          "Nice! 💡 Add the stakeholder dimension: prioritization isn't just a spreadsheet exercise — it involves **aligning disagreeing stakeholders**. How do you handle the sales team pushing a big client's request vs your roadmap priorities? That nuance is what real PM interviews probe!",
        ],
        feedbackWeak: [
          "Let's build on this! 📋 A structured PM answer: 1) Start with **goals/OKRs** — what are we trying to achieve? 2) Score features with **RICE** (Reach × Impact × Confidence / Effort). 3) Validate assumptions with **user data and research**. 4) Align with **business strategy**. 5) Communicate trade-offs clearly to stakeholders. Frameworks show PM rigor!",
          "Good attempt! 🔥 Every PM needs a prioritization framework. Try RICE: How many users does it **R**each? What's the **I**mpact per user? How **C**onfident are you in estimates? What's the **E**ffort required? Compute the score, rank features, and use that data to justify your roadmap decisions to engineers, design, and leadership!",
        ],
        tip: "Interviewers want to see structured thinking + stakeholder awareness. 'I just know' is not an answer. Show a framework (RICE, ICE, MoSCoW) and explain how you use data to make the decision.",
      },
      {
        id: "pm2",
        text: "Walk me through how you would design a feature to reduce churn for a subscription product. What would your process be?",
        keywords: ["churn", "retention", "user research", "data", "metric", "hypothesis", "experiment", "A/B test", "cohort", "onboarding", "engagement", "funnel", "interview"],
        feedbackStrong: [
          "Brilliant PM process! 🚀 You started by diagnosing the problem (analyze churn cohorts, identify patterns), formed data-driven hypotheses, validated with user research, prioritized interventions, designed A/B tests, and defined success metrics upfront. That's product management at a senior level!",
          "Excellent! 🌟 Covering cohort analysis, user exit interviews, retention curve analysis, hypothesis-driven experiments, and defining clear metrics for success — this is exactly how experienced PMs approach retention problems!",
        ],
        feedbackAverage: [
          "Good thinking! 👍 Strengthen by: 1) Starting with **data diagnosis** — which user segments churn, at what point in the lifecycle, and why (exit surveys)? 2) Form **specific hypotheses** (e.g., 'users churn in week 2 because they never activated the core feature'). 3) Design targeted interventions, then **A/B test** them. 4) Measure success by retention curve lift, not just churn rate.",
          "Nice approach! 💡 Add the research step: before building anything, talk to churned users! What drove them to cancel? Exit surveys + user interviews reveal the 'why' behind the numbers. Data tells you WHAT, qualitative research tells you WHY. Great PMs combine both!",
        ],
        feedbackWeak: [
          "Let's structure this! 🔍 PM problem-solving process: 1) **Define the problem** — what's current churn rate, which segments churn most? 2) **Diagnose** — analyze cohort data, read exit surveys, interview churned users. 3) **Hypothesize** — what's causing churn? 4) **Design solutions** for top hypotheses. 5) **A/B test** interventions. 6) **Measure** impact on retention metric. Always diagnose before prescribing!",
          "Good start! 💡 A great PM doesn't guess solutions — they diagnose first. Steps: collect data (cohort analysis, exit surveys), find the pattern (when and why do they churn?), form a hypothesis, build the minimum feature to test it, measure if it works. Show this discipline — it differentiates senior PMs!",
        ],
        tip: "Always start with diagnosis (data + user research), not solutions. Many PMs jump to building features when the real issue is in onboarding, value delivery, or pricing.",
      },
      {
        id: "pm3",
        text: "How do you define and measure success for a new product or feature launch?",
        keywords: ["metric", "kpi", "north star", "goal", "success", "measure", "data", "retention", "engagement", "revenue", "nps", "okr", "leading", "lagging"],
        feedbackStrong: [
          "Excellent PM thinking! 📈 You distinguished between **North Star metric** (single mission-aligned metric), **leading indicators** (early signals), and **lagging indicators** (final outcomes). Covering counter-metrics (guardrail metrics) to ensure no unintended harm shows senior judgment!",
          "Outstanding! 🌟 Mentioning the OKR framework, the difference between activity metrics (clicks) and outcome metrics (retention, revenue), guardrail metrics to prevent gaming, and dashboards for ongoing monitoring — that's production-level PM practice!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Add the concept of **guardrail metrics** — metrics you monitor to ensure your success metric isn't achieved at the expense of something important (e.g., increasing DAU by spamming users). Also distinguish: **leading indicators** (early proxy metrics that predict success, visible in days/weeks) vs **lagging indicators** (true success, visible in months).",
          "Nice! 💡 Strengthen by: tying metrics to business goals (don't just measure feature usage — tie to retention, revenue, or engagement that matters). And mention: define success criteria **before** launch, not after. Otherwise there's always a way to spin results positively. Pre-commitment to metrics shows PM rigor!",
        ],
        feedbackWeak: [
          "Let's build on this! 📊 A complete success definition: 1) **North Star Metric** — the one metric that captures value delivery (e.g., weekly active users). 2) **Supporting metrics** — DAU, retention, engagement. 3) **Counter-metrics / Guardrails** — ensure success metric isn't gamed (e.g., don't increase DAU by adding annoying notifications). 4) **Timeline** — when do you expect to see results? Define all of this BEFORE launch!",
          "Good attempt! 🎯 Three types of metrics every PM should know: **Acquisition** (are new users coming?), **Activation** (do they experience value quickly?), **Retention** (do they come back?). Dave McClure's AARRR (Pirate Metrics) framework is a classic. For any feature, define which part of the funnel you're improving and how you'll measure it!",
        ],
        tip: "Interviewers love when you mention counter-metrics (guardrail metrics). It shows you think about unintended consequences — a sign of product maturity.",
      },
      {
        id: "pm4",
        text: "Describe a product you use daily. How would you improve it and what metrics would you use to validate the improvement?",
        keywords: ["improve", "user", "problem", "pain point", "feature", "metric", "test", "validate", "hypothesis", "research", "data", "competitor"],
        feedbackStrong: [
          "Excellent product sense! 🎨 You clearly identified a specific user pain point (not just a 'nice to have'), proposed an improvement that directly addresses it, defined a testable hypothesis, selected appropriate success metrics, and described how you'd validate it. That's product thinking!",
          "Outstanding! 🌟 Connecting user pain to business impact, proposing a specific, scoped feature (not a vague 'make it better'), and defining clear success metrics — this demonstrates sharp product sense that top PM candidates show!",
        ],
        feedbackAverage: [
          "Good answer! 👍 To sharpen: be more specific about **whose problem** you're solving (which user segment?), **why this is a big problem** (frequency, severity), and **exactly what** the proposed feature would look like. The more specific, the better. Also, connect to business impact — why would this improvement matter to the company?",
          "Nice analysis! 💡 Add a **competitive angle** — does a competitor solve this better? That's great context. Also, when defining metrics, distinguish the **primary metric** (the one that proves the feature worked) from secondary metrics that provide supporting evidence. Precision in metrics shows analytical rigor!",
        ],
        feedbackWeak: [
          "Let's structure this! 🔍 Framework for product improvement: 1) Identify a **specific user problem** (not vague dissatisfaction). 2) Describe the **proposed solution** in detail. 3) Define the **user segment** who benefits. 4) Explain **business impact** (why does this matter to the company?). 5) Describe how you'd **test and validate** the improvement. This structure shows systematic product thinking!",
          "Good start! 💡 For product improvement questions: go deep on the problem before proposing solutions. 'I would add notifications' is a solution. 'Users miss time-sensitive updates because they only check the app weekly' is the problem. Always: Problem → Why it matters → Solution → How to validate. Problem clarity is the PM superpower!",
        ],
        tip: "Choose a product you genuinely use and care about. Passion shows. Avoid choosing obvious products like Google Search or Facebook — something more niche shows you've thought deeply.",
      },
      {
        id: "pm5",
        text: "How do you work with engineers and designers to ship a product? How do you handle disagreements on scope or approach?",
        keywords: ["collaborate", "engineer", "designer", "trade-off", "scope", "technical", "constraint", "communication", "trust", "disagree", "compromise", "listen", "empathy"],
        feedbackStrong: [
          "Excellent cross-functional leader! 🤝 You showed deep empathy for engineering constraints (technical debt, complexity), collaborative problem-solving instead of dictating solutions, data-driven conflict resolution, and a culture of psychological safety. That's how great PMs build trust with their teams!",
          "Outstanding! 🌟 Mentioning involving engineers in problem discovery (not just solution delivery), respecting design principles while balancing constraints, using data to resolve disagreements (not HiPPO — Highest Paid Person's Opinion), and acknowledging when you're wrong — that's PM excellence!",
        ],
        feedbackAverage: [
          "Good answer! 👍 Strengthen: mention involving engineers **early** in the discovery phase (not just handing them a spec). Engineers often have better ideas about implementation if they understand the user problem. Also: when disagreements arise, ask 'what data or test would change your mind?' — this depersonalizes the conflict and focuses on facts!",
          "Nice! 💡 Add the 'what does success look like' conversation: get alignment on success metrics with engineers and design **before** building, not after. Also mention that great PMs advocate for engineers (protect them from scope creep, communicate clearly, remove blockers) — that's how you earn the trust that makes collaboration smooth!",
        ],
        feedbackWeak: [
          "Let's build on this! 🛠️ Great PM-engineer collaboration: 1) Involve engineers in **discovery** (they see technical possibilities/constraints early). 2) Give clear **why** behind requests, not just what/how. 3) When disagreements arise: **seek to understand technical concerns first**, share data and user context, and look for a third option. 4) Build trust by **keeping your word** on scope and process. PMs who trust engineers get the best results!",
          "Good attempt! 🔥 Key PM insight: you don't manage engineers, you **partner** with them. They respect PMs who understand their constraints, communicate clearly, and advocate for them. When there are disagreements: listen first (understand technical concerns), share user data (why this matters), explore alternatives together. Never 'that's not your decision' — it's always collaborative!",
        ],
        tip: "The best PMs are described by engineers as 'she makes us feel like partners, not code monkeys.' Stories that show empathy for engineering constraints are extremely powerful.",
      },
    ],
  },
];

export function analyzeAnswer(
  question: Question,
  answer: string
): { score: number; feedback: string; scoreLabel: string } {
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const lowerAnswer = answer.toLowerCase();

  const matchedKeywords = question.keywords.filter((kw) =>
    lowerAnswer.includes(kw.toLowerCase())
  );

  const keywordScore =
    question.keywords.length > 0
      ? (matchedKeywords.length / question.keywords.length) * 5
      : 2;
  const lengthScore = Math.min(wordCount / 30, 1) * 4;
  const bonus = wordCount > 60 ? 1 : 0;

  const rawScore = keywordScore + lengthScore + bonus;
  const score = Math.min(10, Math.max(1, Math.round(rawScore * 10) / 10));

  let feedbackPool: string[];
  let scoreLabel: string;

  if (score >= 7) {
    feedbackPool = question.feedbackStrong;
    scoreLabel = "Excellent";
  } else if (score >= 4) {
    feedbackPool = question.feedbackAverage;
    scoreLabel = "Good";
  } else {
    feedbackPool = question.feedbackWeak;
    scoreLabel = "Needs Work";
  }

  const feedback = feedbackPool[Math.floor(Math.random() * feedbackPool.length)];
  return { score, feedback, scoreLabel };
}
