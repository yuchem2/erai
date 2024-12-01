from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

def generate_response(prompt, model, tokenizer, max_length=300):
    # 텍스트를 토크나이즈하여 모델에 입력할 수 있도록 준비
    inputs = tokenizer(prompt, return_tensors="pt").to('cpu')
    eos_token_id = tokenizer.eos_token_id
    # 모델에서 텍스트 생성
    outputs = model.generate(
        inputs["input_ids"],  # 모델 입력
        attention_mask=inputs["attention_mask"],
        max_length=max_length,  # 생성할 텍스트의 최대 길이
        num_return_sequences=1,  # 생성할 텍스트 수
        do_sample=True,  # 샘플링 사용
        top_k=50,  # Top-K 샘플링을 통한 텍스트 다양성 제어
        top_p=0.95,  # Nucleus 샘플링을 통한 다양성 제어
        temperature=0.7,  # 텍스트 다양성
        eos_token_id=eos_token_id  # 종료 토큰 설정
    )

    # 생성된 텍스트 디코딩 (특수 토큰 제외)
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"prompt": result}


def predict(prompt):
    model_id = 'D:\erai\server\modelAi\SmolLM2-135M-ERAI' # 모델 경로 설정

    tokenizer = AutoTokenizer.from_pretrained(model_id, **{"low_cpu_mem_usage": True})
    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        torch_dtype=torch.bfloat16,
        device_map="auto",
    )

    return generate_response(prompt, model, tokenizer)