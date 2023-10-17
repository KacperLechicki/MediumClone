import { FeedResponseInterface } from './feed-response.interface';

export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  data: FeedResponseInterface | null;
}
