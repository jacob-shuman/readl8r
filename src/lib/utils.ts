import chalk from 'chalk';

export const logger = {
	info: (...args: any[]) => console.info(chalk.bgBlue.black(' INFO '), ...args),
	warn: (...args: any[]) => console.info(chalk.bgYellow.black(' WARN '), ...args),
	error: (...args: any[]) => console.info(chalk.bgRed.black(' ERROR '), ...args),
	success: (...args: any[]) => console.info(chalk.bgGreen.black(' SUCCESS '), ...args)
};
