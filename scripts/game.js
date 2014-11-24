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


//key Codes
Controls = {
    Player1 : {
        fire:65,
        shield:83,
        jump:68 
    },
    Player2 : {
        fire:75,
        shield:76,
        jump:74
    },
    numbers: {
        1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57
    }
};



Game = {    
    debug: false,
    resetKey: 82,
    fightKey: 70,
    width: 600,
    height: 300,    
    player1: null,
    player2: null,
    init : function(){
        
        fb = SystemUtils.fb;
        
        Crafty.init( this.width, this.height );    
        Crafty.canvas.init();
        
        Crafty.load(['sprites/dinos.png', 'sprites/superdinos.png', 'sprites/ptero.png', 'sprites/ammos.png', 'sprites/shields.png'], function(){
               
            Crafty.sprite(119, 108, 'sprites/dinos.png', {
                player1:[0,0], player1_attack_1:[1,0], player1_attack_2:[2,0], player1_attack_3:[3,0], player1_dead:[4,0], 
                player2:[5,0], player2_attack_1:[6,0], player2_attack_2:[7,0], player2_attack_3:[8,0], player2_dead:[9,0]
            });
            Crafty.sprite(140, 143, 'sprites/superdinos.png', {
                player1_super:[0,0], player1_superattack:[1,0], player2_super:[2,0], player2_superattack:[3,0]
            });
            Crafty.sprite(62, 68, 'sprites/ptero.png', {
                player1_ptero1:[0,0], player1_ptero2:[1,0],player2_ptero1:[2,0], player2_ptero2:[3,0]
            });
            Crafty.sprite(24, 24, 'sprites/egg.png', {
                egg:[0,0]
            });
            Crafty.sprite(50, 45, 'sprites/explosion.png', {
                explosion:[0,0]
            });
            Crafty.sprite(43, 18, 'sprites/ammos.png', {
                player1_fire_1:[3,0], player1_fire_2:[2,0], player1_fire_3:[1,0], player1_fire_super:[0,0],
                player2_fire_1:[7,0], player2_fire_2:[6,0], player2_fire_3:[5,0], player2_fire_super:[4,0] 
            });            
            Crafty.sprite(36, 106, 'sprites/shields.png', {
                player1_shield_1:[0,0], player1_shield_2:[1,0], player1_shield_3:[2,0],
                player2_shield_1:[5,0], player2_shield_2:[4,0], player2_shield_3:[3,0],
            });
            
            Crafty.scene('Splash');
            
        });
        
    },
    stop: function(){
        Crafty.stop(true);
    }
    
};

Config = {
    player:{
        life: 100,
        superTTL: 3000,
    }, 
    fire: {
        ammoPower : 5,
        ammoSize: [1,2,3],
        ammoSuperSize: 3,
        speedNormalMili: 3000,
        speedSuperMili: 2300        
    },
    shield: {
        speed: 400,
        power: 5
    },
    explosion:{
        damage: 10
    },
    egg: {
        gravity: 0.1
    },
    pteroAttack: {
        fligthDuration: 5000,
        fireCounter: 5,
        randomNumbers: []
    }
    
};

SystemUtils = {
    getRandomNumber: function(){
        
        var random = 0;
        
        if( Config.pteroAttack.randomNumbers.length === 9 )
            Config.pteroAttack.randomNumbers.length = [];
        
        while( random < 1 || random > 9 ){
            random = Math.floor( Math.random()*10 );
        }
        
        while( Config.pteroAttack.randomNumbers.indexOf( random ) !== -1 )
            return this.getRandomNumber();
        
        Config.pteroAttack.randomNumbers.push( random );
        
        return random;
        
    },
    fb: function( text ){
        if ( console.debug )
            console.debug( text );
        else if( console.log )
            console.log( text );
    }
};