interface ILogger {
  error(message: unknown, target: string | string[]): void;

  debug(message: unknown, target: string | string[]): void;
}

export type { ILogger };
