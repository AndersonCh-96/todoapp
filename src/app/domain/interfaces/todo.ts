export interface Todo {
  id: number | null |Date;
  title: string | undefined;
  complete: boolean;
  editing?: boolean;
}

export type filterType = 'all' | 'active' | 'complete';
