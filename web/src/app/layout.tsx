'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import './globals.css'

import { Header } from '@/component/header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // 5 minutes
                        gcTime: 1000 * 60 * 5, // 5 minutes
                    },
                    mutations: {
                        throwOnError: true,
                        retry: 1,
                    },
                },
            }),
    )

    return (
        <html lang="ko">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <div className="flex flex-col w-full h-full p-4 bg-[#3B3B3B]">{children}</div>
                </QueryClientProvider>
            </body>
        </html>
    )
}
