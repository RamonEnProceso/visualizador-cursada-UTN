export interface Career {
    name: string;
    levels: Level[];
}

export interface Level {
    name: string;
    subjects: Subject[];
}

export interface Subject {
    name: string;
    id: string;
    duration?: Duration[];
    elective?: boolean;
    number?: number;
    approved?: string[];
    taken?: string[];
}

export interface Duration {
    name: string;
    weeklyHours: number;
    academicHours: number;
}