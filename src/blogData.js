// ─── BLOG POSTS ───────────────────────────────────────────────
// cover: place images in portfolio/public/blog/ and set path to "/blog/filename.jpg"
// content: write HTML — use <h2>, <p>, <strong>, <em>, <code>, <ul><li>, <blockquote>

export const blogPosts = [
  {
    id: 1,
    slug: 'weekend-at-kaptai-lake',
    title: 'A Weekend at Kaptai Lake',
    date: '2024-07-18',
    cover: './blog/rangamatiSunset.webp',  // e.g. "/blog/kaptai.jpg"
    excerpt: 'Leaving Dhaka behind for a few days, I found myself on a wooden boat gliding across Kaptai Lake — the largest artificial lake in Bangladesh — surrounded by mist, green hills, and an unexpected kind of quiet.',
    tags: ['Travel', 'Bangladesh', 'Life'],
    content: `
<p>It started with a last-minute group chat message: <em>"Rangamati. This weekend. Who's in?"</em> Three of us said yes before thinking it through. By Friday evening we were on a night coach out of Dhaka, bags half-packed, phones already low on battery.</p>

<h2>Arriving in Rangamati</h2>
<p>We rolled into Rangamati early Saturday morning, the kind of early where the town hasn't quite decided to wake up yet. The air was noticeably different — cooler, thinner, carrying the smell of pine and something wet. After dropping our bags at a small guesthouse near the DC Road, we headed straight for the ghat.</p>
<p>Kaptai Lake stretches across <strong>roughly 680 square kilometres</strong>, formed in 1960 when the Kaptai Dam was built on the Karnaphuli River. It's enormous — you can stand at the water's edge and genuinely not see the other side. That morning it was half-swallowed by mist, which made everything feel a little unreal.</p>

<h2>Out on the Water</h2>
<p>We hired a wooden engine boat and a local guide, who knew the lake the way I know the bus routes in Dhaka — intuitively, without thinking. We spent most of the morning drifting through narrow channels where the hills close in on both sides and the water turns dark green.</p>
<blockquote>There's a specific kind of silence you get when the engine cuts out and you're just floating — hills on every side, no city noise, no notifications. I wasn't expecting to find it so disarming.</blockquote>
<p>We passed Chakma and Marma fishing villages built on stilts over the water's edge. Sujon pointed out a half-submerged temple — old Rangamati town, he said, now 30 feet below the lake. That detail stuck with me. Entire villages displaced when the dam was built, whole histories underneath the water.</p>

<h2>Shuvolong Waterfall</h2>
<p>The boat ride to Shuvolong Waterfall takes about an hour from the main ghat. The falls themselves aren't massive, but the approach — cutting through forested channels, the waterfall sound arriving before the sight — made it worth every minute of the trip. We swam in the pool at the base for a while, then climbed the rocks behind the falls and sat there eating crackers and talking about nothing important.</p>

<h2>The Evening</h2>
<p>We watched the sun go down from the Hanging Bridge near town. The lake turns amber and then deep red in the last half-hour of light, and the hills on the far side go from green to purple to black. It's the kind of view that makes you understand why people come back here.</p>
<p>If you're in Bangladesh and haven't been — go. Take the night coach, wake up at the ghat, and spend a whole day on the water. Don't rush it.</p>
    `,
//   },
//   {
//     id: 2,
//     slug: 'building-banglallm-from-scratch',
//     title: 'Building BanglaLLM: Training a Language Model from Scratch',
//     date: '2026-04-18',
//     cover: '',  // e.g. "/blog/banglallm.jpg"
//     excerpt: 'Why I trained a 100M parameter transformer specifically for Bangla, what broke along the way, and what I learned about tokenisation, data quality, and the gap between "it runs" and "it works".',
//     tags: ['NLP', 'Machine Learning', 'Research', 'Python'],
//     content: `
// <p>Most large language models treat Bangla as an afterthought. It shows — outputs are stilted, romanised words slip in mid-sentence, and the models clearly haven't seen enough natural Bangla to develop any real fluency. That frustration is what started BanglaLLM.</p>

// <h2>The Tokeniser Problem</h2>
// <p>The first thing I underestimated was tokenisation. Most multilingual models use BPE tokenisers trained predominantly on English, which means a single Bangla word often fragments into 6–10 tokens. This is both inefficient and actively harmful for generation quality — the model has to "think" in chunks that don't correspond to meaningful linguistic units.</p>
// <p>I trained a custom tokeniser from scratch on a Bangla corpus with a <strong>16,000 token vocabulary</strong>. The difference was immediately visible: Bangla words that were previously split into 8 tokens now resolved to 1 or 2. This alone improved generation coherence noticeably before I'd changed anything else.</p>

// <h2>Data is Everything (and Cleaning it is Miserable)</h2>
// <p>I scraped and compiled text from Bangla Wikipedia, Prothom Alo archives, and several public datasets. Raw total: roughly 4.2GB of text. After deduplication, boilerplate removal, and filtering out mixed-script noise, that dropped to around 2.8GB — cleaner, but smaller than I wanted.</p>
// <blockquote>The single most time-consuming part of this project wasn't the model training. It was sitting in a Jupyter notebook at 2am removing HTML artifacts and deciding whether a given sentence was "clean enough" to keep.</blockquote>

// <h2>Architecture and Training</h2>
// <p>The model is a standard decoder-only transformer — 12 layers, 768 hidden dimensions, 12 attention heads — totalling around <strong>100 million parameters</strong>. Nothing exotic. I deliberately kept the architecture conventional so that the variable I was actually testing was the data and tokeniser, not the model design.</p>
// <p>Training ran on a single A100 (Colab Pro+) over several sessions. Total compute was somewhere around 80 GPU-hours. Loss converged well but I hit a frustrating plateau around epoch 6 that took me two weeks to diagnose — turned out to be a learning rate schedule bug that was silently zeroing the LR too early.</p>

// <h2>What I'd Do Differently</h2>
// <ul>
//   <li>Start with a larger, cleaner corpus — 2.8GB is genuinely not enough for a 100M model</li>
//   <li>Instrument training more carefully from day one; the LR bug cost me weeks</li>
//   <li>Add evaluation benchmarks earlier — I was relying on vibes for too long</li>
// </ul>
// <p>The demo is live at <a href="https://demobanglallm.streamlit.app/" target="_blank" rel="noreferrer">demobanglallm.streamlit.app</a> if you want to try it. It's imperfect, but it's genuinely generating coherent Bangla — and that felt like something worth shipping.</p>
//     `,
//   },
//   {
//     id: 3,
//     slug: 'lessons-from-my-first-research-paper',
//     title: 'Lessons from Submitting My First Research Paper',
//     date: '2026-03-02',
//     cover: '',  // e.g. "/blog/research.jpg"
//     excerpt: 'From a half-formed idea in a lab meeting to a conference submission — what the process of writing and submitting my first paper actually looked like, and what I wish someone had told me at the start.',
//     tags: ['Research', 'Academia', 'Machine Learning'],
//     content: `
// <p>Somewhere in the middle of my third year, my supervisor suggested I write up our radiomics work as a paper. I said yes without fully understanding what that meant. Here's what I learned.</p>

// <h2>The Idea Takes Longer to Clarify Than You Think</h2>
// <p>I assumed the hard part would be the writing. It wasn't. The hard part was figuring out what, exactly, we were claiming. We had results, we had a method, but the <em>contribution</em> — the specific thing we were adding to the field — took weeks of back-and-forth to articulate cleanly.</p>
// <p>My supervisor kept asking the same question in different ways: <strong>"What would a reader know after reading this that they didn't know before?"</strong> That question is deceptively simple. It forced us to cut two entire sections that were technically correct but didn't actually advance the argument.</p>

// <h2>Related Work Will Humble You</h2>
// <p>Reading related work properly — not skimming abstracts, but actually understanding the methods and results of 30+ papers — took almost three weeks. During that time I found two papers that were uncomfortably close to what we were doing. Panic. Then relief: our approach differed in a specific, defensible way. But those three weeks were necessary to know that.</p>
// <blockquote>You cannot know what your contribution is until you know what already exists. There are no shortcuts here.</blockquote>

// <h2>The Review Process</h2>
// <p>We received three reviews. Reviewer 2 was what Reviewer 2 always is. But buried in the critical feedback were two genuinely useful observations about our experimental setup that we hadn't considered. The revision process — rerunning experiments with adjusted parameters, rewriting the results section, responding to each point formally — was exhausting and also made the paper measurably better.</p>

// <h2>What I'd Tell My Past Self</h2>
// <ul>
//   <li><strong>Start the related work section first,</strong> not last. It shapes everything else.</li>
//   <li><strong>Write a bad first draft fast.</strong> Editing is easier than generating. Get something on the page.</li>
//   <li><strong>Every figure should make one point.</strong> If you need to explain what the figure shows in the caption, the figure isn't doing its job.</li>
//   <li><strong>Reviewer feedback is almost always partially right,</strong> even when it's frustrating.</li>
// </ul>
// <p>The paper got accepted at ICEFronT. I'm proud of it — not because it's perfect, but because it's done, and because I understand the work well enough now to defend every choice in it.</p>
//     `,
  },
];
