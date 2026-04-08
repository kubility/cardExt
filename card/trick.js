import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

const card = {
	bxyr_dandaofuhui: {
		audio: true,
		fullskin: true,
		type: 'trick',
		ai: {
			basic: {
				useful: [10, 7.5],
				value: [10, 7.5]
			}
		}
	},
	bxyr_guaguliaodu: {
		audio: true,
		fullskin: true,
		enable: true,
		type: 'trick',
		filterTarget: true,
		content: async function (event, trigger, player) {
			await event.target.recover();
			await player.damage(1, event.target);
		},
		ai: {
			basic: {
				order: 4.1,
				useful: 1,
				value: 3,
			},
			result: {
				player: function (player, target) {
					return ai.get.damageEffect(player, target, player);
				},
				target: function (player, target) {
					return ai.get.recoverEffect(target, player, player);
				}
			}
		},
		tag: {
			recover: 1,
			damage: 1,
		}
	},
	bxyr_huangjinqiyi: {
		audio: 'ext:民间卡牌/audio/card/trick:1',
		audioname: 'bxyr_huangjinqiyi_male',
		fullskin: true,
		enable: true,
		type: 'trick',
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return player == target;
		},
		content: async function (event, trigger, player) {
			event.target.showHandcards();
			if (event.target.num('h', { name: 'shan' }) <= 0) {
				await event.target.draw(3);
			}
		},
		ai: {
			basic: {
				order: 7.1,
				useful: 1,
				value: function (event, player) {
					if (!player.num('h', { name: 'shan' })) return 10;
					return 2.9;
				}
			},
			result: {
				target: function (player) {
					if (!player.num('h', { name: 'shan' })) return 1;
					return 0;
				}
			}
		},
		tag: {
			draw: 3
		}
	},
	bxyr_huoshaochibi: {
		audio: true,
		fullskin: true,
		enable: true,
		type: 'trick',
		filterTarget: function (card, player, target) {
			if (player == target) return false;
			return target.num('hej') >= 0;
		},
		content: async function (event, trigger, player) {
			for (const target of event.targets) {
				const result = await target.judge(function (card) {
					if (get.color(card) == 'red' && !target.hasSkillTag('nofire')) return -6;
					return 0;
				});
				if (result.bool == false) {
					await target.damage(1, 'fire');
				}
			}
		},
		ai: {
			wuxie: function (target, card, player, viewer) {
				if (ai.get.attitude(viewer, target) > 0 && target.hasSkillTag('nofire')) {
					if (target.hp == 1 || Math.random() < 0.7) return 0;
				}
			},
			basic: {
				order: 9,
				useful: 1,
				value: 4,
			},
			result: {
				target: function (player, target) {
					let num = 0;
					for (let i = 0; i < game.players.length; i++) {
						if (game.players[i].ai.shown == 0) num++;
					}
					if (num > 1) return 0;
					let nh = target.hp;
					if (get.mode() == 'identity') {
						if (target.isZhu && nh <= 1 && !target.hasSkillTag('nofire')) return -100;
					}
					if (get.mode() == 'guozhan') {
						if (target.identity == player.identity && nh <= 1 && !target.hasSkillTag('nofire')) return -3;
					}
					if (nh == 1 && !target.hasSkillTag('nofire')) return -1.7;
					if (nh != 1 && !target.hasSkillTag('nofire')) return -1.3;
					return 0;
				},
			},
			tag: {
				respond: 1,
				damage: 1,
				fireDamage: 1,
				natureDamage: 1,
				multitarget: 1,
				multineg: 1,
			}
		},
	},
	bxyr_touxi: {
		fullskin: true,
		type: 'trick',
		selectTarget: 1,        // 添加：选择1个目标
		filterTarget: function (card, player, target) {
			return player != target && target.num('h') > 0;  // 添加：目标必须有手牌
		},
		content: async function (event, trigger, player) {
			if (event.target.num('h')) {
				await player.gainPlayerCard('h', event.target, true);
			}
		},
		ai: {
			order: 1,
			useful: 6,
			value: 6,
			result: {
				target: -1
			},
			tag: {
				loseCard: 1
			}
		}
	},
	bxyr_wangmeizhike: {
		audio: 'ext:民间卡牌/audio/card/trick:2',
		audioname: ['bxyr_wangmeizhike_female', 'bxyr_wangmeizhike_male'],
		fullskin: true,
		enable: true,
		type: 'trick',
		filterTarget: true,
		content: async function (event, trigger, player) {
			const result = await event.target.judge(function (card) {
				if (get.suit(card) == 'club' && event.target.hp < event.target.maxHp) return 9;
				if (get.suit(card) == 'club' && event.target.hp >= event.target.maxHp) return 0;
				return 1;
			});
			if (result.suit == 'club') {
				await event.target.recover();
			}
			if (result.suit != 'club') {
				await event.target.draw();
			}
		},
		ai: {
			basic: {
				useful: 3,
				value: 1,
				order: 9,
			},
			result: {
				target: function (player, target) {
					if (target.hp < target.maxHp) return target.maxHp - target.hp;
					return 0.5;
				},
			},
			tag: {
				draw: 1,
			},
		},
	},
	bxyr_xianzhen: {
		audio: true,
		fullskin: true,
		enable: true,
		type: 'trick',
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return target != player;
		},
		modTarget: true,
		content: async function (event, trigger, player) {
			if (event.target.num('hej')) {
				await player.discardPlayerCard('hej', event.target, true);
			}
		},
		ai: {
			basic: {
				order: 9,
				useful: 1,
				value: 6,
			},
			result: {
				target: function (player, target) {
					let es = target.get('e');
					let nh = target.num('h');
					let noe = (es.length == 0 || target.hasSkillTag('noe'));
					let noe2 = (es.length == 1 && es[0].name == 'baiyin' && target.hp < target.maxHp);
					let noh = (nh == 0 || target.hasSkillTag('noh'));
					if (noh && noe) return 0;
					if (noh && noe2) return 0.01;
					if (ai.get.attitude(player, target) <= 0) return (target.num('he')) ? -1.5 : 1.5;
					let js = target.get('j');
					if (js.length) {
						let jj = js[0].viewAs ? { name: js[0].viewAs } : js[0];
						if (jj.name == 'guohe') return 3;
						if (js.length == 1 && ai.get.effect(target, jj, target, player) >= 0) {
							return -1.5;
						}
						return 2;
					}
					return -1.5;
				},
			},
			tag: {
				loseCard: 1,
			}
		}
	},
	bxyr_xiejiaguitian: {
		fullskin: true,
		enable: true,
		type: 'trick',
		filterTarget: true,
		content: async function (event, trigger, player) {
			const cards = event.target.get('e').randomGets(Infinity);
			if (cards && cards.length > 0) {
				await event.target.discard(cards);
			}
		},
		ai: {
			basic: {
				useful: 1,
				value: 5,
				order: 10,
			},
			result: {
				target: function (player, target) {
					let value = 0;
					const cards = target.get('e');
					for (let i = 0; i < cards.length; i++) {
						value += ai.get.value(cards[i]);
					}
					return -value;
				},
			},
		},
	},
	bxyr_yeguantianxiang: {
		fullskin: true,
		enable: true,
		type: 'trick',
		filterTarget: function (card, player, target) {
			if (player == target) return false;
			return (target.num('h') > 0);
		},
		content: async function (event, trigger, player) {
			await player.viewCards('夜观天象', event.target.get('h'));
		},
		ai: {
			basic: {
				value: 2,
				order: 10,
			},
			result: {
				target: function (player, target) {
					const nh = target.num('h');
					if (!nh) return 0;
					if (nh >= 2) return -nh;
					return -1;
				},
			},
		},
	},
	bxyr_bamenjinsuo: {
		fullskin: true,
		type: 'delay',
		enable: function (card, player) {
			return lib.filter.judge(card, player, player);
		},
		filterTarget: function (card, player, target) {
			return lib.filter.judge(card, player, target) && player != target;
		},
		judge: function (card) {
			return get.suit(card) != 'diamond' ? -3 : 0;
		},
		effect: function (result) {
			if (result.judge < 0) player.addTempSkill('bxyr_bamenjinsuo', 'phaseAfter');
		},
		ai: {
			basic: {
				order: 1,
				useful: 0.5,
				value: 3,
			},
			result: {
				target: function (player, target) {
					let num = target.hp - target.num('h') - 2;
					if (num > -1) return -0.01;
					if (target.hp < 3) num--;
					if (target.isTurnedOver()) num /= 2;
					let dist = get.distance(player, target, 'absolute');
					if (dist < 1) dist = 1;
					return num / Math.sqrt(dist);
				}
			},
			tag: {
				globalFrom: Infinity
			}
		}
	},
	bxyr_shidu: {
		audio: true,
		fullskin: true,
		type: 'delay',
		enable: function (card, player) {
			return (lib.filter.judge(card, player, player));
		},
		filterTarget: function (card, player, target) {
			return (lib.filter.judge(card, player, target) && player != target);
		},
		judge: function (card) {
			if (get.suit(card) == 'spade' || get.suit(card) == 'club') return -3;
			return 0;
		},
		effect: function (result) {
			if (result.judge < 0) player.damage(1, 'poison', 'nosource');
		},
		ai: {
			basic: {
				order: 1,
				useful: 0.5,
				value: 4,
			},
			result: {
				target: function (player, target) {
					if (target.hp < 3 && !target.hasSkillTag('nopoison')) return target.hp - 5;
					if (!target.hasSkillTag('nopoison')) return -1;
					return 0;
				},
			},
			tag: {
				damage: 1,
				poisonDamage: 1,
			},
		},
	},
};

const skill = {
	_bxyr_dandaofuhui: {
		trigger: {
			global: 'damageBefore',
		},
		forced: true,
		priority: -Infinity,
		filter: function (event, player) {
			if (!event.player.isAlive()) return false; //目标玩家死亡
			if (player != _status.currentPhase) return false; //玩家不是当前回合玩家
			if (get.distance(player, event.player, 'attack') > 1) return false; //距离在攻击范围内
			if (player.num('h', 'bxyr_dandaofuhui')) return true; //手牌有单刀赴会
			const equip = player.get('e', '5');
			return equip && equip.name == 'muniu' && equip.cards && equip.cards.some(card => card.name == 'bxyr_dandaofuhui'); //木牛流马里有单刀赴会
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseToRespond({ name: 'bxyr_dandaofuhui' }, '单刀赴会：是否打出一张单刀赴会' + '防止' + get.translation(trigger.player) + '受到的伤害').set('ai', function (card) {
				const player = _status.event.player;
				if (trigger.num > 0 && ai.get.attitude(player, trigger.player) > 0) return 1;
				return 0;
			}).forResult();
			if (result.bool) {
				trigger.cancel();

			}
		},
	},
	_bxyr_touxi: {
		trigger: { global: 'phaseEnd' },
		direct: true,
		filter: function (event, player) {
			if (event.player == player) return false;
			if (get.distance(player, event.player, 'attack') > 1) return false;
			if (!event.player.num('h')) return false;
			if (player.num('h', 'bxyr_touxi')) return true;
			const equip = player.get('e', '5');
			return equip && equip.name == 'muniu' && equip.cards && equip.cards.some(card => card.name == 'bxyr_touxi');
		},
		content: async function (event, trigger, player) {
			await player.chooseToUse(get.prompt('bxyr_touxi', trigger.player), function (card, player) {
				if (card.name != 'bxyr_touxi') return false;
				return true;
			}, trigger.player);
		}
	},
	bxyr_bamenjinsuo: {
		mod: {
			globalFrom: function (from, to, distance) {
				return distance + Infinity;
			}
		}
	},
};

const translate = {
	bxyr_dandaofuhui_bg: '赴',
	bxyr_dandaofuhui: '单刀赴会',
	bxyr_guaguliaodu_bg: '刮',
	bxyr_guaguliaodu: '刮骨疗毒',
	bxyr_huangjinqiyi_bg: '起',
	bxyr_huangjinqiyi: '黄巾起义',
	bxyr_huoshaochibi_bg: '烧',
	bxyr_huoshaochibi: '火烧赤壁',
	bxyr_touxi_bg: '襲',
	bxyr_touxi: '偷袭',
	bxyr_wangmeizhike_bg: '梅',
	bxyr_wangmeizhike: '望梅止渴',
	bxyr_xianzhen_bg: '陷',
	bxyr_xianzhen: '陷阵',
	bxyr_xiejiaguitian_bg: '卸',
	bxyr_xiejiaguitian: '卸甲归田',
	bxyr_yeguantianxiang: '觀',
	bxyr_yeguantianxiang: '夜观天象',
	bxyr_bamenjinsuo_bg: '锁',
	bxyr_bamenjinsuo: '八门金锁',
	bxyr_shidu_bg: '施',
	bxyr_shidu: '施毒',
	bxyr_dandaofuhui_info: '你的回合外，当你攻击范围内的任意一名角色受到伤害时，你可以打出此牌防止该伤害。',
	bxyr_guaguliaodu_info: '出牌阶段，对任意一名角色使用，该角色回复一点体力，并对你造成一点伤害。',
	bxyr_huangjinqiyi_info: '出牌阶段，对你使用，你展示手牌，若手牌中没有闪，你摸三张牌',
	bxyr_huoshaochibi_info: '出牌阶段，对所有其他角色使用，每名目标角色各进行一次判定，结果为红色受到一点火属性伤害',
	bxyr_touxi_info: '当你攻击范围内一名其他角色的回合结束时，对其使用，你获得其一张手牌。',
	bxyr_wangmeizhike_info: '出牌阶段，对任意一名角色使用该角色立即判定，若结果为♣，则目标回复一点体力，若不是♣，摸一张牌',
	bxyr_xianzhen_info: '出牌阶段，对所有其他角色使用，由你弃掉每名目标角色区域里的一张牌',
	bxyr_xiejiaguitian_info: '出牌阶段，对一名角色使用，目标弃置装备区里的所有牌',
	bxyr_yeguantianxiang_info: '出牌阶段，对除你以外的任意一名有手牌的角色使用，你立即观看一次目标的手牌。',
	bxyr_bamenjinsuo_info: '出牌阶段，对除你以外的任意一名角色使用。将【八门金锁】置于该角色判定区里，若判定结果不为♦则该角色自己的当前回合与所有其它角色距离无限',
	bxyr_shidu_info: '出牌阶段，对除你以外的任意一名角色使用。将【施毒】置于该角色判定区里，若判定结果为♠♣则该角色受到一点毒伤害，弃置它，若判定结果为♥♦，则直接弃置它',
	_bxyr_dandaofuhui: '单刀赴会',
	_bxyr_dandaofuhui_info: '你的回合外，当你攻击范围内的任意一名角色受到伤害时，你可以打出此牌防止该伤害',
	_bxyr_touxi: '偷袭',
	_bxyr_touxi_info: '当你攻击范围内一名其他角色的回合结束时，你可以对其使用偷袭，获得其一张手牌',
	bxyr_bamenjinsuo_skill: '八门金锁',
	bxyr_bamenjinsuo_skill_info: '锁定技，该角色自己的当前回合与所有其它角色距离无限',
};

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const cardNames = [
	'bxyr_dandaofuhui',
	'bxyr_wangmeizhike',
	'bxyr_huoshaochibi',
	'bxyr_xiejiaguitian',
	'bxyr_guaguliaodu',
	'bxyr_bamenjinsuo',
	'bxyr_shidu',
	'bxyr_huangjinqiyi',
	'bxyr_xianzhen',
	'bxyr_yeguantianxiang',
	'bxyr_touxi',
];
const cardNature = {
	bxyr_huoshaochibi: 'fire',
	bxyr_shidu: 'poison',
};

const list = [];
for (const name of cardNames) {
	const count = Math.floor(Math.random() * 5) + 1;
	for (let i = 0; i < count; i++) {
		const suit = suits[Math.floor(Math.random() * 4)];
		const number = numbers[Math.floor(Math.random() * 13)];
		const item = [suit, number, name];
		if (cardNature[name]) item.push(cardNature[name]);
		list.push(item);
	}
}

// 为卡牌设置图片路径
for (let i in card) {
	if (!card[i].cardimage) {
		card[i].image = "ext:民间卡牌/image/card/trick/" + i + ".png";
	}
}


game.import("card", function () {
	return {
		name: "trick",
		card,
		skill,
		translate,
		list,
	};
});
