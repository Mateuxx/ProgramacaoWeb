class IntergetSet {
    
    constructor (valorMAx) {
        this.valorMAx = valorMAx
        this.set = new Array (valorMAx).fill(false)
    }

    insert (element) {
        if(element>= 0 && element <= this.valorMAx ) {
            this.set[element] = true
        }
    }

    remove (element) {
        if(element>= 0 && element <= this.valorMAx ) {
            this.set[element] = false
        }
    }

    union (outroCojunto) {
        const newSet = new IntergetSet(this.valorMAx)
        for (let i = 0; i <= this.maxValue; i++) {
            newSet.set[i] = this.set[i] || otherSet.set[i];
          }
          return newSet;
    }

    intersection(otherSet) {
        const newSet = new IntergetSet(this.maxValue);
        for (let i = 0; i <= this.maxValue; i++) {
          newSet.set[i] = this.set[i] && otherSet.set[i];
        }
        return newSet;
      }

    difference(otherSet) {
        const newSet = new IntergetSet(this.maxValue);
        for (let i = 0; i <= this.maxValue; i++) {
        newSet.set[i] = this.set[i] && !otherSet.set[i];
        }
        return newSet;
    }

    toString() {
        const elements = [];
        for (let i = 0; i <= this.maxValue; i++) {
          if (this.set[i]) {
            elements.push(i);
          }
        }
        return `{ ${elements.join(', ')} }`;
    }
}



const set1 = new IntergetSet(10);
const set2 = new IntergetSet(10);

set1.insert(1);
set1.insert(3);
set1.insert(5);
set2.insert(3);
set2.insert(4);
set2.insert(5);


console.log(set1.toString()); 
console.log(set2.toString()); 

// União
const unionSet = set1.union(set2);
console.log(unionSet.toString()); 

// Interseção
const intersectionSet = set1.intersection(set2);
console.log(intersectionSet.toString()); 

// Diferença
const differenceSet = set1.difference(set2);
console.log(differenceSet.toString()); 