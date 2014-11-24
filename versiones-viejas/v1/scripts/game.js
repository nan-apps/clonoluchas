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



fb = function( text ){
    if ( console.debug )
        console.debug( text );
    else if( console.log )
        console.log( text );
}

//key Codes
Controls = {
    Player1 : {
        fire:65,
        shield:83
    },
    Player2 : {
        fire:75,
        shield:76
    }
}

Game = {    
    resetKey: 82,
    fightKey: 70,
    width: 600,
    height: 300,    
    player1: null,
    player2: null,
    init : function(){
        
        Crafty.init( this.width, this.height );    
        Crafty.canvas.init();
        
        Crafty.load(['/clonoluchas/sprites/dinos.png', '/clonoluchas/sprites/ammos.png', '/clonoluchas/sprites/shields.png'], function(){
               
            Crafty.sprite(119, 108, '/clonoluchas/sprites/dinos.png', {
                player1:[0,0], player1_attack:[1,0], 
                player2:[2,0], player2_attack:[3,0] 
            });
            Crafty.sprite(47, 32, '/clonoluchas/sprites/ammos.png', {
                player1_fire_1:[0,0], player1_fire_2:[1,0], player1_fire_3:[2,0], 
                player2_fire_1:[3,0], player2_fire_2:[4,0], player2_fire_3:[5,0] 
            });            
            Crafty.sprite(36, 106, '/clonoluchas/sprites/shields.png', {
                player1_shield_1:[0,0], player1_shield_2:[1,0], player1_shield_3:[2,0],
                player2_shield_1:[5,0], player2_shield_2:[4,0], player2_shield_3:[3,0],
            });
            
            Crafty.scene('Splash');
            
        });
        
    }
    
};
