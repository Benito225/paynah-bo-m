import React from "react";

export type Option = {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export interface SearchParams {
    [key: string]: string | string[] | undefined
}

export interface DataTableSearchableColumn {
    id: string
    placeholder?: string
}

export interface DataTableFilterableColumn<TData> {
    id: keyof TData
    title: string
    options: Option[]
}
