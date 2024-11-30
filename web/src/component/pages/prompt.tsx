'use client'

import { useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'

export default function Prompt() {
    const [inputValue, setInputValue] = useState('')

    // TODO: add chat bot logic
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
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="메시지 to ERAI"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
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
