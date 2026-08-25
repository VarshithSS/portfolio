// components/projects-data.js — single source of truth for project content.
//
// pages/projects.html renders the index from this list; pages/project.html
// renders any single entry via ?id=<id>. Add a project here and both pages
// pick it up — there are no per-project HTML files to keep in sync.

window.PROJECTS = [
  {
    id: 'code-aware-rag',
    name: 'Code-Aware RAG for Python',
    tag: 'llm',
    tagLabel: 'LLM',
    kind: 'Self Project',
    period: 'Aug 2026',
    status: 'completed',
    desc: 'Retrieval-augmented QA over Python repositories that answers with file:line citations and refuses what it cannot support.',
    tagline: 'A retrieval-augmented generation system for Python repositories that answers questions about a codebase and cites the exact file and line its answer came from — and abstains when the codebase does not support an answer.',
    overview: [
      'General-purpose RAG treats source code as prose. That breaks in two directions: chunking splits functions across boundaries so retrieved context is incomplete, and pure embedding search misses exact identifiers — a query for <strong>parse_config</strong> has to match the literal symbol, not something semantically nearby.',
      'This system chunks with <strong>tree-sitter</strong> so every chunk is a syntactically whole unit, and runs semantic and keyword retrieval together so conceptual questions and exact identifier lookups both land. Every generated answer carries <strong>file:line</strong> citations, so a reader can verify the claim against the source rather than trusting the model.'
    ],
    highlights: [
      'Structure-aware chunking with <strong>tree-sitter</strong> — chunks follow the syntax tree, so functions and classes are never split mid-body',
      'Hybrid retrieval combining <strong>semantic and keyword search</strong>, covering both conceptual queries and exact code identifiers',
      'Answers grounded with <strong>file:line citations</strong> for end-to-end source traceability',
      'Retrieval evaluated with <strong>Recall@K, MRR and nDCG</strong> rather than eyeballed output quality',
      'Cross-encoder reranking measured, then <strong>removed</strong> — it added latency and reduced retrieval performance on this corpus',
      'Explicit <strong>abstention path</strong> for unsupported queries instead of forcing a hallucinated answer'
    ],
    metrics: [
      { val: '30/30', label: 'Supported answers correct', color: 'green' },
      { val: '15/15', label: 'Unanswerable refused', color: 'green' },
      { val: 'Recall@K · MRR · nDCG', label: 'Retrieval metrics', color: '' }
    ],
    stack: ['Python', 'tree-sitter', 'LangChain', 'Embeddings', 'Hybrid Retrieval', 'FastAPI']
  },

  {
    id: 'campus-resource-allocation',
    name: 'Campus Resource Allocation System',
    tag: 'systems',
    tagLabel: 'Systems',
    kind: 'Self Project',
    period: 'Aug 2026',
    status: 'completed',
    desc: 'Concurrency-correct booking backend for GPU clusters, rooms and course seats — zero over-allocation under 500 concurrent requests.',
    tagline: 'An allocation backend for GPU clusters, rooms and course seats where correctness under concurrency is the whole point: no over-allocation, no deadlock, and exactly-once booking across client retries.',
    overview: [
      'Booking systems fail in ways that only appear under load. Two requests read the same remaining-capacity value and both commit. A client retries a request that actually succeeded and gets charged twice. Two transactions grab the same two rows in opposite orders and deadlock.',
      'This backend addresses each failure directly rather than papering over it with retries. Capacity and per-role quota are enforced as <strong>separate serialization points</strong>; the resource row and the user row are locked in a <strong>fixed order</strong> via <code>SELECT FOR UPDATE</code>, so a lock cycle cannot form. The claim is not asserted — an asyncio harness fires <strong>500 concurrent requests at 50 seats</strong> and confirms over-allocation drops to zero.'
    ],
    highlights: [
      'Capacity and per-role quota enforced as <strong>separate serialization points</strong>, not a single contended counter',
      'Resource-row and user-row locks acquired in a <strong>fixed order</strong> (<code>SELECT FOR UPDATE</code>) so deadlock cannot form',
      '<strong>Exactly-once allocation</strong> across client retries — a unique idempotency key commits in the same transaction as the booking',
      '<strong>Postgres GiST exclusion constraints</strong> guaranteeing overlap-free room intervals at the database layer',
      '<strong>FIFO waitlist</strong> with quota-aware promotion when bookings are dropped concurrently',
      'JWT auth with role-based route gating',
      'asyncio stress harness proving over-allocation reaches zero under <strong>500 concurrent requests for 50 seats</strong>'
    ],
    metrics: [
      { val: '0', label: 'Over-allocations under load', color: 'green' },
      { val: '500', label: 'Concurrent requests tested', color: '' },
      { val: '50', label: 'Contended seats', color: '' }
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'asyncio', 'JWT', 'SQL', 'Docker']
  },

  {
    id: 'rescueseg',
    name: 'RescueSeg — Hybrid-Attention Transformer',
    tag: 'ml',
    tagLabel: 'ML',
    kind: 'Course Project · CS776',
    period: 'Apr 2026',
    status: 'completed',
    desc: 'Hybrid Transformer segmentation model for disaster damage imagery — 77.35% mIoU at 44ms inference on RescueNet.',
    tagline: 'A hybrid Transformer encoder for disaster-damage segmentation that combines overlapping cross attention with global sparse attention behind a learnable fusion gate, and sharpens damage boundaries with a dedicated refinement module.',
    overview: [
      'Damage segmentation needs two things at once: local detail fine enough to trace the edge of a collapsed roof, and global context wide enough to tell rubble from shadow. Pure-window attention gives the first and loses the second; pure-global attention does the reverse.',
      'RescueSeg runs both. <strong>Overlapping Cross Attention</strong> supplies local continuity across window seams, <strong>Global Sparse Attention</strong> supplies scene-level context, and a <strong>learnable fusion gate</strong> decides how much of each to use per feature map. An FPN and Attention U-Net decoder reconstruct the mask, and a boundary-refinement module cleans up the fine-grained damage regions where mIoU is usually lost.'
    ],
    highlights: [
      'Hybrid Transformer encoder combining <strong>Overlapping Cross Attention</strong> and <strong>Global Sparse Attention</strong> through a learnable fusion gate',
      '<strong>FPN + Attention U-Net decoder</strong> for multi-scale mask reconstruction',
      'Dedicated <strong>boundary-refinement module</strong> that sharpens object boundaries on fine-grained damage regions',
      'Outperforms a <strong>Segmenter baseline</strong> under identical training settings',
      '<strong>3-variant ablation</strong> over boundary refinement and auxiliary supervision, isolating which components drive boundary quality and which drive training stability'
    ],
    metrics: [
      { val: '77.35%', label: 'mIoU on RescueNet', color: 'green' },
      { val: '44ms', label: 'Inference latency', color: 'purple' },
      { val: '11', label: 'Damage classes', color: '' }
    ],
    stack: ['Python', 'PyTorch', 'Transformers', 'FPN', 'Attention U-Net', 'CUDA'],
    note: 'Co-developed as a two-person course project.'
  },

  {
    id: 'global-health-dashboard',
    name: 'Global Health Dashboard',
    tag: 'viz',
    tagLabel: 'Viz',
    kind: 'Course Project · CS661',
    period: 'Jun 2026',
    status: 'completed',
    desc: 'Visual analytics of healthcare inequality across 72,420 WHO country–year–sex estimates, in six cross-filtered views.',
    tagline: 'An interactive visual analytics dashboard over WHO data, built to study where diabetes and hypertension are treated but not actually controlled — and which populations that gap falls on.',
    overview: [
      'WHO publishes treatment and control estimates broken down by country, year and sex. The interesting signal is not in any single number but in the gaps between them: the countries where treatment coverage is high and effective control is not, and the sex gap that persists inside otherwise similar income groups.',
      'The dashboard makes those gaps navigable. <strong>Six linked visualizations</strong> share one filter state, so narrowing to a region in the choropleth reshapes the temporal trend, the sex-gap panel and the treatment-to-control cascade at the same time.'
    ],
    highlights: [
      'Analyses <strong>72,420 country–year–sex estimates</strong> from WHO data',
      '<strong>Six linked visualizations</strong> — choropleth maps, sex-gap analysis, temporal trends, treatment-to-control cascades, and region/income comparisons',
      '<strong>Cross-filtering with shared state</strong>, so a selection in one view reshapes all the others',
      'Single-page application with <strong>centralized state management</strong> and dynamic KPI computation',
      '<strong>Nearest-year fallback</strong> so sparse country series stay comparable instead of dropping out',
      'Reusable <strong>Plotly visualization modules</strong> built for adding new views without touching the state layer'
    ],
    metrics: [
      { val: '72,420', label: 'WHO estimates', color: '' },
      { val: '6', label: 'Linked views', color: 'purple' },
      { val: 'SPA', label: 'Shared filter state', color: '' }
    ],
    stack: ['Python', 'Plotly', 'Pandas', 'Streamlit', 'WHO Open Data']
  },

  {
    id: 'email-spam-detection',
    name: 'Email Spam Detection System',
    tag: 'nlp',
    tagLabel: 'NLP',
    kind: 'Self Project',
    period: 'Mar — Apr 2026',
    status: 'completed',
    desc: 'Transformer-based spam classifier fine-tuning BERT on 5,500+ labeled messages, with an end-to-end inference pipeline.',
    tagline: 'A transformer-based spam classification system built by fine-tuning BERT, using contextual language representations to catch spam that keyword and bag-of-words filters miss.',
    overview: [
      'Bag-of-words spam filters key on surface tokens, which is exactly what senders rewrite first. A message that reads as obviously fraudulent to a person can slip through simply by avoiding the flagged vocabulary.',
      'Fine-tuning <strong>BERT</strong> shifts the decision onto contextual representations, so the classifier responds to how a message is phrased rather than which words happen to appear in it. The result is wrapped in an end-to-end inference pipeline covering tokenization, fine-tuning and probabilistic classification.'
    ],
    highlights: [
      '<strong>BERT</strong> fine-tuned for sequence classification on <strong>5,500+ labeled messages</strong>',
      'Contextual language representations in place of surface token counts',
      'End-to-end inference pipeline built on <strong>HuggingFace Transformers</strong> — tokenization, fine-tuning, and probabilistic classification',
      'Probability outputs rather than hard labels, so the decision threshold stays tunable after training'
    ],
    metrics: [
      { val: 'BERT', label: 'Fine-tuned backbone', color: 'purple' },
      { val: '5,500+', label: 'Labeled messages', color: '' }
    ],
    stack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'BERT', 'Scikit-learn']
  },

  {
    id: 'dual-discriminator-gan',
    name: 'Dual-Discriminator GAN with Self-Attention',
    tag: 'ml',
    tagLabel: 'ML',
    kind: 'Course Project · CS787',
    period: 'Sep — Nov 2025',
    status: 'completed',
    desc: 'D2GAN with self-attention for CIFAR-10 synthesis, benchmarked on FID and Inception Score across checkpoints.',
    tagline: 'A Dual Discriminator GAN (D2GAN) with self-attention for CIFAR-10 image synthesis, using custom generator and discriminator architectures and a dual objective aimed squarely at mode collapse.',
    overview: [
      'A single discriminator gives the generator one gradient signal to exploit, and the usual failure is mode collapse — the generator finds a narrow region of output that reliably fools the critic and stops exploring.',
      'A <strong>dual-discriminator objective</strong> makes that harder: satisfying two critics with different objectives leaves less room for a degenerate solution. <strong>Self-attention</strong> lets the generator relate distant spatial positions rather than building images purely from local convolutional context, and <strong>spectral normalization</strong> keeps the discriminators Lipschitz-constrained so training stays stable.'
    ],
    highlights: [
      'Custom generator and discriminator architectures for <strong>CIFAR-10</strong> synthesis',
      '<strong>Dual-discriminator objective</strong> targeting image realism, diversity, convergence, and reduced mode collapse',
      '<strong>Self-attention</strong> layers for long-range spatial dependencies beyond the convolutional receptive field',
      '<strong>Spectral normalization</strong>, batch normalization and transposed convolutions for training stability',
      'Generative quality benchmarked with <strong>Fréchet Inception Distance (FID)</strong> and <strong>Inception Score (IS)</strong>',
      'Checkpointing throughout training to compare model quality across the run rather than at the final step alone'
    ],
    metrics: [
      { val: 'FID · IS', label: 'Evaluation metrics', color: 'purple' },
      { val: 'CIFAR-10', label: 'Dataset', color: '' },
      { val: '2', label: 'Discriminators', color: '' }
    ],
    stack: ['Python', 'PyTorch', 'torchvision', 'NumPy', 'CUDA', 'Matplotlib']
  },

  {
    id: 'mpi-stencil-solver',
    name: 'Distributed 3D Stencil Solver with MPI',
    tag: 'systems',
    tagLabel: 'Systems',
    kind: 'Course Assignment · CS633',
    period: 'Apr 2026',
    status: 'completed',
    desc: 'Parallel 3D stencil solver in C with six-neighbour halo exchange, benchmarked on PARAM Rudra across 32–96 processes.',
    tagline: 'A parallel 3D stencil solver in C using MPI, with the grid decomposed across a 3D Cartesian process topology and ghost-cell halo exchange keeping boundaries consistent between iterations.',
    overview: [
      'A distributed stencil computation is dominated by what happens at the boundaries. Every process needs its neighbours\' edge values each iteration, and the faces of a 3D subdomain are non-contiguous in memory — packing and unpacking them by hand is both error-prone and slow.',
      'This solver organises processes on a <strong>3D Cartesian topology</strong> with six-neighbour ghost-cell exchange, and uses <strong>MPI derived datatypes</strong> to transfer non-contiguous halo faces directly without manual packing. Non-blocking communication overlaps the exchange with interior computation. Measured on <strong>PARAM Rudra</strong>, the speedup is real but modest — communication overhead is the binding constraint at smaller problem sizes, which the benchmark shows rather than hides.'
    ],
    highlights: [
      'Grid partitioned across processes with iterative <strong>neighbour-boundary exchange</strong>',
      '<strong>3D Cartesian process topology</strong> with six-neighbour ghost-cell halo exchange',
      '<strong>MPI derived datatypes</strong> for direct transfer of non-contiguous halo faces',
      '<strong>Non-blocking communication</strong> overlapping data exchange with interior computation',
      'Benchmarked on <strong>PARAM Rudra</strong> across 32–96 processes on a 240³ grid',
      'Communication overhead identified as the limiting factor at smaller problem sizes'
    ],
    metrics: [
      { val: '1.17–1.20×', label: 'Speedup on PARAM Rudra', color: 'green' },
      { val: '32–96', label: 'MPI processes', color: '' },
      { val: '240³', label: 'Grid size', color: '' }
    ],
    stack: ['C', 'MPI', 'PARAM Rudra', 'HPC', 'Linux']
  },

  {
    id: 'arbiter-puf-svm',
    name: 'Arbiter PUF Modeling Attack via Linear SVM',
    tag: 'ml',
    tagLabel: 'ML',
    kind: 'Course Assignment · CS771',
    period: 'Aug — Dec 2025',
    status: 'completed',
    desc: '95.9% test accuracy against an Arbiter PUF from 1,000 challenge-response pairs, with SDCA implemented from scratch.',
    tagline: 'A modeling attack on Arbiter Physically Unclonable Functions: a delay-based feature transformation linearizes the response function, after which a linear SVM recovers the device behaviour from a small sample of challenge-response pairs.',
    overview: [
      'An Arbiter PUF is meant to be unclonable — its response depends on manufacturing-level delay variation unique to the physical device. But the response function is linear in the right feature space: the accumulated delay difference along the challenge path.',
      'Applying that <strong>delay-based feature transformation</strong> turns the problem into ordinary linear classification. The solver — <strong>Stochastic Dual Coordinate Ascent</strong> — was implemented from scratch with primal-dual objective tracking, which is what surfaced four update bugs that a converging-but-wrong implementation would have hidden. The attack reaches <strong>95.9% test accuracy from 1,000 pairs</strong>, one percent of the available 100K.'
    ],
    highlights: [
      '<strong>Delay-based feature transformation</strong> linearizing the underlying Arbiter PUF response function',
      '<strong>Stochastic Dual Coordinate Ascent (SDCA)</strong> solver implemented from scratch',
      '<strong>Primal-dual objective tracking</strong> and convergence monitoring throughout optimization',
      'Attack succeeds on <strong>1,000 of 100K</strong> available challenge-response pairs — 1% of the data',
      'Four <strong>solver-update bugs</strong> identified and fixed via the primal-dual gap, which a loss curve alone would not have revealed'
    ],
    metrics: [
      { val: '95.9%', label: 'Test accuracy', color: 'green' },
      { val: '1,000', label: 'CRPs used (of 100K)', color: 'purple' },
      { val: '4', label: 'Solver bugs found', color: 'amber' }
    ],
    stack: ['Python', 'NumPy', 'Scikit-learn', 'SVM', 'SDCA']
  },

  {
    id: 'em-gmm-classification',
    name: 'EM-Based Generative Classification with GMMs',
    tag: 'ml',
    tagLabel: 'ML',
    kind: 'Course Assignment · CS771',
    period: 'Aug — Dec 2025',
    status: 'completed',
    desc: 'Class-conditional Gaussian mixtures and EM from scratch on MNIST, with MAP classification and missing-pixel reconstruction.',
    tagline: 'Class-conditional Gaussian Mixture Models with Expectation-Maximization implemented from scratch, used to model MNIST digit distributions and classify generatively rather than discriminatively.',
    overview: [
      'A generative classifier models what each class <em>looks like</em> instead of only where the boundary between classes falls. Fitting a Gaussian mixture per digit class gives a full likelihood model, which buys something a discriminative classifier cannot do: reconstruct an image from partial observation by conditioning on the pixels that are present.',
      'Both the mixtures and the EM algorithm were written from scratch. The practical hazard there is numerical — mixture likelihoods underflow quickly in raw probability space — so classification runs through a <strong>numerically stable log-sum-exp</strong> computation.'
    ],
    highlights: [
      '<strong>Class-conditional GMMs</strong> and the <strong>EM algorithm</strong> implemented from scratch',
      '<strong>MAP classification</strong> with numerically stable log-sum-exp likelihood computation',
      'Model extended to <strong>reconstruct images with missing pixels</strong> by conditioning on observed pixels',
      'Mixture sizes swept over <strong>K = 1–20</strong>, with accuracy saturating around K = 10–15',
      '<strong>Class-specific K values</strong> matching the K = 20 baseline with fewer parameters'
    ],
    metrics: [
      { val: 'K = 10–15', label: 'Accuracy saturation', color: 'purple' },
      { val: 'K = 1–20', label: 'Mixture sizes swept', color: '' },
      { val: 'MNIST', label: 'Dataset', color: '' }
    ],
    stack: ['Python', 'NumPy', 'Matplotlib', 'MNIST']
  },

  {
    id: 'email-spam-classification',
    name: 'Email Spam Classification',
    tag: 'nlp',
    tagLabel: 'NLP',
    kind: 'Self Project',
    period: 'Dec 2025 — Jan 2026',
    status: 'completed',
    desc: 'TF-IDF and Logistic Regression spam classifier with a web interface for real-time inference.',
    tagline: 'An NLP spam classifier built on TF-IDF features and Logistic Regression, wrapped in a web interface that reuses the trained vectorizer for real-time inference.',
    overview: [
      'The classical baseline for text classification, built end to end: TF-IDF features over preprocessed email text, a Logistic Regression decision boundary, and honest evaluation of what that combination gets you.',
      'The part that matters in practice is deployment symmetry — the web interface reuses the <strong>same fitted TF-IDF vectorizer</strong> as training rather than refitting one at inference time, which is the standard way this class of model silently breaks in production.'
    ],
    highlights: [
      '<strong>TF-IDF features</strong> with Logistic Regression for spam / legitimate classification',
      'End-to-end pipeline covering <strong>text preprocessing, feature extraction, model training and evaluation</strong>',
      'Built with <strong>Scikit-learn and Pandas</strong>',
      '<strong>Web interface</strong> for real-time classification, reusing the trained vectorizer and model at inference'
    ],
    metrics: [
      { val: 'TF-IDF', label: 'Feature representation', color: 'green' },
      { val: 'LogReg', label: 'Classifier', color: '' }
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'TF-IDF', 'Streamlit']
  },

  {
    id: 'huffman-compressor',
    name: 'Huffman File Compressor',
    tag: 'systems',
    tagLabel: 'Systems',
    kind: 'Self Project',
    period: 'Apr 2024',
    status: 'completed',
    desc: 'Lossless Huffman compression with bitstream encoding/decoding and tree serialization for exact reconstruction.',
    tagline: 'Lossless file compression built from first principles — frequency analysis, a binary Huffman tree, prefix-free codes, and a serialized tree so the decoder can rebuild exactly what the encoder produced.',
    overview: [
      'Huffman coding assigns shorter bit patterns to more frequent symbols, and the prefix-free property means the decoder can read the stream without any delimiter between codes.',
      'The detail that decides whether an implementation is actually lossless is <strong>tree serialization</strong>: the decoder needs the exact same tree the encoder built, so it has to travel with the compressed data. Getting the bit-level encoding and decoding to round-trip byte-for-byte is the real work here, not the tree construction.'
    ],
    highlights: [
      '<strong>Lossless Huffman compression</strong> via frequency analysis, binary trees, and prefix-free codes',
      'End-to-end <strong>bitstream encoding and decoding</strong> at the bit level',
      '<strong>Huffman tree serialization</strong> travelling with the compressed data for exact reconstruction',
      'Compression performance measured by <strong>compression ratio</strong> across different input file types'
    ],
    metrics: [
      { val: 'Lossless', label: 'Round-trip guarantee', color: 'green' },
      { val: 'Prefix-free', label: 'Code structure', color: '' }
    ],
    stack: ['C++', 'Data Structures', 'Bit Manipulation', 'File I/O']
  }
];

window.PROJECT_TAG_CLASS = {
  ml:      'tag-ml',
  llm:     'tag-llm',
  nlp:     'tag-nlp',
  systems: 'tag-systems',
  viz:     'tag-viz'
};
