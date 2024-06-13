export type Level = {
    id: number;
    nivel: string;
}

export type LevelsResponse = {
    data: Level[],
    meta: {
        total: number,
        per_page: number,
        current_page: number,
        last_page: number,
    }
}

