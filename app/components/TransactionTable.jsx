'use client'

import { Badge, Table } from "@radix-ui/themes";
import DeleteTransaction from "../components/DeleteTransaction";


const TransactionTable = ({contents, isDelete}) => {
    
    return (
        <Table.Root variant="surface" className="shadow-sm">
                        <Table.Header>
                            <Table.Row>
                            {/* <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell> */}
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Transaction Type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Total (in RM)</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Categories</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                            { isDelete === true && (<Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>)}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {contents.map(transaction => (
                                    <Table.Row key={transaction.id}>
                                        {/* <Table.RowHeaderCell>{transaction.id}</Table.RowHeaderCell> */}
                                        <Table.Cell>{(transaction?.name)}</Table.Cell>
                                        <Table.Cell>{(transaction?.desc).substring(0, 20).concat('...')}</Table.Cell>
                                        <Table.Cell><Badge color="orange">{transaction.type}</Badge></Table.Cell>
                                        <Table.Cell>{transaction.total_amt}</Table.Cell>
                                        <Table.Cell>{transaction.categories}</Table.Cell>
                                        <Table.Cell>
                                            { transaction.status == 'settled' 
                                            ? ( <Badge color="green">Settled</Badge>) 
                                            : ( <Badge color="red">In Debt</Badge>)
                                            }

                                        </Table.Cell>
                                        <Table.Cell>{transaction.upload_date}</Table.Cell>
                                        { isDelete === true && (
                                            <Table.Cell>
                                                    <DeleteTransaction rowId={transaction.id}/>
                                            </Table.Cell>
                                        )}
                                    </Table.Row>
                        ))}
                        </Table.Body>
                    </Table.Root>
    )
}

export default TransactionTable