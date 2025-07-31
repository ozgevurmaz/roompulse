"use client"

import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Briefcase, BriefcaseBusiness, Building2, Github, Link2, Mail, MapPin, Plus, Save, User, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useUserProfile } from "@/hooks/get/useProfile"
import { useProfileStore } from "@/lib/zustand/useProfileStore"
import { useUpdateProfile } from "@/hooks/post/useUpdatePost"
import { Textarea } from "@/components/ui/textarea"
import ProfileCard from "@/components/profile/profileCard"
import LoadingScreen from "@/components/screens/Loading"
import { toast } from "react-toastify"
import { signOut } from "@/lib/auth/auth"

export default function AccountPage() {
    const { data: session, status } = useSession()
    const { username } = useParams()
    const router = useRouter()
    const { loading, error } = useUserProfile(username as string)
    const {
        id, name, bio, location, company, hireable, socialLinks, github, email, title, avatar: image, username: profileUsername
    } = useProfileStore()

    const { updateProfile } = useUpdateProfile(username as string)

    const [saving, setSaving] = useState(false)
    const [lookingFor, setLookingFor] = useState<boolean>(hireable || false)
    const [nameInput, setNameInput] = useState<string>(name || "")
    const [bioInput, setBioInput] = useState<string>(bio || "")
    const [titleInput, setTitleInput] = useState<string>(title || "")
    const [locationInput, setLocationInput] = useState<string>(location || "")
    const [companyInput, setCompanyInput] = useState<string>(company || "")
    const [social, setSocial] = useState<string[]>([])


    useEffect(() => {
        if (!username || typeof username !== "string") {
            router.replace("/")
        }
    }, [username])

    useEffect(() => {
        if (status === "authenticated") {
            if (!username || typeof username !== "string" || session?.user?.username !== username) {
                router.replace("/")
            }
        }
    }, [status, session, username, router])

    useEffect(() => {
        setNameInput(name || "")
        setBioInput(bio || "")
        setLocationInput(location || "")
        setCompanyInput(company || "")
        setLookingFor(hireable || false)
        setSocial(socialLinks || [])
        setTitleInput(title || "")
    }, [name, bio, location, company, hireable, socialLinks])

    if (status === "loading") return <LoadingScreen />


    if (status !== "authenticated") {
        return
    }

    if (loading) {
        return <LoadingScreen />
    }

    if (error) {
        toast.error(error)
        
    }

    const addSocialLink = () => {
        if (social.length < 3) {
            setSocial([...social, ""])
        }
    }

    const removeSocialLink = (index: number) => {
        setSocial(social.filter((_, i) => i !== index))
    }

    const updateSocialLink = (index: number, value: string) => {
        const newSocial = [...social]
        newSocial[index] = value
        setSocial(newSocial)
    }

    const handleSave = async () => {
        updateProfile({
            id,
            name: nameInput,
            bio: bioInput,
            location: locationInput,
            company: companyInput,
            hireable: lookingFor,
            socialLinks: social,
            title: titleInput
        })
    }

    const headerChildren = (
        <div className="flex-1 space-y-2 mt-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">@{username}</h2>
                    <div className="flex items-center gap-2 text-foreground/70 mt-1">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{email}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-full px-4 py-2">
                    <Briefcase className={`w-4 h-4 ${lookingFor ? "text-success" : "text-error"}`} />
                    <span className="text-sm font-medium text-foreground/70">
                        {lookingFor ? "Available for hire" : "Not looking for work"}
                    </span>
                    <Switch
                        checked={lookingFor}
                        onCheckedChange={setLookingFor}
                        color="success"
                    />
                </div>
            </div>
        </div>
    )

    return (
        <ProfileCard headerChildren={headerChildren} image={image}>
            <>
                <div className="grid grid-cols-4 gap-6">
                    <Input
                        label="Full Name"
                        LabelIcon={User}
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-12"
                    />

                    <Input
                        label="Location"
                        LabelIcon={MapPin}
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="City, Country"
                        className="h-12"
                    />

                    <Input
                        label="Title"
                        LabelIcon={BriefcaseBusiness}
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        placeholder="Developer.."
                        className="h-12"
                    />

                    <Input
                        label="Company"
                        LabelIcon={Building2}
                        value={companyInput}
                        onChange={(e) => setCompanyInput(e.target.value)}
                        placeholder="Your company or organization"
                        className="h-12"
                    />
                    <div className="col-span-4 relative">
                        <Textarea
                            label="Bio"
                            value={bioInput}
                            onChange={(e) => setBioInput(e.target.value)}
                            placeholder="Tell us about yourself..."
                            rows={2}
                        />
                        <p className="text-xs absolute bottom-1 right-2">{bioInput.length}/160 characters</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Link2 className="w-4 h-4" />
                        Social Links
                    </label>
                    {social.length < 3 && (
                        <Button
                            onClick={addSocialLink}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Link
                        </Button>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-6 ">
                    <Input
                        label="GitHub"
                        LabelIcon={Github}
                        value={github}
                        protectedInput
                        disabled
                    />

                    {social.map((link, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex-1 space-y-1">
                                <Input
                                    label={`Social Link ${index + 1}`}
                                    value={link}
                                    onChange={(e) => updateSocialLink(index, e.target.value)}
                                    placeholder="https://example.com/profile"
                                />
                            </div>
                            <Button
                                color="none"
                                onClick={() => removeSocialLink(index)}
                                className="mt-6 bg-error hover:bg-error/70 text-error-foreground"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? (
                        <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving Changes...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </div>
                    )}
                </Button>
            </>
        </ProfileCard >
    )
}


