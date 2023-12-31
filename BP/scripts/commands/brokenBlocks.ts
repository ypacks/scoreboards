// ?newscoreboard bb (NAME) (DisplaySlotId) (SortOrder)
// ?removescoreboard bb

import { world, ObjectiveSortOrder, DisplaySlotId, system, Player, PlayerBreakBlockAfterEvent } from '@minecraft/server';

const objectiveId = "bb"
let event: (arg: PlayerBreakBlockAfterEvent) => void;
/**
 * @param {string} name
 */
export function add(name: string, display = DisplaySlotId.Sidebar, sortOrder = ObjectiveSortOrder.Descending, player: Player) {
    system.run(() => {
        event = world.afterEvents.playerBreakBlock.subscribe((event) => {
            const player = event.player

            const scoreboardObjectiveId = objectiveId;
            const scoreboardObjectiveDisplayName = name;

            // Ensure a new objective.
            let objective = world.scoreboard.getObjective(scoreboardObjectiveId);

            if (!objective) {
                objective = world.scoreboard.addObjective(scoreboardObjectiveId, scoreboardObjectiveDisplayName);
            }


            let playerIdentity = player.scoreboardIdentity;

            if (playerIdentity === undefined) {
                console.error("Could not get playerIdentity. Has this player been added to the scoreboard?")
                console.error("Error was sent to the user")
                player.sendMessage("Could not get playerIdentity. Has this player been added to the scoreboard?")
                return;
            }

            // initialize player score to 100;
            // objective.setScore(playerIdentity, 100);

            world.scoreboard.setObjectiveAtDisplaySlot(display, {
                objective: objective,
                sortOrder: sortOrder,
            });

            const playerScore = objective.getScore(playerIdentity) ?? 0;

            // score should now be 110.
            objective.setScore(playerIdentity, playerScore + 1);
        })
    })
    player.sendMessage("§3Blocks broken scoreboard has been added. §e§oPlayers who joined after the scoreboard was added will need to be added manually")
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