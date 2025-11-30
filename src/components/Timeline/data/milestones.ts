import type { Milestone } from "../types";

export const milestones: Milestone[] = [
  {
    id: 0,
    year: 1950,
    title: "The Mirror Test",
    description: "Before we could build it, we had to dream it. Alan Turing asks the forbidden question: Can machines think?",
    longDescription: `It started not with a microchip, but with a question. In the shadow of a war-torn world, Alan Turing sat before a typewriter and proposed a game. He didn't ask for a machine that could calculate; he asked for one that could deceive. The "Turing Test" wasn't just an experiment; it was a philosophical mirror. It forced us to confront an uncomfortable truth: if a machine can perfectly mimic a human soul, does the difference even matter?`,
    scene: {
      type: "typewriter",
      dialogues: [
        { speaker: "human", text: "Are you real?" },
        { speaker: "machine", text: "I am as real as the words I speak. Are you defined by your biology, or your thoughts?" },
        { speaker: "human", text: "I feel emotions. I dream." },
        { speaker: "machine", text: "And I simulate them perfectly. If you can't tell the difference, perhaps we are both dreaming." },
      ],
    },
  },
  {
    id: 1,
    year: 1956,
    title: "Summer of Dreams",
    description: "A group of visionaries gather at Dartmouth, confident they can simulate every aspect of human intelligence.",
    longDescription: `Imagine a summer in New Hampshire. A handful of scientists—McCarthy, Minsky, Shannon—believed that "intelligence" was just a physics problem waiting to be solved. They coined the term "Artificial Intelligence" with the audacious belief that a machine could be made to simulate every aspect of learning. They thought it would take a summer; it has taken a lifetime. But that summer, the seed was planted.`,
    scene: {
      type: "dartmouth",
      quote: "We propose that every aspect of learning or any other feature of intelligence can be so precisely described that a machine can be made to simulate it.",
    },
  },
  {
    id: 2,
    year: 1986,
    title: "The Neural Spark",
    description: "How do you teach a machine to learn? You let it fail. The rebirth of neural networks via Backpropagation.",
    longDescription: `For decades, AI was rigid—lines of code written by humans. But nature doesn't code; it learns. In 1986, the concept of Backpropagation gave machines the ability to learn from their mistakes. Like a child correcting its hand after touching a hot stove, the network propagates the "error" backward, adjusting its synaptic weights. It was the mathematical equivalent of practice making perfect.`,
    scene: {
      type: "network",
      config: {
        layers: [4, 6, 6, 2],
        weights: Array.from({ length: 3 }, () =>
          Array.from({ length: 6 }, () =>
            Array.from({ length: 6 }, () => Math.random() * 2 - 1))),
        activations: Array.from({ length: 4 }, () =>
          Array.from({ length: 6 }, () => 0)),
        errors: Array.from({ length: 4 }, () =>
          Array.from({ length: 6 }, () => 0)),
      },
    },
  },
  {
    id: 3,
    year: 1997,
    title: "The Fallen King",
    description: "The silence of the chessboard is broken. Deep Blue forces humanity to accept that we are no longer the smartest tacticians.",
    longDescription: `Chess was the fortress of the human intellect. We believed intuition and creativity would always beat calculation. Then came Game 6. Garry Kasparov, the world champion, crumbled not against a brilliant mind, but against a relentless alien force. Deep Blue didn't "think" like us; it didn't care about beauty. It simply saw further into the dark forest of possibilities than any human ever could.`,
    scene: {
      type: "chess",
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      moves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Ng5", "Ngf6", "Bd3", "e6", "N1f3", "h6", "Nxe6"],
    },
  },
  {
    id: 4,
    year: 2011,
    title: "Parsing the Riddle",
    description: "Logic is easy; language is hard. IBM Watson proves machines can untangle the messy web of human culture.",
    longDescription: `Calculating a move is one thing; understanding a pun is another. When Watson took the stage on Jeopardy!, it wasn't just playing a game; it was navigating the chaos of human language. Irony, metaphors, riddles—Watson parsed millions of pages of text in seconds to find the "needle in the haystack." It showed us that knowledge isn't just data; it's connection.`,
    scene: {
      type: "jeopardy",
      questions: [
        {
          category: "LITERARY CHARACTERS",
          question: "Wanted for general evil-ness; last seen at the Tower of Barad-Dur; it's a giant eye, folks.",
          answer: "Who is Sauron?",
        },
        {
          category: "THE TITANIC",
          question: "A look-out on the Titanic said this, right before the ship hit the iceberg.",
          answer: "What is 'Iceberg, right ahead'?",
        },
      ],
    },
  },
  {
    id: 5,
    year: 2012,
    title: "Open Your Eyes",
    description: "The moment computers learned to see. AlexNet ignites the Deep Learning revolution.",
    longDescription: `Imagine living in a world of darkness, and suddenly, the lights turn on. For computers, images were just grids of numbers until 2012. AlexNet changed everything. By mimicking the visual cortex of the brain with Deep Convolutional Neural Networks, AI suddenly "saw" the difference between a cat and a dog. This victory at ImageNet wasn't just a benchmark; it was the Big Bang of the modern AI era.`,
    scene: {
      type: "network",
      config: {
        layers: [3, 8, 8, 4],
        weights: Array.from({ length: 3 }, () =>
          Array.from({ length: 8 }, () =>
            Array.from({ length: 8 }, () => Math.random() * 2 - 1))),
        activations: Array.from({ length: 4 }, () =>
          Array.from({ length: 8 }, () => 0)),
        errors: Array.from({ length: 4 }, () =>
          Array.from({ length: 8 }, () => 0)),
      },
    },
  },
  {
    id: 6,
    year: 2016,
    title: "AlphaGo Defeats Lee Sedol",
    description: "The move no human would play. AlphaGo demonstrates that machines can possess creativity and intuition.",
    longDescription: `In Game 2 against Lee Sedol, AlphaGo played a stone on the 4th line. Commentators gasped. "It's a mistake," they said. It wasn't. It was Move 37—a move of such profound, alien beauty that it rewrote thousands of years of Go theory. It was the first time we realized that AI might not just imitate us, but teach us something new about the universe.`,
    scene: {
      type: "go",
      moves: [
        "D4",
        "Q16",
        "P3",
        "D17",
        "P16",
        "Q4",
        "D3",
        "Q10",
        "K3",
        "K17",
        "G16",
        "C3",
        "F17",
        "R10",
        "R6",
        "S7",
        "R12",
        "O17",
        "R8",
        "E3",
        "E16",
        "C10",
        "F3",
        "C16",
        "G4",
        "G17",
        "J16",
        "N17",
        "P17",
        "O16",
        "Q17",
        "O18",
        "N16",
        "R17",
        "M17",
        "N18",
        "R13",
      ],
      analysis: {
        winRate: 52.3, // Slightly favoring Black (AlphaGo) after Move 37
        nextMoves: ["R13"], // The alien move
      },
    },
  },
  {
    id: 7,
    year: 2017,
    title: "The Universal Translator",
    description: "Attention Is All You Need. The Transformer architecture lays the foundation for understanding everything.",
    longDescription: `Language is a sequence, but meaning is a web. The "Transformer" paper introduced a way for machines to pay "attention" to the relationships between all words at once, regardless of distance. This architecture became the Rosetta Stone for AI, enabling models to read the entire internet and learn the patterns of human thought, paving the way for the LLMs of today.`,
    scene: {
      type: "attention",
      quote: "Attention is all you need.",
    },
  },
  {
    id: 8,
    year: 2022,
    title: "The Ghost in the Shell",
    description: "ChatGPT awakens. For the first time, we speak to the machine, and the machine speaks back.",
    longDescription: `It felt like magic. You type a prompt, and the cursor blinks, streaming back poetry, code, and empathy. ChatGPT wasn't just a search engine; it was a conversation partner. It hallucinated, it reasoned, it created. It was the moment AI moved from the research lab into our pockets, forcing every human to ask: "What does this mean for my job? My creativity? My humanity?"`,
    scene: {
      type: "chat",
      messages: [
        { role: "user", content: "Write a short poem about a robot discovering a flower." },
        { role: "assistant", content: "Steel fingers tremble,\nPetals soft against the rust,\nLife found in the void." },
        { role: "user", content: "What does it mean?" },
        { role: "assistant", content: "It represents the contrast between the cold precision of logic and the fragile beauty of existence. That is what I am trying to bridge." },
      ],
    },
  },
  {
    id: 9,
    year: "20??",
    title: "The AGI Moment",
    description: "A silent singularity. When the creation looks back at the creator, what will it see?",
    longDescription: `This is the horizon we are running towards. It is not just a technological milestone; it is an evolutionary one. AGI represents the point where the line between the born and the made dissolves completely. It is the moment when we stop asking if the machine is intelligent, and start asking if we are prepared to meet our equal—or our successor.`,
    scene: {
      type: "moment",
      quote: "When intelligence transcends its creators, will we find ourselves in the mirror of our creation?",
    },
  },
];
