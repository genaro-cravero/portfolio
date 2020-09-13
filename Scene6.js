class Scene6 extends Phaser.Scene{
    constructor(){
        super('seleccion');
    }

create(){
this.add.image(400, 568, 'ground').setScale(1000).setTint(0x001a19);
this.add.bitmapText(280, 21, 'pixel', 'SELECCIONA PERSONAJE',50).setTint(0xffffff);
this.selecsound = this.sound.add('character');
selecnene = this.physics.add.sprite(250, 375,'dude').setScale(9).setSize(32,60);
selecnene.body.allowGravity = false;
selecnene.anims.play('selecnene', true);
selecnene.setInteractive();
selecnene.on('pointerdown', () => {seleccion = 'nene',this.selecsound.play(); this.scene.start('juego');} );

selecnena = this.physics.add.sprite(990,375, 'nena').setScale(9).setSize(32,60);
selecnena.body.allowGravity = false;
selecnena.anims.play('selecnena', true);
selecnena.setInteractive();
selecnena.on('pointerdown', () => {seleccion = 'nena', this.selecsound.play(); this.scene.start('juego2');} );



}




}