export interface Habit {
    id: string;
    name: string;
    type: 'positive' | 'negative';
    frequency: string;
    periodProgress: string;
    streak: string;
}