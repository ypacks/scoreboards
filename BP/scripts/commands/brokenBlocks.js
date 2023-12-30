// ?newscoreboard brokenBlocks (NAME) (DisplaySlotId) (SortOrder)
// ?removescoreboard brokenBlocks

import { world, ObjectiveSortOrder, DisplaySlotId, system } from '@minecraft/server';

const objectiveId = "brokenBlocks"

world.afterEvents.playerBreakBlock

/**
 * @param {string} name
 */
export function add(name, display = DisplaySlotId.Sidebar, sortOrder = ObjectiveSortOrder.Descending) {
    system.run(() => {
        world.afterEvents.playerBreakBlock.subscribe((event) => {
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
}

export function remove() {
    world.afterEvents.playerBreakBlock.unsubscribe()

    let objective = world.scoreboard.getObjective(objectiveId);

    if (!objective) return

    world.scoreboard.removeObjective(objective)
}