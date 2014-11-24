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


Ammo = {
    
    
};

Player = {
    w:119,
    h:108,
    x: 50 //margin
};

Crafty.c('Global', {
    init: function() {
        this.requires('2D, DOM, Color');
    }
});

Crafty.c('Player', {
    id:null,
    life: 100,
    scoreText: null,
    width: Player.w,
    height: Player.h,
    xPos: 0,
    yPos: 0,
    eShield: null,
    startTimerFire: null,  
    pColor: null,
    init: function() {
        e = this;
        this.requires('Global, Collision, Keyboard, Text, Delay, Sprite');
       
        this.attr({ z : 2 });
        this.onHit('Fire', function( ammo ) {
            var id = ammo[0].obj.player.id;
            if( id !== this.id ){
                var damage = ammo[0].obj.damage;
                this.harm( damage );
            }
        });    
    },
    at: function(id, x, y, winner) {
        this.id = id;
        this.xPos = x;
        this.yPos = y;
        this.attr({
            x: this.xPos,
            y: this.yPos/*,
            w: this.width,
            h: this.height*/
        });
        this.addComponent( id );
        
        var textX = this.id == 'player1' ? 30 : Game.width - 30 - 100;
        var controls = this.id == 'player1' ? 'Rayo:"A" Escudo:"S" ' : 'Fuego:"K" Escudo:"L" ';
        var playerText = this.id == 'player1' ? 'TRUENOCERATOPS' : 'FUEGOCIRRAPTOR';
        var lifeBarX = this.id == 'player1' ? 30 : Game.width - 30 - 100;
        var lifeBarContainerOpts = {
            x: lifeBarX,
            y: 70,
            w: 100,
            h: 15,
            z:5
        };
        var lifeBarOpts = {
            x: lifeBarX + 1,
            y: 70 + 1,
            w: 99,
            h: 14,
            z:7
        };
        
        
        if( typeof winner === 'undefined' ){
            Crafty.e("2D, DOM, Text").attr({ x: textX, y: 2, z:5, w:140 }).text( playerText )
                                                                         .textColor( '#ffffff', 1 )                                                                         
                                                                         .textFont({ family:'VT323', size: '15px' });
                                                                 

            Crafty.e("2D, DOM, Text").attr({ x: textX, y: 15, z:5, w:140 }).text( 'Insert Coin: xx' )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });

            Crafty.e("2D, DOM, Text").attr({ x: textX, y: 30, z:5, w:140 }).text( controls )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });
            
            Crafty.e("2D, DOM, Text").attr({ x: textX, y: 45, z:5, w:140 }).text( '(Hold:Super)' )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });

            /*this.scoreText = Crafty.e("2D, DOM, Text").attr({ x: textX, y: 60, z:5, w:100 }).text( 'Vida: '+this.life )
                    .textColor( '#FFFFFF', 1 )                                                                         
                    .textFont({ family:'VT323', size: '25px' });*/
            
            Crafty.e("Global").attr( lifeBarContainerOpts ).color('#942021').css({
                'border':'solid',
                'border-color':'#FFFF00',
                'border-width':'1px'
            });  
            
            this.lifeBar = Crafty.e("Global").attr( lifeBarOpts ).color('#00A500');
        }
        
        return this;
    },    
    chargeFire: function(){
        this.startTimerFire = new Date().getTime();
        if( this.id == 'player1' )
            this.sprite(1, 0);
        else
            this.sprite(3, 0);
    },        
    fire: function() {
        Crafty.e('Fire').ammo( this );
        if( this.id == 'player1' )
            this.sprite(0, 0);
        else
            this.sprite(2, 0);
    },
    dead:function(){
        if( this.id == 'player1' )
            this.sprite(4, 0);
        else
            this.sprite(5, 0);
    },
    winner:function(){
        var self = this;
        var ctrl = 1;
        Crafty.e("Delay").delay( function(){         
            if( ctrl == 1 ){
                if( self.id == 'player1' )
                    self.sprite(1, 0);
                else
                    self.sprite(3, 0);
            }                
            else{
                if( self.id == 'player1' )
                    self.sprite(0, 0);
                else
                    self.sprite(2, 0);
            }
            ctrl *= -1;    
        }, 50, 30);        
    },
    shield: function(){
        this.eShield = Crafty.e('Shield').shield( this );        
    },
    unshield: function(){
        if( this.eShield != null )
            this.eShield.destroy();
    },
    harm: function( damage ){
        
        var self = this;
        this.life = this.life - damage < 0 ? 0 : this.life - damage;
        this.lifeBar.attr( { 'w':this.life });
        if( this.id == 'player2' ){
            this.lifeBar.css( { 'margin-left':100-this.life });
        }
        if (this.life <= 0){
            this.lifeBar.destroy()
            this.dead();            
            Crafty('Fire').destroy();
            Crafty('Player').unbind('KeyDown');
            Crafty('Player').unbind('KeyUp');
            Crafty.e("Delay").delay( function(){
                var scene = self.id == 'player1' ? 'winPlayer2' : 'winPlayer1';
                Crafty.scene( scene );
            },  1000, 0);
            
            
        }
    }
});


Crafty.c('Fire', {        
    player: null,
    damage: null,     
    power:5,
    speed: 100,     
    init: function() {
        this.requires('Global, Collision, Tween');
        this.css({
            '-webkit-border-radius': '5px',
            '-moz-border-radius': '5px',
            'border-radius': '5px'
        });
        this.onHit('Player', function( player ) {
            var id = player[0].obj.id;
            if( id != this.player.id )
                this.destroy();
        });
        this.onHit('Shield', function( shield ) {
            
            if( this.player.id === shield[0].obj.player.id )
                return;
            
            var damage = this.damage - shield[0].obj.shieldPower;
            
            if( damage > 0 )
                shield[0].obj.player.harm( damage );
            
            this.destroy();
            
        });
    },
//    fire: function( player ){
//        this.player = player;
//        return this;
//    },     
    ammo: function( player ) {
        
        this.player = player;
        
        var ammoSize = this.getAmmoSize( player.startTimerFire );
        this.damage = ammoSize * this.power;
        
        this.at();
        
        this.addComponent( player.id+'_fire_'+ammoSize );
        
        this.shoot();
        
        return this;
    },
    getAmmoSize: function( startTimestamp ){
        
        var endTimestamp = new Date().getTime();
        var chargingTime = ( endTimestamp - startTimestamp ) / 1000;
        
        var size = 0;
        
        if( chargingTime < 0.9 )
            size = 1; 
        else if( chargingTime >= 0.9 && chargingTime < 1.5 ) 
            size = 2;    
        else if( chargingTime >= 1.5 )
            size = 3;
        
        return size;
    },
    at: function(){

        var centerX = Game.width / 2;
        var y = 169;
        var x;

        if ( this.player.xPos < centerX ) {             
            x = this.player.xPos + 70;
        }
        else{            
            x = this.player.xPos - this.w;
        }

        this.attr({
            x: x,
            y: y
        });
        
        this.color( this.player.pColor );
        
    },
    shoot: function(){

        var centerX = Game.width / 2;
        var direction = 0;
        
        if ( this.player.xPos < centerX )           
            direction = Game.width;
        
        else
            direction = 0;            
        
        this.tween( {x: direction}, this.speed );
    
    }
});


Crafty.c( 'Shield', {    
    shieldPower: 5,
    shieldState:0,
    width: 0,
    height: 0,
    player: null,
    init: function(){        
        this.requires( 'Global, Delay' );
        this.color( '#e7e83b' );
        this.css({
            '-webkit-border-radius': '30px',
            '-moz-border-radius': '30px',
            'border-radius': '30px'
        });
    },
    increaseShield: function( player ){        
        this.shieldPower = this.shieldPower + 5;
        
        this.shieldState++;
        this.addComponent( player.id+'_shield_'+this.shieldState );
        
        return this;
    },        
    shield: function( player ){ 
        
        this.player = player;
        
        this.shieldState = 1;
        this.addComponent( player.id+'_shield_'+this.shieldState );
        fb(this.w);
        this.attr({           
            x:  player.id == 'player1' ? player.xPos + player.w  - this.w + 10 : player.xPos - 10,
            y: player.yPos,
            z:1
        });
        var cont = 0;
        this.delay( function(){
           cont++;            
           if(cont === 3){
               this.destroy();
               return;
           }
           this.increaseShield( player );
        }, 220, 3);        
        
        return this;
    }
});

