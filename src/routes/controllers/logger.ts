import chalk from "chalk";

export const logger = {
    async success(msg: any) {
        console.log(chalk.green(`[MESSAGE]: ${msg}`))
    },
    async error(msg: any) {
        console.log(chalk.red(`[ERROR]: ${msg}`))
    },
    async warning(msg: any) {
        console.log(chalk.blue(`[WARNING]: ${msg}`))
    },
}
