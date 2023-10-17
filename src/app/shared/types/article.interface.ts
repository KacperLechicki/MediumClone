import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  body: string;
  createdAt: Date | string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: Date | string;
  author: ProfileInterface;
}
