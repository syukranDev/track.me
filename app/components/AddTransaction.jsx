'use client'
import React, {useState} from 'react'
import delay from 'delay'
import Spinner from "../components/Spinner"
import {RadioGroup, Switch, TextArea, Select, Dialog, Flex, Text, TextField, Button} from "@radix-ui/themes"
import toast, { Toaster } from 'react-hot-toast'

const AddTransaction = () => {
    const [isSubmitting, setSubmitting] = useState(false)

    const addNewTransaction = async () => {
        try {
            setSubmitting(true)

            await delay(1000)
            setSubmitting(false)
            toast.success('Successfully added new transaction!')

        } catch (error) {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button disabled={isSubmitting}>Add Transaction{isSubmitting && <Spinner/>}</Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Add Transaction</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                    Note down you transaction today.
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Name
                            </Text>
                            <TextField.Input
                            placeholder="Enter transaction name"
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Description
                            </Text>
                            <TextArea placeholder="Enter transaction description" />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Total Amount
                            </Text>
                            <TextField.Input
                            placeholder="Enter amount"
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Transaction Type
                            </Text>
                            <RadioGroup.Root size="2" defaultValue="local">
                                <Flex  gap="2">
                                    <Text as="label" size="2">
                                        <RadioGroup.Item value="local" /> Local
                                    </Text>
                                    <Text as="label" size="2">
                                        <RadioGroup.Item value="overseas" /> Overseas
                                    </Text>
                                </Flex>
                            </RadioGroup.Root>
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Categories
                            </Text>
                            <Select.Root>
                                <Select.Trigger placeholder="Choose category"/>
                                <Select.Content position="popper">
                                    <Select.Group>
                                        {/* <Select.Label>Fruits</Select.Label> */}
                                        <Select.Item value="food">Food</Select.Item>
                                        <Select.Item value="books">Books</Select.Item>
                                        <Select.Item value="groceries">Groceries</Select.Item>
                                        <Select.Item value="dining">Dining</Select.Item>
                                        <Select.Item value="electronics">Electronics</Select.Item>
                                        <Select.Item value="entertainment">Entertainment</Select.Item>
                                        <Select.Item value="subscriptions">Subscriptions</Select.Item>
                                        <Select.Item value="clothing">Clothing</Select.Item>
                                        <Select.Item value="utilities">Utilities</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>

                        </label>
                    
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Payment Type
                            </Text>
                            <Select.Root>
                                <Select.Trigger placeholder="Choose category"/>
                                <Select.Content position="popper">
                                    <Select.Group>
                                        {/* <Select.Label>Fruits</Select.Label> */}
                                        <Select.Item value="credit_card">Credit Card</Select.Item>
                                        <Select.Item value="cash">Cash</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Status
                            </Text>
                            <Text as="label" size="2">
                            <Flex gap="2">
                                <Switch defaultChecked /> Approved
                            </Flex>
                            </Text>
                        </label>
                    
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                        Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={addNewTransaction}>Add</Button>
                    </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
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

export default AddTransaction