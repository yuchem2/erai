'use client'

import React, { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { postPrompt } from '@/api/prompt'

interface Inputs {
    prompt: string
}

export default function Prompt() {
    const { register, handleSubmit } = useForm<Inputs>()
    const [userData, setUserData] = useState('')
    const mutation = useMutation({
        mutationFn: (request: { prompt: string }) => {
            return postPrompt(request)
        },
        onSuccess: (data: string) => {
            console.log(data)
            setUserData(data)
        },
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const request = {
            prompt: data.prompt,
        }
        mutation.mutate(request)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(onSubmit)()
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    fontSize: '2.25rem',
                    marginBottom: '100px',
                }}
            >
                글 생성을 도와드릴까요?
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '700px', // 입력창 너비 제한
                }}
            >
                {userData && <Typography>{userData}</Typography>}
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="메시지 to ERAI"
                    {...register('url')}
                    onKeyDown={handleKeyDown}
                    sx={{
                        backgroundColor: '#646464',
                        borderRadius: '15px',
                        '& .MuiInputBase-input': {
                            color: '#FFFFFF',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: '#D1D1D1',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: '1px solid white',
                        },
                    }}
                />
            </Box>
        </div>
    )
}
