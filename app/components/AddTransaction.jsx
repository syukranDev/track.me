'use client'
import React, {useState} from 'react'
import delay from 'delay'
import Spinner from "../components/Spinner"
import {RadioGroup, TextArea, Select, Dialog, Flex, Text, TextField, Button, Switch} from "@radix-ui/themes"
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { UploadDropzone } from "@bytescale/upload-widget-react";

const options = {
  apiKey: process.env.NEXT_PUBLIC_BYTESCALE_PHOTO_UPLOAD, // Get API keys from: www.bytescale.com
  maxFileCount: 1,
  styles: {
    colors: {
      primary: "#6E56CF",   
    }
  },
  editor: {
      images: {
        allowResizeOnMove: false,   
        preview: false,              
        crop: false, 
      }
  }
};

const AddTransaction = ({updateTableDataAfterAddNewTransaction, userId}) => {
    const initialFormData = {
        name: '',
        desc: '',
        total_amt: '',
        type: 'local',
        categories: '',
        payment_method: '',
        status: false,
        user_id: userId,
        file_uploaded: { ext_direct_link: '', filename: ''}
    }
    
    const [formData, setFormData] = useState(initialFormData);

    const [isSubmitting, setSubmitting] = useState(false)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: val }));
    };

    const handleSelectChange = (selectedOption, name) => {
        setFormData((prevData) => ({ ...prevData, [name]: selectedOption }));
    };

    const handleTransactionTypeChange = (value) => {
        setFormData((prevData) => ({ ...prevData, type: value }));
    };

     const [checked, setChecked] = useState(false);

    const handleSwitchToggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        setFormData((prevData) => ({ ...prevData, status: newValue }));
    };

    const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.desc.trim() !== '' &&
      formData.total_amt.trim() !== '' &&
      formData.categories !== '' &&
      formData.payment_method !== '' &&
      formData.user_id == userId
    //   formData.file_uploaded.ext_direct_link !== '' &&
    //   formData.file_uploaded.filename !== '' 
    );
  };

    const addNewTransaction = async (e) => {
        setSubmitting(true)
        await delay(1000) //to simulate loading, better UX

        console.log(formData)
        await axios.post('http://localhost:3003/api/transaction/add', formData)
            .then(res => {
                console.log(res)
                toast.success('Successfully added new transaction!')
                setSubmitting(false)
                updateTableDataAfterAddNewTransaction();

                //reset form
                 setFormData(initialFormData);
            })
            .catch(err => {
                console.log(err)
                    toast.error('Something went wrong!')
                    setSubmitting(false)
            })
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
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                maxLength={"30"}
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Description
                            </Text>
                            <TextArea 
                                placeholder="Enter transaction description" 
                                name='desc'
                                value={formData.desc}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Total Amount
                            </Text>
                            <TextField.Input
                                placeholder="Enter amount"
                                name='total_amt'
                                value={formData.total_amt}
                                onChange={handleInputChange}
                                type='number'
                            />
                        </label>

                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Transaction Type
                            </Text>
                            <RadioGroup.Root size="2"  value={formData.type} onValueChange={handleTransactionTypeChange}>
                                <Flex  gap="2">
                                    <Text as="label" size="2">
                                        <RadioGroup.Item value="local"/> Local
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
                            <Select.Root onValueChange={(value) => handleSelectChange(value, 'categories')}>
                                <Select.Trigger placeholder="Choose category"/>
                                <Select.Content position="popper">
                                    <Select.Group>
                                        {/* <Select.Label>Fruits</Select.Label> */}
                                        <Select.Item value="food">Food</Select.Item>
                                        <Select.Item value="books">Books</Select.Item>
                                        <Select.Item value="groceries">Groceries</Select.Item>
                                        <Select.Item value="dining">Dining</Select.Item>
                                        <Select.Item value="electronics">Electronics</Select.Item>
                                        <Select.Item value="entertainment" >Entertainment</Select.Item>
                                        <Select.Item value="subscriptions">Subscriptions</Select.Item>
                                        <Select.Item value="clothing">Clothing</Select.Item>
                                        <Select.Item value="utilities">Utilities</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>

                        </label>
                    
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Payment Method
                            </Text>
                            <Select.Root onValueChange={(value) => handleSelectChange(value, 'payment_method')}>
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
                            Is this debt ?
                            </Text>
                            <Text as="label" size="2">
                            <Flex gap="2">
                                 <Switch checked={checked} onCheckedChange={handleSwitchToggle} /> 
                            </Flex>
                            </Text>
                        </label>

                         {/* ====================== */}
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                            Receipt Photo
                            </Text>
                            <UploadDropzone options={options}
                                onUpdate={({ uploadedFiles }) => {
                                    let uploadedFile= (uploadedFiles.map(x => ({ "ext_direct_link": x.fileUrl, "filename": x.originalFile.originalFileName})))
                                    setFormData((prevData) => ({ ...prevData, file_uploaded: uploadedFile[0] }));
                                }}
                                width="400x"
                                height="150px" />
                        </label>
                        {/* ====================== */}
                    
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                        Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={addNewTransaction} disabled={!isFormValid()}>Add</Button>
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