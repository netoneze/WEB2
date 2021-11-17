from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning) 

driver = webdriver.Chrome()
driver.get("http://localhost:4200/login")

email = driver.find_element_by_id("email")
senha = driver.find_element_by_id("password")

"teste aluno turma arquivada"
def teste1():
    email.clear()
    senha.clear()
    email.send_keys("aluno1@aluno1.com")
    senha.send_keys("aluno123")
    driver.find_element_by_id("login").click()
    time.sleep(2)
    driver.find_element_by_id("arquivadas").text
    assert driver.current_url == "http://localhost:4200/onboarding"
    print("\n\n\n\tTeste 1 realizado com sucesso - Logado como aluno\n\n\n")

teste1()

driver.close()