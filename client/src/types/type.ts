import { ComponentType, FC } from "react";

export type Path = `/${string}` | '';

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export type GenElementType = ComponentType<any> | FC<any> | string

export type pageNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;