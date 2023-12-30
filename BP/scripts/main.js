import { world, ObjectiveSortOrder, DisplaySlotId } from '@minecraft/server';
import commands from "./commands/index.js"
const prefix = "?"
const types = {
    deaths: "deaths",
    brokenBlocks: "brokenBlocks"
}
import { Error } from "./error.js"
const sortOrderValues = Object.values(ObjectiveSortOrder)
const displaySlotIds = Object.values(DisplaySlotId)

// ?newscoreboard (TYPE) [Name] [DisplaySlotId] [SortOrder]
// ?removescoreboard (TYPE)

world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    if (eventData.message[0] !== prefix) return;
    const command = eventData.message.slice(1) // removes ?
    /**
     * @type {[("newscoreboard"|"new"|"add"), ("deaths"|"brokenBlocks"), string, DisplaySlotId, ObjectiveSortOrder]|[("remove"| removescoreboard),("deaths"|"brokenBlocks")]}
     */
    const args = command.split(" ")

    if (args.length < 2) { new Error(player, "Too little arguments were given. {E1}"); return } // not enough args. Handle error.

    if (!Object.values(types).includes(args[1])) { new Error(player, "Invalid Scoreboard type was given. {E2}"); return } // invalid type. Handle error here

    switch (args[0]) {
        case "newscoreboard":
        case "new":
        case "add":
            if (args.length < 3) { new Error(player, "Too little arguments were given. {E1}"); return } // too long or short args [length 4 has the displayslotid, length 5 has display slotid and sortorder]. Handle error
            let name = args[2]
            // If args were not given
            let displaySlotId = args[3] ?? DisplaySlotId.Sidebar
            let sortOrder = args[4] ?? ObjectiveSortOrder.Descending
            // if they were given, check if valid.
            if (!sortOrderValues.includes(sortOrder)) { new Error(player, "Invalid Sort Order was given. {E2}"); return } // sortOrder is not valid. Handle error
            if (!displaySlotIds.includes(displaySlotId)) { new Error(player, "Invalid Display Slot ID was given. {E2}"); return } // displaySlotId is not vaslid. Handle error

            commands[args[1]].add(name, displaySlotId, sortOrder)
            break;
        case "remove":
        case "removescoreboard":
            commands[args[1]].remove()
            break;
    }
});