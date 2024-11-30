import Image from 'next/image'
import {Box, TextField, Typography} from '@mui/material'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useMutation} from '@tanstack/react-query'
import {IPostUserdataRequest, IPostUserdataResponse} from '@/types/user'
import {postUserdata} from '@/api/user'
import {useState} from 'react'
import CrawlingInput from '@/component/crawlingInput'

export default function Crawling() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <Image src="/logo.png" width={200} height={143} alt={'logo'} />
            <CrawlingInput />
        </div>
    )
}
