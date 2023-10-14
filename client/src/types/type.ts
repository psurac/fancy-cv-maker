import { ComponentType, FC } from "react";

export type Path = `/${string}` | '';

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export type GenElementType = ComponentType<any> | FC<any> | string