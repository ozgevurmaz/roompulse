"use client"
import ProfileCard from '@/components/profile/profileCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import ProfilePhoto from '@/components/ui/profilePhoto'
import { useProfileStore } from '@/lib/zustand/useProfileStore'
import { div } from 'framer-motion/client'
import { Activity, Building2, Calendar, Clock, ExternalLink, Eye, Folder, GitBranch, Github, MapPin, Target, TrendingUp, Trophy, UserPlus, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {

}
const mockStats = {
    totalWorkMinutes: 2840,
    repositoriesWorked: 12,
    mostVisitedRoom: "React Development",
    joinedDate: "March 2023",
    currentStreak: 7,
}

const Page = ({ }: Props) => {
    const {
        name, bio, location, company, hireable, socialLinks, github, avatar, username
    } = useProfileStore()

    return (
        <div className="min-h-screen w-full">
            <div className="pt-3 pb-6">
                <div className="max-w-7xl mx-auto px-4 space-y-6">

                    {/* Profile Header Card */}
                    <Card className="overflow-hidden shadow-xl border-0 bg-surface">
                        <div className="h-32 relative bg-linear-to-r from-primary to-secondary">
                            <div className="absolute inset-0 bg-black/10"></div>
                        </div>

                        <CardHeader className="relative flex gap-10 -mt-17">

                            <div className="relative -mt-8">
                                <ProfilePhoto
                                    imageUrl={avatar}
                                    size="xl"
                                />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 shadow-lg border-background" />
                                <div className="absolute -bottom-6 -right-6 w-6 h-6 rounded-full border-4 shadow-lg border-background" />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h1 className="text-3xl font-bold">
                                                {name}
                                            </h1>
                                            {hireable && (
                                                <small className="font-medium px-2.5 py-0.5 rounded-full border bg-success text-success-foreground border-success">
                                                    Available for hire
                                                </small>
                                            )}
                                        </div>
                                        <p className="text-xl text-foreground/80">
                                            @{username}
                                        </p>
                                        {bio && <p className="max-w-2xl leading-relaxed">
                                            {bio}
                                        </p>}
                                    </div>
                                </div>

                                {/* Quick Info */}
                                <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
                                    {location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{location}</span>
                                        </div>
                                    )}
                                    {company && (
                                        <div className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" />
                                            <span>{company}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Joined {mockStats.joinedDate}</span>
                                    </div>
                                </div>

                                {/* Social Links */}

                                {github && (
                                    <Link
                                        href={github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-0 right-4 flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium bg-foreground text-background hover:opacity-80"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub
                                    </Link>
                                )}

                            </div>

                        </CardHeader>
                    </Card>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="bg-linear-to-r from-primary/20 to-primary text-foreground border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Total Work Time</p>
                                        <p className="text-2xl font-bold">{Math.floor(mockStats.totalWorkMinutes / 60)}h {mockStats.totalWorkMinutes % 60}m</p>
                                    </div>
                                    <Clock className="w-8 h-8 opacity-80" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-r from-success/20 to-success text-foreground border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Repositories</p>
                                        <p className="text-2xl font-bold">{mockStats.repositoriesWorked}</p>
                                    </div>
                                    <GitBranch className="w-8 h-8 opacity-80" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-r from-secondary/20 to-secondary text-foreground border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Current Streak</p>
                                        <p className="text-2xl font-bold">{mockStats.currentStreak} days</p>
                                    </div>
                                    <Target className="w-8 h-8 opacity-80" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-r from-info/20 to-info text-foreground border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium opacity-90">Most Visited Room</p>
                                        <p className="text-lg font-bold truncate">{mockStats.mostVisitedRoom}</p>
                                    </div>
                                    <Eye className="w-8 h-8 opacity-80" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}

                    <Card className="shadow-lg border-0 bg-surface">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-success" />
                                Weekly Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 rounded-lg flex items-center justify-center border-2 border-dashed bg-input-bg border-input-border">
                                <div className="text-center">
                                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-40" />
                                    <p className="font-medium opacity-60">Activity Chart</p>
                                    <p className="text-sm opacity-40">Coming soon...</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default Page