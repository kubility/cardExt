import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

// ============================================
// 神龙/七龙珠卡牌扩展
// 规则依据：用户提供的官方规则文档
// API依据：神龙七龙珠_API清单.md
// ============================================

// --------------------------------------------
// 一、龙珠常量定义
// --------------------------------------------
const DRAGON_BALLS = {
    1: 'dragonball_1',
    2: 'dragonball_2',
    3: 'dragonball_3',
    4: 'dragonball_4',
    5: 'dragonball_5',
    6: 'dragonball_6',
    7: 'dragonball_7',
};

const DRAGON_BALL_NAMES = {
    dragonball_1: '一星珠',
    dragonball_2: '二星珠',
    dragonball_3: '三星珠',
    dragonball_4: '四星珠',
    dragonball_5: '五星珠',
    dragonball_6: '六星珠',
    dragonball_7: '七星珠',
};

// --------------------------------------------
const EXPANSION_TAG = 'dragonball';
const EXPANSION_TAG_SKILL = 'dragonball_skill';

// --------------------------------------------
// 二、工具函数
// --------------------------------------------

/**
 * 获取玩家扩展区的所有龙珠
 */
function getDragonBalls(player) {
    const cards = player.getExpansions(EXPANSION_TAG_SKILL);
    const balls = [];
    for (const card of cards) {
        const match = card.name.match(/_(\d+)$/);
        if (match) {
            const num = parseInt(match[1]);
            if (num >= 1 && num <= 7) {
                balls.push({ card, num });
            }
        }
    }
    return balls;
}

/**
 * 检查玩家是否集齐七颗龙珠
 */
function hasAllDragonBalls(player) {
    const balls = getDragonBalls(player);
    return balls.length === 7;
}

/**
 * 为玩家添加龙珠到扩展区，并添加对应技能 2
 */
async function addDragonBallToPlayer(player, card, ballNum) {
    const next = player.addToExpansion(card, 'gain2');
    next.gaintag.add(EXPANSION_TAG_SKILL);
    await next;
    player.markSkill(EXPANSION_TAG_SKILL);
    game.log(player, '获得了', DRAGON_BALL_NAMES[card.name]);
    // 添加对应编号的技能
    player.addSkill(EXPANSION_TAG + '_' + ballNum + '_skill');
}

/**
 * 随机分配七颗龙珠给所有存活角色  1 随机分配
 */
async function distributeAllDragonBalls() {
    const alivePlayers = game.players.filter(p => p.isIn());
    if (alivePlayers.length === 0) return;
    for (let i = 1; i <= 7; i++) {
        const ballName = DRAGON_BALLS[i];
        const card = game.createCard(ballName, 'none', i);
        const targetPlayer = alivePlayers.randomGet();
        await addDragonBallToPlayer(targetPlayer, card, i);
    }
}

/**
 * 转移龙珠从一名玩家到另一名玩家
 */
async function transferDragonBall(from, to, ballInfo) {
    game.log('转移龙珠:', ballInfo.num, '从', from, '到', to);
    if (from.hasSkill(EXPANSION_TAG + '_' + ballInfo.num + '_skill')) {
        from.removeSkill(EXPANSION_TAG + '_' + ballInfo.num + '_skill');
    }
    const next = to.addToExpansion(ballInfo.card, "gain2");
    next.gaintag.add(EXPANSION_TAG_SKILL);
    await next;// 等待龙珠添加完成
    if (!to.hasSkill(EXPANSION_TAG + '_' + ballInfo.num + '_skill')) {
        to.addSkill(EXPANSION_TAG + '_' + ballInfo.num + '_skill');
    }
    to.markSkill(EXPANSION_TAG_SKILL);
    game.log('转移后', to, '的龙珠:', getDragonBalls(to).length);
}

/**
 * 无伤害来源死亡时，重新随机分配龙珠
 */
async function redistributeDragonBalls(deadPlayer, balls, event) {
    const alivePlayers = game.players.filter(p => p.isIn() && p !== deadPlayer);
    if (alivePlayers.length === 0) {
        game.log('没有存活角色，龙珠被直接弃置！');
        return;
    }
    for (const ball of balls) {
        const targetPlayer = alivePlayers.randomGet();
        await transferDragonBall(deadPlayer, targetPlayer, ball);
    }
    game.log('龙珠重新随机分配！');
}

/**
 * 执行许愿效果
 */
async function executeWish(player) {
    const deadPlayers = game.dead;

    let choices = [];
    if (deadPlayers.length > 0) {
        choices = ['dragonball_revival', 'dragonball_kill'];
    } else {
        choices = ['dragonball_kill'];
    }

    const result = await player.chooseControl(choices)
        .set('prompt', '请选择你的愿望')
        .forResult();
    const choice = result.control;
    // 销毁所有玩家的所有龙珠
    const balls = getDragonBalls(player);
    for (const ball of balls) {
        await ball.card.remove();
        player.removeSkill(EXPANSION_TAG + '_' + ball.num + '_skill');
    }
    if (choice === 'dragonball_revival') {
        const deads = deadPlayers.map(p => p.name);
        const result = await player.chooseControl(deads)
            .set('prompt', '请选择一名阵亡角色复活')
            .forResult();
        const target = result.control;
        if (target) {
            const targetPlayer = deadPlayers.find(p => p.name === target);
            if (!targetPlayer) {
                game.log('玩家', target, '不存在！');
                return;
            }
            await targetPlayer.revive();
            game.log(target, '被神龙复活！');
        }
    } else {
        const result = await player.chooseTarget('选择一名角色令其死亡', true)
            .set('filterTarget', (card, player, target) => target.isIn())
            .set('ai', target => -get.attitude(player, target))
            .forResult();

        if (result.bool && result.targets && result.targets.length > 0) {
            const target = result.targets[0];
            await target.die();
            game.log(target, '被神龙之力消灭！');
        }
    }

    game.log('许愿完成，所有龙珠已移出游戏！继续分配龙珠！');
    await distributeAllDragonBalls();
    game.log('龙珠重新随机分配！');
}

/**
 * 检查玩家是否集齐七龙珠，若是则触发许愿
 */
async function checkAndTriggerWish(player) {
    const balls = getDragonBalls(player);
    game.log('当前龙珠数量:', balls.length, balls);  // 加这行
    if (hasAllDragonBalls(player)) {
        game.log(player, '集齐了七颗龙珠！');
        await executeWish(player);
    }
}

// --------------------------------------------
// 三、卡牌定义
// --------------------------------------------
const card = {
    dragonball_1: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    dragonball_2: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    dragonball_3: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    dragonball_4: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    dragonball_5: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    dragonball_6: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    dragonball_7: {
        fullskin: true, type: 'trick', silent: true, charlotte: true
    },
    shenlong: {
        fullskin: true,
        type: 'trick',
        enable: true,
        content: async function (event, trigger, player) {
            for (const p of game.players) {
                const balls = getDragonBalls(p);
                for (const ball of balls) {
                    await transferDragonBall(p, player, ball);
                }
            }
            game.delay(1);// 等待龙珠转移完成 时间单位：秒
            const playerBalls = getDragonBalls(player);
            if (playerBalls.length >= 7) {
                await checkAndTriggerWish(player);
            }
        },
    },
};

// --------------------------------------------
// 四、技能定义
// --------------------------------------------
const skill = {
    dragonball_skill: {
        charlotte: true,
        mark: 'auto',           // 启用标记显示
        intro: {
            content: 'expansion',
            markcount: "expansion",
            onunmark: true,

        },
        onremove: true,
    },
    // ----------------------------------------
    // 一星珠：摸牌阶段多摸1张
    // ----------------------------------------
    dragonball_1_skill: {
        trigger: { player: 'phaseDrawBegin2' },
        forced: true,
        filter: function (event, player) {
            if (event.numFixed) return false;
            return getDragonBalls(player).some(b => b.num === 1);
        },
        content: async function (event, trigger, player) {
            trigger.num++;
        },
    },

    // ----------------------------------------
    // 二星珠：距离-1
    // ----------------------------------------
    dragonball_2_skill: {
        mod: {
            globalFrom: function (from, to, distance) {
                if (getDragonBalls(from).some(b => b.num === 2)) {
                    return distance - 1;
                }
            },
        },
    },

    // ----------------------------------------
    // 三星珠：回合结束时摸1张
    // ----------------------------------------
    dragonball_3_skill: {
        trigger: { player: 'phaseEnd' },
        forced: true,
        filter: function (event, player) {
            return getDragonBalls(player).some(b => b.num === 3);
        },
        content: async function (event, trigger, player) {
            await player.draw();
        },
    },

    // ----------------------------------------
    // 四星珠：杀造成伤害后摸1张
    // ----------------------------------------
    dragonball_4_skill: {
        trigger: { source: 'damageEnd' },
        forced: true,
        filter: function (event, player) {
            if (!event.card || event.card.name !== 'sha') return false;
            if (!getDragonBalls(player).some(b => b.num === 4)) return false;
            return true;
        },
        content: async function (event, trigger, player) {
            await player.draw();
        },
    },


    // ----------------------------------------
    // 五星珠： 红色杀无次数限制
    // ----------------------------------------
    dragonball_5_skill: {
        mod: {
            cardUsable(card, player) {
                const suit = get.suit(card);
                if (suit == "heart" && card.name == 'sha')
                    return Infinity;
            },
        },
    },

    // ----------------------------------------
    // 六星珠：其他角色距离+1
    // ----------------------------------------
    dragonball_6_skill: {
        mod: {
            globalTo: function (from, to, distance) {
                if (getDragonBalls(to).some(b => b.num === 6)) {
                    return distance + 1;
                }
            },
        },
    },

    // ----------------------------------------
    // 七星珠：手牌上限+1
    // ----------------------------------------
    dragonball_7_skill: {
        mod: {
            maxHandcard: function (player, num) {
                if (getDragonBalls(player).some(b => b.num === 7)) {
                    return num + 1;
                }
            },
        },
    },

    // ----------------------------------------
    // 抢夺龙珠 - 受伤时
    // ----------------------------------------
    dragonball_transfer: {
        trigger: { player: 'damageEnd' },
        forced: true,
        priority: 5,
        filter: function (event, player) {
            if (getDragonBalls(player).length === 0) return false;
            if (!event.source) return false;
            if (event.source === player) return false;
            return true;
        },
        content: async function (event, trigger, player) {
            const balls = getDragonBalls(player);
            if (balls.length === 0) return;

            const source = trigger.source;
            const damageNum = trigger.num;
            const transferCount = Math.min(damageNum, balls.length);

            for (let i = 0; i < transferCount; i++) {
                const randomIndex = Math.floor(Math.random() * balls.length);
                const ballInfo = balls.splice(randomIndex, 1)[0];
                await transferDragonBall(player, source, ballInfo);
            }
            game.delay(1);// 等待龙珠转移完成 时间单位：秒
            await checkAndTriggerWish(source);
        },
    },

    // ----------------------------------------
    // 龙珠转移 - 死亡时
    // ----------------------------------------
    dragonball_die: {
        trigger: { player: 'dieBefore' },  // 改为 dieBefore，死亡的Before        
        forced: true,
        priority: 100,
        filter: function (event, player) {
            return getDragonBalls(player).length > 0;
        },
        content: async function (event, trigger, player) {
            const balls = getDragonBalls(player);
            if (balls.length === 0) return;

            const source = trigger.source;

            if (source && source !== player) {
                for (const ball of balls) {
                    await transferDragonBall(player, source, ball);
                }
                game.log(player, '的所有龙珠转移给了', source);

            } else {
                await redistributeDragonBalls(player, balls, event);
            }
            await checkAndTriggerWish(source);
        },
    },
    dragonball_init: {
        trigger: {
            global: "phaseBefore"
        },
        filter(event, player) {
            // 只在游戏开始第一回合触发一次
            return game.phaseNumber === 0 && !_status.dragonball_initialized;
        },
        forced: true,
        firstDo: true,  // 最先执行
        content: async function (event, trigger, player) {
            _status.dragonball_initialized = true;
            game.log('龙珠初始化开始');
            await distributeAllDragonBalls();
            game.log('龙珠初始化完成');
        },
    },
};

// --------------------------------------------
// 五、翻译定义
// --------------------------------------------
const translate = {
    dragonball: '龙珠',
    dragonball_skill: '龙珠',
    dragonball_skill_info: '集齐七颗龙珠可许愿',

    dragonball_1: '一星',
    dragonball_1_skill: '一星',
    dragonball_1_skill_info: '锁定技，摸牌阶段多摸1张牌',

    dragonball_2: '二星',
    dragonball_2_skill: '二星',
    dragonball_2_skill_info: '锁定技，你与其他角色的距离-1',

    dragonball_3: '三星',
    dragonball_3_skill: '三星',
    dragonball_3_skill_info: '锁定技，回合结束阶段摸1张牌',

    dragonball_4: '四星',
    dragonball_4_skill: '四星',
    dragonball_4_skill_info: '锁定技，使用【杀】造成伤害后摸1张牌',

    dragonball_5: '五星',
    dragonball_5_skill: '五星',
    dragonball_5_skill_info: '锁定技，红色杀无次数限制',

    dragonball_6: '六星',
    dragonball_6_skill: '六星',
    dragonball_6_skill_info: '锁定技，其他角色与你距离+1',

    dragonball_7: '七星',
    dragonball_7_skill: '七星',
    dragonball_7_skill_info: '锁定技，手牌上限+1',

    dragonball_transfer: '龙珠(改)',
    dragonball_transfer_info: '锁定技，受到有伤害来源的伤害时，伤害来源获得你拥有的1颗随机龙珠',

    dragonball_die: '龙珠(亡)',
    dragonball_die_info: '锁定技，死亡时，你拥有的所有龙珠转移给伤害来源',

    dragonball_revival: '复活',
    dragonball_revival_info: '令一名已死亡的角色复活',

    dragonball_kill: '毁灭',
    dragonball_kill_info: '令一名存活的角色死亡',

    shenlong: '神龙',
    shenlong_info: '出牌阶段使用。你获得所有角色区域中的所有龙珠，然后你可以许愿。',
};

// --------------------------------------------
// 六、卡牌列表
// --------------------------------------------
const list = [
    ['spade', 1, 'shenlong'],
];

// --------------------------------------------
// 七、图片路径设置
// --------------------------------------------
for (let i in card) {
    if (!card[i].cardimage) {
        card[i].image = "ext:民间卡牌/image/card/dragonball/" + i + ".png";
    }
}

// --------------------------------------------
// 八、导出模块
// --------------------------------------------
game.import("card", function () {
    return {
        name: "dragonball",
        card,
        skill,
        translate,
        list,
    };
});
