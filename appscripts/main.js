require.config({
    paths: {"jsaSound": "http://animatedsoundworks.com:8001"}
});

require(
    ["jsaSound/jsaModels/jsaFMnative2"],
    function (sound3Factory) {

        var sound3 = sound3Factory();
        sound3.setParam("play", 1);    //or// sound3.setParamNorm("play", 0.000);
    sound3.setParam("Carrier Frequency", 359.17);    //or// sound3.setParamNorm("Carrier Frequency", 0.199);
    sound3.setParam("Modulation Index", 31.31);    //or// sound3.setParamNorm("Modulation Index", 0.313);
    sound3.setParam("Modulator Frequency", 82.7);    //or// sound3.setParamNorm("Modulator Frequency", 0.414);
    sound3.setParam("Gain", 0.38);    //or// sound3.setParamNorm("Gain", 0.380);
    sound3.setParam("Attack Time", 0.44);    //or// sound3.setParamNorm("Attack Time", 0.440);
    sound3.setParam("Release Time", 0.99);    //or// sound3.setParamNorm("Release Time", 0.330);
            
        //to tell the player the instructions of how to play the game and let them know thtat they can choose the level of difficulty .
        alert("Hello there! You have been challenged! The rules for this game is to click on the moving object as many times as possible in 10 seconds! CHOOSE YOUR DIFFICULTY LEVEL!");
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        var bgRect = paper.rect(0,0,pWidth,pHeight);
        
        
        // set the initial counter as 0.
        var counter = 0;

        // creating start button
        var startButton = paper.circle(300, 200, 50);
        var startText = paper.text(300, 200, 'START!');
        
        startButton.attr({
        	stroke: "black",
            fill: "yellow"
        });

       
         var circle = paper.circle(100,100,20);
        circle.attr({
            "fill": "pink",
            "r": 40
        });

        circle.xpos=pWidth/2;
        circle.ypos=pHeight/2;

        
         circle.hide();

        var music = new Audio("resources/music1.wav");
        var playmusic = function(){
             music.play();
        }

       

        var ready = function(){
        	startButton.show();
        	startText.show();
            // this is to hide the target object
            circle.hide();


           
        }

       

        var start = function (){
        	console.log("game is starting");
        	
            // hides the start button once clicked
            startButton.hide();
        	startText.hide();
            
            //upon clicking the start button, the target object will appear.
            circle.show();
        	
            // starts counter at 0
            counter = 0;
            
            // using the Timeout method to stop the game after 10 seconds
            setTimeout(endGame, 10000);

        }

         //---------- for setting difficulty level --------------

        var difficultylevel= prompt("choose your level of difficulty:\n1 (easy)\n2 (normal)\n3 (hard)","2");

        switch (difficultylevel) {
            case "1":
				circle.attr({
					fill: 'pink',
					r: 50,
				});
				circle.xrate=10;
				circle.yrate=10;
            break;
            case "2":
				circle.attr({
					fill: 'blue',
					r: 45,
				});
				circle.xrate=25;
				circle.yrate=25;
            break;
            case"3":
				circle.attr({
					fill: 'red',
					r: 40,
				});
				circle.xrate=40;
				circle.yrate=40;
        }
		
        //create the eventlisten for the startbutton.
        startButton.node.addEventListener('click', start);
        circle.node.addEventListener('click', playmusic);

       
       
        //-------- for making the target move ---------------------------------
       
        // we created a circle as the target object 
       

          function moveCircle(){

            circle.xpos += circle.xrate;
            circle.ypos += circle.yrate; 
            console.log("the x position is " + circle.xpos + " & y position is " + circle.ypos);
            circle.attr({'cx': circle.xpos, 'cy': circle.ypos})

            // For the target to be in constant motion, frequently changing direction.
            if (circle.xpos > pWidth) {circle.xrate = -circle.xrate;}
            if (circle.ypos > pHeight) {circle.yrate = -circle.yrate;}
            if (circle.xpos < 0) { circle.xrate = -circle.xrate;}
            if (circle.ypos < 0) { circle.yrate = -circle.yrate;};
        }

        // timer function used to repeatedly call the function
        setInterval(moveCircle, 100);

            function endGame (){
            confirm("Congratulations! You have clicked the circle " + counter + " times within 10 seconds");
            // hides the target
            circle.attr({
                cx: -100,
                cy: -100
            })
            
            // resets the game

            ready();
        }

        // keeps count of the no. of clicks by player
        circle.node.addEventListener('click', function(){
            counter++;
            console.log("the click count is now " + counter);
        });

        ready(); // Put the start button back to the screen, so user can play another round of game. 
    }


);