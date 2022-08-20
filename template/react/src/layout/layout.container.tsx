import React from 'react'
import { useInit } from './layout.controller'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    useInit()
    return (
        <div>
            <Outlet />
        </div>
    )
}
