const BUILDING_SEPARATE_CHAINED_HASHMAPS_IN_RUST = `
Hashmaps are magic wands to convert linear lookups into constant lookups.

Good software engineers convert their favorite magic wands 
into tools they could build themselves.
Let's try to be good software engineers.

## What are hashmaps?

Hashmaps (AKA dictionaries or hash tables) have
an illusively simple interface:

- \`Insert\`: Place a value under a given
  key
- \`Get\`: Retrieve the value for a
  key

An inefficient implementation of such
an interface would be:

\`\`\`rust
struct MyHashMap<K, V> {
    vec: Vec<(K, V)>,
}

impl<K: PartialEq, V> MyHashMap<K, V> {
    fn insert(&mut self, k: K, v: V) {
        self.vec.push((k, v));
    }

    fn get(&self, k: &K) -> Option<&V> {
        self.vec
            .iter()
            .find(|(key, _)| key == k)
            .map(|(_, value)| value)
    }
}
\`\`\`

That get method searches linearly through the vector, taking $O(n)$
to find the value.

Hashmaps use a hash function
to convert that key into the
proper index (in constant time), thereby
making the get function $O(1)$.

## Hash functions

A hash function is a deterministic
function that takes a key of arbitrary size and
maps it to a numeric value of fixed size.
Easy enough.

Technically this satisfies
the conditions for a hash function:

\`\`\`rust
fn hash(key: &str) -> u8 {
    key.bytes().sum() % 100
}
\`\`\`

You may have seen a hash
function like this before as a checksum.

Though \`hash\` may satisfy our limited definition, it is not particularly useful as a hash function.

The magic comes when we introduce stronger constraints.

### Cryptographic hash functions

A hash function is cryptographic if it is
hard to invert.

Ideally:
- It is quick to calculate the hash for a given key
- It is extremely difficult (if not impossible) to calculate the key from a hash

For example, a cryptographic hash allows a service to store the hash of your password,
rather than storing the actual password. Since the hash is cryptographic:
- The client can quickly hash the password and pass it to the backend to verify its identity
- A malicious actor who has that hash could not guess your password

The outputs of cryptographic hash functions are usually
high dimensional to prevent malicious actors
from guessing random values.

### Size constraints

A hash function typically can accept a
huge input and map to an output
of a fixed, smaller size.

The classic example is a checksum which
deterministically outputs a
number of fixed size for arbitrarily large
sets of data. 

Suppose you have a 10GB file locally on your machine that you recently downloaded from a server.
How might you set up a way to quickly verify whether your file is up to date?

The crude implementation might involve downloading the file and checking its contents against your local copy.
This is of course quite slow and expensive. Additionally, other users would have to perform this download and check themselves.

Instead, almost all file systems keep track of a checksum for each file, which is the result of hashing the file's contents.

Since hash functions are deterministic, if two files have different checksums they must
have different contents. This means checksums
can be used to quickly compare two
files without processing the actual contents. You simply need to compare the checksums, which are typically no more than a couple bytes.

### Uniform and wide distributions

The most important trait of hash
functions is that the distribution
of outputs is not logically connected
to the distribution of inputs. 

For example
if our hash function is $h: \\mathbb{Z} \\to \\mathbb{N}$,
we would expect that $h(2)$ and $h(3)$
are not near each other. In the eyes
of malicious actors, the hash function
should appear "random". This property:

- Allows the hash function to be "cryptographic"
  since inputs cannot be
  predicted from outputs
- Lowers the risk of collisions in
  hashmaps, which we'll explain shortly.

## Examples of hash functions

Two very simple hash functions are [djb2](https://en.wikipedia.org/wiki/Jenkins_hash_function) and [FNV-1a](https://en.wikipedia.org/wiki/Fowler–Noll–Vo_hash_function).

\`\`\`rust
fn gen_djb2_hash(value: &str) -> u64 {
    let mut hash: u64 = 5381;

    for byte in value.bytes() {
        hash = hash.wrapping_mul(33).wrapping_add(byte as u64);
    }

    hash
}

fn gen_fnv1a_hash(value: &str) -> u64 {
    let mut hash: u64 = 14695981039346656037;

    for byte in value.bytes() {
        hash ^= byte as u64;
        hash = hash.wrapping_mul(1099511628211);
    }

    hash
}
\`\`\`

In math notation, let $s = b_1 b_2 \\ldots b_n$ be a byte sequence.

For **djb2**, we initialize $h_0 = 5381$ and iterate:

$$
h_i = 33 \\cdot h_{i-1} + b_i \\pmod{2^{64}}
$$

For **FNV-1a**, we initialize $h_0 = 14695981039346656037$ and iterate:

$$
h_i = (h_{i-1} \\oplus b_i) \\cdot 1099511628211 \\pmod{2^{64}}
$$

In both cases the final hash is $h_n$.

Neither function is cryptographic, but both spread similar inputs across very different outputs.
Notice how close strings produce unrelated hashes:

$$
\\begin{array}{c|cc}
\\text{Input} & h_{\\text{djb2}} & h_{\\text{FNV-1a}} \\\\
\\hline
\\text{Dog} & 193454815 & 16192511150618563145 \\\\
\\text{Dogs} & 6384009010 & 243764422440794254 \\\\
\\text{Cat} & 193453277 & 859104620111048583 \\\\
\\end{array}
$$



## Hash Tables

A hash table is an array of key-value pairs combined with a hash function,
where the index of each key-value pair is determined by a hash function.

Suppose we are using a hash function $h$ and we start with an array of length $L$.
To insert the key-value $(k, v)$, we
insert $(k,v)$ at index $h(k) \\mod L$.

Thus we can find our value by looking
up a particular index, instead of searching linearly through the list.

## Handling collisions

But what if two keys map to
the same value? If $L$ is 16, then
can we only have 16 values? What if
we get unlucky, and our first 2 values
map to the same index?

There are two main ways hashmaps deal with collisions.

### Probing

We say a hashmap implements probing (or open addressing) if it reacts to collisions
by picking a new slot for a value.

Suppose our hashmap has length 16 and we inserted our first value $(k_1, v_1)$ and $h(k_1) = 3$.

So our hashmap is currently a list of length 16, with $(k_1, v_1)$ at index 3.

Now suppose we attempt to insert $(k_2, v_2)$, but $h(k_2) = 3$!

The simplest implementation of probing would then insert $(k_2, v_2)$ at the next available index (4).

When we lookup $k_2$ in the hashmap we would:
- Compute $h(k_2)$ which is $3$
- Check index $3$ to see if $k_2$ lives there.
- Since it doesn't, we would then check the next index (4).
- Since our key exists there, we would return $v_2$


There are many variants to probing such as:
- Quadratic probing: Instead of finding the next available index you check the next $2^n$ position.
- Robin-hood probing: Rearrange the positions to minimize the distance from a key's actual location to its hashed index. This is what Rust implements.

### Separate Chaining

Separate chaining instead uses an array of buckets, where key-value entries are inserted into each bucket.

Again, suppose our hashmap has length 16 and we inserted our first value $(k_1, v_1)$ and $h(k_1) = 3$.

With separate chaining we insert $(k_1,v_1)$ in the bucket at index 3.

Now suppose we attempt to insert $(k_2, v_2)$, but $h(k_2) = 3$.
Instead of finding another slot, we just append $(k_2, v_2)$ to our bucket.

When we lookup $k_2$ in the hashmap we would now:
- Compute $h(k_2)$ which is $3$
- Check the bucket at index $3$
- Iterate through the bucket until we find $k_2$

That means in the worst case scenario, when we always collide, all our entries get put in the same bucket and lookup costs $O(n)$.
However, if we are using a good hash function collision should be rare.


## Implementing Separate chaining in Rust

We'll use djb-2 as our hashmap:

\`\`\`rust
fn gen_djb_2_hash(value: &str) -> u64 {
    let mut hash: u64 = 5381;
    let value_bytes = value.bytes();

    for byte in value_bytes {
        hash = hash.wrapping_mul(33).wrapping_add(byte as u64)
    }
    hash
}
\`\`\`

We'll keep our hashmap simple with only functions for insertion and retrieval.

\`\`\`rust
struct CustomHashMap<V> {
    buckets: Vec<Vec<(String, V)>>,
    capacity: usize
}

impl<V: Clone> CustomHashMap<V> {
    fn new(capacity: Option<usize>) -> Self {
        let cap = match capacity {
            Some(x) => x,
            None => 16
        };

        Self {
            capacity: cap,
            buckets: vec![Vec::new(); cap]
        }
    }

    fn get_bucket_index(&self, key: &str) -> usize {
        (gen_djb_2_hash(key) as usize) % self.capacity
    }

    fn insert(&mut self, key: String, value: V) {
        let bucket_index = self.get_bucket_index(&key);
        let bucket = &mut self.buckets[bucket_index];

        for pair in bucket.iter_mut() {
            if pair.0 == key {
                pair.1 = value;
                return
            }
        }

        bucket.push((key, value))
    }

    fn get(&self, key: &str) -> Option<&V> {
        let bucket_index = self.get_bucket_index(&key);
        let bucket = &self.buckets[bucket_index];

        for (k,v) in bucket {
            if key == k {
                return Some(v)
            }
        }
        return None
    }
}
\`\`\`

Now the elephant in the room is our fixed capacity of 16. 
If we are inserting thousands of entries, we will lose our constant-time lookups very quickly.

Most hashmap implementations keep track of **load**, which is the ratio between entries and buckets.

When that ratio approaches a certain threshold (say $0.75$), the hashmap will automatically resize and reindex itself with more buckets.
We'll avoid that complexity for now.


We can then use our hashmap with:

\`\`\`rust
fn main() {
    let mut hmap: CustomHashMap<i32> = CustomHashMap::new(None);

    for i in 1..=100 {
        let val = i*i;
        hmap.insert(i.to_string(), val);
        println!("Key '{}': {:?}", i, hmap.get(&i.to_string()));
    }
}
\`\`\`

`;

export default BUILDING_SEPARATE_CHAINED_HASHMAPS_IN_RUST;
