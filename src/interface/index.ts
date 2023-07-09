export interface ArticleAttributes {
  article_id: number;
  manga: string;
  title: string;
  content: string;
  likes: number;
  edited?: boolean | null;
  user_id: number;
}

export interface UserAttributes {
  user_id: number;
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  role: number;
  articles: ArticleAttributes[];
  created_at: Date;
}
