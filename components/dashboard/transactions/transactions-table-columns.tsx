import { type ColumnDef } from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/dashboard/transactions/data-table/data-table-column-header";
import {
    formatCFA,
    formatDate,
    getStatusBadge, getStatusName,
    getTransactionMode,
    getTransactionModeType,
    getTransactionType,
    TStatus
} from "@/lib/utils";
import {Eye, X} from "lucide-react";
import React from "react";
import {TransactionsDataType} from "@/components/dashboard/transactions/TransactionsTable";
import {DataTableFilterableColumn, DataTableSearchableColumn} from "@/core/interfaces";
import {TransactionsType} from "@/components/dashboard/serenity-space/LastTransactions";
import {Dialog, DialogClose, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export function getColumns(lang: string): ColumnDef<TransactionsDataType>[] {
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
            accessorKey: "transactionId",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs font-normal`} column={column} title="ID Transaction" />
            ),
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex space-x-2.5 items-center`}>
                        {row.original.transaction_type.name == "PAYOUT" &&
                            <div className={`bg-[#D8F7FF] p-2 rounded-lg`}>
                                <svg className={`h-3.5 w-3.5`} viewBox="0 0 11.783 11.783">
                                    <path id="Send"
                                          d="M10.764,1.3a.943.943,0,0,1,1.2,1.2L8.857,11.387a.943.943,0,0,1-1.752.071l-1.6-3.6a.192.192,0,0,0-.1-.1l-3.6-1.6a.943.943,0,0,1,.071-1.752Zm.9.838a.376.376,0,0,0-.531-.531L5.618,7.12a.376.376,0,0,0,.531.531Z"
                                          transform="translate(-0.75 -0.736)" stroke="#000" strokeWidth="1"
                                          fillRule="evenodd"/>
                                </svg>
                            </div>
                        }
                        {(row.original.transaction_type.name == "PAYIN" && row.original.pos == null) &&
                            <div className={`bg-[#FFC5AF] p-2 rounded-lg`}>
                                <svg className={`h-3.5 w-3.5`} viewBox="0 0 11.144 10.914">
                                    <g id="Link" transform="translate(0.378 0.15)">
                                        <path
                                              d="M7.534.5A3.556,3.556,0,0,0,5,1.55l-.523.523a.663.663,0,0,0,0,.938.679.679,0,0,0,.938,0l.523-.523A2.254,2.254,0,1,1,9.128,5.676L8.6,6.2a.664.664,0,0,0,.939.939l.523-.523A3.579,3.579,0,0,0,7.534.5ZM4.079,11.117A3.558,3.558,0,0,0,6.612,10.07l.522-.523a.663.663,0,0,0,0-.938.679.679,0,0,0-.938,0l-.523.523A2.254,2.254,0,1,1,2.485,5.943l.523-.523a.663.663,0,0,0-.938-.938l-.523.523a3.579,3.579,0,0,0,2.532,6.112Z"
                                              transform="translate(-0.5 -0.503)" stroke="#000" strokeWidth="0.3"/>
                                        <path
                                              d="M9.043,13.566a.663.663,0,0,0,.938,0L13.55,10a.663.663,0,0,0,0-.938.679.679,0,0,0-.938,0L9.043,12.627a.664.664,0,0,0,0,.938Z"
                                              transform="translate(-5.99 -6.005)" stroke="#000" strokeWidth="0.3"/>
                                    </g>
                                </svg>
                            </div>
                        }
                        {(row.original.transaction_type.name == "PAYIN" && row.original.pos !== null) &&
                            <div></div>
                        }
                        <div className="max-w-[10rem] leading-4">{row.getValue("transactionId")}</div>
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "description",
            header: ({column}) => (
                <DataTableColumnHeader className={`text-xs font-normal`} column={column} title="Description"/>
            ),
            cell: ({row}) => {
                return (
                    <div className="max-w-[25rem]">
                        {row.original.transaction_type.name == "PAYOUT" &&
                            <div>Envoi {row.original.customer_firstname == null && row.original.customer_lastname == null ? "" : `à ${row.original.customer_firstname} ${row.original.customer_lastname}`} | {getTransactionMode(row.original.operator)} {getTransactionMode(row.original.number)} | Ref {row.original.reference ?? "-"}</div>
                        }
                        {(row.original.transaction_type.name == "PAYIN" && row.original.pos == null) &&
                            <div>Paiement {row.original.customer_firstname == null && row.original.customer_lastname == null ? "" : `de ${row.original.customer_firstname} ${row.original.customer_lastname}`} | {getTransactionMode(row.original.operator)} {getTransactionMode(row.original.number)} | Via Guichet | Ref {row.original.reference ?? "-"}</div>
                        }
                        {(row.original.transaction_type.name == "PAYIN" && row.original.pos !== null) &&
                            <div>Paiement {row.original.description} | ID Terminal {row.original.tId} | Compte {row.original.number} | Ref {row.original.reference ?? "-"}</div>
                        }
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "account",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs font-normal`} column={column} title="Compte impacté" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="max-w-[12rem]">
                        <div className={`inline-flex flex-col space-y-0`}>
                            <h3 className={`leading-4`}>Compte Principal</h3>
                            <div>
                                <span className={`block -mt-0.5 text-[11px] text-[#6F7070]`}>12342323223</span>
                            </div>
                        </div>
                    </div>
                )
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "amount",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs font-normal`}  column={column} title="Montant" />
            ),
            cell: ({ row }) => {
                return (
                    <div className={`font-medium ${row.original.transaction_type.name == TransactionsType.DEBIT ? 'text-[#ff0000]' : 'text-[#19b2a6]'}`}>{row.original.transaction_type.name == TransactionsType.DEBIT ? '-' : ''}{formatCFA(row.original.amount)}</div>
                )
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs font-normal`} column={column} title="Date" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="">
                        {formatDate(row.getValue("createdAt"), lang)}
                    </div>
                )
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs font-normal`} column={column} title="Statut" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="" dangerouslySetInnerHTML={{__html: getStatusBadge(row.getValue('status'))}}></div>
                )
            },
            filterFn: (row, id, value) => {
                return Array.isArray(value) && value.includes(row.getValue(id))
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "actions",
            header: ({ column }) => (
                <DataTableColumnHeader className={`text-xs text-center font-normal`} column={column} title="Actions" />
            ),
            cell: function Cell({ row }) {
                // const [isUpdatePending, startUpdateTransition] = React.useTransition()

                return (
                    <div className={`flex items-center justify-center`}>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Eye className={`h-5 w-5 text-[#D3D3D3] cursor-pointer`}/>
                            </DialogTrigger>
                            <DialogContent className={`sm:max-w-[45rem] gap-2 overflow-x-hidden duration-200 !rounded-3xl bg-[#f4f4f7] px-3 py-3`}>
                                <div>
                                    <div className={`rounded-t-2xl bg-white px-8 pb-4 pt-5`}>
                                        <div className={`flex justify-between items-center space-x-3`}>
                                            <h2 className={`text-base text-[#626262] inline-flex items-center space-x-3 font-medium`}>
                                                <span>{`Description transaction`}</span>
                                                <div className={`border text-black text-sm border-[#626262] line-clamp-1 font-normal rounded-md py-1 px-2 bg-[#F0F0F0]`}>
                                                    ID: {row.original.transactionId}
                                                </div>
                                            </h2>
                                            <DialogClose className={`outline-none`}>
                                                <X strokeWidth={2.4} className={`text-[#767676] h-5 w-5`} />
                                            </DialogClose>
                                        </div>
                                    </div>
                                </div>

                                <div className={`min-h-[6rem] pt-6 pb-7 px-8 bg-white rounded-b-2xl`}>
                                    <div className={`grid grid-cols-1 gap-6`}>
                                        <div className={`grid grid-cols-4 gap-3`}>
                                            <div className={`col-span-4`}>
                                                <h2 className={`text-[#626262] -mb-3 text-[15px] font-medium`}>Details
                                                    transactions</h2>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Type de
                                                        transaction</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{getTransactionType(row.original.transaction_type.name)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Montant</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{formatCFA(row.original.amount)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Montant
                                                        envoyé</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{formatCFA(row.original.amount)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Frais de
                                                        transaction</h3>
                                                    <span className={`text-sm font-medium`}>{"-"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`grid grid-cols-4 gap-3`}>
                                            <div className={`col-span-4`}>
                                                <h2 className={`text-[#626262] -mb-3 text-[15px] font-medium`}>Details
                                                    bénéficiaire</h2>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Nom
                                                        bénéficiaire</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{row.original.customer_firstname == null && row.original.customer_lastname == null ? "-" : `${row.original.customer_firstname} ${row.original.customer_lastname}`}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>N° de
                                                        compte</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{row.original.number}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Type de
                                                        compte</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{getTransactionModeType(row.original.operator)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`grid grid-cols-4 gap-3`}>
                                            <div className={`col-span-4`}>
                                                <h2 className={`text-[#626262] -mb-3 text-[15px] font-medium`}>Details
                                                    Opérateur</h2>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Nom
                                                        opérateur</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{getTransactionMode(row.original.operator)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Référence</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{row.original.reference ?? "-"}</span>
                                                </div>
                                            </div>
                                            <div className={`col-span-2`}>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>ID
                                                        Transaction</h3>
                                                    <TooltipProvider delayDuration={10}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span
                                                                    className={`text-sm cursor-pointer font-medium leading-4 line-clamp-1`}>{row.original.transactionId}</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className={`text-xs`}>{row.original.transactionId}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`grid grid-cols-4 gap-3`}>
                                            <div className={`col-span-4`}>
                                                <h2 className={`text-[#626262] -mb-3 text-[15px] font-medium`}>Statut</h2>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Statut actuel</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{getStatusName(row.original.status)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={`inline-flex flex-col`}>
                                                    <h3 className={`font-light text-[#626262] text-xs mb-0.5`}>Date d’envoi</h3>
                                                    <span
                                                        className={`text-sm font-medium leading-4`}>{formatDate(row.original.createdAt, lang)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`flex justify-start items-center mt-3`}>
                                        <Button
                                            className={`mt-5 text-[13px] font-light text-black border border-black bg-transparent hover:text-white inline-flex items-center space-x-2 mr-3`}>
                                            <svg className={`h-4 w-4`} viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="7 10 12 15 17 10"/>
                                                <line x1="12" x2="12" y1="15" y2="3"/>
                                            </svg>
                                            <span>Télécharger le reçu</span>
                                        </Button>
                                        <Button
                                            className={`mt-5 text-[13px] font-light text-black border border-black inline-flex items-center space-x-2 bg-transparent hover:text-white`}>
                                            <svg className={`h-4 w-4`} viewBox="0 0 17.614 15.975" fill="currentColor">
                                                <g
                                                   transform="translate(-1.25 -2.25)">
                                                    <path
                                                          d="M12,7.25a.75.75,0,0,1,.75.75v5a.75.75,0,0,1-1.5,0V8A.75.75,0,0,1,12,7.25Z"
                                                          transform="translate(-1.943 -1.356)"/>
                                                    <path
                                                          d="M12,17a1,1,0,1,0-1-1A1,1,0,0,0,12,17Z"
                                                          transform="translate(-1.943 -2.568)"/>
                                                    <path
                                                          d="M7.021,4.074A3.882,3.882,0,0,1,10.057,2.25a3.883,3.883,0,0,1,3.036,1.824,41.378,41.378,0,0,1,2.95,4.8L16.4,9.5a33.008,33.008,0,0,1,2.134,4.16,3.1,3.1,0,0,1-.113,3.012,3.858,3.858,0,0,1-2.875,1.385,44.285,44.285,0,0,1-5.14.166h-.7a44.287,44.287,0,0,1-5.14-.166,3.858,3.858,0,0,1-2.875-1.385,3.1,3.1,0,0,1-.113-3.012A33.015,33.015,0,0,1,3.714,9.5l.357-.632A41.372,41.372,0,0,1,7.021,4.074Zm.966.76A41.064,41.064,0,0,0,5.113,9.525l-.3.528a32.712,32.712,0,0,0-2.082,4.035c-.359.971-.309,1.486-.032,1.884.3.424.85.714,2.028.869A43.967,43.967,0,0,0,9.759,17h.6a43.967,43.967,0,0,0,5.03-.156c1.178-.155,1.732-.445,2.028-.869.277-.4.327-.912-.032-1.884A32.708,32.708,0,0,0,15.3,10.053L15,9.525a41.068,41.068,0,0,0-2.874-4.691c-.791-1-1.4-1.355-2.07-1.355S8.777,3.83,7.987,4.834Z"
                                                          transform="translate(0)" fillRule="evenodd"/>
                                                </g>
                                            </svg>
                                            <span>Réclamation sur la transaction</span>
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
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

export const filterableColumns: DataTableFilterableColumn<TransactionsDataType>[] = [
    {
        id: "status",
        title: "Statut de transaction",
        options: TStatus.map((status) => ({
            label: status[0]?.toUpperCase() + status.slice(1),
            value: status,
        })),
    },
]