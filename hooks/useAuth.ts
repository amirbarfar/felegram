import { useEffect, useState } from "react"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false)
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState('')
    const [checkTrigger, setCheckTrigger] = useState(0)

    const recheck = () => setCheckTrigger(prev => prev + 1)

    useEffect(() => {
        setLoading(true)
        LoginCheckStatus();
    }, [checkTrigger])

    const LoginCheckStatus = async () => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json();
                if (data && data.user && data.user.phone) {
                    setIsAuthenticated(true);
                    setPhone(data.user.phone);
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { isAuthenticated, loading, phone };
}