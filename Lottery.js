class lottery extends Phaser.Scene {
    constructor(){
        super({
            key: "examples"
        })
        
    }
    preload(){
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
        this.load.plugin('rexbbcodetextplugin', url, true);
      
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
        this.load.plugin('rextexteditplugin', url, true);

        this.load.image('woodboard', 'asset/woodboard.png');
        this.load.image('reset', 'asset/reset.png');
        this.load.image('search', 'asset/search.png');
    }
    
    create()
    {
        var lotteryX = 3;
        var lotteryY = 5;
        this.lottery_cost = 100;
        var lottery = [];

        //array lottery in inventory
        this.bought_lottery = [];
        this.bought = this.add.text(1100, 300, '', {font: '32px Courier', fill: '#f0f'})
        
        //woodboard
        var woodboard = this.add.image(config.width/2, 0 - config.height/2, 'woodboard');
        woodboard.setOrigin(0.5, 0.5);
        woodboard.setScale(0.7);
        //woodboard animation
        while(woodboard.y <= config.width/4){
            woodboard.y += 25;
        }
        //reset buttons
        var reset = this.add.image(750, 80, 'reset');
        reset.setOrigin(0.5);
        reset.setScale(0.25);
        reset.setInteractive();
        
        //search inputfield
        var printText = this.add.rexBBCodeText(400, 80, 'abcdef', {
            color: 'black',
            fontSize: '32px',
            fixedWidth: 100,
            fixedHeight: 50,
            backgroundColor: 'white',
            valign: 'center'
        }).setOrigin(0, 0.5).setInteractive()
            .on('pointerdown', () => {
                var config = {
                    onTextChanged: function (textObject, text) {
                        textObject.text = text;
                        // console.log(`Text: ${text}`);
                    },
                    // selectAll: true,
                    // enterClose: false
                }
                this.plugins.get('rextexteditplugin').edit(printText, config);
            }, this);
        
        //search buttons
        var search = this.add.image(500, 80);
        

        //money to buy lottery
        this.money = 1000;
        this.moneyText = this.add.text(1200, 100, '', {font: '32px Courier', fill: '#f0f'})
        this.moneyText.setText(this.money);
        var x;
        var y;
        // //show first random lottery
        for(var i = 0; i < lotteryX;i++){
            x = (i+1)*300;
            for(var j = 0; j < lotteryY; j++){
                y = ((j+1)*100)+25;
                lottery.push({text: this.add.text(x, y, '', {font: '32px Courier', fill: '#000000'})})
                this.setInteract(lottery[((5*i)+j)]);
            }
        }
        reset.on('pointerdown', () => {
            console.log("Click reset");
            for(var i = 0; i < lottery.length; i++){
                lottery[i].key = this.normalRand();
                lottery[i].text.setText(lottery[i].key);
            }
            
        });
        // lottery.push({text: "shit"});
        // lottery[0].text = "OH SHIT";
        // console.log(lottery[0]);
        
        console.log(printText.text);
    }
    update(){
        this.moneyText.setText(this.money);
    }

    setInteract(list){
        list.key = this.normalRand();
        list.text.setText(list.key);
        list.text.setInteractive();
        list.text.on('pointerdown', () => {
            if(this.money >= this.lottery_cost){
                this.money -= this.lottery_cost;
                console.log('purchase complete');
                this.addInv_lottery(list.key);
                list.key = this.normalRand();
                list.text.setText(list.key);
            }
            else{
                console.log("don't have enough money");
            }
        })
    }


    addInv_lottery(text){
        //add to list
        
        this.bought_lottery.push(text);
        var list = '';
        console.log(this.bought_lottery);
        for(var i = 0 ; i < this.bought_lottery.length; i++){
            list += '\n';
            list += this.bought_lottery[i];
        }
        this.bought.setText(list);
    }
    normalRand(){
        var assem = '';

        for(var i = 0; i < 3; i++){
            assem += (Math.floor(Math.random() * 10));
            
        }
              
        //check lottery 
     
        return assem;
    }

    check_list(){
        //check same lottery in one random
        
        //check lottery already bought

    }
    search(){

    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    scene: [ lottery ],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    //how textediter work???
    dom: {
        createContainer: true
    },
};
        
const start = new Phaser.Game(config)
// var button = new Button(gameObject, config);