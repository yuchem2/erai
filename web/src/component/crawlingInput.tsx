'use client'

import { Box, CircularProgress, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { IPostUserdataRequest, IPostUserdataResponse } from '@/types/user'
import { postUserdata } from '@/api/user'

interface Inputs {
    url: string
}

export default function CrawlingInput() {
    const { register, handleSubmit } = useForm<Inputs>()
    const [userdata, setUserData] = useState([])

    const mutation = useMutation({
        mutationFn: (request: IPostUserdataRequest) => {
            return postUserdata(request)
        },
        onSuccess: (data: IPostUserdataResponse) => {
            console.log(data.data)
            setUserData(data.data)
        },
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const request: IPostUserdataRequest = {
            body: {
                user_url: data.url,
            },
        }
        mutation.mutate(request)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(onSubmit)()
        }
    }

    if (mutation.isPending) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '700px',
                    marginTop: '50px',
                }}
            >
                <CircularProgress sx={{ color: '#D1D1D1' }} />
                <Typography variant="h6" sx={{ marginTop: '20px', color: '#D1D1D1' }}>
                    데이터를 수집 하고 모델을 업데이트 하고 있습니다.
                </Typography>
                <Typography variant="h6" sx={{ marginTop: '5px', color: '#D1D1D1' }}>
                    잠시만 기다려 주세요...
                </Typography>
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '700px', // 입력창 너비 제한
                    marginTop: '50px',
                }}
            >
                <TextField
                    variant="outlined"
                    {...register('url')}
                    fullWidth
                    placeholder="Enter the URL..."
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
                    onKeyDown={handleKeyDown}
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
                    사용자가 작성했던 글이 있는 사이트의 주소를 입력하면, 자동으로 사용자의 글 스타일을 학습합니다.
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        fontSize: '15px',
                        color: '#878787',
                        marginTop: '5px',
                    }}
                >
                    현재는 Velog.io와 Tistory만 지원합니다.
                </Typography>
            </Box>
        )
    }
}
