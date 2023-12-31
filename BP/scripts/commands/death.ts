// ?newscoreboard deaths (NAME) (DisplaySlotId) (SortOrder)
// ?removescoreboard deaths

import { world, ObjectiveSortOrder, DisplaySlotId, system } from '@minecraft/server';

const objectiveId = "deaths"

export function add(name: string, display = DisplaySlotId.Sidebar, sortOrder = ObjectiveSortOrder.Descending) {
    system.run(() => {
        world.afterEvents.entityDie.subscribe((event) => {
            if (!event.deadEntity.isValid()) return;

            const scoreboardObjectiveId = objectiveId;
            const scoreboardObjectiveDisplayName = name;

            let players = world.getPlayers();

            // Ensure a new objective.
            let objective = world.scoreboard.getObjective(scoreboardObjectiveId);

            if (!objective) {
                objective = world.scoreboard.addObjective(scoreboardObjectiveId, scoreboardObjectiveDisplayName);
            }

            // get the scoreboard identity for player 0
            for (const player of players) {
                if (player.nameTag !== event.deadEntity.nameTag) {
                    continue
                };
                let playerIdentity = player.scoreboardIdentity;

                if (playerIdentity === undefined) {
                    console.log("Could not get playerIdentity. Has this player been added to the scoreboard?")
                    world.sendMessage(`${player.name} was not added to the ${objectiveId} scoreboard, their death was not recorded.`)
                    continue;
                }

                // initialize player score to 100;
                // objective.setScore(playerIdentity, 100);
                //

                world.scoreboard.setObjectiveAtDisplaySlot(display, {
                    objective: objective,
                    sortOrder: sortOrder,
                });

                const playerScore = objective.getScore(playerIdentity) ?? 0;

                // score should now be 110.
                objective.setScore(playerIdentity, playerScore + 1);
            }
        })
    })
}

export function remove() {
    system.run(() => {
        world.afterEvents.entityDie.unsubscribe(() => { })
        let objective = world.scoreboard.getObjective(objectiveId);

        if (!objective) return

        world.scoreboard.removeObjective(objective)
    })
}