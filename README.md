# erai

## Introduce

이 프로젝트는 2024.11.30-2024.12.01 양일간 진행한 DSC 빅데이터/AI 해커톤 프로젝트 입니다.

HuggingFace의 SmolLM2-135M-Instruct 모델(https://huggingface.co/HuggingFaceTB/SmolLM2-135M-Instruct)을 이용해 개인의 "스타일"을 학습해 문단을 생성해 내는 것이 목표입니다.


## Getting Started

`/web` 프로젝트의 경우 next, pnpm이 필요합니다. `/server` 프로젝트의 경우 django, poetry 환경 작업이 필요합니다.

### web

```bash
cd web
pnpm install
pnpm dev
```

### server

```bash
cd server
poetry shell
poetry install
python manage.py runserver
```

모델 부분이 비어있기 때문에 `/server/modelAi`이 정상 작동되지 않습니다. 해당부분의 모델을 채우고, `predict()` 함수를 수정하면 정상적으로 구동됩니다.

`/server/userdata` 부분에서 알맞은 ChromeDriver 경로 설정이 필요합니다.

## Learn More

- [Huggingface](https://huggingface.co/) - learn about ML, DL, LLM, ... etc
- [ChromeDriver](https://sites.google.com/chromium.org/driver/) - learn about Chrome drivers
- [ChromeDriver install point](https://googlechromelabs.github.io/chrome-for-testing/) - install chrome drivers

