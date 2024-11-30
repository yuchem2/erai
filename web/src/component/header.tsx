import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DrawerIcon } from '@/component/icon'
import { Itim } from 'next/font/google'

const itim = Itim({ subsets: ['latin'], weight: '400' })
const drawerWidth = 400
const appBarHeight = 64
export function Header({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    height: `${appBarHeight}px`,
                    transition: 'margin 0.3s ease-out', // 애니메이션 추가
                    marginLeft: open ? `${drawerWidth}px` : 0, // Drawer 열림 상태에 따라 이동
                    width: open ? `calc(100% - ${drawerWidth}px)` : '100%', // AppBar 너비 조정
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: `${appBarHeight}px`,
                        display: 'flex',
                        backgroundColor: '#3B3B3B',
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        sx={{
                            mr: 2,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <DrawerIcon />
                    </IconButton>
                    <Typography variant="h6" className={itim.className} noWrap component="div" sx={{ fontSize: '2.25rem' }}>
                        ERAI
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#3B3B3B',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={toggleDrawer(false)}>
                        <DrawerIcon />
                    </IconButton>
                </div>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: 'margin 0.3s ease-out',
                    marginRight: `${drawerWidth}px`,
                    ...(open && { marginRight: '0' }),
                }}
            >
                <Toolbar /> {/* AppBar 높이만큼 패딩 */}
                {children}
            </Box>
        </Box>
    )
}
