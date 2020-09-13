var creditosimg;
class Scene5 extends Phaser.Scene{
    constructor(){
        super('creditos');
    }
create(){

creditosimg = this.add.image(170,25, 'creditos').setOrigin(0,0).setScale(0.7, 0.7);
creditosimg.setInteractive();
creditosimg.setInteractive().on('pointerdown', () => {this.scene.start('inicio')});


}



}