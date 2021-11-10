from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning) 

driver = webdriver.Chrome()
driver.get("http://localhost:4200/forgot-password")

email = driver.find_element_by_id("email")

"campo vazio"
def teste1():
    email.clear()
    driver.find_element_by_id("submit").click()
    assert driver.current_url == "http://localhost:4200/forgot-password"
    print("\n\n\n\tTeste 1 realizado com sucesso - Campo vazio\n\n\n")

"email invalido"
def teste2():
    email.clear()
    email.send_keys("emailinvalido")
    driver.find_element_by_id("submit").click()
    assert driver.current_url == "http://localhost:4200/forgot-password"
    print("\n\n\n\tTeste 2 realizado com sucesso - Campo inválido\n\n\n")

"email valido"
def teste3():
    email.clear()
    email.send_keys("teste3@email.com")
    driver.find_element_by_id("submit").click()
    time.sleep(1)
    assert driver.find_element_by_id("token").text == "Digite o token enviado para o email: teste3@email.com"
    print("\n\n\n\tTeste 3 realizado com sucesso - Campo válido\n\n\n")
 
teste1()
teste2()
teste3()

driver.close()