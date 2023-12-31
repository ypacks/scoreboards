import { ScoreboardObjective } from "@minecraft/server"

/**
 * Function to remove Player Offline from the scoreboard.
 * @param objective The objective in question
 */
export function removePlayerOffline(objective: ScoreboardObjective) {
    const participants = objective.getParticipants()

    participants.forEach(participant => {
        if (!participant.isValid()) objective.removeParticipant(participant)
    })
}