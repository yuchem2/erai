import Image from 'next/image'

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <Image src="/logo.png" width={200} height={143} alt={'logo'} />
        </div>
    )
}
