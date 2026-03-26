import { lib, game, ui, get, ai, _status } from "../lib/utils.js";


const card = {
	bxyr_dutao: {
		audio: true,
		fullskin: true,
		type: 'basic',
		content: async function(event, trigger, player) {
			if (!event.targets || !event.targets[0]) return;
			await event.targets[0].damage(1, 'poison');
		},
		ai: {
			basic: {
				useful: 3,
				value: 4,
				order: 1,
			},
			result: {
				target: (player, target) => {
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
	bxyr_liang: {
		audio: true,
		fullskin: true,
		type: 'basic',
		enable: true,
		content: async function(event, trigger, player) {
			if (!event.targets || !event.targets[0]) return;
			await event.targets[0].draw();
			event.targets[0].addTempSkill('bxyr_liang_effect', 'phaseEnd');
		},
		ai: {
			basic: {
				order: 1,
				useful: 0.4,
				value: (card, player) => {
					if (player.num('h') > player.getHandcardLimit()) {
						return player.num('h') - player.getHandcardLimit() + player.num('h') / 2 + 1;
					}
					return player.num('h');
				},
			},
			result: {
				target: 1,
			},
			tag: {
				draw: 1,
			},
		},
	},
	bxyr_zhan: {
		audio: true,
		fullskin: true,
		type: 'basic',
		enable: true,
		filterTarget: function(card, player, target) {
			return player != target;
		},
		mod: {
			targetInRange: function(card, player, target, now) {
				if (card.name === 'sha') return true;
			},
		},
		content: async function(event, trigger, player) {
			if (!event.targets || !event.targets[0]) return;
			const result = await event.targets[0].chooseToRespond((card) => {
				return card.name == 'shan';
			}, '战：请打出一张闪，否则受到一点伤害').forResult();
			if (!result.bool) {
				await event.targets[0].loseMaxHp();
			}
		},
		ai: {
			basic: {
				order: 1,
				value: 4,
				useful: 2,
			},
			result: {
				target: (player, target) => {
					return get.damageEffect(target, player, player);
				},
			},
			tag: {
				damage: 1,
			},
		},
	},
	bxyr_su: {
		audio: true,
		fullskin: true,
		type: 'basic',
		enable: true,
		filterTarget: function(card, player, target) {
			if (target.hp >= target.maxHp) return false;
			return true;
		},
		selectTarget: [1, 2],
		content: async function(event, trigger, player) {
			if (!event.targets || event.targets.length === 0) return;
			for (const target of event.targets) {
				await target.recover();
			}
		},
		ai: {
			basic: {
				order: 3,
				useful: 3,
				value: 8,
			},
			result: {
				target: function(player, target) {
					if (target.hp < 5) return 5 - target.hp;
					return 1;
				},
			},
			tag: {
				recover: 1,
			}
		}
	},
	bxyr_dusha: {
		audio: true,
		fullskin: true,
		type: 'basic',
		enable: true,
		filterTarget: function(card, player, target) {
			return player != target;
		},
		mod: {
			targetInRange: function(card, player, target, now) {
				if (card.name === 'sha') return true;
			},
		},
		content: async function(event, trigger, player) {
			if (!event.targets || !event.targets[0]) return;
			const target = event.targets[0];
			const result = await target.chooseToRespond((card) => {
				return card.name == 'shan';
			}, '毒杀：请打出一张闪，否则受到1点毒属性伤害').forResult();
			if (!result.bool) {
				await target.damage(1, 'poison');
				target.addSkill('bxyr_zhongdu');
				if (!target.storage.bxyr_zhongdu) {
					target.storage.bxyr_zhongdu = 0;
				}
				target.storage.bxyr_zhongdu++;
			}
		},
		ai: {
			basic: {
				order: 5,
				value: 5,
				useful: 3,
			},
			result: {
				target: (player, target) => {
					if (target.hasSkillTag('nopoison')) return 0;
					return get.damageEffect(target, player, player, 'poison') - 0.5;
				},
			},
			tag: {
				damage: 1,
				poisonDamage: 1,
			},
		},
	},
	bxyr_ansha: {
		audio: true,
		fullskin: true,
		type: 'basic',
		enable: true,
		filterTarget: function(card, player, target) {
			return player != target && player.inRange(target);
		},
		mod: {
			targetInRange: function(card, player, target, now) {
				if (card.name === 'bxyr_ansha') return true;
			},
		},
		content: async function(event, trigger, player) {
			if (!event.targets || !event.targets[0]) return;
			const target = event.targets[0];
			const isFirstCard = !player.storage.bxyr_ansha_used;
			
			if (isFirstCard) {
				player.storage.bxyr_ansha_used = true;
				if (!target.num('e', 'equip2')) {
					await target.damage(2, 'dark');
				} else {
					await target.damage(1, 'dark');
					const equip = target.get('e', 'equip2');
					if (equip) {
						await target.discard(equip);
					}
				}
			} else {
				const result = await target.chooseToRespond((card) => {
					return card.name == 'shan';
				}, '暗杀：请打出一张闪').forResult();
				if (!result.bool) {
					if (!target.num('e', 'equip2')) {
						await target.damage(1, 'dark');
					} else {
						const equip = target.get('e', 'equip2');
						if (equip) {
							await target.discard(equip);
						}
					}
				}
			}
		},
		ai: {
			basic: {
				order: 1,
				value: 6,
				useful: 3,
			},
			check: function(card, player) {
				if (!player.storage.bxyr_ansha_used) {
					return true;
				} else {
					const targets = game.filterPlayer(function(target) {
						return player != target && player.inRange(target);
					});
					for (let i = 0; i < targets.length; i++) {
						const target = targets[i];
						if (!target.num('e', 'equip2')) {
							return true;
						}
					}
					return false;
				}
			},
			result: {
				target: (player, target) => {
					if (!player.storage.bxyr_ansha_used) {
						if (!target.num('e', 'equip2')) {
							return get.damageEffect(target, player, player, 'dark') * 2;
						} else {
							return get.damageEffect(target, player, player, 'dark') + 1;
						}
					} else {
						if (!target.num('e', 'equip2')) {
							return get.damageEffect(target, player, player, 'dark');
						} else {
							return 0;
						}
					}
				},
			},
			tag: {
				damage: 1,
				darkDamage: 1,
			},
		},
	},
	bxyr_cisha: {
		audio: true,
		fullskin: true,
		type: 'basic',
		enable: true,
		filterTarget: function(card, player, target) {
			return player != target && player.inRange(target);
		},
		mod: {
			targetInRange: function(card, player, target, now) {
				if (card.name === 'bxyr_cisha') return true;
			},
		},
		content: async function(event, trigger, player) {
			if (!event.targets || !event.targets[0]) return;
			const target = event.targets[0];
			
			if (target.num('h') > 1 && target.num('h', 'shan') > 0) {
				const discardResult = await target.chooseToDiscard('是否弃置一张手牌来使用闪？','h',true).forResult();
				if (discardResult.bool) {
					await target.discard(discardResult.cards);
					const respondResult = await target.chooseToRespond((card) => {
						return card.name == 'shan';
					}, '刺杀：请打出一张闪').forResult();
					if (!respondResult.bool) {
						await target.damage();
					}
				} else {
					await target.damage();
				}
			} else {
				await target.damage();
			}
		},
		ai: {
			basic: {
				order: 1,
				value: 5,
				useful: 2.5,
			},
			result: {
				target: (player, target) => {
					if (target.num('h') > 0) {
						return get.damageEffect(target, player, player) * 0.8;
					} else {
						return get.damageEffect(target, player, player);
					}
				},
			},
			tag: {
				damage: 1,
			},
		},
	},
	
};

const skill = {
	bxyr_zhongdu: {
		mark: true,
		markimage: 'extension/民间卡牌/image/card/mark/bxyr_shidu.png',
		intro: {
			content: function(storage, player) {
				const count = player.storage.bxyr_zhongdu || 0;
				return '当前有' + count + '层中毒，回合结束时将失去' + count + '点体力';
			}
		},
		trigger: { player: 'phaseEnd' },
		forced: true,
		filter: function(event, player) {
			return player.storage.bxyr_zhongdu && player.storage.bxyr_zhongdu > 0;
		},
		content: async function(event, trigger, player) {
			player.logSkill('bxyr_zhongdu');
			await player.loseHp(player.storage.bxyr_zhongdu);
			delete player.storage.bxyr_zhongdu;
			player.removeSkill('bxyr_zhongdu');
		},
		ai: {
			effect: {
				target: function(card, player, target, current) {
					if (target.hasSkillTag('nopoison')) return [0, 0];
					if (get.tag(card, 'poisonDamage')) return [0, -1];
				}
			}
		}
	},
	bxyr_liang_effect: {
		mod: {
			maxHandcard: function(player, num) {
				return num + Infinity;
			},
		},
	},
	_bxyr_liang: {
		trigger: { player: 'phaseDiscardBefore' },
		direct: true,
		filter: function(event, player) {
			if (!event.player.isAlive()) return false;
			if (player.num('h', 'bxyr_liang')) return true;
			let mn = player.get('e', '5');
			if (mn && mn.name == 'muniu' && mn.cards && mn.cards.length) {
				for (let i = 0; i < mn.cards.length; i++) {
					if (mn.cards[i].name == 'bxyr_liang') return true;
				}
			}
			return false;
		},
		content: async function(event, trigger, player) {
			await player.chooseToUse('是否对' + get.translation(trigger.player) + '使用粮？', function(card, player) {
				if (card.name != 'bxyr_liang') return false;
				return true;
			}, trigger.player, -1);
		}
	},
	_bxyr_loseMaxHp: {
		trigger: { player: 'loseMaxHpBefore' },
		forced: true,
		popup: false,
		silent: true,
		content: async function(event, trigger, player) {
			player.logSkill('bxyr_loseMaxHp');
		}
	},
	bxyr_loseMaxHp: {
		audio: true,
		audio: 'ext:民间卡牌/audio/card:1',
		audioname: 'bxyr_loseMaxHp',
	},
	_bxyr_dutao: {
		trigger: { global: 'dying' },
		priority: 200,
		direct: true,
		filter: function(event, player) {
			if (!event.player.isAlive()) return false;
			if (player.num('h', 'bxyr_dutao')) return true;
			let mn = player.get('e', '5');
			if (mn && mn.name == 'muniu' && mn.cards && mn.cards.length) {
				for (let i = 0; i < mn.cards.length; i++) {
					if (mn.cards[i].name == 'bxyr_dutao') return true;
				}
			}
			return false;
		},
		content: async function(event, trigger, player) {
			await player.chooseToUse('是否给' + get.translation(trigger.player) + '吃毒桃？', function(card, player) {
				if (card.name != 'bxyr_dutao') return false;
				return true;
			}, trigger.player, -1);
		}
	},
	_bxyr_ansha: {
		trigger: { player: 'phaseBegin' },
		forced: true,
		content: async function(event, trigger, player) {
			delete player.storage.bxyr_ansha_used;
		},
	},
};

const translate = {
	bxyr_dutao: '毒桃',
	bxyr_dutao_info: '令一名目标角色受到1点毒属性伤害',
	bxyr_liang: '粮',
	bxyr_liang_info: '目标角色摸一张牌，然后获得技能"粮"：出牌阶段结束时，若手牌数大于手牌上限，弃置多余的牌',
	bxyr_zhan: '斩',
	bxyr_zhan_info: '对目标角色使用，目标角色需打出一张闪，否则受到1点伤害',
	bxyr_su: '酥',
	bxyr_su_info: '出牌阶段，对一至两名目标角色使用，目标角色回复1点体力',
	bxyr_cisha: '刺杀',
	bxyr_cisha_info: '出牌阶段，对你攻击范围内一名其他角色使用。目标角色须先弃置一张手牌，才能使用【闪】响应此【杀】；若其不弃置手牌，则不可使用【闪】，直接受到此【杀】的伤害。',
	bxyr_liang_effect: '粮',
	bxyr_liang_effect_info: '出牌阶段结束时，若手牌数大于手牌上限，弃置多余的牌',
	_bxyr_liang: '粮',
	_bxyr_liang_info: '出牌阶段，你可以对一名角色使用粮',
	_bxyr_loseMaxHp: '失去体力上限',
	bxyr_loseMaxHp: '失去体力上限',
	_bxyr_dutao: '毒桃',
	_bxyr_dutao_info: '当一名角色进入濒死状态时，你可以对其使用毒桃，令其受到1点毒属性伤害',
	bxyr_dusha: '毒杀',
	bxyr_dusha_info: '出牌阶段，对你攻击范围内一名角色使用。目标需打出【闪】响应，否则受到1点毒属性伤害。若此【杀】造成伤害，目标获得1层"中毒"：其下一回合结束时，失去1点体力。',
	bxyr_ansha: '暗杀',
	bxyr_ansha_info: '出牌阶段，对你攻击范围内一名角色使用。若此【暗杀】是你本回合使用的第一张牌：此【暗杀】不可被【闪】响应。目标没有防具：对其造成2点暗属性伤害。目标有防具：对其造成1点暗属性伤害，并弃置其防具区一张防具牌。若此【暗杀】不是本回合第一张牌：此【暗杀】可被【闪】响应。若未被【闪】抵消：目标没有防具：对其造成1点暗属性伤害。目标有防具：弃置其防具区一张防具牌，此【暗杀】不造成伤害。',
	_bxyr_ansha: '暗杀',
	_bxyr_ansha_info: '出牌阶段开始时，重置暗杀使用标记',
	bxyr_zhongdu: '中毒',
	bxyr_zhongdu_info: '回合结束时，失去1点体力',
};

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const cardNames = ['bxyr_dutao', 'bxyr_liang', 'bxyr_zhan', 'bxyr_su', 'bxyr_dusha', 'bxyr_ansha', 'bxyr_cisha'];
const cardNature = {
	bxyr_dusha: 'poison',
	bxyr_ansha: 'dark',
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
		card[i].image = "ext:民间卡牌/image/card/basic/" + i + ".png";
	}
}

game.import("card", function () {
	return {
		name: "basic",
		card,
		skill,
		translate,
		list,
	};
});
