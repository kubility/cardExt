import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

const card = {
	bxyr_chuanyunjian: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_chuanyunjian'],
		ai: {
			order: function (target, player) {
				if (player.hasSkill('wang_huaxiong_shanshi')) {
					return 0;
				}
				return 7;
			},
			basic: {
				equipValue: function (card, player) {
					if (player.hasSkill('wang_huaxiong_shanshi')) return -200;
					return 6;
				}
			}
		},
	},
	bxyr_guilongzhanyuedao: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['bxyr_guilongzhanyuedao'],
		ai: {
			basic: {
				equipValue: function (card, player) {
					if (player.storage.shuangxiong == 'black') return 5 + player.num('h');
					if (player.storage.shuangxiong == 'red') return 0 - player.num('h');
					if (player.hasSkill('bxyr_mingguangkai')) return 11;
					if (player.hasSkill('tuntian')) return -9;
					if (player.hasSkill('jijiu')) return 9;
					if (player.hasSkill('zaiqi')) return 8.5;
					if (player.hasSkill('luoshen') || player.hasSkill('qixi') || player.hasSkill('ganglie')) return -6;
					if (player.hasSkill('wusheng') || player.hasSkill('tianxiang')) return 8;
					if (player.hasSkill('duanliang') || player.hasSkill('lianhuan') || player.hasSkill('qingguo') || player.hasSkill('guidao') || player.hasSkill('guose')) return -5;
					if (player.hasSkill('tieji')) return 7;
					return 3;
				}
			}
		},
	},
	bxyr_jiasuo: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		skills: ['bxyr_jiasuo'],
		ai: {
			basic: {
				order: 1,
				equipValue: function (card, player) {
					let equip1 = player.get('e', '1');
					if (equip1 && equip1.name == 'bxyr_jiasuo') return -20;
					return 7;
				}
			}
		},
	},
	bxyr_jishengong: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -4 },
		skills: ['bxyr_jishengong'],
		ai: {
			basic: {
				equipValue: 8
			}
		},
	},
	bxyr_kaitianfu: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['bxyr_kaitianfu'],
		ai: {
			basic: {
				equipValue: 5
			}
		},
	},
	bxyr_lietianfu: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		onLose: function () {
			player.storage.bxyr_lietianfu = 0;
			player.unmarkSkill('bxyr_lietianfu');
		},
		onEquip: function () {
			player.storage.bxyr_lietianfu = 0;
			player.markSkill('bxyr_lietianfu');
		},
		skills: ['bxyr_lietianfu'],
		ai: {
			basic: {
				equipValue: 7
			}
		},
	},
	bxyr_lieyanzhigong: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -4 },
		skills: ['bxyr_lieyanzhigong', 'bxyr_lieyanzhigong2'],
		ai: {
			basic: {
				equipValue: 6
			}
		},
	},
	bxyr_lingyuejian: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_lingyuejian'],
		ai: {
			order: function (target, player) {
				if (player.hasSkill('wang_huaxiong_shanshi')) {
					return 0;
				}
				return 4;
			},
			basic: {
				equipValue: function (card, player) {
					if (player.hasSkill('wang_huaxiong_shanshi')) return -200;
					return 4;
				}
			}
		},
	},
	bxyr_liuyanxuanhuoshan: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['bxyr_liuyanxuanhuoshan'],
		ai: {
			basic: {
				equipValue: 5
			}
		},
	},
	bxyr_mangumoqin: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['bxyr_mangumoqin'],
		ai: {
			basic: {
				equipValue: 6
			}
		},
	},
	bxyr_molongzhanyue: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_molongzhanyue'],
		ai: {
			basic: {
				equipValue: 5
			}
		},
	},
	bxyr_pomodao: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_pomodao'],
		ai: {
			basic: {
				equipValue: 3
			}
		},
	},
	bxyr_qixingbaodao: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_qixingbaodao', 'bxyr_qixingbaodao2', 'bxyr_qixingbaodao3'],
		ai: {
			basic: {
				equipValue: 6
			}
		},
	},
	//铁骨扇
	bxyr_tiegushan: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		skills: ['bxyr_tiegushan', 'bxyr_tiegushan2'],
		ai: {
			basic: {
				equipValue: function (card, player) {
					if (player.hasSkill('paoxiao')) return 13;
					return 7.9;
				}
			}
		},
	},
	bxyr_tianshuangningbizhang: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['bxyr_tianshuangningbizhang'],
		ai: {
			basic: {
				equipValue: 3
			}
		},
	},
	bxyr_toushiche: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -5 },
		onLose: function () {
			player.storage.bxyr_toushiche = 0;
		},
		onEquip: function () {
			player.storage.bxyr_toushiche = 0;
		},
		skills: ['bxyr_toushiche', 'bxyr_toushiche2', 'bxyr_toushiche3'],
		ai: {
			basic: {
				equipValue: function (card, player) {
					if (player.storage.bxyr_toushiche == 2) return 4;
					if (player.storage.bxyr_toushiche == 1) return 5;
					return 6.5;
				}
			}
		},
	},
	bxyr_wutashan: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['bxyr_wutashan'],
		ai: {
			basic: {
				equipValue: 5
			}
		},
	},
	bxyr_yinlongqin: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['bxyr_yinlongqin'],
		ai: {
			basic: {
				equipValue: function (card, player) {
					if (player.hasSkill('luanji')) return 10;
					if (player.hasSkill('shuangxiong')) return 8;
					if (player.hasSkill('huoji')) return 7;
					return 6.5;
				}
			}
		},
	},
	bxyr_yitianjian: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_yitianjian'],
		ai: {
			basic: {
				equipValue: 3
			}
		},
	},
	bxyr_yueshigong: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -4 },
		skills: ['bxyr_yueshigong'],
		ai: {
			basic: {
				equipValue: 8
			}
		},
	},
	bxyr_zhanhundao: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -1 },
		skills: ['bxyr_zhanhundao'],
		ai: {
			basic: {
				equipValue: 6
			}
		},
	},
	bxyr_zhenhunqin: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -3 },
		skills: ['bxyr_zhenhunqin'],
		ai: {
			basic: {
				equipValue: 5
			}
		},
	},
	bxyr_zhongnu: {
		fullskin: true,
		type: "equip",
		subtype: "equip1",
		distance: { attackFrom: -2 },
		skills: ['bxyr_zhongnu'],
		ai: {
			basic: {
				equipValue: 4
			}
		},
	}
};

const skill = {
	bxyr_chuanyunjian: {
		trigger: {
			source: "damageBefore",
		},
		forced: true,
		filter: function (event) {
			return event.card && event.card.name == 'sha';
		},
		content: async function (event, trigger, player) {
			trigger.cancel();

			await trigger.player.loseMaxHp();
		}
	},
	bxyr_feilongduofeng: {
		trigger: { player: 'shaBegin' },
		priority: 5,
		audio: 'ext:民间卡牌/audio/card/weapon:1',
		audioname: 'bxyr_feilongduofeng',
		filter: function (event, player) {
			return event.target.num('he');
		},
		check: function (event, player) {
			if (event.target.hasSkillTag('noh')) return false;
			return ai.get.attitude(player, event.target) <= 0;
		},
		content: async function (event, trigger, player) {
			await trigger.target.chooseToDiscard(true);
		},
		group: ['bxyr_feilongduofeng2']
	},
	bxyr_feilongduofeng2: {
		trigger: { source: 'damageAfter' },
		priority: -1,
		audio: 'ext:民间卡牌/audio/card/weapon:1',
		audioname: 'bxyr_feilongduofeng',
		filter: function (event, player) {
			if (!event.player.isDead()) return false;
			if (!event.card || event.card.name != 'sha') return false;
			if (player.identity == 'unknown') return false;
			return !game.hasPlayer(function (target) {
				return target.group != player.group && (game.countPlayer(function (target1) {
					return target1.group == target.group;
				}) < game.countPlayer(function (target2) {
					return target2.group == player.group;
				}));
			});
		},
		content: async function (event, trigger, player) {
			await trigger.player.revive();
			const result1 = await trigger.player.chooseControl('确定', '取消', function () {
				return '确定';
			}).set('prompt', '【飞龙夺凤】<br><br><div class="text center">是否选择一张和' + get.translation(player) + '相同势力的武将牌重新加入游戏').forResult();

			if (result1.control == '取消') {
				await trigger.player.die();
				return;
			}

			if (result1.control == '确定') {
				let list = [];
				for (let i in lib.character) {
					if (lib.character[i].mode && lib.character[i].mode.contains(lib.config.mode) == false) continue;
					if (lib.character[i][1] != player.group) continue;
					if (i != 'list') list.push(i);
				}
				for (let j = 0; j < game.players.length; j++) {
					list.remove([game.players[j].name]);
					list.remove([game.players[j].name2]);
				}
				const result2 = await trigger.player.chooseButton(ui.create.dialog([list, 'character']), true, function (button) {
					let i = Math.floor(Math.random() * list.length);
					return list[i];
				}).forResult();

				if (result2.bool && result2.buttons) {
					trigger.player.uninit();
					trigger.player.init(result2.buttons[0].link);
					if (get.mode() == 'guozhan') {
						trigger.player._group = player.identity;
						trigger.player.setIdentity(player.identity);
						trigger.player.identity = player.identity;
					}
				}
			}
		}
	},
	bxyr_guilongzhanyuedao: {
		mod: {
			suit: function (card, suit) {
				return 'heart';
			}
		}
	},
	bxyr_jiasuo: {
		group: ['bxyr_jiasuo2'],
		mod: {
			cardEnabled: function (card, player) {
				if ((card.name == 'tao' || card.name == 'jiu') && !player.isDying()) return false;
			}
		}
	},
	_bxyr_jiasuo: {
		enable: "phaseUse",
		filter: function (event, player) {
			return player.num('h', { name: 'bxyr_jiasuo' }) > 0;
		},
		filterCard: function (card) {
			return card.name == 'bxyr_jiasuo';
		},
		check: function (card) {
			return 100 - ai.get.value(card);
		},
		filterTarget: function (card, player, target) {
			return true;
		},
		content: async function (event, trigger, player) {
			if (!event.targets || !event.targets.length) return;
			if (!event.cards || !event.cards.length) return;
			await event.targets[0].equip(event.cards[0]);
		},
		discard: false,
		prepare: function (cards, player, targets) {
			player.$give(cards, targets[0], false);
		},
		ai: {
			basic: {
				order: 10,
			},
			result: {
				target: function (player, target) {
					let equip1 = player.get('e', '1');
					if (equip1 && equip1.name == 'bxyr_jiaoliao') return -20;
					if (target.num('e', '1')) return -2;
					return -1
				}
			}
		}
	},
	bxyr_jiasuo2: {
		trigger: { player: 'phaseUseBefore' },
		filter: function (event, player) {
			return player.num('e', { name: 'bxyr_jiasuo' }) && player.num('e', { name: 'bxyr_jiaoliao' });
		},
		forced: true,
		content: async function (event, trigger, player) {
			trigger.cancel();
		}
	},
	bxyr_jishengong: {
		trigger: {
			source: "damageBegin",
		},
		direct: true,
		audio: 'ext:民间卡牌/audio/card/weapon:1',
		audioname: 'bxyr_jishengong',
		filter: function (event) {
			return event.card && event.card.name == 'sha' && event.player.num('e');
		},
		content: async function (event, trigger, player) {
			await player.gainPlayerCard('e', trigger.player);
		}
	},
	bxyr_kaitianfu: {
		trigger: { player: 'shaMiss' },
		audio: 'ext:民间卡牌/audio/card/weapon:1',
		audioname: 'bxyr_kaitianfu',
		direct: true,
		filter: function (event, player) {
			return player.num('h', 'sha') > 0;
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseToDiscard('开天斧：是否弃置一张杀对其造成一点伤害？', { name: 'sha' }).set('ai', function (card) {
				if (ai.get.attitude(trigger.target, player) < 0) return 9 - ai.get.value(card);
				if (ai.get.attitude(trigger.target, player) === 0) return 7 - ai.get.value(card);
				return -ai.get.value(card);
			}).set('logSkill', 'bxyr_kaitianfu').forResult();
			if (result.bool) {
				await trigger.target.damage();
			}
		}
	},
	bxyr_lietianfu: {
		unique: true,
		init: function (player) {
			player.storage.bxyr_lietianfu = 0;
		},
		enable: 'phaseUse',
		audio: true,
		content: async function (event, trigger, player) {
			await player.loseHp(1);
			player.storage.bxyr_lietianfu++;
		},
		ai: {
			basic: {
				order: 9.2,
			},
			result: {
				player: function (player) {
					if (player.hasSkill('zhaxiang') && player.hp >= 2) return 1;
					if (player.storage.bxyr_lietianfu >= 2 || player.hp < 3) return 0;
					if (lib.config.mode == 'stone' && !player.isMin()) {
						if (player.getActCount() + 1 >= player.actcount) return 0;
					}
					let shas = player.get('h', 'sha');
					if (shas.length > 1) {
						if (player.num('e', 'zhuge')) return 1;
						if (player.hasSkill('paoxiao')) return 1;
					}
					let card;
					if (shas.length) {
						for (let i = 0; i < shas.length; i++) {
							if (lib.filter.filterCard(shas[i], player)) {
								card = shas[i]; break;
							}
						}
					}
					if (card) {
						for (let i = 0; i < game.players.length; i++) {
							if (ai.get.attitude(player, game.players[i]) < 0 && player.canUse(card, game.players[i], true, true) && !game.players[i].num('e', 'baiyin')) {
								if (ai.get.effect(game.players[i], card, player) > 0) return 1;
							}
						}
					}
					return 0;
				}
			},
		},
		intro: {
			content: function (storage) {
				return '已增加' + storage + '点伤害';
			}
		},
		group: ['bxyr_lietianfu2', 'bxyr_lietianfu3']
	},
	bxyr_lietianfu2: {
		trigger: { source: 'damageBegin' },
		filter: function (event) {
			return event.card && (event.card.name == 'sha');
		},
		forced: true,
		content: async function (event, trigger, player) {
			trigger.num += player.storage.bxyr_lietianfu;
		}
	},
	bxyr_lietianfu3: {
		trigger: { player: 'phaseEnd' },
		frequent: true,
		content: async function (event, trigger, player) {
			player.storage.bxyr_lietianfu = 0;
			player.update();
		}
	},
	bxyr_lieyanzhigong: {
		trigger: { source: 'damageBegin' },
		filter: function (event) {
			return event.card && event.card.nature == 'fire' && event.card.name == 'sha';
		},
		forced: true,
		content: async function (event, trigger, player) {
			trigger.num++;
		}
	},
	bxyr_lieyanzhigong2: {
		trigger: { player: 'shaBegin' },
		filter: function (event) {
			if (event.card.nature == 'fire') return true;
		},
		forced: true,
		content: async function (event, trigger, player) {
			trigger.directHit = true;
		}
	},
	bxyr_lingyuejian: {
		trigger: { source: 'damageBefore' },
		forced: true,
		priority: Infinity,
		content: async function (event, trigger, player) {
			trigger.source = undefined;
		}
	},
	bxyr_liuyanxuanhuoshan: {
		trigger: { source: 'damageBegin' },
		filter: function (event) {
			return event.card && (event.card.name == 'sha');
		},
		forced: true,
		content: async function (event, trigger, player) {
			const result = await player.judge(function (card) {
				if (get.suit(card) == 'heart') return 2;
				return 0;
			});
			if (result.bool) {
				trigger.num++;
			}
		}
	},
	bxyr_mangumoqin: {
		enable: 'phaseUse',
		filterCard: function (card, player) {
			return get.suit(card) == 'spade' && card.name == 'sha';
		},
		position: 'h',
		viewAs: { name: 'juedou' },
		prompt: '蛮骨魔琴:你可以把一张♠花色的【杀】当做【决斗】使用。',
		check: function (card) { return 6 - ai.get.value(card) },
		ai: {
			order: 9
		}
	},
	bxyr_molongzhanyue: {
		mod: {
			selectTarget: function (card, player, range) {
				if (card.name == 'sha') range[1] = 2;
			}
		}
	},
	bxyr_pomodao: {
		trigger: { player: 'juedou' },
		forced: true,
		filter: function (event, player) {
			return event.turn != player;
		},
		content: async function (event, trigger, player) {
			trigger.directHit = true;
		},
		ai: {
			result: {
				target: function (card, player, target) {
					if (card.name == 'juedou' && target.num('h') > 0) return [1, 0, 0, -1];
				}
			}
		}
	},
	bxyr_qixingbaodao: {
		trigger: { source: 'damageBegin' },
		filter: function (event) {
			return event.card && event.card.nature == 'fire' && event.card.name == 'sha';
		},
		check: function (event, player) {
			return (ai.get.attitude(player, event.player) <= 0);
		},
		content: async function (event, trigger, player) {
			await player.discardPlayerCard('h', trigger.player, true);
		}
	},
	bxyr_qixingbaodao2: {
		trigger: { source: 'damageBegin' },
		filter: function (event, card) {
			return event.card && event.card.nature == 'thunder' && event.card.name == 'sha';
		},
		check: function (event, player) {
			return (ai.get.attitude(player, event.player) > 0 && event.player.isTurnedOver() || ai.get.attitude(player, event.player) > 0 && !event.player.isTurnedOver());
		},
		content: async function (event, trigger, player) {
			const cards = get.cards();
			await player.showCards(cards);
			if (get.suit(cards[0]) == 'spade') {
				await trigger.player.turnOver();
			}
		},
	},
	bxyr_qixingbaodao3: {
		trigger: {
			player: "shaMiss",
		},
		filter: function (event) {
			if (event.card && event.card.nature == 'wind' && event.card.name == 'sha') return true;
		},
		check: function (event, player) {
			return (ai.get.attitude(player, event.target) <= 0);
		},
		content: async function (event, trigger, player) {
			const result = await player.judge(function (card) {
				return get.suit(card) == 'diamond' ? 1 : 0;
			});
			if (result.bool && result.suit == 'diamond') {
				await event.target.damage(1, 'wind');
			}
		},
	},
	bxyr_tianshuangningbizhang: {
		mod: {
			suit: function (card, suit) {
				if (suit == 'spade') return 'club';
			}
		}
	},

	bxyr_tiegushan: {
		enable: 'phaseUse',
		filter: function (card, player, target) {
			return lib.filter.filterCard({ name: 'sha' }, player);
		},
		filterTarget: function (card, player, target) {
			return player.canUse({ name: 'sha' }, target);
		},
		content: function () {
			"step 0"
			player.judge(function (card) {
				if (get.color(card) == 'black') return 0.5;
				return 0;
			});
			"step 1"
			if (result.bool) {
				player.useCard({ name: 'sha' }, target);
			}
		},
		ai: {
			basic: {

				order: 3.1
			},
			result: {
				target: function (player, target) {
					if (player.hasSkill('jiu') && !target.num('e', 'baiyin')) {
						if (ai.get.attitude(player, target) > 0) {
							return -6;
						}
						else {
							return -3;
						}
					}
					return -1.5;
				},
			},
			tag: {
				respond: 1,
				respondShan: 1,
				damage: function (card) {
					if (card.nature == 'poison') return;
					return 1;
				},
				natureDamage: function (card) {
					if (card.nature) return 1;
				},
				fireDamage: function (card, nature) {
					if (card.nature == 'fire') return 1;
				},
				thunderDamage: function (card, nature) {
					if (card.nature == 'thunder') return 1;
				},
				poisonDamage: function (card, nature) {
					if (card.nature == 'poison') return 1;
				}
			}
		}
	},
	bxyr_tiegushan2: {
		trigger: { player: 'chooseToRespondBegin' },
		filter: function (event, player) {
			if (event.responded) return false;
			if (!event.filterCard({ name: 'sha' })) return false;
			return true;
		},
		audio: true,
		check: function (event, player) {
			if (ai.get.damageEffect(player, event.player, player) >= 0) return false;
			return true;
		},
		content: function () {
			"step 0"
			player.judge('bxyr_tiegushan', function (card) { return (get.color(card) == 'black') ? 1.5 : -0.5 });
			"step 1"
			if (result.judge > 0) {
				trigger.untrigger();
				trigger.responded = true;
				trigger.result = { bool: true, card: { name: 'sha' } }
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, effect) {
					if (get.tag(card, 'respondSha')) return 0.5;
				}
			}
		}
	},

	bxyr_toushiche: {
		trigger: { player: 'shaBegin' },
		filter: function (event, player) {
			if (player == _status.currentPhase) return true;
		},
		audio: true,
		forced: true,
		content: async function (event, trigger, player) {
			player.storage.bxyr_toushiche = 2;
			trigger.directHit = true;
		}
	},
	bxyr_toushiche2: {
		trigger: { player: 'phaseDiscardBegin' },
		filter: function (event, player) {
			if (player.storage.bxyr_toushiche > 0) return true;
		},
		audio: true,
		forced: true,
		content: async function (event, trigger, player) {
			player.storage.bxyr_toushiche--;
		}
	},
	bxyr_toushiche3: {
		mod: {
			cardEnabled: function (card, player) {
				if (card.name == 'sha' && player.storage.bxyr_toushiche > 0) return false;
			},
			cardUsable: function (card, player) {
				if (card.name == 'sha' && player.storage.bxyr_toushiche > 0) return false;
			},
			cardRespondable: function (card, player) {
				if (card.name == 'sha' && player.storage.bxyr_toushiche > 0) return false;
			},
		},
	},
	bxyr_wutashan: {
		enable: ['chooseToUse'],
		filterCard: { name: 'shan' },
		viewAs: { name: 'sha', nature: 'thunder' },
		viewAsFilter: function (player) {
			if (!player.num('h', 'shan')) return false;
		},
		prompt: '将一张闪当雷杀使用或打出',
		check: function () { return 1 },
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'respondSha') && current < 0) return 0.6
				}
			},
			respondSha: true,
			skillTagFilter: function (player) {
				if (!player.num('h', 'shan')) return false;
			},
			order: 4,
			useful: -1,
			value: -1
		}
	},
	bxyr_yinlongqin: {
		trigger: {
			source: "damageBefore",
		},
		audio: 'ext:民间卡牌/audio/card/weapon:1',
		audioname: 'bxyr_yinlongqin',
		priority: 15,
		filter: function (event, player) {
			return get.type(event.card, 'trick') == 'trick';
		},
		content: async function (event, trigger, player) {
			await player.draw();
		}
	},
	bxyr_yitianjian: {
		trigger: {
			player: ['respond']
		},
		frequent: true,
		filter: function (event) {
			return event.card && event.card.name == 'sha';
		},
		content: async function (event, trigger, player) {
			await player.draw();
		}
	},
	bxyr_yueshigong: {
		trigger: {
			player: "shaMiss",
		},
		priority: -1,
		direct: true,
		audio: true,
		filter: function (event) {
			return event.target.num('e') > 0;
		},
		content: async function (event, trigger, player) {
			await player.gainPlayerCard('e', trigger.target);
		}
	},
	bxyr_zhanhundao: {
		trigger: {
			source: "damageEnd",
		},
		forced: true,
		audio: true,
		filter: function (event) {
			return event.card && event.card.name == 'sha' && event.player.num('h');
		},
		content: async function (event, trigger, player) {
			await player.gainPlayerCard('h', trigger.player, true);
		}
	},
	bxyr_zhenhunqin: {
		trigger: { player: 'useCardToBefore' },
		priority: 7,
		audio: 'ext:民间卡牌/audio/card/weapon:1',
		audioname: 'bxyr_zhenhunqin',
		filter: function (event, player) {
			if (event.card && event.card.name == 'sha' && !event.card.nature) return true;
		},
		check: function (event, player) {
			let att = ai.get.attitude(player, event.target);
			if (event.target.hasSkillTag('nothunder')) {
				return att > 0;
			}
			return att <= 0;
		},
		content: async function (event, trigger, player) {
			trigger.card.nature = 'thunder';
		}
	},
	bxyr_zhongnu: {
		trigger: { player: 'shaBegin' },
		forced: true,
		filter: function (event, player) {
			return (event.card && event.card.name == 'sha' && get.color(event.card) == 'red' && !event.directHit)
		},
		content: async function (event, trigger, player) {
			const result = await trigger.target.chooseToRespond({ name: 'shan' }).set('autochoose', lib.filter.autoRespondShan).set('ai', function (card) {
				if (trigger.target.num('h', 'shan') > 1) {
					return ai.get.unuseful2(card);
				}
				return -1;
			}).forResult();
			if (!result.bool) {
				trigger.cancel();
				trigger.directHit = true;
			}
		}
	}
};

const translate = {
	bxyr_chuanyunjian_bg: '穿',
	bxyr_chuanyunjian: '穿云剑',
	bxyr_guilongzhanyuedao_bg: '鬼',
	bxyr_guilongzhanyuedao: '鬼龙斩月刀',
	bxyr_jiasuo_bg: '锁',
	_bxyr_jiasuo: '枷锁',
	bxyr_jiasuo: '枷锁',
	bxyr_jiasuo2: '枷锁',
	bxyr_jishengong_bg: '姬',
	bxyr_jishengong: '姬神弓',
	bxyr_kaitianfu_bg: '開',
	bxyr_kaitianfu: '开天斧',
	bxyr_lietianfu_bg: '裂',
	bxyr_lietianfu: '裂天斧',
	bxyr_lieyanzhigong_bg: '焰',
	bxyr_lieyanzhigong: '烈焰之弓',
	bxyr_lingyuejian_bg: '霊',
	bxyr_lingyuejian: '灵越剑',
	bxyr_liuyanxuanhuoshan_bg: '流',
	bxyr_liuyanxuanhuoshan: '流焰玄火扇',
	bxyr_mangumoqin_bg: '蛮',
	bxyr_mangumoqin: '蛮骨魔琴',
	bxyr_molongzhanyue_bg: '魔',
	bxyr_molongzhanyue: '魔龙斩月',
	bxyr_pomodao_bg: '破',
	bxyr_pomodao: '破魔刀',
	bxyr_qixingbaodao_bg: '寶',
	bxyr_qixingbaodao: '七星宝刀',
	bxyr_qixingbaodao2: '七星宝刀',
	bxyr_qixingbaodao3: '七星宝刀',
	bxyr_tiegushan_bg: '鐡',
	bxyr_tiegushan: '铁骨扇',
	bxyr_tiegushan2: '铁骨扇',
	bxyr_tianshuangningbizhang_bg: '凝',
	bxyr_tianshuangningbizhang: '天霜凝碧杖',
	bxyr_toushiche_bg: '車',
	bxyr_toushiche: '投石车',
	bxyr_wutashan_bg: '舞',
	bxyr_wutashan: '舞踏扇',
	bxyr_yinlongqin_bg: '吟',
	bxyr_yinlongqin: '吟龙琴',
	bxyr_yitianjian_bg: '倚',
	bxyr_yitianjian: '倚天剑',
	bxyr_yueshigong_bg: '食',
	bxyr_yueshigong: '月食弓',
	bxyr_zhanhundao_bg: '戰',
	bxyr_zhanhundao: '战魂刀',
	bxyr_zhenhunqin_bg: '镇',
	bxyr_zhenhunqin: '镇魂琴',
	bxyr_zhongnu_bg: '重',
	bxyr_zhongnu: '重弩',
	bxyr_feilongduofeng_bg: '凤',
	bxyr_feilongduofeng: '飞龙夺凤',
	bxyr_feilongduofeng2: '飞龙夺凤',
	bxyr_toushiche2: '投石车',
	bxyr_toushiche3: '投石车',
	bxyr_chuanyunjian_info: '锁定技，当你使用杀造成伤害时防止该伤害，改为令扣减1点体力上限',
	bxyr_guilongzhanyuedao_info: '◆锁定技，你的所有牌均视为♥花色',
	bxyr_jiasuo_info: '出牌阶段，你可将其置于任意一名角色的装备区里(弃置原武器)。<br>◆锁定技，你只有濒死阶段才能使用【桃】或【酒】。<br>◆锁定技，若同时装备【脚镣】、【枷锁】，跳过你的出牌阶段',
	bxyr_jishengong_info: '◆你使用【杀】对一名造成伤害时，你可以获得对方装备区里的一张牌',
	bxyr_kaitianfu_info: '◆当你打出的【杀】被闪避后，可在丢弃一张【杀】使目标受到1点伤害',
	bxyr_lietianfu_info: '出牌阶段:可主动失去1点血，本回合你使用【杀】所造成的伤害+1',
	bxyr_lieyanzhigong_info: '◆锁定技，你使用的火杀不可被闪避，且伤害+1',
	bxyr_lingyuejian_info: '◆锁定技，你造成的伤害无伤害来源',
	bxyr_liuyanxuanhuoshan_info: '◆锁定技，当你的【杀】对目标角色造成伤害时进行判定，判定结果为红桃，则伤害+1',
	bxyr_mangumoqin_info: '◆你可将黑桃花色的【杀】当做【决斗】使用',
	bxyr_molongzhanyue_info: '◆你的【杀】最多可指定两个目标',
	bxyr_pomodao_info: '◆锁定技，你使用【决斗】时目标不能打出【杀】抵御',
	bxyr_qixingbaodao_info: '◆1.当你使用【火杀】造成伤害时，你可弃对方一张手牌。<br>2.当你使用【雷杀】造成伤害时，可从牌堆亮出一张牌若为♠，目标武将牌翻面。<br>3.当你使用【风杀】被【闪】抵消时，你可进行判定，若为♦，对目标角色造成一点风属性伤害',
	bxyr_tiegushan_info: '◆每当你需要使用或打出一张【杀】时，你可以进行判定，结果为黑色时，视为你使用或打出了一张【杀】',
	bxyr_tianshuangningbizhang_info: '◆锁定技，你的黑桃牌均视为草花牌',
	bxyr_toushiche_info: '锁定技，出牌阶段你对角色使用【杀】，则。<br>1.你使用的【杀】不可闪避<br>2.直至你下个回合的弃牌阶段，如果你没有失去【投石车】，则你不能使用或打出【杀】',
	bxyr_wutashan_info: '◆你可将【闪】可当做雷属性的【杀】使用',
	bxyr_yinlongqin_info: '你使用的非延时锦囊造成伤害时你摸一张牌',
	bxyr_yitianjian_info: '◆锁定技，你每打出一张【杀】，则你立即摸1张牌',
	bxyr_yueshigong_info: '当你使用的【杀】被【闪】抵消时，你可以获得被杀者装备区里的一张牌',
	bxyr_zhanhundao_info: '◆锁定技，当你使用【杀】造成伤害后，你获得目标一张手牌',
	bxyr_zhenhunqin_info: '◆你可以将你的任一普通【杀】当着雷电伤害的【杀】使用',
	bxyr_zhongnu_info: '◆锁定技，你使用的红色【杀】均需要两张【闪】才能闪避',
	bxyr_feilongduofeng_info: '当你使用【杀】时，你可以令目标弃置一张牌；当你使用【杀】杀死一名角色后，你可以令其以与你相同势力的武将身份复活',
};

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const cardNames = [
	'bxyr_qixingbaodao',
	'bxyr_jishengong',
	'bxyr_lieyanzhigong',
	'bxyr_liuyanxuanhuoshan',
	'bxyr_pomodao',
	'bxyr_chuanyunjian',
	'bxyr_zhanhundao',
	'bxyr_toushiche',
	'bxyr_yueshigong',
	'bxyr_yinlongqin',
	'bxyr_tianshuangningbizhang',
	'bxyr_tiegushan',
	'bxyr_jiasuo',
	'bxyr_zhenhunqin',
	'bxyr_lingyuejian',
	'bxyr_mangumoqin',
	'bxyr_molongzhanyue',
	'bxyr_wutashan',
	'bxyr_guilongzhanyuedao',
	'bxyr_yitianjian',
	'bxyr_kaitianfu',
	'bxyr_zhongnu',
	'bxyr_lietianfu',
];
const cardNature = {
	bxyr_chuanyunjian: 'fire',
	bxyr_lieyanzhigong: 'fire',
	bxyr_zhenhunqin: 'thunder',
	bxyr_wutashan: 'thunder',
	bxyr_guilongzhanyuedao: 'fire',
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
		card[i].image = "ext:民间卡牌/image/card/weapon/" + i + ".png";
	}
}
game.import("card", function () {
	return {
		name: "weapon",
		card,
		skill,
		translate,
		list,
	};
});
