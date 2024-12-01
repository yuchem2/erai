'use client'

import React, { useState } from 'react'
import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { postPrompt } from '@/api/prompt'

interface Inputs {
    prompt: string
}

export default function Prompt() {
    const { register, handleSubmit, resetField } = useForm<Inputs>()
    const [userData, setUserData] = useState<string[]>([])
    const [loading, setloading] = useState<boolean>(false)

    const mutation = useMutation({
        mutationFn: (request: { prompt: string }) => {
            setUserData([...userData, request.prompt])
            setloading(true)
            return postPrompt(request)
        },
        onSuccess: (data: { prompt: string }) => {
            resetField('prompt')
            setloading(false)
            setUserData([...userData, data.prompt])
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
            <Box sx={{ padding: '10px', marginBottom: '20px', maxHeight: '60vh', overflowY: 'auto' }}>
                {userData.map((data, index) => (
                    <Box
                        key={index}
                        sx={{
                            marginBottom: '10px',
                            transition: 'transform 0.3s ease-out',
                            transform: `translateY(${index * 10}px)`,
                            width: '100%',
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Typography
                            sx={{
                                width: '60%',
                                backgroundColor: index % 2 === 0 ? '#5F5E5E' : '#262626',
                                color: '#FFFFFF',
                                borderRadius: '10px',
                                padding: '10px',
                            }}
                        >
                            {data}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {loading && <CircularProgress sx={{ marginBottom: '50px', marginTop: '20px', color: '#D1D1D1' }} />}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '700px', // 입력창 너비 제한
                    zIndex: 10,
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="메시지 to ERAI"
                    {...register('prompt')}
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
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        fontSize: '15px',
                        color: '#878787',
                        marginTop: '10px',
                    }}
                >
                    ERAI는 실수를 자주합니다...확인해주세요.
                </Typography>
            </Box>
        </div>
    )
}
