import {Box, TextField, Typography} from '@mui/material'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {IPostUserdataRequest, IPostUserdataResponse} from '@/types/user'
import {postUserdata} from '@/api/user'

interface Inputs {
    url: string
}

export default function CrawlingInput() {
    const { register, handleSubmit } = useForm<Inputs>()
    const { data, setData } = useState([])

    const mutation = useMutation({
        mutationFn: (request: IPostUserdataRequest) => {
            return postUserdata(request)
        },
        onSuccess: (data: IPostUserdataResponse) => {
            setData(data)
        },
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const request: IPostUserdataRequest = {
            userUrl: data.url,
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
            <div>
                {data}
            </div>
        </Box>
    )
}