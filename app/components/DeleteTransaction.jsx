import React from 'react'
import { AlertDialog, Flex, Button } from '@radix-ui/themes'
import { FiTrash2 } from "react-icons/fi";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const handleDelete = async (rowId) => {
    console.log(rowId)
        await axios.get(`http://localhost:3003/api/transaction/delete/${rowId}`)
            .then(res => {
                toast.success('Deleted successfully')
            })
            .catch(err => {
                console.log(err)
                    toast.error('Something went wrong!')
            })
}

const DeleteTransaction = ({rowId}) => {
    
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <FiTrash2 size={"15"} color='red' className="m-auto hover:cursor-pointer transition duration-300 ease-in-out hover:scale-125"/>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>Delete a transaction</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure want to delete row {rowId}?
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                        Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button 
                            variant="solid" 
                            color="red"
                            onClick={() => handleDelete(rowId)}
                        >
                        Confirm
                        </Button>
                    </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root> 
            <Toaster
                
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 4000,
                    className: '',
                    style: {
                        fontSize: '14px',
                    }
                }}
            /> 
        </>
    )
}

export default DeleteTransaction