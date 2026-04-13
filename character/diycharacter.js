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
    diy_wuqi_master: {
        name: '武器大师',
        hp: 4,
        maxHp: 4,
        sex: 'male',
        group: 'qun',
        skills: ['diy_use_wuqi', 'diy_wuqi_sha'],
        img: 'extension/民间卡牌/image/character/diy_wuqi_master.jpg',
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
    //测试技能：从18张武器中选择装备
    diy_use_wuqi: {
        audio: 2,
        enable: 'phaseUse',
        direct: true,
        usable: 1,
        filter: function (event, player) {
            return true;
        },
        content: async function (event, trigger, player) {
            const weapons = ['diy_dao', 'diy_qiang', 'diy_jian', 'diy_ji', 'diy_fu', 'diy_yue', 'diy_gou', 'diy_cha', 'diy_bian', 'diy_jian2', 'diy_chui', 'diy_zhua', 'diy_tang', 'diy_gun', 'diy_shuo', 'diy_bang', 'diy_guai', 'diy_liuxingchui'];
            const getRandomSuit = () => ['heart', 'diamond', 'club', 'spade'][Math.floor(Math.random() * 4)];
            const vlist = weapons.map(i => {
                const info = lib.card[i] || {};
                return [info.suit || getRandomSuit(), info.number || Math.ceil(Math.random() * 13), i];
            });
            const result = await player.chooseButton(['选择武器', [vlist, 'vcard']], true).forResult();
            if (!result || !result.bool || !result.links || !result.links.length) return;
			const card = game.createCard(result.links[0][2], result.links[0][0], result.links[0][1]);
            await player.equip(card);
        },
        ai: { order: 10, result: { player: 1 } }
    },
    diy_wuqi_sha: {
        audio: 2,
        enable: 'phaseUse',
        filter: (event, player) => {
            return player.getEquips(1).length > 0;
        },
        async content(event, trigger, player) {
            const weapon = player.getEquips(1);
            const card = weapon[0];
            const sha = get.autoViewAs({
                name: "sha",
                isCard: true,
            });
            sha.cards = [card];
            await player.chooseUseTarget(sha, false, "nodistance");
            await player.lose(card, 'equip');
        },
        ai: {
            order: 10,
            result: {
                player: (player, target) => {
                    return get.effect(target, { name: 'sha' }, player, player);
                }
            }
        }
    },
};

const translate = {
    shen_wuxingshi: '五行使',
    shen_wuxingshi_prefix: '五行',
    shen_wuxing: '五行',
    shen_wuxing_info: '出牌阶段，当你使用【杀】时，你可以选择将此【杀】的属性转换为金、木、水、火、土中的任意一种。锁定技，属性【杀】无使用次数限制。',
    diy_wuqi_master: '武器大师',
    diy_use_wuqi: '化器',
    diy_use_wuqi_info: '出牌阶段限一次，你可以选择一把武器并装备。',
    diy_wuqi_sha: '投掷',
    diy_wuqi_sha_info: '出牌阶段，你可以将装备区里的武器视为一张杀',
};

game.import("character", function () {
    return {
        name: "diycharacter",
        character,
        skill,
        translate,
    };
});
