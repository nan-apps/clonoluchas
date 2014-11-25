/**
 * @author arte: Topo, programa: Gan
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
    h:170,
    x: 30 //margin
};

Crafty.c('Global', {
    init: function() {
        this.requires('2D, Color, Canvas');
    }
});

Crafty.c('Player', {
    id:null,
    life: null,
    scoreText: null,
    width: Player.w,
    height: Player.h,
    xPos: 0,
    yPos: 0,
    superStatus: false,
    superTransfStatus: false,    
    superTitle: null,
    eShield: null,
    startTimerFire: null,  
    pColor: null,
    delayFire: null,
    delayTriggerFire: null,
    delayWinner: null,
    lifeBar: null,
    powerBar: null,     
    spriteComponents : ['','_attack_1','_attack_2','_attack_3','_super','_superattack'],
    init: function() {
        e = this;
        this.requires('Global, Collision, Keyboard, Text, Delay, Sprite, Tween');
        this.life = Config.player.life;
        this.attr({ z : 5 });
        this.onHit('Fire', function( ammo ) {
            var id = ammo[0].obj.player.id;
            if( id !== this.id ){
                var damage = ammo[0].obj.damage;
                this.harm( damage );                
                ammo[0].obj.destroy();
            }
        });    
    },
    at: function(id, x, y, winner) {
        this.id = id;
        this.xPos = x;
        this.yPos = y;
        this.attr({
            x: this.xPos,
            y: this.yPos,
            w: this.width,
            h: this.height
        });
        this.addComponent( id ); //setea el id como un componente, indica el sprite a uusar. 
        
        var textX = this.id == 'player1' ? 30 : Game.width - 30 - 100;
        var controls = this.id == 'player1' ? 'Rayo:"A" Escudo:"S"' : 'Fuego:"J" Escudo:"K"';
        var controlsEgg = this.id == 'player1' ? 'HuevoAttack:"D" ' : 'HuevoAttack:"L" ';
        var playerText = this.id == 'player1' ? 'TRUENOCERATOPS' : 'FUEGOCIRRAPTOR';
        var lifeBarX = this.id == 'player1' ? 30 : Game.width - 30 - 100;
        var lifeBarContainerOpts = {
            x: lifeBarX,
            y: 80,
            w: 100,
            h: 15,
            z:5
        };
        var lifeBarOpts = {
            x: lifeBarX + 1,
            y: lifeBarContainerOpts.y + 1,
            w: 99,
            h: 14,
            z:7
        };
        var powerBarContainerOpts = {
            x: lifeBarX,
            y: 100,
            w: 100,
            h: 10,
            z:5
        };
        var powerBarOpts = {
            x: lifeBarX + 1,
            y: powerBarContainerOpts.y + 1,
            w: 0,
            h: 10,
            z:7
        };
        
        
        if( typeof winner === 'undefined' ){
            Crafty.e("Global, Text").attr({ x: textX, y: 2, z:5, w:140 }).text( playerText )
                                                                         .textColor( '#ffffff', 1 )                                                                         
                                                                         .textFont({ family:'VT323', size: '15px' });
                                                                 

            Crafty.e("Global, Text").attr({ x: textX, y: 15, z:5, w:140 }).text( 'Insert Coin: xx' )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });

            Crafty.e("Global, Text").attr({ x: textX, y: 30, z:5, w:100 }).text( controls )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });
            
            Crafty.e("Global, Text").attr({ x: textX, y: 45, z:5, w:100 }).text( controlsEgg )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });
            
            Crafty.e("Global, Text").attr({ x: textX, y: 60, z:5, w:140 }).text( '(Mantener:Super)' )
                                                                             .textColor( '#EBEB00', 1 )                                                                         
                                                                             .textFont({ family:'VT323', size: '15px' });
            
            Crafty.e("Global, DOM").attr( lifeBarContainerOpts ).color('#942021').css({
                'border':'solid',
                'border-color':'#FFFF00',
                'border-width':'1px'
            });  
            
            Crafty.e("Global, DOM").attr( powerBarContainerOpts ).color('#FFFF00').css({
                'border':'solid',
                'border-color':'#FFFF00',
                'border-width':'1px'
            });  
            this.lifeBar = Crafty.e("Global, DOM").attr( lifeBarOpts ).color('#00A500');
            this.powerBar = Crafty.e("Global, DOM, Tween, Text").attr( powerBarOpts ).color('#01499B');
            
        }
        
        return this;
    },    
    chargeFire: function(){
        var self = this;
        
        if( this.superStatus ){
            if( !this.superTransfStatus ){
                var superComp = self.id+'_superattack';
                this.addComponent( superComp );
            }            
            return;
        }
        
        this.startTimerFire = new Date().getTime();
        
        var cont = 1;
        var newComp = self.id+'_attack_'+cont;
        self.addComponent( newComp );

        this.delayFire = Crafty.e("Delay").delay( function(){         

            cont = cont + 1;                      
            var newComp = self.id+'_attack_'+cont;            
            self.addComponent( newComp );

        }, 900, 2);
        
        //trigger fire when reach super
        this.delayTriggerFire = Crafty.e("Delay").delay( function(){         

            self.super();

        }, 5000, 0);
        
        if( !this.superStatus ){
            
            this.powerBar.tween( {w: 100}, 5000 );            
        }
        
    },        
    fire: function() {
        
        var self = this;
        if( this.delayTriggerFire )
            this.delayTriggerFire.destroy();
        this.removeSpriteComponents();
        
        if( this.superStatus && !this.superTransfStatus ){
            this.addComponent( this.id+'_super' );            
        }
        
        if( this.delayFire === null ) return;
        
        Crafty.e('Fire').ammo( this );
                
        //reset powerBar
        if( !this.superStatus ){
            this.powerBar.cancelTween('w');
            this.powerBar.attr({w:0});            
            this.addComponent( this.id );
        }        
                
        this.delayFire.destroy();        
        
    },
    superTransformation: function(){      
        
        var self = this;
        
        var position = { y: this.yPos-25 };        
        if( this.id == 'player2' )
            position.x = Game.player2.attr().x - 10;        
        else
            position.x = Game.player1.attr().x;        
        
        this.tween( {alpha: 0}, 750  );
        
        this.superTransfStatus = true;
        
        //super! text     
        var x = this.id == 'player1' ? (Game.width / 2) - 260 : (Game.width / 2) + 140;
        var y = 150;
        
        var superTitle = Crafty.e("2D, DOM, Text, Tween").attr({ x: x, y: y, z:5, w:130 })
                            .css({'text-align':'center'})
                            .text( '! SUPER !' )
                            .textColor( '#EBEB00', 1 )                                                                         
                            .textFont({ family:'Clono', size: '30px' });
        
        var transfImg = Crafty.e("2D, DOM, Sprite, Tween")
             .addComponent( this.id+'_super' )                  
             .attr( { z:1000, alpha:0 } )
             .attr( position ).tween( {alpha: 1}, 750  )
             .one('TweenEnd', function(){
                self.attr( { alpha:1 } )
                self.removeSpriteComponents();
                self.addComponent( self.id+'_super' );        
                self.attr(position); 
                transfImg.destroy();
                superTitle.tween( {alpha: 0}, 700  ).one('TweenEnd', function(){
                    superTitle.destroy();
                });
                self.superTransfStatus = false;
        });
    },
    unsuper: function(){
        
        this.superStatus = false;
        this.removeSpriteComponents();
        this.addComponent( this.id );
        
        var position = { y: this.yPos };        
        if( this.id == 'player2' )
            position.x = Game.player2.attr().x + 10;
        
        this.attr(position);
                
    },
    super: function(){
        
        var self = this;
        
        this.superStatus = true;
        
        this.superTransformation();

        //bars
        this.powerBar.attr({w:100});        
        this.powerBar.tween( {w: 0}, Config.player.superTTL );
        
        
        if( Game.debug )
            fb(self.id+' super');
        
        Crafty.e("Delay").delay( function(){         
            
            self.unsuper();
            
            if( Game.debug )
                fb(self.id+' unsuper');
            
                        
        }, Config.player.superTTL, 0 ); 
        
    },
    pteroAttack: function(){
        
        Crafty.e('PteroAttack').attack( this );
        
        var attr = this.id === 'player1' ? { x: this.x+25, y: this.y, z:this.z+1, w:5 } : 
                { x: this.x, y: this.y, z:this.z+1, w:5 };
                
        var dropEggKey = this.id === 'player1' ? 'D' : 'L';
        
        var number = Crafty.e("Global, Text, Tween").attr( attr )
                                                    .text( "Press "+dropEggKey+" for HuevoAttack" )
                                                    .textColor( '#EBEB00', 1 )                                                                         
                                                    .textFont({ family:'VT323', size: '15px'});
        
        
        number.tween( {alpha: 0, y: this.y - 40}, Config.pteroAttack.fligthDuration  ).one('TweenEnd', function(){
            number.destroy();
        });
        
    },
    jump: function() {
        
        this.tween( {y: 50}, 500 );
        
    },
    removeSpriteComponents: function(){
        var self = this;
        for( i = 0 ; i < this.spriteComponents.length; i++ ){
            self.removeComponent( self.id+this.spriteComponents[i], true ); 
        }
        
    },
    dead:function(){        
        this.addComponent( this.id+'_dead' );
    },
    winner:function(){
        var self = this;
        
        var ctrl = 1;
        this.delayWinner = Crafty.e("Delay").delay( function(){
            var newComp = self.id+'_attack_'+ctrl;
            self.removeSpriteComponents();
            self.addComponent( newComp );
            ctrl = ctrl + 1;
            if( ctrl === 4 ) 
                ctrl = 1;
        }, 50, 100);
        
        
    },
    shield: function(){
        if( !this.superStatus ){
            this.eShield = Crafty.e('Shield').shield( this );        
        }
    },
    unshield: function(){
        if( this.eShield != null )
            this.eShield.destroy();
    },
    harm: function( damage ){
        
        if( Game.debug ){
            fb( 'damage:'+ damage );            
        } 
        
        var self = this;
        var life = this.life;
        
        var commonAttr = { y: this.y+80, z:this.z+1, w:5 };
                
        var attr = this.id === 'player1' ? $.extend( {}, commonAttr, {x: this.x+this.w+10 } )  : 
                $.extend( {}, commonAttr, { x: this.x-20 } );
                
        var attackTxt = Crafty.e("Global, Text, Tween").attr( attr )
                                                    .text( '-'+ damage * Config.player.harmMultiplier )
                                                    .textColor( '#EBEB00', 1 )                                                                         
                                                    .textFont({ family:'Clono', size: '20px'});        
        
        attackTxt.tween( {alpha: 0, y:this.y}, 1500  ).one('TweenEnd', function(){
            attackTxt.destroy();
        });
                
        this.life = life - damage < 0 ? 0 : life - damage;
                
        if( Game.debug ){
            fb( 'life:'+ this.life );            
        } 
             
        for( var i = 0; i < Config.pteroAttack.lifeTriggers.length; i++ ){            
            if( life >= Config.pteroAttack.lifeTriggers[i] && this.life < Config.pteroAttack.lifeTriggers[i] ){                
                this.pteroAttack();
                break;
            }
            
        }
                
        this.lifeBar.attr( { 'w':this.life });
        
        if( this.id == 'player2' ){
            this.lifeBar.css( { 'margin-left':100-this.life });
        }
        if (this.life <= 0 ){
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
    init: function() {
        this.attr({z:5});
        this.requires('Global, DOM, Collision, Tween');        
        this.onHit('Shield', function( shield ) {
            
            if( this.player.id === shield[0].obj.player.id )
                return;
            
            var damage = this.damage - shield[0].obj.shieldPower;
            
            if( damage > 0 )
                shield[0].obj.player.harm( damage );
            
            this.destroy();
            
        });
    },
   
    ammo: function( player ) {
        
        this.player = player;
        
        this.at();
        
        if( player.superStatus ){
            
            var ammoSize = this.getAmmoSize( player.startTimerFire );
            this.addComponent( player.id+'_fire_super' );
            this.shoot( Config.fire.speedSuperMili );
            
        } else {
            
            var ammoSize = this.getAmmoSize();
            
            if( player.superStatus ){ //si es super, fuerza a disparar otra vez para q tome bien los valores de volocidad y tamaño
                this.ammo(player); 
                return;
            } 
            
            this.addComponent( player.id+'_fire_'+ammoSize );
            this.shoot( Config.fire.speedNormalMili );
            
        }
        
        this.damage = ammoSize * Config.fire.ammoPower;
        
        return this;
    },
    getAmmoSize: function(){
        
        if( this.player.superStatus ){
            return Config.fire.ammoSuperSize; //si es super, siempre devuelve tamaño maximo
        }
        
        var endTimestamp = new Date().getTime();
        var chargingTime = ( endTimestamp - this.player.startTimerFire ) / 1000;
        
        var size = 0;
        
        if( chargingTime < 0.9 ){
            size = Config.fire.ammoSize[0];             
        }
        else if( chargingTime >= 0.9 && chargingTime < 1.8 ) 
            size = Config.fire.ammoSize[1];    
        else if( chargingTime >= 1.8 && chargingTime < 5 )
            size = Config.fire.ammoSize[2];
        else if( chargingTime >= 5 ){  
            size = Config.fire.superSize;
            //this.player.super();
        }
        
        return size;
    },    
    at: function(){

        var centerX = Game.width / 2;
        var y;
        var x;

        if ( this.player.id == 'player1' ) {             
            x = this.player.superStatus ? this.player.xPos + 110 : this.player.xPos + 100;
            y = this.player.superStatus ? Player.h : Player.h+18;
        }
        else{            
            x = this.player.xPos - this.w;
            y = this.player.superStatus ? Player.h+14 : Player.h+27;
        }

        this.attr({
            x: x,
            y: y
        });
        
        this.color( this.player.pColor );
        
    },
    shoot: function( speed ){

        var centerX = Game.width / 2;
        var direction = 0;
        
        if ( this.player.xPos < centerX )           
            direction = Game.width;
        
        else
            direction = 0;            
        
        this.tween( {x: direction}, speed );
    
    }
});


Crafty.c( 'Shield', {    
    shieldPower: 0,
    shieldState:0,    
    width: 0,
    height: 0,
    player: null,
    init: function(){        
        this.shieldPower = Config.shield.power;
        this.requires( 'Global, DOM, Delay' );
        this.attr({ z : 5 });
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
        }, Config.shield.speed, 3);        
        
        return this;
    }
});



Crafty.c( 'PteroAttack', {        
    yPos:80,
    player: null,
    tweenX: null,
    egg:null,
    init: function(){        
        this.requires( 'Global, Tween, SpriteAnimation, Delay' );
        this.attr({ z : 8 });
    },         
    attack: function( player ){ 
        
        var self = this;
        this.player = player;
        
        this.tweenX = this.player.id === 'player1' ? Game.width: -62;
        var sprites = this.player.id === 'player1' ? [[0,0],[1,0]] : [[2,0],[3,0]];
        
        this.addComponent( this.player.id+'_ptero1' )
            .attr({           
                x: self.player.id === 'player1' ? -62 : Game.width,
                y: self.yPos,                
            });
        
        var yCoef = 5;
        var yPos = self.yPos;
        this.delay(function() {
            yCoef *= -1;
            var newYPos = yPos + yCoef;            
            self.tween( { y: newYPos }, 500 );
        }, 500, Config.pteroAttack.fligthDuration / 500 );
        
        this.tween( { x: self.tweenX }, Config.pteroAttack.fligthDuration ).bind('TweenEnd', function( prop ){
            
            if( typeof prop.x !== 'undefined' ){            
                self.cancelTween('y');                
                self.destroy(); 
                return false;
            }
            
            
        }).reel('PteroFlying', 250, sprites ).animate('PteroFlying', -1);            
        
        this.egg = Crafty.e('Egg').egg( this );
        
        
        return this;
    }
});

Crafty.c( 'Egg', {        
    ptero: null,    
    init: function(){        
        var self = this;
        var flag = true;
        this.requires( 'Global, Tween, egg, Gravity, Collision' );  
        this.attr({ z : 10 });
        this.onHit('Player', function( data ) {            
            
            var playerId = data[0].obj.id;
            
            if( playerId == this.ptero.player.id )
                return;            
            
            this.tween( { alpha: 0 }, 300).bind('TweenEnd', function(){
                self.destroy();
            });
            
            if( flag ){            
                Crafty.e('Explosion').explosion( data[0].obj );
                flag = false;
            }
           
           
        }); 
        
    },         
    egg: function( ptero ){ 
        
        var self = this;
        this.ptero = ptero;
                
        var tweenX =  ptero.player.id === 'player1' ? ptero.tweenX : ptero.tweenX + 35;
        var eggKey =  ptero.player.id === 'player1' ? Controls.Player1.dropEgg : Controls.Player2.dropEgg;
        
        this.attr({           
            x: ptero.player.id === 'player1' ? ptero.x : ptero.x+35,
            y: ptero.y + 60,               
        }).bind('KeyDown', function(e) {

            if( e.key === eggKey ){
                self.drop();
                self.unbind('KeyDown');
            }
            
        }).tween( { x: tweenX }, Config.pteroAttack.fligthDuration ).bind('TweenEnd', function(){
            self.destroy();
        });
        
        return this;
    },
    drop: function(){
        
        var player = this.ptero.player;
        this.gravity("player").gravityConst( Config.egg.gravity );
        
        var attr = player.id === 'player1' ? { x: player.x+25, y: player.y, z:player.z+1, w:5 } : 
                { x: player.x, y: player.y, z:player.z+1, w:5 };
                
        var attackTxt = Crafty.e("Global, Text, Tween").attr( attr )
                                                    .text( "HUEVOATTACK" )
                                                    .textColor( '#EBEB00', 1 )                                                                         
                                                    .textFont({ family:'Clono', size: '25px'});
        
        
        attackTxt.tween( {alpha: 0}, 2000  ).one('TweenEnd', function(){
            attackTxt.destroy();
        });
        
    }    
});


Crafty.c( 'Explosion', {        
    player: null,
    explsionImg : null, 
    explosionsCant : 0,
    init: function(){        
        
        this.explosionsCant = Config.explosion.quantity;
        this.requires( 'Global, Tween' );        
        
    },         
    explosion: function( player, parAttr, cont ){ 
        
        player.harm( Config.explosion.damage );
        
        var self = this;
        this.player = player;
        parAttr = typeof parAttr === 'undefined' ? {} : parAttr;
        cont = typeof cont === 'undefined' ? 1 : cont;
        
        var attr = {                   
            x: player.id === 'player1' ? player.x + 80 : player.x,
            y: player.y,
            z:10000,
            alpha:0
        };
        var completAttr = $.extend( {}, attr, parAttr)
                
        var img = Crafty.e("2D, DOM, Image, Tween, ImgExpl")
            .image("/sprites/explosion.png")
            .attr( completAttr ).tween( { alpha: 0.8 }, 250 ).bind('TweenEnd', function( prop ){
            
            if( prop.alpha == 0.8 ){                
                
                img.tween( { alpha: 0 }, 1500 ).bind('TweenEnd', function( propLast ){                                        
                    
                    if( propLast.alpha == 0 ){
                        img.destroy();
                        if( cont == self.explosionsCant ){                        
                            self.destroy();
                        }
                        
                    }                     
                });
        
                if( player.id == 'player1' ){
                    completAttr.x -= 20;                    
                } else {
                    completAttr.x += 20;
                }
                completAttr.y = completAttr.y + 20;
                
                if( cont == self.explosionsCant )
                    return;
                
                self.explosion( player, completAttr,  ++cont );
               
            } else {
             return;
            }
        });        
        
        return this;
    }
});

