export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

export interface SearchResponse {
    items: Repository[];
}

export type ItemId = number;

export type ItemUpdate = Partial<Repository>;
  