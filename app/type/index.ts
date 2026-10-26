import { icons } from "~/utils/constants";

export type IconName = keyof typeof icons;

export interface MenuItem
{
    label: string;
    icon: IconName;
    path: string;
}

export interface Result<T>
{
    code?: number;
    msg?: string;
    data?: T
}

export interface Page<T>
{
    records?: T[];
    total?: number;
    size?: number;
    current?: number;
    pages?: number;
}