type Node = {
    value?;
    next?;
}

export class LinkedList {
    head: Node;
    count: number = 0;

    push(val, allowIdentical = false) {
        if (!allowIdentical && this.has(val)) return;
        var node = {
            value: val,
            next: undefined
        }
        this.count++;
        if (!this.head) {
            this.head = node;
        }
        else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    }

    forEach(func) {
        let current = this.head;
        while (current) {
            func(current.value);
            current = current.next;
        }
    }

    has(val) {
        let current = this.head;
        while (current) {
            if (current.value === val) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    clear() {
        this.head = undefined;
        this.count = 0;
    }

    remove(val) {
        let current = this.head;
        var previous = current;
        while (current) {
            if (current.value === val) {
                this.count--;
                previous.next = current.next;
                if (current === this.head)
                    this.head = current.next;
                return;
            }
            previous = current;
            current = current.next;
        }
    }
}