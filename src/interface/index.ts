export interface ArticleAttributes {
  created_at: string | number | Date;
  article_id: number;
  manga: string;
  title: string;
  content: string;
  likes: number;
  edited?: boolean | null;
  user_id: number;
  pseudo: string;
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

export interface CommentAttributes {
  comment_id: string;
  title: string;
  content: string;
  created_at: string;
  pseudo: string;
}
