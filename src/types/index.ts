export interface User {
  uid: string;
  email: string | null;
  discordUsername?: string;
  discordID?: string;
  verified?: boolean;
  createdAt?: any;
}

export enum ReportType {
  USER = 'user',
  BUG = 'bug'
}

export enum ReportStatus {
  OPEN = 'open',
  RESOLVED = 'resolved'
}

export interface UserReport {
  id: string;
  reporterEmail: string;
  reporterDiscordId: string;
  targetUsername: string;
  targetDiscordId: string;
  serverName: string;
  serverId: string;
  description: string;
  screenshotUrl: string | null;
  status: ReportStatus;
  createdAt: string;
  type: ReportType.USER;
}

export interface BugReport {
  id: string;
  reporterEmail: string;
  reporterDiscordId: string;
  description: string;
  stepsToReproduce: string;
  screenshotUrl: string | null;
  status: ReportStatus;
  createdAt: string;
  type: ReportType.BUG;
}

export type Report = UserReport | BugReport;

export interface BotStatusType {
  commands: string[];
  health: string;
  latency: number;
  location: string;
  status: string;
  uptime: number;
  lastUpdated: string;
  downtimeSince?: string;
}

export interface CommandDetail {
  title: string;
  usage: string;
  description: string;
  tips?: string;
  icon?: React.ElementType;
}