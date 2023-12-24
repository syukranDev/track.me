import React from 'react'
import { AlertDialog, Flex, Button } from '@radix-ui/themes'
import { FiTrash2 } from "react-icons/fi";

const DeleteTransaction = ({row}) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <FiTrash2 size={"15"} color='red' className="m-auto hover:cursor-pointer transition duration-300 ease-in-out hover:scale-125"/>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Delete a transaction</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure want to delete row {row}?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                    Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button variant="solid" color="red">
                    Confirm
                    </Button>
                </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>  
    )
}

export default DeleteTransaction