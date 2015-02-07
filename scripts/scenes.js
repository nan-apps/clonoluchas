/**
 * @author arte: Topo, programa: Gnan
 * @date 10/08/2103  
 *  This file is part of Clonoluchas.
    Clonoluchas is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Clonoluchas is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Clonoluchas.  If not, see <http://www.gnu.org/licenses/>. 
 *
 * Game based on OpenFights with Clonosaurios theme
 *   
 * */



Crafty.scene('Fight', function() {
        
    Crafty.e("Global, Image")
             .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, z:1})             
             .image("../sprites/background.jpg");    
        
    Crafty.e("Global, Text").attr({ x: Game.width/2-80, y: 10, z:5, w:100 }).text( 'CLONOLUCHAS' )
                                                                         .textColor( '#eeaec0', 1 )                                                                         
                                                                         .textFont({ family:'Clono', size: '30px' });
                                                                 
    /*Crafty.e("Global, Text").attr({ x: Game.width-145, y: Game.height-20, z:5, w:200 }).text( 'Creado por Clonosaurios' )
                                                                         .textColor( '#eeaec0', 1 )                                                                         
                                                                         .textFont({ family:'VT323', size: '15px'});*/
    
    var y = Player.h;

    //player 1    

    Game.player1 = Crafty.e('Player').at('player1', Player.x, y)
            .bind('KeyDown', function(e) {

        switch (e.key) {
            case Controls.Player1.fire:
                this.chargeFire();
                break;
            case Controls.Player1.shield:
                this.shield();
                break;            
        }

    })
            .bind('KeyUp', function(e) {

        switch (e.key) {
            case Controls.Player1.fire:
                this.fire();
                break;
            case Controls.Player1.shield:
                this.unshield();
                break;
        }

    });

    //player 2
    var x2 = Game.width - Player.x - Player.w;
    
    Game.player2 = Crafty.e('Player').at('player2', x2, y)
            .bind('KeyDown', function(e) {

        switch (e.key) {
            case Controls.Player2.fire:
                this.chargeFire();
                break;
            case Controls.Player2.shield:
                this.shield();
                break;
        }

    })
            .bind('KeyUp', function(e) {

        switch (e.key) {
            case Controls.Player2.fire:
                this.fire();
                break;
            case Controls.Player2.shield:
                this.unshield();
                break;
        }

    });
    
    

});

Crafty.scene('Splash', function() {
       
    Crafty.e("Global, Text").attr({ x: Game.width/2-80, y: 10, z:5, w:100 }).text( 'CLONOLUCHAS' )
                                                                         .textColor( '#eeaec0', 1 )                                                                         
                                                                         .textFont({ family:'Clono', size: '30px' });
    /*Crafty.e("Global, Text").attr({ x: Game.width-145, y: Game.height-20, z:5, w:200 }).text( 'Creado por Clonosaurios' )
                                                                         .textColor( '#eeaec0', 1 )                                                                         
                                                                         .textFont({ family:'VT323', size: '15px'}); */   
    
    Crafty.e("Global, Image")
             .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, z:1})             
             .image("../sprites/background.jpg");
    
    var x = (Game.width / 2) ;
    var y = Player.h;
    
    var fightCommandTxt = Crafty.e("Global, Text").attr({ x: x - 30, y: y+60, z:5, w:100 })
        .text( '"F": FIGHT' )          
        .textColor( '#EBEB00', 1 )                                                                         
        .textFont({ family:'VT323', size: '15px' });

    
    var x2 = Game.width - Player.x - Player.w;                                                                        
    Game.player1 = Crafty.e('Player').at('player1', Player.x, y);
    Game.player2 = Crafty.e('Player').at('player2', x2, y);
    
    //reset
    Crafty.bind('KeyDown', function(e) {
        switch (e.key) {
            case Game.fightKey:
                this.unbind('KeyDown')
                
                fightCommandTxt.destroy();
                
                Crafty.e("2D, DOM, Text,").attr({ x: x - 50, y: y+30, z:5, w:100 })
                    .css({'text-align':'center'})
                    .text( 'FIGHT!' )
                    .textColor( '#ffffff', 1 )                                                                         
                    .textFont({ family:'Yanone', size: '30px' });
                
                Crafty.e("Delay").delay( function(){
                    Crafty.scene('Fight');
                }, 1000 );
                
                break;
            
        }
    });

});
Crafty.scene('winPlayer1', function() {
    
    Crafty.e("Global, Image")
             .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, z:1})             
             .image("../sprites/background.jpg");    
    
    Crafty.e("Global, Text").attr({ x: Game.width/2-80, y: 10, z:5, w:100 }).text( 'CLONOLUCHAS' )
                                                                         .textColor( '#eeaec0', 1 )                                                                         
                                                                         .textFont({ family:'Clono', size: '30px' });
   /* Crafty.e("Global, Text").attr({ x: Game.width-145, y: Game.height-20, z:5, w:200 }).text( 'Creado por Clonosaurios' )
                                                                         .textColor( '#eeaec0', 1 )                                                                         
                                                                         .textFont({ family:'VT323', size: '15px'});   */ 
    
    var x = (Game.width / 2) ;
    var y = Player.h;
    
        
    var winnerTxt = Crafty.e("Global, DOM, Text,").attr({ x: x - 100, y: y, z:5, w:200 })
    .css({'text-align':'center'})
    .text( 'Ganador TRUENOCERATOPS' )
    .textColor( '#ffffff', 1 )                                                                         
    .textFont({ family:'Yanone', size: '30px' });

    var resetCommandTxt = Crafty.e("Global, DOM, Text,").attr({ x: x - 30, y: y+70, z:5, w:60 })
        .css({'text-align':'center'})
        .text( '"R": RESET' )
        .textColor( '#EBEB00', 1 )                                                                         
        .textFont({ family:'VT323', size: '15px' });

    
    var x2 = Game.width - Player.x - Player.w;                                                                        
    Game.player1 = Crafty.e('Player').at('player1', Player.x, y, true).winner();
    Game.player2 = Crafty.e('Player').at('player2', x2, y, true).dead();
    
    //reset
    Crafty.bind('KeyDown', function(e) {
        switch (e.key) {
            case Game.resetKey:
                this.unbind('KeyDown')
                resetCommandTxt.destroy();
                winnerTxt.destroy();
                Crafty.e("2D, DOM, Text,").attr({ x: x - 50, y: y+30, z:5, w:100 })
                    .css({'text-align':'center'})
                    .text( 'FIGHT!' )
                    .textColor( '#ffffff', 1 )                                                                         
                    .textFont({ family:'Yanone', size: '30px' });
            
                Crafty.e("Delay").delay( function(){
                    Crafty.scene('Fight');
                }, 1000 );
                break;
            
        }
    });

});

Crafty.scene('winPlayer2', function() {
    
    Crafty.e("Global, Image")
             .attr({w: Crafty.viewport.width, h: Crafty.viewport.height, z:1})             
             .image("../sprites/background.jpg");    
    
    Crafty.e("Global, Text").attr({ x: Game.width/2-80, y: 10, z:5, w:100 }).text( 'CLONOLUCHAS' )
                                                                         .textColor( '#CA6686', 1 )                                                                         
                                                                         .textFont({ family:'Clono', size: '30px' });
    /**Crafty.e("Global, Text").attr({ x: Game.width-145, y: Game.height-20, z:5, w:200 }).text( 'Creado por Clonosaurios' )
                                                                         .textColor( '#CA6686', 1 )                                                                         
                                                                         .textFont({ family:'VT323', size: '15px'});*/
    
    var x = (Game.width / 2) ;
    var y = Player.h;
    
        
    var winnerTxt = Crafty.e("Global, DOM, Text,").attr({ x: x - 100, y: y, z:5, w:200 })
    .css({'text-align':'center'})
    .text( 'Ganador FUEGOCIRRAPTOR' )
    .textColor( '#ffffff', 1 )                                                                         
    .textFont({ family:'Yanone', size: '30px' });

    var resetCommandTxt = Crafty.e("Global, DOM, Text,").attr({ x: x - 30, y: y+70, z:5, w:60 })
        .css({'text-align':'center'})
        .text( '"R": RESET' )
        .textColor( '#EBEB00', 1 )                                                                         
        .textFont({ family:'VT323', size: '15px' });

    
    var x2 = Game.width - Player.x - Player.w;                                                                        
    Game.player1 = Crafty.e('Player').at('player1', Player.x, y, true).dead();
    Game.player2 = Crafty.e('Player').at('player2', x2, y, true).winner();
    
    //reset
    Crafty.bind('KeyDown', function(e) {
        switch (e.key) {
            case Game.resetKey:
                this.unbind('KeyDown')
                resetCommandTxt.destroy();
                winnerTxt.destroy();
                Crafty.e("2D, DOM, Text,").attr({ x: x - 50, y: y+30, z:5, w:100 })
                    .css({'text-align':'center'})
                    .text( 'FIGHT!' )
                    .textColor( '#ffffff', 1 )                                                                         
                    .textFont({ family:'Yanone', size: '30px' });
            
                Crafty.e("Delay").delay( function(){
                    Crafty.scene('Fight');
                }, 1000 );
                break;
            
        }
    });

});