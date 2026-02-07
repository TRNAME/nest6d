/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // 想更严谨就换成你的 payload 类型
    }
  }
}

export interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}
