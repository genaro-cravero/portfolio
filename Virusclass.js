class Virusclass extends Phaser.Physics.Arcade.Sprite{
    constructor(config){
        super(config.scene)
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        virus = config.scene.physics.add.group();

        
        virus.create(-260,500, 'humovirus').anims.play('humovirus', true).setScale(5).setSize(50,50).setAlpha(0.2);
        virus.create(-225,100, 'humovirus').anims.play('humovirus', true).setScale(5).setSize(50,50).setAlpha(0.3);
        virus.create(-230,800, 'humovirus').anims.play('humovirus', true).setScale(5).setSize(50,50).setAlpha(0.5);
        virus.create(120, 100, 'v1').anims.play('v1', true);
        virus.create(115, 200, 'v4').anims.play('v4', true);
        virus.create(160, 300, 'v3').anims.play('v3', true);
        virus.create(98, 400, 'v6').anims.play('v6', true);
        virus.create(90, 500, 'v5').anims.play('v5', true);
        virus.create(100, 600, 'v2').anims.play('v2', true);
        virus.create(140, 700, 'v1').anims.play('v1', true);
        virus.create(130, 800, 'v6').anims.play('v6', true);
        virus.create(15, 112, 'v2').anims.play('v2', true);
        virus.create(60, 222, 'v5').anims.play('v5', true);
        virus.create(50, 278, 'v3').anims.play('v3', true);
        virus.create(23, 388, 'v1').anims.play('v1', true);
        virus.create(15, 513, 'v6').anims.play('v6', true);
        virus.create(30, 590, 'v4').anims.play('v4', true);
        virus.create(14, 712, 'v3').anims.play('v3', true);
        virus.create(26, 780, 'v6').anims.play('v6', true);
        virus.create(-172, 100, 'v1').anims.play('v1', true);
        virus.create(-160, 200, 'v4').anims.play('v4', true);
        virus.create(-160, 300, 'v3').anims.play('v3', true);
        virus.create(-165, 400, 'v6').anims.play('v6', true);
        virus.create(-165, 500, 'v5').anims.play('v5', true);
        virus.create(-160, 600, 'v2').anims.play('v2', true);
        virus.create(-168, 700, 'v1').anims.play('v1', true);
        virus.create(-158, 800, 'v6').anims.play('v6', true);
        virus.create(-60, 92, 'v3').anims.play('v3', true);
        virus.create(-75, 196, 'v6').anims.play('v6', true);
        virus.create(-46, 278, 'v2').anims.play('v2', true);
        virus.create(-66, 388, 'v4').anims.play('v4', true);
        virus.create(-85, 513, 'v1').anims.play('v1', true);
        virus.create(-72, 590, 'v5').anims.play('v5', true);
        virus.create(-82, 712, 'v2').anims.play('v2', true);
        virus.create(-66, 780, 'v4').anims.play('v4', true);

        
        virus.children.iterate(function (child){
            child.body.allowGravity = false;
            child.body.immovable = true;
            child.setVelocityX(160);
            
            
        
        });
        
   
}

};