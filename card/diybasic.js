import { lib, game, ui, get, ai, _status } from "../lib/utils.js";
const card = {
};

const skill = {
    sha_imprison_skill: {
        trigger: { source: 'damageEnd' },
        equipSkill: false,
        ruleSkill: true,
        forced: true,
        filter(event, player) {
            return player != event.player
                && event.card
                && event.card.name == 'sha'
                && game.hasNature(event.card, 'imprison');
        },
        content: async function (event, trigger, player) {
            if (!trigger.player.isTurnedOver()) {
                await trigger.player.turnOver();
            }
            if (!trigger.player.isLinked()) {
                await trigger.player.link();
            }
        },
    },
    sha_metal_skill: {
        trigger: { source: 'damageBegin1' },
        equipSkill: false,
        ruleSkill: true,
        forced: true,
        filter(event, player) {
            return player != event.player
                && event.card
                && event.card.name == 'sha'
                && game.hasNature(event.card, 'metal')
                && event.player.countCards('e') > 0;
        },
        content: async function (event, trigger, player) {
            trigger.num++;
        },
    },
    //ok
    sha_wood_skill: {
        trigger: { source: 'damageEnd' },
        equipSkill: false,
        ruleSkill: true,
        forced: true,
        filter(event) {
            return event.card && event.card.name == 'sha' && game.hasNature(event.card, 'wood');
        },
        content: async function (event, trigger, player) {
            await player.draw();
        },
    },

    sha_water_skill: {
        trigger: { source: "shaUnhirt" },
        equipSkill: false,
        ruleSkill: true,
        forced: true,
        filter(event, player) {
            return player != event.player
                && event.card
                && event.card.name == 'sha'
                && game.hasNature(event.card, 'water');
        },
        content: async function (event, trigger, player) {
            await player.draw();
        },
    },

    sha_flare_skill: {
        trigger: { source: 'damageBegin1' },
        equipSkill: false,
        ruleSkill: true,
        forced: true,
        filter(event, player) {
            return player != event.player
                && event.card
                && event.card.name == 'sha'
                && game.hasNature(event.card, 'flare')
                && event.player.countCards('h') <= player.countCards('h');
        },
        content: async function (event, trigger, player) {
            trigger.num++;
        },
    },
    //ok
    sha_earth_skill: {
        trigger: { source: 'damageEnd' },
        equipSkill: false,
        ruleSkill: true,
        forced: true,
        filter(event) {
            return event.card && event.card.name == 'sha' && game.hasNature(event.card, 'earth');
        },
        content: async function (event, trigger, player) {
            await player.recover();
        },
    },

    bxyr_wuxing_combine: {
        enable: 'phaseUse',
        popup: false,        // 不显示弹窗
        silent: true,         // 静默技能
        filter: function (event, player) {
            if (player.hasSkill('bxyr_zhangkong') || player.hasSkill('bxyr_mingyun')) return false;
            const handcards = player.get('h');
            const hasNature = ['metal', 'wood', 'water', 'flare', 'earth']
                .every(nature => handcards.some(card => card.nature == nature));
            return hasNature;
        },
        selectCard: 5,
        filterCard: function (card, player) {
            return ['metal', 'wood', 'water', 'flare', 'earth'].includes(card.nature);
        },
        selectTarget: false,
        content: async function (event, trigger, player) {
            const cards = event.cards;
            const suits = cards.map(card => get.suit(card));
            const isSameSuit = suits.every(suit => suit == suits[0]);

            await player.discard(cards);

            if (isSameSuit) {
                player.addSkill('bxyr_mingyun');
                game.log(player, '集齐同花色五行杀，获得技能【命运】');
            } else {
                player.addSkill('bxyr_zhangkong');
                game.log(player, '集齐杂花色五行杀，获得技能【掌控】');
            }

            player.update();
        },
        ai: {
            order: 10,
            result: {
                player: function (player) {
                    if (player.hasSkill('bxyr_zhangkong') || player.hasSkill('bxyr_mingyun')) return 0;
                    return 10;
                },
            },
        },
    },

    bxyr_zhangkong: {
        trigger: { player: 'phaseDrawBegin' },
        forced: true,
        content: async function (event, trigger, player) {
            trigger.num = 5;
        },
    },

    bxyr_mingyun: {
        enable: 'phaseUse',
        usable: 1,
        filterTarget: function (card, player, target) {
            return player != target;
        },
        selectTarget: 1,
        content: async function (event, trigger, player) {
            const target = event.targets[0];
            await target.die();
        },
        ai: {
            order: 10,
            result: {
                target: function (player, target) {
                    return -10;
                },
            },
        },
    },
};

const translate = {
    imprison: '锁',
    metal: '金',
    wood: '木',
    water: '水',
    flare: '火',
    earth: '土',
    sha_imprison: '锁杀',
    sha_imprison_skill: '锁杀',
    sha_imprison_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到伤害且翻面并横置。',
    sha_imprison_skill_info: '当你使用锁属性的【杀】对目标造成伤害后，禁止目标回合内使用主动技能。',
    sha_imprison_skill_ban: '锁',
    sha_metal: '金杀',
    sha_metal_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到伤害。若目标装备区有牌，伤害+1。',
    sha_wood: '木杀',
    sha_wood_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到伤害。当你使用此【杀】造成伤害后，你摸一张牌。',
    sha_water: '水杀',
    sha_water_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到伤害。此【杀】被【闪】抵消后，你可以摸一张牌。',
    sha_flare: '火杀',
    sha_flare_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到伤害。若目标手牌数不大于你，伤害+1。',
    sha_earth: '土杀',
    sha_earth_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到伤害。当你使用此【杀】造成伤害后，你回复1点体力。',
    sha_metal_skill: '金杀',
    sha_metal_skill_info: '当你使用金属性的【杀】时，若目标装备区有牌，伤害+1。',
    sha_wood_skill: '木杀',
    sha_wood_skill_info: '当你使用木属性的【杀】造成伤害后，你摸一张牌。',
    sha_water_skill: '水杀',
    sha_water_skill_info: '当你使用水属性的【杀】被【闪】抵消后，你摸一张牌。',
    sha_flare_skill: '火杀',
    sha_flare_skill_info: '当你使用火属性的【杀】时，若目标手牌数不大于你，伤害+1。',
    sha_earth_skill: '土杀',
    sha_earth_skill_info: '当你使用土属性的【杀】造成伤害后，你回复1点体力。',
    bxyr_wuxing_combine: '归一',
    bxyr_wuxing_combine_info: '出牌阶段，若你手牌中有金杀、木杀、水杀、火杀、土杀各一张，你可以弃置这五张牌。若五张牌花色相同，你获得技能【命运】；若花色不同，你获得技能【掌控】。',
    bxyr_zhangkong: '掌控',
    bxyr_zhangkong_info: '锁定技，你的摸牌阶段摸牌数改为5张。',
    bxyr_mingyun: '命运',
    bxyr_mingyun_info: '出牌阶段，你可以指定一名角色直接死亡（每回合限一次）。',
};

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const list = [];
const natureList = ['metal', 'wood', 'water', 'flare', 'earth', 'imprison'];

for (const nature of natureList) {
    const count = 13;
    for (let i = 0; i < count; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        const number = numbers[Math.floor(Math.random() * 13)];
        list.push([suit, number, 'sha', nature]);
    }
}

game.import("card", function () {
    return {
        name: "diybasic",
        card,
        skill,
        translate,
        list
    };
});
