import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { DrawerIcon } from '@/component/icon'
import { Itim } from 'next/font/google'
import Crawling from '@/component/pages/crawling'
import Prompt from '@/component/pages/prompt'

const itim = Itim({ subsets: ['latin'], weight: '400' })
const drawerWidth = 400
const appBarHeight = 64
export function Header() {
    const [open, setOpen] = useState(false)
    const [selectedPage, setSelectedPage] = useState('crawling')

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
                    boxShadow: 'none',
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: `${appBarHeight}px`,
                        display: 'flex',
                        backgroundColor: '#3B3B3B',
                        padding: '0 16px',
                        boxSizing: 'border-box',
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
                        backgroundColor: '#262626',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className={`flex items-center  h-[${appBarHeight}px] px-4`}>
                    <IconButton sx={{ padding: '14px' }} onClick={toggleDrawer(false)}>
                        <DrawerIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {[
                        { text: '사용자 데이터 입력하기', component: 'crawling' },
                        { text: 'Prompt', component: 'prompt' },
                    ].map(({ text, component }) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => setSelectedPage(component)}>
                                <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
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
                {selectedPage === 'crawling' && <Crawling />}
                {selectedPage === 'prompt' && <Prompt />}
            </Box>
        </Box>
    )
}
