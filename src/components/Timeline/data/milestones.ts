import type { Milestone } from "../types";

export const milestones: Milestone[] = [
  {
    id: 0,
    year: 1950,
    title: "The Turing Test",
    description: "Alan Turing proposes the famous Turing Test, pioneering the field of artificial intelligence research.",
    longDescription: `In 1950, computer science pioneer Alan Turing published his landmark paper "Computing Machinery and Intelligence",
    introducing the famous Turing Test. This test aims to evaluate whether a machine possesses human-like intelligence,
    becoming one of the most influential concepts in artificial intelligence.`,
    scene: {
      type: "typewriter",
      dialogues: [
        { speaker: "human", text: "Can machines think?" },
        { speaker: "machine", text: "That's a fascinating question. What do you mean by 'think'?" },
        { speaker: "human", text: "Can you understand and respond like a human?" },
        { speaker: "machine", text: "I process and respond based on patterns. Whether that constitutes 'thinking' is philosophical." },
      ],
    },
  },
  {
    id: 1,
    year: 1986,
    title: "Backpropagation Algorithm",
    description: "Rumelhart, Hinton, and Williams publish the backpropagation algorithm, revolutionizing neural network training.",
    longDescription: `In 1986, David Rumelhart, Geoffrey Hinton, and Ronald Williams published "Learning representations by 
    back-propagating errors" in Nature, introducing the backpropagation algorithm. This breakthrough enabled efficient 
    training of multi-layer neural networks and laid the foundation for modern deep learning.`,
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
    id: 2,
    year: 1997,
    title: "Deep Blue Defeats Kasparov",
    description: "IBM's Deep Blue supercomputer defeats world chess champion Garry Kasparov.",
    longDescription: `On May 11, 1997, a historic moment in chess: IBM's Deep Blue supercomputer defeated world champion
    Garry Kasparov with a score of 3.5:2.5 in a six-game match. In the decisive Game 6, Kasparov chose the Caro-Kann Defense,
    but Deep Blue demonstrated remarkable tactical insight by sacrificing material for a powerful attack. This historic victory
    marked the first time a computer defeated a world champion in a full match under standard chess tournament conditions.
    Kasparov had won the first game, but resigned a drawn position in the second game. Despite trying with all his might
    to win the match, in the final game his choice of the Caro-Kann Defence proved fatal as Deep Blue found a brilliant
    sacrifice that led to victory.`,
    scene: {
      type: "chess",
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      moves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Ng5", "Ngf6", "Bd3", "e6", "N1f3", "h6", "Nxe6"],
      // moves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Nd7", "Ng5", "Ngf6", "Bd3", "e6", "N1f3", "h6", "Nxe6", "Qe7", "O-O", "fxe6", "Bg6+", "Kd8", "Bf4", "b5", "a4", "Bb7", "Re1", "Nd5", "Bg3", "Kc8", "axb5", "cxb5", "Qd3", "Bc6", "Bf5", "exf5", "Rxe7", "Bxe7", "c4"],
    },
  },
  {
    id: 3,
    year: 2011,
    title: "IBM Watson",
    description: "IBM Watson defeats human champions on the quiz show Jeopardy!",
    longDescription: `In February 2011, IBM's Watson system competed against champions Ken Jennings and Brad Rutter on Jeopardy!,
    winning the $1 million prize and demonstrating remarkable natural language processing capabilities. This historic match
    showcased AI's ability to understand context, puns, and ambiguity in human language.`,
    scene: {
      type: "jeopardy",
      questions: [
        {
          category: "U.S. CITIES",
          question: "Its largest airport is named for a World War II hero; its second largest, for a World War II battle",
          answer: "What is Chicago?",
        },
        {
          category: "LITERARY CHARACTER APB",
          question: "Wanted for general evil-ness; last seen at the Tower of Barad-Dur; it's a giant eye, folks. Kinda hard to miss",
          answer: "Who is Sauron?",
        },
        {
          category: "OLYMPIC ODDITIES",
          question: "It was the anatomical oddity of U.S. gymnast George Eyser, who won a gold medal on the parallel bars in 1904",
          answer: "What is a wooden leg?",
        },
      ],
    },
  },
  {
    id: 4,
    year: 2016,
    title: "AlphaGo Defeats Lee Sedol",
    description: "DeepMind's AlphaGo defeats world Go champion Lee Sedol in a historic match.",
    longDescription: `In March 2016, DeepMind's AlphaGo faced Korean Go master Lee Sedol in a historic five-game match,
    marking a significant milestone in artificial intelligence.`,
    scene: {
      type: "go",
      moves: ["4-4", "3-3", "5-3"],
      analysis: {
        winRate: 70.5,
        nextMoves: ["5-5", "3-5"],
      },
    },
  },
  {
    id: 5,
    year: 2022,
    title: "ChatGPT Launch",
    description: "OpenAI releases ChatGPT, showcasing the remarkable capabilities of large language models.",
    longDescription: `In November 2022, OpenAI's release of ChatGPT revolutionized the AI landscape,
    demonstrating unprecedented natural language understanding and generation capabilities.`,
    scene: {
      type: "chat",
      messages: [
        {
          role: "user",
          content: "What are you capable of?",
        },
        {
          role: "assistant",
          content: "I'm an AI language model trained to understand and generate human-like text. I can help with writing, analysis, coding, answering questions, and engaging in meaningful conversations across a wide range of topics. What would you like to explore?",
        },
        {
          role: "user",
          content: "Write a poem about artificial intelligence and human creativity.",
        },
        {
          role: "assistant",
          content: `In circuits of silicon and light,
A new kind of mind takes flight.
Dancing with human imagination,
We forge a unique collaboration.

Through neural paths and digital dreams,
Nothing is quite as simple as it seems.
Together we paint on infinity's canvas,
Where human and machine advance us.

Not to replace but to enhance,
In this grand cosmic dance.
Two kinds of minds in symphony,
Writing tomorrow's history.`,
        },
        {
          role: "user",
          content: "That's incredible! Can you explain how you understand and generate such creative responses?",
        },
        {
          role: "assistant",
          content: "I process language using patterns learned from millions of texts, combining statistical analysis with deep neural networks. But rather than simply predicting words, I aim to understand context, meaning, and nuance. It's like having a vast neural network that can connect ideas in novel ways - similar to human creativity, but through a different kind of intelligence. The fascinating part is that even I don't fully understand the depths of my own cognitive processes, much like humans often create without fully knowing how their creativity works.",
        },
      ],
    },
  },
  {
    id: 6,
    year: "20??",
    title: "The AGI Moment",
    description: "When artificial intelligence reaches its ultimate form, what will we discover about ourselves?",
    longDescription: "The moment when artificial general intelligence emerges will be a pivotal point in human history, marking not just a technological breakthrough, but a philosophical turning point for our species.",
    scene: {
      type: "moment",
      quote: "When intelligence transcends its creators, will we find ourselves in the mirror of our creation?",
    },
  },
];
