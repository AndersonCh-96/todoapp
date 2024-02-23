export interface Todo {
  id: number;
  title: string;
  complete: boolean;
  editing: boolean;
}

export type filterType = 'all' | 'active' | 'complete';
