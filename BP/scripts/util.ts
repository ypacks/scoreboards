import { ScoreboardObjective, DisplaySlotId, ObjectiveSortOrder } from "@minecraft/server"

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

/*
DisplaySlotId.BelowName
DisplaySlotId.List
DisplaySlotId.Sidebar
*/
/*
ObjectiveSortOrder.Ascending
ObjectiveSortOrder.Descending
*/

export const input = {
    fixDisplay(input: string): DisplaySlotId | undefined {
        let allowed = ["belowname", "belowName", "BelowName", "list", "List", "sidebar", "Sidebar", "sideBar", "SideBar"]

        if (!allowed.includes(input)) return undefined

        switch (input) {
            case "belowname":
            case "belowName":
            case "BelowName":
                return DisplaySlotId.BelowName
            case "list":
            case "List":
                return DisplaySlotId.List
            case "sidebar":
            case "Sidebar":
            case "sideBar":
            case "SideBar":
                return DisplaySlotId.Sidebar
        }
    },
    fixSortOrder(input: string): ObjectiveSortOrder | undefined {
        let allowed = ["asc", "des", "ascending", "descending", "desc", "Ascending", "Descending"]

        if (!allowed.includes(input)) return undefined

        switch (input) {
            case "asc":
            case "ascending":
            case "Ascending":
                return ObjectiveSortOrder.Ascending
            case "descending":
            case "des":
            case "desc":
            case "Descending":
                return ObjectiveSortOrder.Descending
        }
    }
}

/**
 * Object for messages to show to player.
 */
export const msg = {
    /**
     * When succesfully adding a scoreboard
     */
    add(name: string): string {
        const colour1 = "§3"
        const colour2 = "§e§o"
        return `${colour1}${name} scoreboard has been added. ${colour2} Players who join after, may need to wait a bit before their scores show.`
    },
    /**
     * When succesfully removing a scoreboard
     */
    remove(name: string): string {
        const colour1 = "§5"
        return `${colour1}${name} scoreboard was removed.`
    }
}