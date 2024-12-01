import Image from 'next/image'
import CrawlingInput from '@/component/crawlingInput'

export default function Crawling() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <Image src="/logo.png" width={200} height={143} alt={'logo'} />
            <CrawlingInput />
        </div>
    )
}
