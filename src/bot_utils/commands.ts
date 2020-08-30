import constants = require('../.constants');

class Command {
    readonly command: RegExp;
    readonly commandNoName: RegExp;

    constructor(command: string, after: string, forceBotName: boolean = false) {
        let fullCommand: string;

        if (constants.COMMANDS_USE_BOT_NAME && constants.COMMANDS_USE_BOT_NAME.ENABLED && forceBotName) {
            fullCommand = command + constants.COMMANDS_USE_BOT_NAME.NAME + after;
        } else {
            fullCommand = command + after;
        }
        this.command = new RegExp(fullCommand, "i");
        this.commandNoName = new RegExp(getNamelessCommand(command, after), "i");
    }
}

function getNamelessCommand(prefix: string, after: string): string {
    return `(${prefix}|${prefix}@[\\S]+)${after}`;
}

export default {
    start: new Command("^/start", "$"),
    ping: new Command("^/ping", "$"),
    mirrorTar: new Command("^/mirrorTar", " (.+)"),
    mirror: new Command("^/mirror", " (.+)"),
    mirrorStatus: new Command("^/mirrorStatus", "$"),
    list: new Command("^/list", " (.+)", true),
    getFolder: new Command("^/getFolder", "$"),
    cancelMirror: new Command("^/cancelMirror", "$"),
    cancelAll: new Command("^/cancelAll", "$"),
    disk: new Command("^/disk", "$"),
    url: new Command("^/url", " (.+)"),
}