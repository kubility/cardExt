import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

const character = {
    shen_wuxingshi: {
        name: '五行使',
        hp: 4,
        maxHp: 4,
        sex: 'male',
        group: 'shen',
        skills: ['shen_wuxing'],
        img: 'extension/民间卡牌/image/character/shen_wuxingshi.jpg',
    },
};

const skill = {
    shen_wuxing: {
        enable: 'phaseUse',
        filterCard(card) {
            return card.name == 'sha';
        },
        selectCard: 1,
        usable: 5,
        filter(event, player) {
            return player.countCards('h', card => card.name == 'sha') > 0;
        },
        mod: {
            cardUsable(card, player, num) {
                if (card.name == 'sha' && card.nature && ['metal', 'wood', 'water', 'flare', 'earth'].includes(card.nature)) {
                    return Infinity;
                }
            },
        },
        async content(event, trigger, player) {
            const card = event.cards[0];
            const { control } = await player.chooseControl('金', '木', '水', '火', '土').set('prompt', '五行转化：选择一种属性').forResult();
            if (!control) return;

            const natureMap = { '金': 'metal', '木': 'wood', '水': 'water', '火': 'flare', '土': 'earth' };
            const nature = natureMap[control];
            const newCard = game.createCard({ name: 'sha', nature: nature, suit: get.suit(card), number: get.number(card) });
            await player.lose(card, ui.ordering);
            await player.gain(newCard, 'draw');
        },
        ai: {
            order: 10,
            result: {
                player: (player, target) => {
                    return 1;
                },
            },
        },
    },
};

const translate = {
    shen_wuxingshi: '五行使',
    shen_wuxingshi_prefix: '五行',
    shen_wuxing: '五行',
    shen_wuxing_info: '出牌阶段，当你使用【杀】时，你可以选择将此【杀】的属性转换为金、木、水、火、土中的任意一种。锁定技，属性【杀】无使用次数限制。',
};

game.import("character", function () {
    return {
        name: "Taoist",
        character,
        skill,
        translate,
    };
});