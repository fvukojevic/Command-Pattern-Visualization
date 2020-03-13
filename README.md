# Command Pattern Visualization

While going over Head First Design Book I decided to recreate some patterns I found interesting. I already managed to do that using various languages like PHP, Python and Go, but non of those languages helped me visualize it quite like Javascript. Even thought Javascript does not have interfaces, I still managed to incorporate the basic principals of Command pattern and create a small app demonstrating how it works. 

Basically the app demonstrates the following problem. Imaginge you are designing a smart house, and you want to connect certain functionalites to your remote control, or phone device. You could go about it, I will connect every button to a function, go over a switch case statement, and depending on what button get's pressed, I will execute the following command. Problem however starts, when you have more and more functionalities, your switch case becomes too big to manage, and your code becomes what we call spagheti.

This is what command pattern resolves. Withought going too in dept with it, it comes down to creating a Command interface, and using that interface to tell different parts of your code how to execute it. Here we have 2 functionalities. Light that turns on and off, and stereo that turns on, with ability to raise volume and stuff like that, and off. We have 2 commands for light, LightOnCommand and LightOffCommand, and two for stereo, StereoOnCommand and StereoOffCommand. 

I will leave link to the book here if someone wants to read in depth how it works so I don't bore you too much with.
http://shop.oreilly.com/product/9780596007126.do
 
## Project setup
```
npm install
npm run serve

For production:
npm run build
npm run lint
```

### Live App Demo

You can try live app demo here: http://command-patern-visualization.surge.sh/ 
Please don't judge my design, app was not ment for that and I am not much of a designer myself. Just want to demonstrate the functionality.
