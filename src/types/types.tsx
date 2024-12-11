export type MenuItem = {
  name: string;
  route: string;
  style: keyof typeof STYLES;
};

export const STYLES = {
  NORMAL: "normal",
  OUTLINE: "outline",
} as const;

export interface ErrorResponse {
  message: string;
}
