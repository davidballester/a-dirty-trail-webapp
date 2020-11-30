import { Narration, Scene, SceneTemplateResolver } from 'a-dirty-trail/build';
import Action from 'a-dirty-trail/build/actions/Action';
import AdvanceAction from 'a-dirty-trail/build/actions/AdvanceAction';
import Actor from 'a-dirty-trail/build/core/Actor';
import Damage from 'a-dirty-trail/build/core/Damage';
import Health from 'a-dirty-trail/build/core/Health';
import Inventory, {
    AmmunitionByType,
} from 'a-dirty-trail/build/core/Inventory';
import NonPlayableActor from 'a-dirty-trail/build/core/NonPlayableActor';
import Skill from 'a-dirty-trail/build/core/Skill';
import SkillSet from 'a-dirty-trail/build/core/SkillSet';
import Trinket from 'a-dirty-trail/build/core/Trinket';
import Weapon from 'a-dirty-trail/build/core/Weapon';
import WeaponAmmunition from 'a-dirty-trail/build/core/WeaponAmmunition';

const instrumentScene = (
    scene: Scene,
    narration: Narration,
    sceneTemplateResolver: SceneTemplateResolver
): [Scene, Narration] => {
    const player = scene.getPlayer();
    const instrumentedPlayer = instrumentPlayer(player);
    const actors = scene.getActors();
    const instrumentedActors = instrumentActors(actors);
    const instrumentedScene = new Scene({
        id: scene.getId(),
        title: scene.getTitle(),
        setup: scene.getSetup(),
        player: instrumentedPlayer,
        actors: instrumentedActors,
        actions: [],
    });
    const actions = scene.getActions();
    const instrumentedNarration = instrumentNarration(
        narration,
        instrumentedScene
    );
    instrumentSceneTemplateResolver(
        instrumentedNarration,
        sceneTemplateResolver
    );
    const instrumentedActions = instrumentActions(
        actions,
        instrumentedScene,
        instrumentedPlayer,
        instrumentedNarration
    );
    instrumentedScene.setActions(instrumentedActions);
    return [instrumentedScene, instrumentedNarration];
};

export default instrumentScene;

const instrumentPlayer = (player: Actor): Actor => {
    const health = player.getHealth();
    const instrumentedHealth = instrumentHealth(health);
    const inventory = player.getInventory();
    const instrumentedInventory = instrumentInventory(inventory);
    const skillSet = player.getSkillSet();
    const instrumentedSkillSet = instrumentSkillSet(skillSet);
    const instrumentedPlayer = new Actor({
        name: player.getName(),
        health: instrumentedHealth,
        inventory: instrumentedInventory,
        skillSet: instrumentedSkillSet,
    });
    const instrumentedPlayerAsAny = instrumentedPlayer as any;
    instrumentedPlayerAsAny.id = instrumentedPlayer.getName();
    return instrumentedPlayer;
};

const instrumentHealth = (health: Health): Health =>
    new Health({ current: health.getCurrent(), max: health.getMax() });

const instrumentInventory = (inventory: Inventory): Inventory => {
    const ammunitionsByType = inventory.getAmmunitionsByType();
    const instrumentedAmmunitionsByType = instrumentAmmunitionsByType(
        ammunitionsByType
    );
    const weapons = inventory.getWeapons();
    const instrumentedWeapons = instrumentWeapons(weapons);
    const trinkets = inventory.getTrinkets();
    const instrumentedTrinkets = instrumentTrinkets(trinkets);
    return new Inventory({
        ammunitionsByType: instrumentedAmmunitionsByType,
        weapons: instrumentedWeapons,
        trinkets: instrumentedTrinkets,
    });
};

const instrumentAmmunitionsByType = (
    ammunitionsByType: AmmunitionByType
): AmmunitionByType => ({ ...ammunitionsByType });

const instrumentWeapons = (weapons: Weapon[]): Weapon[] =>
    weapons.map(instrumentWeapon);

const instrumentWeapon = (weapon: Weapon): Weapon => {
    const damage = weapon.getDamage();
    const instrumentedDamage = instrumentDamage(damage);
    const ammunition = weapon.getAmmunition();
    const instrumentedAmmunition = instrumentAmmunition(ammunition);
    const instrumentedWeapon = new Weapon({
        name: weapon.getName(),
        damage: instrumentedDamage,
        skill: weapon.getSkill(),
        type: weapon.getType(),
        ammunition: instrumentedAmmunition,
        canBeLooted: weapon.canBeLooted(),
    });
    const instrumentedWeaponAsAny = instrumentedWeapon as any;
    instrumentedWeaponAsAny.id = instrumentedWeapon.getName();
    return instrumentedWeapon;
};

const instrumentDamage = (damage: Damage): Damage =>
    new Damage({ min: damage.getMin(), max: damage.getMax() });

const instrumentAmmunition = (
    ammunition: WeaponAmmunition | undefined
): WeaponAmmunition | undefined => {
    if (!ammunition) {
        return undefined;
    }
    return new WeaponAmmunition({
        type: ammunition.getType(),
        current: ammunition.getCurrent(),
        max: ammunition.getMax(),
    });
};

const instrumentTrinkets = (trinkets: Trinket[]): Trinket[] =>
    trinkets.map(instrumentTrinket);

const instrumentTrinket = (trinket: Trinket): Trinket => {
    const instrumentedTrinket = new Trinket({
        name: trinket.getName(),
        description: trinket.getDescription(),
    });
    const instrumentedTrinketAsAny = instrumentedTrinket as any;
    instrumentedTrinketAsAny.id = instrumentedTrinket.getName();
    return instrumentedTrinket;
};

const instrumentSkillSet = (skillSet: SkillSet): SkillSet => {
    const skills = skillSet.getAll();
    const instrumentedSkills = instrumentSkills(skills);
    return new SkillSet({ skills: instrumentedSkills });
};

const instrumentSkills = (skills: Skill[]): Skill[] =>
    skills.map(instrumentSkill);

const instrumentSkill = (skill: Skill): Skill =>
    new Skill({
        name: skill.getName(),
        probabilityOfSuccess: skill.getProbabilityOfSuccess(),
    });

const instrumentActors = (actors: NonPlayableActor[]): NonPlayableActor[] =>
    actors.map(instrumentActor);

const instrumentActor = (actor: NonPlayableActor): NonPlayableActor => {
    const health = actor.getHealth();
    const instrumentedHealth = instrumentHealth(health);
    const inventory = actor.getInventory();
    const instrumentedInventory = instrumentInventory(inventory);
    const skillSet = actor.getSkillSet();
    const instrumentedSkillSet = instrumentSkillSet(skillSet);
    const instrumentedActor = new NonPlayableActor({
        name: actor.getName(),
        health: instrumentedHealth,
        inventory: instrumentedInventory,
        skillSet: instrumentedSkillSet,
    });
    const instrumentedPlayerAsAny = instrumentedActor as any;
    instrumentedPlayerAsAny.id = instrumentedActor.getName();
    return instrumentedActor;
};

const instrumentActions = (
    actions: Action<any>[],
    instrumentedScene: Scene,
    instrumentedPlayer: Actor,
    instrumentedNarration: Narration
): Action<any>[] => {
    return actions
        .map((action) =>
            instrumentAction(
                action,
                instrumentedScene,
                instrumentedPlayer,
                instrumentedNarration
            )
        )
        .filter(Boolean) as Action<any>[];
};

const instrumentAction = (
    action: Action<any>,
    instrumentedScene: Scene,
    instrumentedPlayer: Actor,
    instrumentedNarration: Narration
): Action<any> | undefined => {
    if (action instanceof AdvanceAction) {
        return instrumentAdvanceAction(
            action,
            instrumentedScene,
            instrumentedPlayer,
            instrumentedNarration
        );
    }
    return undefined;
};

const instrumentAdvanceAction = (
    advanceAction: AdvanceAction,
    instrumentedScene: Scene,
    instrumentedPlayer: Actor,
    instrumentedNarration: Narration
): AdvanceAction => {
    const advanceActionAsAny = advanceAction as any;
    const instrumentedAdvanceAction = new AdvanceAction({
        actor: instrumentedPlayer,
        narration: instrumentedNarration,
        scene: instrumentedScene,
        nextSceneDecider: advanceActionAsAny.nextSceneDecider,
        name: advanceAction.getName(),
        sideEffect: advanceActionAsAny.sideEffect,
    });
    const instrumentedAdvanceActionAsAny = instrumentedAdvanceAction as any;
    instrumentedAdvanceActionAsAny.id = instrumentedAdvanceAction.getName();
    return instrumentedAdvanceAction;
};

const instrumentNarration = (
    narration: Narration,
    instrumentedScene: Scene
): Narration => {
    const instrumentedNarration = new Narration({
        title: narration.getTitle(),
    });
    instrumentedNarration.setCurrentScene(instrumentedScene);
    return instrumentedNarration;
};

const instrumentSceneTemplateResolver = (
    instrumentedNarration: Narration,
    sceneTemplateResolver: SceneTemplateResolver
): void => {
    const sceneTemplateResolverAsAny = (sceneTemplateResolver as unknown) as any;
    sceneTemplateResolverAsAny.narration = instrumentedNarration;
    const fetchScene = sceneTemplateResolverAsAny.fetchScene as jest.SpyInstance;
    fetchScene.mockReset();
    fetchScene.mockImplementation(
        async (narration: Narration, sceneId?: string): Promise<Scene> => {
            sceneTemplateResolverAsAny.narration = instrumentedNarration;
            const markdownSceneTemplate = await sceneTemplateResolverAsAny.fetchMarkdownSceneTemplate(
                instrumentedNarration.getTitle(),
                sceneId
            );
            const sceneTemplate = sceneTemplateResolverAsAny.convertToSceneTemplate(
                markdownSceneTemplate
            );
            return sceneTemplateResolverAsAny.buildScene(sceneTemplate);
        }
    );
};
