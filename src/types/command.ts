export interface Command {
  id: string;
  name: string;
  title: string;
  description: string;
  usage: string;
  category: string;
  tips?: string;
  example: string;
}

export type CommandsByCategory = Record<string, Command[]>;