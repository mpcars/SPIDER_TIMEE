/*
    GAME SCREEN
    For this demo we create a SpriteSheetAnimation object and
    five buttons to illustrate the animation controls: Play,
    Stop, 24fps, 48fps, and goto First Frame.
 */
GameScreen = function(width, height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    this.spriteSheetAnim;
    this.bugAnim;
    this.scorelabel;
    this.turning = "";
    this.forward = false;
    this.dx=1;
    this.dy=1;
    //Set background color
    this.backgroundColor = "#039AFF";
    this.background;

    //Just some display text
    this.scorelabel = new TGE.Text().setup({
        x:320,
        y:100,
        text:"SPIDER TIMEE",
        font:"32px sans-serif",
        color:"#FFF"
    });

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */
    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:4,
        rows:5,
        totalFrames:19,
        fps:24,
        x: 320,
        y: 240,
    });
    
    this.bugAnim = new TGE.SpriteSheetAnimation().setup({
        image:"bugpic",
        columns:1,
        rows:1,
        totalFrames:1,
        fps:50,
        x: 50,
        y: 50,
        scaleX: 0.018,
        scaleY: 0.018,
    });
    
    this.background = new TGE.SpriteSheetAnimation().setup({
        image:"background",
        columns:1,
        rows:1,
        totalFrames:1,
        fps:50,
        x: 50,
        y: 50,
        scaleX: 2,
        scaleY: 3.5,
    });

    this.addChild(this.background);
    
this.addChild(this.spriteSheetAnim);

    this.addChild(this.bugAnim);
    this.spriteSheetAnim.addEventListener("keydown",this.setSpiderStatus.bind(this));
    this.spriteSheetAnim.addEventListener("keyup",this.resetSpiderStat.bind(this));
    this.spriteSheetAnim.addEventListener("update",this.updateSpider.bind(this));
    this.bugAnim.addEventListener("update",this.updateBug.bind(this));
    this.addChild(this.scorelabel);
    this.score = 0;
    this.time = 3000;
    
    //Start the SpriteSheetAnimation Object playing
    //this.spriteSheetAnim.play();
    //this.bugAnim.play();

    //*************************************
    //******     CONTROL BUTTONS     ******
    //*************************************
    //Adding control buttons for the SpriteSheetAnimation Object
    //Play Button
    /*this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Play",
        x:this.percentageOfWidth(0.5),
        y:400,
        pressFunction:this.playAnim.bind(this)
    }));

    //Stop Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Stop",
        x:this.percentageOfWidth(0.5),
        y:450,
        pressFunction:this.stopAnim.bind(this)
    }));

    //24 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "24 fps",
        x:this.percentageOfWidth(0.33),
        y:500,
        pressFunction:this.set24FPS.bind(this)
    }));

    //48 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "48 fps",
        x:this.percentageOfWidth(0.66),
        y:500,
        pressFunction:this.set48FPS.bind(this)
    }));

    //First Frame Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "First Frame",
        x:this.percentageOfWidth(0.5),
        y:550,
        pressFunction:this.gotoFirstFrame.bind(this)
    }));*/
};

GameScreen.prototype =
{
    //*************************************************
    //******     ANIMATION CONTROL FUNCTIONS     ******
    //*************************************************

    //Play Animation, executes when the Play button is pressed
    playAnim: function(){
        this.spriteSheetAnim.play();
        this.spriteSheetAnim.x += 100;
    },

    stopAnim:function(){
        this.spriteSheetAnim.stop();
    },
  
    //Stop Animation, executes when the Stop button is pressed
    resetSpiderStat: function(event){
        if(event.keyCode == 65 || event.keyCode == 68){
            this.turning = "";
        }
        if(event.keyCode== 87){
            this.forward = false;
        }
    },

    //24 and 48 FPS, set the playback speed of the object when the button is pressed
    set24FPS: function(){
        this.spriteSheetAnim.fps = 24;
    },
    set48FPS: function(){
        this.spriteSheetAnim.fps = 48;
    },

    //Goto First Frame, executes when the First Frame button is pressed.
    //Jumps to the first animation frame and stops. Alternatively you could
    //use gotoAndPlay to jump to the first frame and keep the animation playing.
    gotoFirstFrame: function(){
        this.spriteSheetAnim.gotoAndStop(1);
    }  ,
    
    setSpiderStatus:function(event){
        var spider = event.currentTarget;
        
        this.spriteSheetAnim.play();
        
        if(event.keyCode == 65)
            this.turning = "left";
            //spider.rotation -= 10;
        if(event.keyCode == 68)
            this.turning = "right";
            //spider.rotation += 10;
        if(event.keyCode == 87){
            this.forward=true;
            /*spider.x -=  20 * Math.cos((spider.rotation + 90 ) * Math.PI/180);
            spider.y -=  20 * Math.sin((spider.rotation + 90 )  * Math.PI/ 180);*/
        }
        
        
        /*if(event.keyCode == 83){
            spider.x +=  20 * Math.cos((spider.rotation + 90 ) * Math.PI/180);
            spider.y +=  20 * Math.sin((spider.rotation + 90 )  * Math.PI/ 180);
        }*/
    },
    
    updateSpider:function(event){
        var spider = event.currentTarget;
        if(this.turning == "left"){
            spider.rotation -= 10;
        }
        
        if(this.turning == "right"){
            spider.rotation += 10;
        }
        
        if(this.forward){
            var distance = 4;
            var theta = (spider.rotation - 90) * Math.PI / 180;
            spider.x += distance * Math.cos(theta);
            spider.y += distance * Math.sin(theta);
            
        }
        
        if(this.turning !== "" || this.forward)
            spider.play();
        else
            spider.stop();
            
        
    },
    
    /*
        Updates the bug to constantly have it move around the screen. 
        If it hits the border it turns to the right and turns
        else it moves forward. 
    */
    updateBug: function(event){
        var bug = event.currentTarget;
        var spider = this.spriteSheetAnim;
        var turn = Math.random();
                var distance = Math.sqrt(Math.pow(bug.x - spider.x,2) + Math.pow(bug.y - spider.y,2));
        if(distance < (spider.width/2) * spider.scaleX){
            bug.x = Math.random() * 640;
            bug.y = Math.random() * 832;
            this.score++;
            
            
        }
        
        this.scorelabel.text = "Score: " + this.score.toString() + "///Time:" + Math.round(this.time/75,0).toString();

        if(bug.x <= 0 || bug.x >= 640){
            this.dx *= -1;
        }
        if(bug.y <= 0 || bug.y >= 832){
            this.dy *= -1;
        }
        bug.x += this.dx;
        bug.y += this.dy;

        if(turn<0.001)
            this.dx*=-1
        
        this.time--;
        if(this.time<0){
            this.removeChild(spider);
            this.scorelabel.text="GAME OVER / SCORE: " + this.score.tostring();
            this.removeChild(bug);
}





}







}
extend(GameScreen,TGE.Window);