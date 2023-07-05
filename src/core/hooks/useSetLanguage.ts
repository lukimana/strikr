import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useSetLanguage() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (locale: string) => {
        // now you got a read/write object
        const current = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form

        current.set('lang', locale)

        // cast to string
        const search = current.toString()
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : ''

        router.push(`${pathname}${query}`)
    }
}