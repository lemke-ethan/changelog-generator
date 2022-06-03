import { change } from "./commands/change";
import { Command } from "commander";
import {
  ChangeCommandDescription,
  ChangeCommandName,
  ChangeCommandOptionDescription,
  ChangeCommandOptionFlag,
} from "./strings/constants";

const program = new Command("ccg");

program
  .command(ChangeCommandName)
  .description(ChangeCommandDescription)
  .option(ChangeCommandOptionFlag.verify, ChangeCommandOptionDescription.verify)
  .action(change);

program.parse(process.argv);

console.log({
  options: program.opts(),
});
