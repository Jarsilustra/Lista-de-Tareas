export class Task {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}
