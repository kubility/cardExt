import { lib, game, ui, get, ai, _status } from "./lib/utils.js";

export async function content(config, pack) {
    if (config.diybasic) {
        lib.nature.set('metal', 25);
        lib.nature.set('wood', 26);
        lib.nature.set('water', 27);
        lib.nature.set('flare', 28);
        lib.nature.set('earth', 29);
        lib.nature.set('imprison', 24);
        /** nature = new Map([
            ["fire", 20],     // 火属性，数值是优先级（用于多属性叠加时的排序）
            ["thunder", 30],  // 雷属性
            ["kami", 60],     // 神属性
            ["ice", 40],      // 冰属性
            ["stab", 10],     // 刺属性
            ["poison", 50]    // 毒属性
        ]);*/

        lib.card.sha.nature.push('metal');
        lib.card.sha.nature.push('wood');
        lib.card.sha.nature.push('water');
        lib.card.sha.nature.push('flare');
        lib.card.sha.nature.push('earth');
        lib.card.sha.nature.push('imprison');
        lib.linked.push('metal');
        lib.linked.push('wood');
        lib.linked.push('water');
        lib.linked.push('flare');
        lib.linked.push('earth');
        lib.linked.push('imprison');

        game.addGlobalSkill("sha_metal_skill");
        game.addGlobalSkill("sha_wood_skill");
        game.addGlobalSkill("sha_water_skill");
        game.addGlobalSkill("sha_flare_skill");
        game.addGlobalSkill("sha_earth_skill");
        
        game.addGlobalSkill("sha_imprison_skill");
        game.addGlobalSkill("bxyr_wuxing_combine");
    }
    if(config.dragonball){ 
        game.addGlobalSkill("dragonball_init");//龙珠初始化
        game.addGlobalSkill("dragonball_transfer");//抢夺龙珠
        game.addGlobalSkill("dragonball_die");//龙珠死亡
    }
    
}
