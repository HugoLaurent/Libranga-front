export interface ArticleAttributes {
  url: string;
  title: string;
  content: string;
  category_id: number;
  manga: string;
  user_id: number;
  likes: number;
  edited: boolean;
  Comments: CommentAttributes[];
  date: string;
  created_at: string;
  article_id: number;
  pseudots: string[];
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
  Comments: CommentAttributes[];
}

export interface CommentAttributes {
  comment_id: number;
  title: string;
  content: string;
  created_at: string;
  pseudo: string;
}

export interface MangaAttributes {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface FormDataAttributes {
  title: string;
  content: string;
  category_id: number;
  manga: string;
  user_id: number;
  likes: number;
  edited: boolean;
  url: string;
}
