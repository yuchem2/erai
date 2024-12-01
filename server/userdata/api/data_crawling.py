import re

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

# Selenium WebDriver 설정
def get_driver():
    options = Options()
    options.add_argument("--headless")  # 브라우저 창 없이 실행
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    service = Service("C:\Program Files\chromedriver.exe")  # ChromeDriver 경로 설정
    driver = webdriver.Chrome(service=service, options=options)
    return driver

# 블로그 글 크롤링 함수
def crawl_tistory_blog_content(url, driver):
    try:
        driver.get(url)
        time.sleep(1)  # 페이지 로딩 대기
        
        # 권한 제한 페이지 처리
        if "권한이 없습니다" in driver.page_source:
            print(f"권한이 없는 글: {url}")
            return None

        # 제목과 내용을 가져오기
        paragraphs = driver.find_elements(By.TAG_NAME, 'p')
        text_content = [p.text for p in paragraphs if p.text.strip()]  # 빈 텍스트는 제외
        combined_text = " ".join(text_content[:-5])
        combined_text = combined_text.replace(" 비밀댓글입니다.", "")
        return {"title": url, "content":combined_text}
    except Exception as e:
        print(f"오류 발생: {url}, {e}")
        return None
    

def tistory_crawling(user_url):
    blog_base_url = user_url
    driver = get_driver()
    all_posts = []
    try:
        for post_id in range(2, 12):  # 1 ~ 72까지 순회
            url = f"{blog_base_url}{post_id}"
            post_data = crawl_tistory_blog_content(url, driver)
            if post_data:
                all_posts.append(post_data)
    finally:
        driver.quit()

    return all_posts




# Velog 글에서 x_path(글이 있는 div)안의 p태그 글들을 수집한다.
def get_velog_p_tags_in_class(driver, x_path):
    try:
        # 특정 클래스(div)의 <p> 태그 수집
        divs = driver.find_elements(By.XPATH, x_path)
        content = []

        for div in divs:
            paragraphs = div.find_elements(By.TAG_NAME, 'p')
            for p in paragraphs:
                text = p.text.strip()
                if text:  # 텍스트가 비어 있지 않은 경우
                    content.append(text)

        return " ".join(content)  # 모든 텍스트를 하나의 문자열로 합침
    except Exception as e:
        print(f"특정 클래스 내부 <p> 태그를 가져오는 중 오류 발생: {e}")
        return ""


# 게시물 크롤링 함수
def crawl_posts_with_click(base_url, driver):
    driver.get(base_url)
    time.sleep(1)  # 페이지 로딩 대기

    post_data = []
    
    for i in range(1, 11):  # 1부터 10까지 순회
        try:
            # XPath 요소 클릭
            xpath = f"/html/body/div/div[2]/div[2]/main/div/section/div[2]/div[2]/div[{i}]/a[2]/h2"
            post_element = driver.find_element(By.XPATH, xpath)
            post_title = post_element.text.strip()
            print(f"클릭 중: {post_title}")

            # 클릭하여 새 페이지로 이동
            post_element.click()
            time.sleep(1)  # 페이지 로딩 대기

            # 특정 클래스 내부의 <p> 태그 텍스트 수집
            x_path = "/html/body/div[1]/div[2]/div[5]/div/div"
            content = get_velog_p_tags_in_class(driver, x_path)
            if not content:
                x_path = "/html/body/div[1]/div[2]/div[4]/div/div"
                content = get_velog_p_tags_in_class(driver, x_path)

            # 데이터 저장
            post_data.append({
                "title": post_title,
                "content": content.replace("\n",""),
            })

            # 이전 페이지로 돌아가기
            driver.back()
            time.sleep(1)  # 페이지 로딩 대기
        except Exception as e:
            print(f"{i}번 게시물 처리 중 오류 발생: {e}")

    return post_data

# Velog 블로그 크롤링 함수
def velog_crawling(user_url):
    base_url = user_url  # Velog 블로그 주소
    driver = get_driver()

    try:
        print("Velog 블로그 크롤링 시작...")
        posts = crawl_posts_with_click(base_url, driver)
        return posts  # 크롤링 결과를 객체로 반환
    finally:
        driver.quit()

# 전처리 및 스타일 태그 적용 함수
def process_data(data):
    result = []
    
    for item in data:
        content = item["content"]
        # 문장을 ?, !, . 으로 분리
        sentences = re.split(r'([.!?])', content)
        # 재조합: 문장과 구분자를 다시 합치기
        sentences = ["".join(x) for x in zip(sentences[::2], sentences[1::2])]
        # 스타일 태그 적용
        styled_sentences = []
        for i in range(len(sentences) - 1):
            styled_sentences.append(
                f'<STYLE style="userStyle">{sentences[i]} {sentences[i+1]}</STYLE>'
            )
        result.extend(styled_sentences)
    return result


def get_user_data(user_url ):
    tistory_pattern = r"^https://[a-zA-Z0-9\-]+\.tistory\.com/$"
    velog_pattern = r"^https://velog\.io/@[a-zA-Z0-9_-]+/posts$"
    if re.match(tistory_pattern, user_url):
        crawling_result=tistory_crawling(user_url)
        return crawling_result
    elif re.match(velog_pattern, user_url):
        crawling_result= velog_crawling(user_url)
        
        processed_data = process_data(crawling_result)
        
        return {"data":processed_data}
    else:
        return "Url is not correct."
    

