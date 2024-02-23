export interface Todo {
  id: number | null |Date;
  title: string;
  complete: boolean;
  editing?: boolean;
}

export type filterType = 'all' | 'active' | 'complete';
