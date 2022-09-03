function TaskRunner(concurrency) {
    this.awaiting = [];
    this.count = 0;
    this.concurrency = concurrency;
    this.notifyEnd = this.notifyEnd.bind(this);
}
TaskRunner.prototype.push = function push(task) {
    this.awaiting.push(task);
    this.run();
}
TaskRunner.prototype.notifyEnd = function notifyEnd() {
    --this.count;
    this.run();
}
TaskRunner.prototype.run = function run() {
    while((this.count < this.concurrency) && this.awaiting.length) {
        ++this.count;
        this.awaiting.shift()(this.notifyEnd)
    }
}

function exampleSimpleTask(done) {
    console.log('Executing task.');
    setTimeout(done, Math.random() * 1000);
}

let r = new TaskRunner(3);

r.push(exampleSimpleTask);
r.push(exampleSimpleTask);
r.push(exampleSimpleTask);
r.push(exampleSimpleTask);
r.push(exampleSimpleTask);
