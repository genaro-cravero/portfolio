var informacion;
var atras;
class Scene4 extends Phaser.Scene{
    constructor(){
        super('info');
    }
create(){

informacion = this.add.image(-30,0, 'infovirus').setOrigin(0,0).setScale(0.55, 0.5);
atras = this.add.image(875,470, 'infovirus').setOrigin(0,0).setScale(0.07,0.04);
atras.setAlpha(0.000000001).setInteractive().on('pointerdown', () => {this.scene.start('inicio')});


}



}