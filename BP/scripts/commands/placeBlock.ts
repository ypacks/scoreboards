// ?newscoreboard bb (NAME) (DisplaySlotId) (SortOrder)
// ?removescoreboard bb

import { world, ObjectiveSortOrder, DisplaySlotId, system, Player, PlayerBreakBlockAfterEvent } from '@minecraft/server';
import { removePlayerOffline, msg } from "../util"
const objectiveId = "pb"
const nameType = "Blocks placed"
let event: (arg: PlayerBreakBlockAfterEvent) => void;
/**
 * @param {string} name
 */
export function add(name: string, display = DisplaySlotId.Sidebar, sortOrder = ObjectiveSortOrder.Descending, playerCommand: Player) {
    system.run(() => {
        event = world.afterEvents.playerPlaceBlock.subscribe((event) => {
            const player = event.player

            const scoreboardObjectiveId = objectiveId;
            const scoreboardObjectiveDisplayName = name;

            let objective = world.scoreboard.getObjective(scoreboardObjectiveId);

            if (!objective) {
                objective = world.scoreboard.addObjective(scoreboardObjectiveId, scoreboardObjectiveDisplayName);
            }

            removePlayerOffline(objective)

            let playerIdentity = player.scoreboardIdentity;

            if (playerIdentity === undefined) {
                console.log(`Could not get playerIdentity. Attempting to run command to add player as ${playerCommand.name}`)
                playerCommand.runCommand(`scoreboard players add ${player.name} ${objectiveId} 1`)
                return;
            }
            world.scoreboard.setObjectiveAtDisplaySlot(display, {
                objective: objective,
                sortOrder: sortOrder,
            });

            const playerScore = objective.getScore(playerIdentity) ?? 0;

            objective.setScore(playerIdentity, playerScore + 1);
        })
    })
    playerCommand.sendMessage(msg.add(nameType))
}

export function remove(player: Player) {
    system.run(() => {
        world.afterEvents.playerPlaceBlock.unsubscribe(event)

        player.sendMessage(msg.remove(nameType))
        let objective = world.scoreboard.getObjective(objectiveId);

        if (!objective) return

        world.scoreboard.removeObjective(objective)
    })
}