export interface RollHistoryItem {
  id: string;
  dieName: string;
  value: string | number;
  timestamp: number;
}

export interface RollGroup {
  timestamp: number;
  rolls: RollHistoryItem[];
}