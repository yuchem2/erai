'use client'

import { useState } from 'react'

import * as ort from 'onnxruntime-web'
import { AutoTokenizer } from '@huggingface/transformers'

export default function Home() {
    const [inputText, setInputText] = useState('')
    const [translatedText, setTranslatedText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleTranslate = async () => {
        setIsLoading(true)
        if (inputText) {
            try {
                const session = await ort.InferenceSession.create('/models/model_fixed.onnx', { executionProviders: ['webgl']})

                // 모델 실행
                const tokenizer = await AutoTokenizer.from_pretrained("HuggingFaceTB/SmolLM2-135M-Instruct")
                const input = tokenizer.apply_chat_template([{
                    role: 'user',
                    content: inputText,
                }], { tokenize: false})

                const input_ids = tokenizer.encode(input, { return_token_type_ids: false})
                const feeds = { input_ids: new ort.Tensor('int32', input_ids, [1, input_ids.length]) }
                console.log(feeds)
                const results = await session.run(feeds)

                setTranslatedText(results)
            } catch (error) {
                console.error('Error running the model:', error)
                setTranslatedText('Error occurred while translating.')
            } finally {
                setIsLoading(false)
            }
        } else {
            setTranslatedText('text is null')
            setIsLoading(false)
        }

    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Translate English to French</h1>
            <textarea
                className="text-[#000000]"
                placeholder="Enter text to translate..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={4}
                cols={50}
            />
            <br />
            <button onClick={handleTranslate} disabled={isLoading}>
                {isLoading ? 'Translating...' : 'Translate'}
            </button>
            <h2>Translated Text:</h2>
            <p>{translatedText}</p>
        </div>
    )
}
