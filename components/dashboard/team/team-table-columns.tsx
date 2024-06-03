import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/dashboard/team/data-table/data-table-column-header";
import {formatCFA, formatDate, getStatusBadge, TStatus} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {AlertTriangle, ClipboardList, RotateCw} from "lucide-react";
import React from "react";
import {TeamDataType} from "@/components/dashboard/team/TeamTable";
import {DataTableFilterableColumn, DataTableSearchableColumn} from "@/core/interfaces";

export function getColumns(lang: string): ColumnDef<TeamDataType>[] {
    return [
        // {
        //     id: "select",
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={
        //                 table.getIsAllPageRowsSelected() ||
        //                 (table.getIsSomePageRowsSelected() && "indeterminate")
        //             }
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //             className="translate-y-[2px]"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //             className="translate-y-[2px]"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "username",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs font-normal`} column={column} title="Nom utilisateur" />
            ),
            cell: ({ row }) => <div className="min-w-[6rem]">{row.getValue("username")}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "role",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Rôle" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="">
                        {row.getValue("role")}
                    </div>
                )
            },
        },
        {
            accessorKey: "phone",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Téléphone" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="">
                        {row.getValue("phone")}
                    </div>
                )
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Adresse e-mail" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="">
                        {row.getValue("email")}
                    </div>
                )
            },
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Ajouté le" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="">
                        {formatDate(row.getValue("date"), lang)}
                    </div>
                )
            },
        },
        {
            id: "actions",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs text-center font-normal`} column={column} title="Actions" />
            ),
            cell: function Cell({ row }) {

                return (
                    <div className={`text-center`}>
                        <DropdownMenu>
                            <DropdownMenuTrigger className={`focus:outline-none`} asChild>
                                <button className={`rounded-full bg-[#f0f0f0] hover:bg-gray-200 duration-200 p-1`}>
                                    <svg className={`h-3 w-auto`} viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="1"/>
                                        <circle cx="12" cy="5" r="1"/>
                                        <circle cx="12" cy="19" r="1"/>
                                    </svg>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 rounded-xl z-[100] shadow-md" align={"end"}>
                                <DropdownMenuItem className={`text-xs cursor-pointer`}>
                                    <ClipboardList className="mr-2 h-3.5 w-3.5" />
                                    <span className={`mt-[1.5px]`}>{`Détails`}</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]
}

export const searchableColumns: DataTableSearchableColumn[] = [
    // {
    //     id: "beneficiary",
    //     placeholder: "Rechercher...",
    // },
]

export const filterableColumns: DataTableFilterableColumn<TeamDataType>[] = [
    // {
    //     id: "status",
    //     title: "Statut de transaction",
    //     options: TStatus.map((status) => ({
    //         label: status[0]?.toUpperCase() + status.slice(1),
    //         value: status,
    //     })),
    // },
]