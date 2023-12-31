// ?newscoreboard deaths (NAME) (DisplaySlotId) (SortOrder)
// ?removescoreboard deaths

import { world, ObjectiveSortOrder, DisplaySlotId, system, Player, EntityDieAfterEvent } from '@minecraft/server';
import { removePlayerOffline, msg } from "../util"
const objectiveId = "deaths"
const nameType = "Deaths"
let event: (arg: EntityDieAfterEvent) => void;

export function add(name: string, display = DisplaySlotId.Sidebar, sortOrder = ObjectiveSortOrder.Descending, playerCommand: Player) {
    system.run(() => {
        event = world.afterEvents.entityDie.subscribe((event) => {
            if (!event.deadEntity.isValid()) return;

            const scoreboardObjectiveId = objectiveId;
            const scoreboardObjectiveDisplayName = name;

            let players = world.getPlayers();

            let objective = world.scoreboard.getObjective(scoreboardObjectiveId);

            if (!objective) {
                objective = world.scoreboard.addObjective(scoreboardObjectiveId, scoreboardObjectiveDisplayName);
            }

            removePlayerOffline(objective)

            for (const player of players) {
                if (player.nameTag !== event.deadEntity.nameTag) {
                    continue
                };
                let playerIdentity = player.scoreboardIdentity;

                if (playerIdentity === undefined) {
                    console.log(`Could not get playerIdentity. Attempting to run command to add player as ${playerCommand.name}`)
                    playerCommand.runCommand(`scoreboard players add ${player.name} ${objectiveId} 1`)
                    continue;
                }

                world.scoreboard.setObjectiveAtDisplaySlot(display, {
                    objective: objective,
                    sortOrder: sortOrder,
                });

                const playerScore = objective.getScore(playerIdentity) ?? 0;

                objective.setScore(playerIdentity, playerScore + 1);
            }
        })
    })

    playerCommand.sendMessage(msg.add(nameType))
}

export function remove(player: Player) {
    system.run(() => {
        world.afterEvents.entityDie.unsubscribe(event)
        player.sendMessage(msg.remove(nameType))
        let objective = world.scoreboard.getObjective(objectiveId);

        if (!objective) return

        world.scoreboard.removeObjective(objective)
    })
}