# immutable-minimongo-performance-test

Measuring performance of immutable-minimongo and
comparing it with a performance of standalone minimongo.

Loads data from a large JSON file containing list of all cities
and measures time of various operations performed on this dataset.

## Installation

```
$ git clone https://github.com/metstrike/immutable-minimongo-performance-test.git
$ cd immutable-minimongo-performance-test
$ npm install
```

## Performance Test

```
$ npm test
Loading data ... 0.502s
Preparing data ... 0.287s
Turning data immutable ... 4.402s
Inserting to ac array ... 0.066s
Inserting to mc ... 5.642s
Inserting to ic ... 5.534s
Inserting batch to ic ... 3.696s
Inserting to {} ... 291937 0.089s
Inserting to Map ... 291937 0.639s
Inserting to OrderedMap ... 291937 1.239s
Inserting to List ... 291937 0.266s
Inserting to IdMap ... 291937 1.375s
Counting array ... 0s
Counting mc ... 291937 0.29s
Counting ic ... 291937 0.063s
Fetching mc ... 291937 1.271s
Fetching ic ... 291937 0.538s
Fetching mc prj ... 291937 0.601s
Fetching ic prj ... 291937 5.682s
Counting prg mc ... 4 0.938s
Counting prg ic ... 4 1.908s
Fetching prg mc ... 4 0.948s
Fetching prg ic ... 4 1.832s
```
## License

MIT
