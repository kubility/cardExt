import { lib, game, ui, get, ai, _status } from "./lib/utils.js";

export async function content(config, pack) {
    if (config.diybasic) {
        lib.nature.set('metal', 25);
        lib.nature.set('wood', 26);
        lib.nature.set('water', 27);
        lib.nature.set('flare', 28);
        lib.nature.set('earth', 29);

        lib.card.sha.nature.push('metal');
        lib.card.sha.nature.push('wood');
        lib.card.sha.nature.push('water');
        lib.card.sha.nature.push('flare');
        lib.card.sha.nature.push('earth');
        lib.linked.push('metal');
        lib.linked.push('wood');
        lib.linked.push('water');
        lib.linked.push('flare');
        lib.linked.push('earth');
        
        game.addGlobalSkill("sha_metal_skill");
        game.addGlobalSkill("sha_wood_skill");
        game.addGlobalSkill("sha_water_skill");
        game.addGlobalSkill("sha_flare_skill");
        game.addGlobalSkill("sha_earth_skill");
		game.addGlobalSkill("bxyr_wuxing_combine");
    }
}
