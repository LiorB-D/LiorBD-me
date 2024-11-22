const DRIVING_NEUROEVOLUTION = `

Neuroevolution is one of the most satisfying machine learning algorithms to build, tweak, and play around with. We’ll be building our very own Neuroevolution algorithm to teach a population of cars how to successfully navigate through a race track.

We’ll be using P5.js for the graphics engine, Tensorflow to handle our neural networks, and Javascript to put it all together.

![0_HfS6nhLQ_cmFuTvw.gif](https://i.imgur.com/w34mFxa.gif)

### What is Neuroevolution?

Neuroevolution is a method in AI that simulates evolution and genetic reproduction to create ‘intelligent’ models, most often in the form of Artificial Neural Networks.

Neuroevolution is most commonly done by first creating a generation of agents(in our case cars) that have completely random weights and biases. This means they will effectively make decisions randomly, and therefore will not get very far.

Next, we simulate how this generation of cars performs on the task we want it to learn(In this case driving around a race track).

Then we assign each car in the generation a score on how well it’s done. This is where evolution comes in, because we use the highest scoring cars to create the new generation.

More specifically, Neuroevolution takes inspiration from actual genetic processes, through what is known as Selection and Mutation.

Selection is the process by which we pick traits from the parent generation. Mutation is the process by which we randomly generate traits for the new generation.

Neuroevolution will generate a new generation through both selection and mutation. Just like actual evolution, this tends to result in the next generation being slightly better than the previous.

Over time, our population of cars will get better and better until they are able to perform at a level that we are happy with.

### Our Driving Environment

I’ve taken the time to pre build the driving simulator with the help of P5.js, a Javascript graphics library, and a lot of cartesian geometry(Shoutout Desmos).

If you want the blank driving simulator to follow along with, it is all contained within two files, an [index.html](https://gist.githubusercontent.com/LiorB-D/ec291e7bb51d39b48e9d6982fe68ded4/raw/b227cb9ead764d7f4891634cc665cd5a50ad8fd3/index.html) and a [car.js](https://gist.githubusercontent.com/LiorB-D/19a1252713441c4ef57679237d6d0666/raw/7971c06c7b0133d90996c71d765e7320c0ef6aa4/car.js):

If you run the  starter code, you should have your first generation of cars at the starting line. Since we haven’t yet given them any way to move, they will all be standing still.

![Untitled](https://i.imgur.com/WmSXM4C.png)

The first step in any neuroevolution algorithm is defining the inputs and outputs that your species has access to. In our case, each car can detect how close an object is in each of 5 directions(Represented by the red lines). It will receive a number between 1 and 20 representing how close the object is. If there is no object, they will also receive a 20.

In terms of output, each car can make four decisions:

- Accelerate
- Brake
- Turn Right
- Turn Left

![0_xhmdjqSwpX0bkx0c.gif](https://i.imgur.com/OAZQcSf.gif)

Of course, if a car runs into the wall or an obstacle, it will die.

A car’s fitness score(How well it does) is determined by how many laps they do(Worth 100 each) plus how far along on the track they are(ranging from 0 to 100). For example, if a car completes 2 and a half laps before dying, it will have a fitness of 250.

### Creating Our Neural Network with Tensorflow

Now let’s give each car the ability to make driving decisions. We will be equipping each car object with an Artificial Neural Network which takes 5 integers representing the proximity to an obstacle in each direction. Then we will have one hidden layer of 8 neurons with ReLU activations. Finally, the Neural net will output 4 values for each of the decisions it can make:

- Accelerate
- Brake
- Turn Right
- Turn Left

The output layer will be using a sigmoid activation function, which will give us values between 0 and 1 for each decision. The car will then multiply each decision output by the maximum rate at which it can perform an action.

For example, let’s say we allow each car to accelerate at a maximum acceleration of 0.50. If it outputs 0.20 for the first neuron, then we will add 0.2 * 0.5 to the speed(So 0.1).

![Untitled](https://i.imgur.com/iz1KWCx.png)

Let’s first create the model in the Car class:

\`\`\`jsx
setupModel() {
    // Create a sequential neural network
    this.model = tf.sequential();
    let hidden1 = tf.layers.dense({
      units: 8,
      activation: "relu",
      inputDim: 5,
    });
    let outputLayer = tf.layers.dense({
      units: 4,
      activation: "sigmoid",
    });
    this.model.add(hidden1);
    this.model.add(outputLayer);

    //Compile
    this.model.compile({
        optimizer: "adam",
        loss: "binaryCrossentropy"
    });
  }
\`\`\`

Make sure to call the above function in the constructor for the Car class.

Then, before we update the position of each car class in our draw function, let’s collect the inputs and use this model to make decisions for the car:

\`\`\`jsx
cars.forEach((car) => {
        //Draw car

        //Draw Wheels
        fill("black");
        strokeWeight(0);
        ellipse(
          car.x + (carDi / 2) * cos(car.angle + PI / 4),
          car.y + (carDi / 2) * sin(car.angle + PI / 4),
          carDi / 2.5
        );
        ellipse(
          car.x + (carDi / 2) * cos(car.angle - PI / 4),
          car.y + (carDi / 2) * sin(car.angle - PI / 4),
          carDi / 2.5
        );
        ellipse(
          car.x + (carDi / 2) * cos(car.angle + 0.75 * PI),
          car.y + (carDi / 2) * sin(car.angle + 0.75 * PI),
          carDi / 2.5
        );
        ellipse(
          car.x + (carDi / 2) * cos(car.angle - 0.75 * PI),
          car.y + (carDi / 2) * sin(car.angle - 0.75 * PI),
          carDi / 2.5
        );

        //Draw Car Base
        fill("blue");
        stroke("black");
        strokeWeight(1);
        ellipse(car.x, car.y, carDi);

        //Draw Eye
        fill("yellow");
        ellipse(car.eyeX, car.eyeY, carDi / 3);

        // Car Behavior

        if (car.dead == false && car.ptInObst(car.x, car.y) == false) { // Make sure car is alive
          car.updatePos();

          //Make Decision

          //Get obstacle detection distances
          let inputs = tf.tensor2d([car.getCollisDist()]);

          // Predict the value
          let decArr = car.model.predict(inputs).dataSync();

          //Adjust angle and velocity based on outputs
          car.v += 0.1 * decArr[0]; // Accelerate
          car.v -= 0.2 * decArr[1]; // Brake
          car.angle -= 0.1 * decArr[2]; // Turn Left
          car.angle += 0.1 * decArr[3]; // Turn Right
        } else{
          car.dead = true // Kill the car if it is in obstacle
        }
      });
\`\`\`

Now, our cars can make decisions, but keep in mind that the weights and biases of our neural networks are completely random. Thus the cars will most likely be doing nonsense:

![n88vnlpu6eotiqjbi4gn.gif]()

In fact, many of our cars simply turn around in circles aimlessly or do nothing at all. There’s no need to worry, since all we need is one to randomly decide to drive forward to get our evolution going in the right direction!

### Genetic Selection and Breeding New Generations

The next step is to breed a new generation. We’ll be using what is known as Fitness Proportionate, or Roulette Wheel, Selection.

![Untitled](https://i.imgur.com/DWQUzh3.png)

This algorithm works by considering the fitness scores of each car in the parent generation, and randomly picking traits from all the parents such that the best performing parents have the highest probability of passing on their traits.

To compute this, we are going to take the sum of each car's fitness score, and use a Cumulative Distribution function to pick a car. If you want a more detailed explanation of the math here, reach out and I would happy to explain more thoroughly.

\`\`\`jsx
function selectRandParent(tFit) {
      let randVal = tFit * random() // Random value between (0, tFit)
      let count = 0 // Cumulitive Fitness
      
      for(let i = 0; i < cars.length; i++) {
          count += cars[i].fitness
          if(randVal <= count) {
            return i
          }
      }
    }
\`\`\`

Additionally, let’s create a function that will compute the total fitness at the end of a generation, as well as compute the highest fitness in the generation for benchmarking purposes(We’ll use a label later to show the highest score and the current generation)

\`\`\`jsx
function endGen() {
      let totalFitness = 0
      bestOfGen = 0

      // Calculate total fitness and find highest performing car
      cars.forEach((car, ind) => {
        car.dead = true
        totalFitness += car.fitness
        if(car.fitness > bestOfGen) {bestOfGen = car.fitness}
      })
      //Update highest score if applicable
      if(bestOfGen > topFitnessScore) {
        topFitnessScore = bestOfGen
      }

      return totalFitness
    }
\`\`\`

The last helper function we need is a way to copy the weights from each car so we can pass these onto new generations:

\`\`\`jsx
copyWeights() {
    // Turn weights from Tensorformat to array format
    const weights = this.model.getWeights(); // Pull weights

    const weightCopies = [];

    weights.forEach((wLayer) => {
      let values = wLayer.dataSync(); // turn that layer from Tensor into array
      weightCopies.push(values);
    });
    
    return weightCopies;
  }
\`\`\`

Now let’s write our function to create the new generation.

For each new child, we will iterate through weight in its model and randomly assign it a weight from a parent(using our selection algorithm).

\`\`\`jsx
function startNewGen() {
        totalFitness = endGen();
        let newCarArr = []; // The next generation

        //Get parent weights
        let parentWeights = [];
        cars.forEach((c) => {
          parentWeights.push(c.copyWeights());
        });

        //Create next generation
        for (let i = 0; i < 10; i++) {
          // Initialize Child
          const child = new Car(
            outerDi,
            innerDi,
            screenHt,
            screenWd,
            carDi,
            obsts
          );

          let currWeights = child.model.getWeights();
          let newWeights = [];

          for (let i = 0; i < currWeights.length; i++) {
            // Iterate through each layer
            //Get Current Weight information
            let currVals = currWeights[i].dataSync(); // Array format
            let shape = currWeights[i].shape;

            for (let j = 0; j < currVals.length; j++) {
              // Iterate through each weight
              // Select trait from random parent
              currVals[j] = parentWeights[selectRandParent(totalFitness)][i][j];
            }
            let newTens = tf.tensor(currVals, shape);
            newWeights[i] = newTens;
          }

          child.model.setWeights(newWeights);

          newCarArr.push(child);
        }

        cars = newCarArr;
        // Increment Generation and Update Label
        currGen += 1;
        infoLbl.elt.innerText =
          "Gen: " + currGen + ", Top Score: " + topFitnessScore;
      }
\`\`\`

Finally, let’s start this new generation whenever every car is inactive, or after a certain amount of time passes.

Let’s create an integer in our index.html called frameCount, to keep track of how long a generation lasts. Then let’s add the following code at the end of our draw function:

\`\`\`jsx
frameCount += 1;
      // If 200 frames has passed plus a scaled of the highestScore, then start next generation
      if (frameCount > 200 + topFitnessScore * 3) {
        startNewGen();
        frameCount = 0;
      } else if (frameCount > 80) { // Check for inactivity after 80 frames
        let stillActive = false;
        // Make sure atleast one car has made progress without dying
        cars.forEach((car) => {
          if (car.fitness > 3 && car.dead == false) {
            stillActive = true;
          }
        });
        if (stillActive == false) {
          startNewGen();
          frameCount = 0;
        }
      }
\`\`\`

Now if everything is implemented correctly we might start to see some progress within a couple of generations:

![36k27nohxedy1qobm7ka.gif](https://i.imgur.com/aXsfoJF.gif)

But its also incredibly likely you might see something like this:

![cwcqk967tr7glmnxw948.gif](https://i.imgur.com/L3JurEf.gif)

This is because the traits of a generation are completely determined by the traits of their parents. That means if you have a particularly horrible generation, you will continue to get horrible children and get stuck in an endless loop.

That’s where mutation comes in.

### Genetic Mutation

Mutation is when a certain weight is given a random value. The probability of a weight being mutated, as opposed to being selected from a parent, is our mutation rate.

We’ll pull our mutation rate from the text field we’ve created, and update our new generation function like so:

\`\`\`jsx
function startNewGen() {
      totalFitness = endGen();
      let newCarArr = []; // The next generation

      mutationRate = mrateInput.value() // Pull mutation rate

      //Get parent weights
      let parentWeights = [];
      cars.forEach((c) => {
        parentWeights.push(c.copyWeights());
      });

      //Create next generation
      for (let i = 0; i < 10; i++) {
        // Initialize Child
        const child = new Car(
          outerDi,
          innerDi,
          screenHt,
          screenWd,
          carDi,
          obsts
        );

        let currWeights = child.model.getWeights();
        let newWeights = [];

        for (let i = 0; i < currWeights.length; i++) {
          // Iterate through each layer
          //Get Current Weight information
          let currVals = currWeights[i].dataSync(); // Array format
          let shape = currWeights[i].shape;

          for (let j = 0; j < currVals.length; j++) {
            // Iterate through each weight
            // Select trait from random parent
            currVals[j] = parentWeights[selectRandParent(totalFitness)][i][j];
            // Assign random value to weight from Gaussian Distribution(Function from P5)
            if(random() < mutationRate) {
                currVals[j] += randomGaussian()
            }
          }
          let newTens = tf.tensor(currVals, shape);
          newWeights[i] = newTens;
        }

        child.model.setWeights(newWeights);

        newCarArr.push(child);
      }

      cars = newCarArr;
      // Increment Generation and Update Label
      currGen += 1;
      infoLbl.elt.innerText =
        "Gen: " + currGen + ", Top Score: " + topFitnessScore;
    }
\`\`\`

This will allow generations to have wildcard traits and rise above the competition.

Now we should see some great generational progress:

![daqw9en60zyy7a7icl40.gif](https://i.imgur.com/OJHtsKw.gif)

Thus mutation allows our cars to experiment with novel strategies, and selection allows the good strategies to spread through the population.

After just 50 generations, we have most of our cars able to complete laps!

![0_HfS6nhLQ_cmFuTvw.gif](https://i.imgur.com/w34mFxa.gif)

Final version of index.html:

\`\`\`jsx
<head>
  <!-- Load in Tensorflow, P5, and our Car Class-->
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js"></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js"
    integrity="sha512-WIklPM6qPCIp6d3fSSr90j+1unQHUOoWDS4sdTiR8gxUTnyZ8S2Mr8e10sKKJ/bhJgpAa/qG068RDkg6fIlNFA=="
    crossorigin="anonymous"
  ></script>
  <script src="car.js"></script>

  <script>
    // Screen dimensions
    const screenHt = 650;
    const screenWd = 800;
    const innerDi = 300; // Diameter of Inner Circle
    const outerDi = 750; // Diameter of Outer Circle
    const carDi = 20; // Diameter of each car

    let frameCount = 0;

    let currGen = 1;
    let topFitnessScore = 0; // Highest fitness score of any generation

    //Obstacles can be added/removed without any additional implementation
    let obsts = [
      { x: screenWd / 2, y: screenHt / 4, di: 40 },
      { x: screenWd / 2, y: (3 * screenHt) / 4, di: 40 },
    ];

    // UI elements
    let nextGenBtn, mrateInput, mrateLbl;
    let infoLbl;

    let cars = [];

    function setup() {
      createCanvas(screenWd + 20 + 200, screenHt + 20);
      frameRate(60); // Edit Frame Rate to change speed of simulation

      // Setup UI elements with P5
      nextGenBtn = createButton("Next Generation");
      nextGenBtn.position(screenWd + 30, 110);

      mrateInput = createInput("0.15");
      mrateInput.position(screenWd + 30, 80);

      mrateLbl = createElement("p", "Mutation Rate:");
      mrateLbl.position(screenWd + 30, 45);

      infoLbl = createElement(
        "p",
        "Gen: " + currGen + ", Top Score: " + topFitnessScore
      );
      infoLbl.position(screenWd + 30, 150);
      // Add 20 new cars
      for (let i = 0; i < 20; i++) {
        cars.push(new Car(outerDi, innerDi, screenHt, screenWd, carDi, obsts));
      }
    }

    function draw() {
      // Looped based on framerate

      //Draw Driving Map
      strokeWeight(1);
      fill(50);
      stroke("black");
      rect(0, 0, screenWd, screenHt);

      //Outer Circle
      fill(210);
      ellipse(screenWd / 2, screenHt / 2, outerDi, outerDi / 1.5);

      fill("green");
      strokeWeight(3);
      //Obstacles
      obsts.forEach((obs) => {
        ellipse(obs.x, obs.y, obs.di);
      });
      //Inner circle
      ellipse(screenWd / 2, screenHt / 2, innerDi, innerDi / 2);

      //Draw Finish Line
      stroke("red");
      strokeWeight(4);
      line(
        screenWd / 2 - outerDi / 2,
        screenHt / 2,
        screenWd / 2 - innerDi / 2,
        screenHt / 2
      );

      cars.forEach((car) => {
        //Draw car

        //Draw Wheels
        fill("black");
        strokeWeight(0);
        ellipse(
          car.x + (carDi / 2) * cos(car.angle + PI / 4),
          car.y + (carDi / 2) * sin(car.angle + PI / 4),
          carDi / 2.5
        );
        ellipse(
          car.x + (carDi / 2) * cos(car.angle - PI / 4),
          car.y + (carDi / 2) * sin(car.angle - PI / 4),
          carDi / 2.5
        );
        ellipse(
          car.x + (carDi / 2) * cos(car.angle + 0.75 * PI),
          car.y + (carDi / 2) * sin(car.angle + 0.75 * PI),
          carDi / 2.5
        );
        ellipse(
          car.x + (carDi / 2) * cos(car.angle - 0.75 * PI),
          car.y + (carDi / 2) * sin(car.angle - 0.75 * PI),
          carDi / 2.5
        );

        //Draw Car Base
        fill("blue");
        stroke("black");
        strokeWeight(1);
        ellipse(car.x, car.y, carDi);

        //Draw Eye
        fill("yellow");
        ellipse(car.eyeX, car.eyeY, carDi / 3);

        // Car Behavior

        if (car.dead == false && car.ptInObst(car.x, car.y) == false) {
          // Make sure car is alive
          car.updatePos();

          //Make Decision

          //Get obstacle detection distances
          let inputs = tf.tensor2d([car.getCollisDist()]);

          // Predict the value
          let decArr = car.model.predict(inputs).dataSync();

          //Adjust angle and velocity based on outputs
          car.v += 0.1 * decArr[0]; // Accelerate
          car.v -= 0.2 * decArr[1]; // Brake
          car.angle -= 0.1 * decArr[2]; // Turn Left
          car.angle += 0.1 * decArr[3]; // Turn Right
        } else {
          car.dead = true; // Kill the car if it is in obstacle
        }
      });

      frameCount += 1;
      // If 200 frames has passed plus a scaled of the highestScore, then start next generation
      if (frameCount > 200 + topFitnessScore * 3) {
        startNewGen();
        frameCount = 0;
      } else if (frameCount > 80) { // Check for inactivity after 80 frames
        let stillActive = false;
        // Make sure atleast one car has made progress without dying
        cars.forEach((car) => {
          if (car.fitness > 3 && car.dead == false) {
            stillActive = true;
          }
        });
        if (stillActive == false) {
          startNewGen();
          frameCount = 0;
        }
      }
    }

    function endGen() {
      let totalFitness = 0;
      bestOfGen = 0;

      // Calculate total fitness and find highest performing car
      cars.forEach((car, ind) => {
        car.dead = true;
        totalFitness += car.fitness;
        if (car.fitness > bestOfGen) {
          bestOfGen = car.fitness;
        }
      });

      //Update highest score if applicable
      if (bestOfGen > topFitnessScore) {
        topFitnessScore = bestOfGen;
      }

      return totalFitness;
    }

    function selectRandParent(tFit) {
      let randVal = tFit * random(); // Random value between (0, tFit)
      let count = 0; // Cumulitive Fitness

      for (let i = 0; i < cars.length; i++) {
        count += cars[i].fitness;
        if (randVal <= count) {
          return i;
        }
      }
    }

    function startNewGen() {
      totalFitness = endGen();
      let newCarArr = []; // The next generation

      mutationRate = mrateInput.value() // Pull mutation rate

      //Get parent weights
      let parentWeights = [];
      cars.forEach((c) => {
        parentWeights.push(c.copyWeights());
      });

      //Create next generation
      for (let i = 0; i < 10; i++) {
        // Initialize Child
        const child = new Car(
          outerDi,
          innerDi,
          screenHt,
          screenWd,
          carDi,
          obsts
        );

        let currWeights = child.model.getWeights();
        let newWeights = [];

        for (let i = 0; i < currWeights.length; i++) {
          // Iterate through each layer
          //Get Current Weight information
          let currVals = currWeights[i].dataSync(); // Array format
          let shape = currWeights[i].shape;

          for (let j = 0; j < currVals.length; j++) {
            // Iterate through each weight
            // Select trait from random parent
            currVals[j] = parentWeights[selectRandParent(totalFitness)][i][j];
            // Assign random value to weight from Gaussian Distribution(Function from P5)
            if(random() < mutationRate) {
                currVals[j] += randomGaussian()
            }
          }
          let newTens = tf.tensor(currVals, shape);
          newWeights[i] = newTens;
        }

        child.model.setWeights(newWeights);

        newCarArr.push(child);
      }

      cars = newCarArr;
      // Increment Generation and Update Label
      currGen += 1;
      infoLbl.elt.innerText =
        "Gen: " + currGen + ", Top Score: " + topFitnessScore;
    }
  </script>

  <title>Learning to Drive w/ Genetic Algorithm</title>
</head>
\`\`\`

Final Version of car.js

\`\`\`jsx
class Car {
  constructor(outerDi, innerDi, screenHt, screenWd, carDi, obsts) {
    
    this.x =
      0.5 * (screenWd - (innerDi + outerDi) / 2) + round(random() * 80) - 40; // Slight variation in starting x
    this.y = screenHt / 2 - 5; // Right above the starting line
    this.angle = -PI / 2; // Facing upward

    //Dimensions for later usage
    this.carDi = carDi;
    this.outerDi = outerDi;
    this.innerDi = innerDi;
    this.screenHt = screenHt;
    this.obsts = obsts;
    this.screenWd = screenWd;
    
    // The location of the 'eye' of the car which shows the direction it is facing
    this.eyeX = this.x + (cos(this.angle) * this.carDi) / 2;
    this.eyeY = this.y + (sin(this.angle) * this.carDi) / 2;

    this.v = 0; // Velocity of the car
    this.fitness = 0;
    this.currQuad = 1 // Current quadrant of the car(Used to detect if it moves backwards)
    this.dead = false;
    this.compLaps = 0 // Completed Laps

    this.setupModel()
  }

  copyWeights() {
    // Turn weights from Tensorformat to array format
    const weights = this.model.getWeights(); // Pull weights

    const weightCopies = [];

    weights.forEach((wLayer) => {
      let values = wLayer.dataSync(); // turn that layer from Tensor into array
      weightCopies.push(values);
    });

    return weightCopies;
  }

  setupModel() {
    // Create a sequential neural network
    this.model = tf.sequential();
    let hidden1 = tf.layers.dense({
      units: 8,
      activation: "relu",
      inputDim: 5,
    });
    let outputLayer = tf.layers.dense({
      units: 4,
      activation: "sigmoid",
    });
    this.model.add(hidden1);
    this.model.add(outputLayer);

    //Compile
    this.model.compile({
        optimizer: "adam",
        loss: "binaryCrossentropy"
    });
  }

  updatePos() { // Called at every loop
    // Move based on velocity
    this.x += cos(this.angle) * this.v;
    this.y += sin(this.angle) * this.v;
    // Update location of eye based on angle
    this.eyeX = this.x + (cos(this.angle) * this.carDi) / 3;
    this.eyeY = this.y + (sin(this.angle) * this.carDi) / 3;

    this.v *= 0.98; // Deccelerate from Friction

    this.fitness = this.updateFitness();

    // Don't let the car move backwards
    if (this.v < 0) {
      this.v = 0;
    }
  }

  updateFitness() {
    // Geometry to calculate how far along in the track the car is(Using arctangent)

    // Relative cartesian location to racetrack
    let oX = this.x - this.screenWd / 2;
    let oY = this.y - this.screenHt / 2;
    let arctan = atan(oY / oX);

    // Determine quadrant and lap progress from arctangent and relative location
    let lapProg = 0;
    let quad = 0;
    if (oX < 0) {
      if (oY < 0) {
        quad = 1;
        lapProg = round((50 * arctan) / PI);
      } else {
        quad = 4;
        lapProg = round(100 + (50 * arctan) / PI);
      }
    } else {
      lapProg = 50 + round((50 * arctan) / PI);
      if (oY < 0) {
        quad = 2;
      } else {
        quad = 3;
      }
    }

    if (this.currQuad == 1 && quad == 4) { // If it moves backwards past the starting line
      this.dead = true;
      return this.fitness;
    } else if (this.currQuad == 4 && quad == 1) { // If it passes the finish line
      this.compLaps += 1;
    }

    this.currQuad = quad;
    
    return this.compLaps * 100 + lapProg;
  }

  getCollisDist() {
    // Calculate how close an obstacle is in each of the 5 directions
    let detDist = [20, 20, 20, 20, 20];
    for (let i = 0; i < 20; i++) {
      //Front
      let xPos = this.x + (i * 5 + this.carDi / 2) * cos(this.angle);
      let yPos = this.y + (i * 5 + this.carDi / 2) * sin(this.angle);
      if (this.ptInObst(xPos, yPos) && detDist[0] > i) {
        detDist[0] = i;
      }
      //Peripheral Right
      xPos = this.x + (i * 5 + this.carDi / 2) * cos(this.angle + PI / 4);
      yPos = this.y + (i * 5 + this.carDi / 2) * sin(this.angle + PI / 4);
      if (this.ptInObst(xPos, yPos) && detDist[1] > i) {
        detDist[1] = i;
      }
      //Peripheral Left
      xPos = this.x + (i * 5 + this.carDi / 2) * cos(this.angle - PI / 4);
      yPos = this.y + (i * 5 + this.carDi / 2) * sin(this.angle - PI / 4);
      if (this.ptInObst(xPos, yPos) && detDist[2] > i) {
        detDist[2] = i;
      }
      //Side Right
      xPos = this.x + (i * 5 + this.carDi / 2) * cos(this.angle + PI / 2);
      yPos = this.y + (i * 5 + this.carDi / 2) * sin(this.angle + PI / 2);
      if (this.ptInObst(xPos, yPos) && detDist[3] > i) {
        detDist[3] = i;
      }
      //Side Left
      xPos = this.x + (i * 5 + this.carDi / 2) * cos(this.angle - PI / 2);
      yPos = this.y + (i * 5 + this.carDi / 2) * sin(this.angle - PI / 2);
      if (this.ptInObst(xPos, yPos) && detDist[4] > i) {
        detDist[4] = i;
      }
    }
    return detDist;
  }

  ptInObst(x, y) { 
    // Check if a point is in an obstacle. Used for both the car and obstacle sensing
    
    let outerXRad = this.outerDi / 2 - this.carDi / 2;
    let outerYRad = this.outerDi / 3 - this.carDi / 2;
    let innerXRad = this.innerDi / 2 + this.carDi / 2;
    let innerYRad = this.innerDi / 4 + this.carDi / 2;

    let xOffset = (x - this.screenWd / 2) ** 2;
    let yOffset = (y - this.screenHt / 2) ** 2;

    if (xOffset / outerXRad ** 2 + yOffset / outerYRad ** 2 > 1) {
      return true;
    }

    if (xOffset / innerXRad ** 2 + yOffset / innerYRad ** 2 < 1) {
      return true;
    }

    let hitObst = false;
    //Obstacles
    this.obsts.forEach((obst) => {
      let xObstOffset = (x - obst.x) ** 2;
      let yObstOffset = (y - obst.y) ** 2;

      let obstRad = obst.di / 2 + this.carDi / 2;

      if (xObstOffset + yObstOffset < obstRad ** 2) {
        hitObst = true;
      }
    });

    return hitObst;
  }
}
\`\`\`
`;

export default DRIVING_NEUROEVOLUTION;
