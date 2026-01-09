export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Success {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface UserSuccess {
  successId: string;
  completedAt: Date;
}

export interface SuccessWithProgress extends Success {
  isCompleted: boolean;
  completedAt?: Date;
}

export interface SuccessData {
  categories: Category[];
  successes: Success[];
}
