#  eod-test

the `csv` file in the folder ./source

for running the code, execute this command

> npm install

> npm start

##  multi-thread
`workers/averageValue.js` => `No 1 Thread-No`
`workers/benefitA.js` => `No 2a Thread-No`
`workers/benefitB.js` => `No 2b Thread-No`
`workers/additionalBalance.js` => `No 3 Thread-No`

##  disclaimer

I don't know about multi-thread in nodejs, but I try best for this test using built in module by nodejs is nodejs:worker_threads

I making 2 script the second script just execute command

> node sequence.js

reason why I make 2 script is because the first one I build asynchronouse processing, the second script I build with synchronous processing, the different on the speed of execute

before it thankyou for your attention, for me to be able to take this test, I really appricate and I hope I can pass the test

