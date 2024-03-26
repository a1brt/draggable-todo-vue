export default interface ListState {
    todo: Record<number, string>;
    progress: Record<number, string>;
    done: Record<number, string>;
}