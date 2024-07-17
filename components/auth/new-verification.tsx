"use client"
import { useSearchParams } from "next/navigation"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/auth/verification"

export const NewVerificationComponent = () => {
    const token = useSearchParams().get("token")
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()
    const onSubmit = useCallback(async () => {

        if (error || success) return

        if (!token) {
            setError("Missing token!")
            return
        }

        const res = await newVerification(token)
        if (res.error) {
            setError(res.error)
            return
        }
        setSuccess("Verification successful!")

    }, [token, error, success])

    useEffect(() => {

        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper label="Confirming your verification">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader className="dark:invert" />
                )}
                {success && <p className="text-emerald-500">{success}</p>}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </CardWrapper>
    )
}