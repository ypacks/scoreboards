import { Player } from '@minecraft/server'
export class Error {
    constructor(player: Player, msg: string, consoleLog: boolean = true) {
        player.sendMessage(`§4[Error] ` + msg)
        consoleLog === true ? console.error(`[Error] ${msg}`) : console.log("Error was logged to player.")
    }
}