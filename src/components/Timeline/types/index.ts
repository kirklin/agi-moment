// 基础类型定义
export interface BaseMilestone {
  id: number;
  year: number | string;
  title: string;
  description: string;
  longDescription: string;
}

// 场景类型定义
export interface BaseScene {
  type: SceneType;
}

export type SceneType = "typewriter" | "chess" | "jeopardy" | "go" | "chat" | "network" | "moment" | "dartmouth" | "attention";

// 对话场景
export interface TuringTestSceneData extends BaseScene {
  type: "typewriter";
  dialogues: Array<{
    speaker: "human" | "machine";
    text: string;
  }>;
}

// 象棋场景
export interface ChessSceneData extends BaseScene {
  type: "chess";
  position: string;
  moves: string[];
}

// 问答场景
export interface JeopardySceneData extends BaseScene {
  type: "jeopardy";
  questions: Array<{
    category: string;
    question: string;
    answer: string;
  }>;
}

// 围棋场景
export interface GoSceneData extends BaseScene {
  type: "go";
  moves: string[];
  analysis: {
    winRate: number;
    nextMoves: string[];
  };
}

// 聊天场景
export interface ChatSceneData extends BaseScene {
  type: "chat";
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

// 神经网络场景
export interface NetworkSceneData extends BaseScene {
  type: "network";
  config: {
    layers: number[];
    weights: number[][][];
    activations: number[][];
    errors: number[][];
  };
}

// AGI时刻场景
export interface MomentSceneData extends BaseScene {
  type: "moment";
  quote: string;
}

// 达特茅斯会议场景
export interface DartmouthSceneData extends BaseScene {
  type: "dartmouth";
  quote: string;
}

// Attention场景
export interface AttentionSceneData extends BaseScene {
  type: "attention";
  quote: string;
}

// 场景联合类型
export type Scene =
  | TuringTestSceneData
  | ChessSceneData
  | JeopardySceneData
  | GoSceneData
  | ChatSceneData
  | NetworkSceneData
  | MomentSceneData
  | DartmouthSceneData
  | AttentionSceneData;

// 完整里程碑类型
export interface Milestone extends BaseMilestone {
  scene: Scene;
}

// 组件Props类型定义
export interface TuringTestSceneProps {
  dialogue: TuringTestSceneData["dialogues"];
}

export interface ChessSceneProps {
  gameState: ChessSceneData;
}

export interface JeopardySceneProps {
  questions: JeopardySceneData["questions"];
}

export interface GoSceneProps {
  gameState: GoSceneData;
}

export interface ChatSceneProps {
  conversation: ChatSceneData["messages"];
}

export interface NetworkSceneProps {
  networkState: NetworkSceneData["config"];
}

export interface MomentSceneProps {
  quote: string;
}

export interface DartmouthSceneProps {
  quote: string;
}

export interface AttentionSceneProps {
  quote: string;
}

export interface TimelineCardProps {
  milestone: Milestone;
  index: number;
  isActive: boolean;
}

export interface TypewriterEffectProps {
  text: string;
  isLast: boolean;
}
