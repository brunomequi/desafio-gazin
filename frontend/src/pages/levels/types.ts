
export interface Level {
    id: number;
    nivel: string;
    developers_count: number;
  }
  
  export interface LevelsResponse {
    data: Level[];
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  }
  