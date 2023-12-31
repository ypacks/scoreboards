// ?newscoreboard bb (NAME) (DisplaySlotId) (SortOrder)
// ?removescoreboard bb

import { world, ObjectiveSortOrder, DisplaySlotId, system, Player, PlayerBreakBlockAfterEvent } from '@minecraft/server';
import { removePlayerOffline } from "../util"
const objectiveId = "bb"
let event: (arg: PlayerBreakBlockAfterEvent) => void;
/**
 * @param {string} name
 */
export function add(name: string, display = DisplaySlotId.Sidebar, sortOrder = ObjectiveSortOrder.Descending, playerCommand: Player) {
    system.run(() => {
        event = world.afterEvents.playerBreakBlock.subscribe((event) => {
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
                player.sendMessage("Could not get playerIdentity. Has this player been added to the scoreboard?")
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
    playerCommand.sendMessage("§3Blocks broken scoreboard has been added. §e§oPlayers who joined after the scoreboard was added will need to be added manually")
}

export function remove(player: Player) {
    system.run(() => {
        world.afterEvents.playerBreakBlock.unsubscribe(event)

        player.sendMessage(`Blocks broken scoreboard was removed`)
        let objective = world.scoreboard.getObjective(objectiveId);

        if (!objective) return

        world.scoreboard.removeObjective(objective)
    })
}