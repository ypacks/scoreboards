import { Player } from '@minecraft/server'
export class Error {
    /**
     * @param {Player} player
     * @param {string} msg Error
     * @param {boolean} consoleLog Log to the console.
     */
    constructor(player, msg, consoleLog = true) {
        player.sendMessage(`§4[Error]` + msg)
        consoleLog === true ? console.error(`[Error] ${msg}`) : console.log("Error was logged to player.")
    }
}