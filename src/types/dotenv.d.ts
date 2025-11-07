declare module 'dotenv' {
    interface DotenvConfigOptions {
        path?: string;
        encoding?: string;
        debug?: boolean;
    }
    interface DotenvParseOutput {
        [name: string]: string;
    }
    export function config(options?: DotenvConfigOptions): {
        parsed?: DotenvParseOutput;
    };
    export function parse(src: string | Buffer): DotenvParseOutput;
    export default { config, parse };
}
