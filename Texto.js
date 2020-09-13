class Texto extends Phaser.GameObjects.Text{
    constructor(config){
        super(config.scene, config.x, config.y,config.int,config.int2,config.color)
        if (español === 1){
            var espaText = [
                'Comenzar','Infromación sobre el virus','Créditos'
            ];

            config.scene.add.bitmapText(config.x, config.y,'pixel', espaText[config.int], config.int2).setOrigin(0.5,0).setTint(config.color)

        } else if (ingles === 1){
           var inglesText = [
               'start','Information about the virus','Credits'
           ];
           config.scene.add.bitmapText(config.x, config.y,'pixel', inglesText[config.int], config.int2).setOrigin(0.5,0).setTint(config.color)

        }
    }
    
    }
   
