import { lib, game, ui, get, ai, _status } from "../lib/utils.js";


const card = {
	diy_dao: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_dao'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_qiang: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['diy_qiang'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_jian: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_jian'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_ji: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -5 },
		skills: ['diy_ji'],
		ai: {
			basic: {
				equipValue: 7
			}
		}
	},
	diy_fu: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_fu'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_yue: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['diy_yue'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_gou: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_gou'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_cha: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['diy_cha'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_bian: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_bian'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_jian2: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_jian2'],
		onLose: function () {
			player.storage.diy_jian2_targets = [];
			player.storage.diy_jian2_shaCount = 0;
		},
		ai: {
			basic: {
				equipValue: 7
			}
		}
	},
	diy_chui: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_chui'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_zhua: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_zhua'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_tang: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_tang'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_gun: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_gun'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	diy_shuo: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['diy_shuo'],
		ai: {
			basic: {
				equipValue: 7
			}
		}
	},
	diy_bang: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_bang'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_guai: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['diy_guai'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	diy_liuxingchui: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['diy_liuxingchui'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
};

const skill = {
	diy_dao: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_dao') && player.countCards('h') > 0;
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseCard('h', true, '请弃置一张牌，令你使用的杀不可被闪避').forResult();
			if (result.bool) {
				await player.discard(result.cards);
				trigger.directHit = true;
			}
		},
		ai: {
			order: 9,
			result: {
				player: (player, trigger) => {
					if (player.countCards('h') <= 1) return 0;
					const target = trigger.target;
					if (!target) return 0;
					if (target.countCards('h', 'shan') > 0) return 1;
					if (get.attitude(player, target) < 0 && target.hp <= 1) return 1;
					return 0;
				}
			}
		}
	},

	diy_qiang: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_qiang');
		},
		content: function (event, trigger, player) {
			trigger.baseDamage++;
		},
		mod: {
			targetInRange: function (card, player, target) {
				if (card.name == 'sha' && player.getEquip('diy_qiang') && get.distance(player, target, 'pure') === 1) {
					return false;
				}
			}
		},
		ai: {
			direct: true
		}
	},

	diy_jian: {
		trigger: { player: 'shaMiss' },
		forced: true,
		filter: function (event, player) {
			return player.getEquip('diy_jian') && player.countCards('h', 'sha') > 0;
		},
		content: async function (event, trigger, player) {
			const target = trigger.target;
			if (target && target.isAlive() && player.canUse('sha', target)) {
				const sha = player.getCards('h', 'sha')[0];
				if (sha) {
					await player.useCard(sha, target);
				}
			}
		},
		ai: {
			direct: true
		}
	},

	diy_ji: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_ji');
		},
		content: function (event, trigger, player) {
			if (trigger.targets.length === 1) {
				trigger.directHit = true;
			}
		},
		mod: {
			selectTarget: function (card, player, range) {
				if (card.name == 'sha' && player.getEquip('diy_ji')) {
					range[1] = 2;
				}
			}
		},
		ai: {
			direct: true
		}
	},

	diy_fu: {
		trigger: { source: 'damageEnd' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_fu');
		},
		content: async function (event, trigger, player) {
			if (trigger.player.countCards('e') > 0) {
				const result = await trigger.player.chooseToDiscard('e', true, '请弃置一张装备区牌').forResult();
				if (result.bool) {
					player.popup('劈');
				}
			} else {
				trigger.num++;
			}
		},
		ai: {
			direct: true
		}
	},

	diy_yue: {
		trigger: { source: 'damageEnd' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_yue');
		},
		content: async function (event, trigger, player) {
			const target = trigger.player;
			if (target.countCards('h') > 0) {
				const choice = await target.chooseBool('选择：是否弃置一张手牌？不弃置则受到【乐不思蜀】判定').forResultBool();
				if (choice) {
					await target.chooseToDiscard('h', true).forResult();
				} else {
					await player.useCard({ name: 'lebu' }, target);
				}
			} else {
				await player.useCard({ name: 'lebu' }, target);
			}
		},
		ai: {
			direct: true
		}
	},

	diy_gou: {
		trigger: { player: 'shaMiss' },
		forced: true,
		filter: function (event, player) {
			return player.getEquip('diy_gou');
		},
		content: async function (event, trigger, player) {
			const target = trigger.target;
			if (target.countCards('h') > 0) {
				await player.gainPlayerCard(target, 'h', true);
				player.popup('钩');
			} else {
				game.swapSeat(player.getPrevious(), target);
			}
		},
		ai: {
			direct: true
		}
	},

	diy_cha: {
		trigger: { player: 'shaBegin' },
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_cha');
		},
		check: function (event, player) {
			return true;
		},
		content: async function (event, trigger, player) {
			const result = await trigger.target.chooseToDiscard('he', true, '选择弃置一张牌，或令此杀伤害+1').forResult();
			if (result.bool) {
				player.popup('叉');
			} else {
				trigger.baseDamage = (trigger.baseDamage || 0) + 1;
			}
		},
		ai: {
			direct: true
		}
	},

	diy_bian: {
		trigger: { source: 'damageEnd' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_bian');
		},
		content: async function (event, trigger, player) {
			const target = trigger.player;
			if (!target.isLinked()) {
				await target.link(true);
			}
			target.addTempSkill('diy_bian_debuff', 'phaseEnd');
			if (target.storage.diy_bian_debuff) {
				target.storage.diy_bian_debuff++;
			} else {
				target.storage.diy_bian_debuff = 1;
			}
			player.popup('鞭');
		},
		ai: {
			direct: true
		}
	},
	diy_bian_debuff: {
		trigger: { player: 'phaseDrawBegin' },
		forced: true,
		content: async function (event, trigger, player) {
			const debuff = player.storage.diy_bian_debuff || 0;
			if (debuff > 0) {
				trigger.num -= debuff;
			}
		},
		intro: {
			content: '摸牌阶段少摸#张牌',
			count: function (player) {
				return player.storage.diy_bian_debuff || 0;
			}
		}
	},
	diy_jian2: {
		trigger: { player: 'phaseBegin' },
		forced: true,
		filter: function (event, player) {
			return true;
		},
		content: function (event, trigger, player) {
			player.storage.diy_jian2_targets = [];
			player.storage.diy_jian2_shaCount = 0;
		},
		mod: {
			cardUsable: function (card, player) {
				if (card.name == 'sha' && player.getEquip('diy_jian2')) {
					return 2;
				}
			}
		},
		group: ['diy_jian2_hit'],
		subSkill: {
			hit: {
				trigger: { source: 'damageEnd' },
				forced: true,
				filter: function (event, player) {
					return player.getEquip('diy_jian2') && event.card && event.card.name == 'sha';
				},
				content: async function (event, trigger, player) {
					if (!player.storage.diy_jian2_targets) {
						player.storage.diy_jian2_targets = [];
					}
					if (!player.storage.diy_jian2_shaCount) {
						player.storage.diy_jian2_shaCount = 0;
					}
					player.storage.diy_jian2_shaCount++;
					const target = trigger.player;
					const targets = player.storage.diy_jian2_targets;
					const isDuplicate = targets.includes(target.playerid);
					targets.push(target.playerid);
					if (player.storage.diy_jian2_shaCount == 2 && isDuplicate) {
						await target.turnOver();
					}
					if (player.storage.diy_jian2_shaCount == 2) {
						await player.draw(2);
					}
				},
				ai: {
					direct: true
				}
			},
		}
	},


	diy_chui: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return player.countCards('h') > 0;
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseToDiscard('h', 1, true, '请弃置一张牌，令杀伤害+1且无视防具').forResult();
			if (result.bool) {
				trigger.nohujia = true;
				trigger.baseDamage++;
			}
		},
		ai: {
			direct: true
		}
	},

	diy_zhua: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_zhua');
		},
		content: async function (event, trigger, player) {
			const target = trigger.target;
			if (target.countCards('he') > 0) {
				await player.gainPlayerCard(target, 'he', true);
				player.popup('抓');
			} else {
				trigger.baseDamage++;
			}
		},
		ai: {
			direct: true
		}
	},

	diy_tang: {
		enable: 'phaseUse',
		filter: function (event, player) {
			return player.countCards('h') > 0;
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseToDiscard('h', 1, true, '请弃置一张牌').forResult();
			if (result.bool) {
				const result2 = await player.chooseTarget('请选择一名角色', 1).forResult();
				if (result2.bool && result2.targets.length > 0) {
					const target = result2.targets[0];
					await player.useCard({ name: 'sha', isCard: true }, target);
					const adjacent = game.filterPlayer(function (p) {
						return p != target && Math.abs(p.seatNum - target.seatNum) == 1;
					});
					for (const adj of adjacent) {
						await player.useCard({ name: 'sha', isCard: true }, adj);
					}
				}
			}
		},
		ai: {
			order: 6,
			result: {
				player: (player) => {
					if (player.countCards('h') < 2) return 0;
					const targets = game.filterPlayer(p => p != player && get.distance(player, p, 'attack') <= player.getAttackRange());
					if (targets.length < 2) return 0;
					let value = 0;
					targets.forEach(target => {
						if (get.attitude(player, target) < 0) {
							value += target.hp;
						}
					});
					return value > 1 ? 1 : 0;
				}
			}
		}
	},
	diy_gun: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_gun') && player.countCards('h', 'sha') > 0;
		},
		content: function (event, trigger, player) {
			var targets = game.filterPlayer(function (p) {
				return p != player && get.distance(player, p, 'attack') <= player.getAttackRange();
			});
			trigger.targets.addArray(targets);
		},
		mod: {
			selectTarget: function (card, player, range) {
				if (card.name == 'sha' && player.getEquip('diy_gun')) {
					range[1] = -1;
				}
			}
		},
		ai: {
			direct: true
		}
	},
	diy_shuo: {
		trigger: { source: 'damageEnd' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_shuo') && trigger.num > 0;
		},
		content: async function (event, trigger, player) {
			const next = trigger.player.next;
			if (next && next.isAlive() && Math.abs(next.seatNum - trigger.player.seatNum) == 1) {
				await next.damage(1);
				player.popup('槊');
			}
		},
		ai: {
			direct: true
		}
	},

	diy_bang: {
		enable: ['chooseToUse'],
		filterCard: { name: 'shan' },
		viewAs: { name: 'sha' },
		viewAsFilter: function (player) {
			return player.countCards('h', 'shan') > 0 && player.getEquip('diy_bang');
		},
		prompt: '将一张闪当杀使用',
		check: function (card) { return 4 },
		ai: {
			respondSha: true,
			skillTagFilter: function (player) {
				return player.countCards('h', 'shan') > 0;
			}
		}
	},

	diy_guai: {
		trigger: { source: 'damageEnd' },
		forced: true,
		filter: function (event, player) {
			return event.card && event.card.name == 'sha' && player.getEquip('diy_guai');
		},
		content: async function (event, trigger, player) {
			const target = trigger.player;
			game.swapSeat(player, target);
			player.popup('拐');
		},
		ai: {
			direct: true
		}
	},

	diy_liuxingchui: {
		enable: 'phaseUse',
		group: ['diy_liuxingchui_damage'],
		filter: function (event, player) {
			return player.countCards('h') > 0;
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseCard('h', true, '请选择一张手牌当杀使用').forResult();
			if (result.bool) {
				const card = result.cards[0];
				await player.chooseUseTarget({ name: 'sha', cards: [card], isCard: true }, false, 'nodistance');
			}
		},
		ai: {
			order: 5,
			result: {
				player: (player) => {
					if (player.countCards('h') < 2) return 0;
					const targets = game.filterPlayer(p => p != player && get.distance(player, p, 'attack') > player.getAttackRange());
					if (targets.length > 0) return 1;
					return 0;
				}
			}
		},
		subSkill: {
			damage: {
				trigger: { source: 'damageEnd' },
				forced: true,
				filter: function (event, player) {
					return event.card && event.card.name == 'sha' && player.getEquip('diy_liuxingchui');
				},
				content: async function (event, trigger, player) {
					const weapon = player.getEquip('diy_liuxingchui');
					if (weapon) {
						await player.lose(weapon, 'equip');
					}
				},
				ai: {
					direct: true
				}
			}
		}
	},
};

const translate = {
	diy_dao_bg: '刀',
	diy_dao: '刀',
	diy_qiang_bg: '枪',
	diy_qiang: '枪',
	diy_jian_bg: '剑',
	diy_jian: '剑',
	diy_ji_bg: '戟',
	diy_ji: '戟',
	diy_fu_bg: '斧',
	diy_fu: '斧',
	diy_yue_bg: '钺',
	diy_yue: '钺',
	diy_gou_bg: '钩',
	diy_gou: '钩',
	diy_cha_bg: '叉',
	diy_cha: '叉',
	diy_bian_bg: '鞭',
	diy_bian: '鞭',
	diy_jian2_bg: '锏',
	diy_jian2: '锏',
	diy_chui_bg: '锤',
	diy_chui: '锤',
	diy_zhua_bg: '抓',
	diy_zhua: '抓',
	diy_tang_bg: '镋',
	diy_tang: '镋',
	diy_gun_bg: '棍',
	diy_gun: '棍',
	diy_shuo_bg: '槊',
	diy_shuo: '槊',
	diy_bang_bg: '棒',
	diy_bang: '棒',
	diy_guai_bg: '拐',
	diy_guai: '拐',
	diy_liuxingchui_bg: '流星',
	diy_liuxingchui: '流星锤',
	diy_dao_info: '攻击范围：2<br>你可弃置一张牌，令你使用的杀不可被闪避。',
	diy_qiang_info: '攻击范围：3<br>你使用杀不能指定距离为1的角色，且伤害+1。',
	diy_jian_info: '攻击范围：2<br>你使用的【杀】被目标的【闪】响应后，可额外对目标再使用一张【杀】。',
	diy_ji_info: '攻击范围：5<br>你使用杀时可额外指定一名目标；若仅指定一名目标，你可令其不可使用闪。',
	diy_fu_info: '攻击范围：2<br>你使用杀命中后，可弃置目标装备区一张牌；若目标没有装备区牌，则伤害+1。',
	diy_yue_info: '攻击范围：3<br>目标受到伤害后，需弃置一张手牌，否则视为对其使用了一张【乐不思蜀】。',
	diy_gou_info: '攻击范围：2<br>你使用杀被闪避时，获得目标一张手牌；若目标没有手牌，则将其移至你的上家位置。',
	diy_cha_info: '攻击范围：3<br>你使用杀时可主动令目标选择：弃置一张牌，或令此杀伤害+1。',
	diy_bian_info: '攻击范围：2<br>你使用杀命中后，横置目标；令目标下回合摸牌阶段少摸一张牌。',
	diy_jian2_info: '攻击范围：2<br>回合内可使用两张杀；第二个杀命中后摸两张牌；若两杀命中同一目标，令其翻面。',
	diy_chui_info: '攻击范围：2<br>当你使用杀时，可弃置一张牌，令杀伤害+1且无视防具。',
	diy_zhua_info: '攻击范围：2<br>你使用杀时，可获得目标一张牌；若目标没有牌，则伤害+1。',
	diy_tang_info: '攻击范围：2<br>弃置一张牌，视为对目标和相邻角色各使用一张杀。',
	diy_gun_info: '攻击范围：2<br>你可以对攻击范围内的所有角色各使用一张杀。',
	diy_shuo_info: '攻击范围：3<br>你使用的杀造成伤害后，可以穿过目标，对其下家再造成1点伤害。',
	diy_bang_info: '攻击范围：2<br>你可以将闪当杀使用。',
	diy_guai_info: '攻击范围：2<br>你使用杀造成伤害后可以交换你与目标的位置。',
	diy_liuxingchui_info: '攻击范围：3<br>你可将一张手牌当无距离限制的杀使用,如果造成伤害,则弃置流星锤。',
	diy_bian_debuff: '鞭毒',
	diy_bian_debuff_info: '摸牌阶段少摸#张牌',
};

const list = [
	['heart', 6, 'diy_dao'],
	['diamond', 7, 'diy_qiang'],
	['club', 8, 'diy_jian'],
	['spade', 9, 'diy_ji'],
	['heart', 10, 'diy_fu'],
	['diamond', 11, 'diy_yue'],
	['club', 12, 'diy_gou'],
	['spade', 13, 'diy_cha'],
	['club', 9, 'diy_bian'],
	['diamond', 10, 'diy_jian2'],
	['spade', 6, 'diy_chui'],
	['heart', 7, 'diy_zhua'],
	['heart', 13, 'diy_tang'],
	['diamond', 1, 'diy_gun'],
	['club', 2, 'diy_shuo'],
	['spade', 3, 'diy_bang'],
	['heart', 4, 'diy_guai'],
	['diamond', 5, 'diy_liuxingchui']
];


for (let i in card) {
	if (!card[i].cardimage) {
		card[i].image = "ext:民间卡牌/image/card/diyweapon/" + i + ".png";
	}
}

game.import("card", function () {
	return {
		name: "diyweapon",
		card,
		skill,
		translate,
		list,
	};
});