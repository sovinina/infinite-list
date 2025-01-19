import { makeAutoObservable, runInAction } from 'mobx';
import fetchRepos from './githubApi';
import { Repository, ItemId, ItemUpdate } from './types';

class RepoStore {
    repos: Repository[] = [];
    loading = false;
    error: string | null = null;
    page = 1;
    hasMore = true;

    constructor() {
        makeAutoObservable(this);
    }

    fetchMore = async () => {
        if (this.loading || !this.hasMore) return;

        this.loading = true;
        try {
            const response = await fetchRepos(this.page);
            runInAction(() => {
                this.repos.push(...response.items);
                this.hasMore = response.items.length > 0;
                if(this.hasMore){
                    this.page++;
                }
            });
        }
        catch (err: any) {
            runInAction(() => {
                this.error = err.message || 'Failed to load repos';
            });
        } 
        finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    removeRepo = (id: ItemId) => {
        this.repos = this.repos.filter(repo => repo.id !== id);
    };

    updateRepo = (id: ItemId, updates: ItemUpdate) => {
        this.repos = this.repos.map(repo =>
            repo.id === id ? { ...repo, ...updates } : repo
        );
    };
}

export default new RepoStore();
