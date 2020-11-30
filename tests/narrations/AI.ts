import { Scene } from 'a-dirty-trail/build';
import Action from 'a-dirty-trail/build/actions/Action';
import ActionBuilder from 'a-dirty-trail/build/actions/ActionBuilder';
import Actor from 'a-dirty-trail/build/core/Actor';
import Weapon from 'a-dirty-trail/build/core/Weapon';
import ChallengeRate from 'a-dirty-trail/build/core/ChallengeRate';
import ActionsMap from 'a-dirty-trail/build/core/ActionsMap';
import AttackAction from 'a-dirty-trail/build/actions/AttackAction';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class AI {
    private player: Actor;
    private deadliestWeapon?: Weapon;

    constructor(scene: Scene) {
        this.player = scene.getPlayer();
    }

    getNextAction(scene: Scene): Action<any> {
        const actionBuilder = new ActionBuilder({
            scene,
            actor: this.player,
        });
        const actions = actionBuilder.buildActions();
        if (!this.deadliestWeapon) {
            this.deadliestWeapon = this.getDeadliestWeapon();
        }
        let nextAction:
            | Action<any>
            | undefined = this.getAttackWithDeadliestWeapon(actions);
        if (!!nextAction) {
            return nextAction;
        }
        nextAction = this.getReloadDeadliestWeapon(actions);
        if (!!nextAction) {
            return nextAction;
        }
        return this.getOtherAttack(actions)!;
    }

    private getAttackWithDeadliestWeapon(
        actions: ActionsMap
    ): AttackAction | undefined {
        const deadliestWeapon = this.getDeadliestWeapon();
        return actions
            .getAttackActions()
            .find((action) => action.getWeapon().equals(deadliestWeapon));
    }

    private getDeadliestWeapon(): Weapon {
        if (!this.deadliestWeapon) {
            const weapons = this.player.getInventory().getWeapons();
            this.deadliestWeapon = weapons.reduce(
                (weaponWithHighestChallengeRate, weapon) => {
                    const deadliestWeaponSoFarChallengeRate = ChallengeRate.getWeaponChallengeRate(
                        weaponWithHighestChallengeRate
                    );
                    const candidateWeaponChallengeRate = ChallengeRate.getWeaponChallengeRate(
                        weapon
                    );
                    if (
                        candidateWeaponChallengeRate >
                        deadliestWeaponSoFarChallengeRate
                    ) {
                        return weapon;
                    } else {
                        return weaponWithHighestChallengeRate;
                    }
                },
                weapons[0]
            );
        }
        return this.deadliestWeapon;
    }

    private getReloadDeadliestWeapon(
        actions: ActionsMap
    ): ReloadAction | undefined {
        const deadliestWeapon = this.getDeadliestWeapon();
        return actions
            .getReloadActions()
            .find((action) => action.getWeapon().equals(deadliestWeapon));
    }

    private getOtherAttack(actions: ActionsMap): AttackAction | undefined {
        const attackActions = actions.getAttackActions();
        return attackActions[0];
    }
}

export default AI;
