import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

const card = {
    diy_nvwuduzuyao: {
        audio: true,
        fullskin: true,
        type: 'delay',
        modTarget(card, player, target) {
            return lib.filter.judge(card, player, target);
        },
        enable(card, player) {
            return player.canAddJudge(card);
        },
        filterTarget(card, player, target) {
            return lib.filter.judge(card, player, target) && player == target;
        },
        selectTarget: [-1, -1],
        toself: true,
        judge(card) {
            //这里做进一步判断
            const judgeNumber = get.number(card);
            const judgeSuit = get.suit(card);
            if (judgeNumber === 1) {
                return -1; //立即阵亡 然后失效
            }
            if (judgeNumber === 7) {
                return 7; //回复至体力上限并补满手牌
            }
            if (judgeSuit === 'spade' && Math.abs(judgeNumber - 7) <= 1) {
                return 2; //回复1点体力
            }
            return 1; //其他情况，失去1点体力或弃置一张牌
        },
        async effect(event, trigger, player, result) {
            const { card } = event;
            const judgeNumber = result.judge;
            if (judgeNumber === -1) {
                await player.die();
                return;
            }
            if (judgeNumber === 7) {
                const recoverAmount = player.maxHp - player.hp;
                if (recoverAmount > 0) {
                    await player.recover(recoverAmount);
                }
                const drawCount = player.maxHp - player.num('h');
                if (drawCount > 0) {
                    await player.draw(drawCount);
                }
            }
            if (judgeNumber === 2) {
                if (player.hp < player.maxHp) {
                    await player.recover();
                } else {
                    await player.draw();
                }
            }
            if (judgeNumber === 1) {
                if (player.num('he') == 0) {
                    await player.loseHp(1);
                } else {
                    const discardResult = await player.chooseCard('he', true, '请选择一张牌弃置').forResult();
                    await player.discard(discardResult.cards);
                }
            }
            await player.addJudgeNext(card);
        },
        async cancel(event, trigger, player) {
            await player.addJudgeNext(event.card);
        },
        ai: {
            basic: {
                order: 1,
                useful: 1,
                value: 4,
            },
            tag: {
                recover: 1,
                damage: 1,
            },
        },
    },
};

const translate = {
    diy_nvwuduzuyao: '女巫的毒药',
    diy_nvwuduzuyao_info: '出牌阶段,对自己使用。若判定牌点数与此牌点数相同，目标回复至最大体力值并将手牌补至体力上限；若判定牌花色与此牌相同且点数差≤2，目标回复1点体力，若体力已满则改为摸一张牌；若判定牌点数为A，目标立即阵亡然后移除此牌；其他情况，目标选择弃置一张牌或失去1点体力。将之移动到下家的判定区里。',
};

const cardNames = [];

const list = [
    ['spade', 7, 'diy_nvwuduzuyao'], //这里固定花色和点数 再灵活就不能这么写了
    ['spade', 7, 'diy_nvwuduzuyao'],
    ['spade', 7, 'diy_nvwuduzuyao'],
    ['spade', 7, 'diy_nvwuduzuyao'],
    ['spade', 7, 'diy_nvwuduzuyao'],
];

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

for (const name of cardNames) {
    const count = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < count; i++) {
        const suit = suits[Math.floor(Math.random() * 4)];
        const number = numbers[Math.floor(Math.random() * 13)];
        const item = [suit, number, name];
        list.push(item);
    }
}

for (let i in card) {
    if (!card[i].cardimage) {
        card[i].image = "ext:民间卡牌/image/card/diytrick/" + i + ".png";
    }
}

game.import("card", function () {
    return {
        name: "diytrick",
        card,
        skill: {},
        translate,
        list,
    };
});
