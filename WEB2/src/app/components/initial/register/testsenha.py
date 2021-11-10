from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning) 

driver = webdriver.Chrome()
driver.get("http://localhost:4200/register")

email = driver.find_element_by_id("email")
nome = driver.find_element_by_id("name")
senha = driver.find_element_by_id("password")
confSenha = driver.find_element_by_id("passwordConfirm")
cadastro = driver.find_element_by_id("cadastrarReg")

"campo de confirmação vazio"
def teste1():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("emailpTeste1@email.com")
    nome.send_keys("Teste 1")
    senha.send_keys("12345678")
    driver.find_element_by_id("flexRadioDefault2").click()
    cadastro.click()
    assert driver.current_url != "http://localhost:4200/"
    print("\n\n\n\tTeste 1 realizado com sucesso - Campo vazio\n\n\n")



"campo de confirmação diferente"
def teste2():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("emailpTeste2@email.com")
    nome.send_keys("Teste 2")
    senha.send_keys("12345678")
    confSenha.send_keys("87654321")
    driver.find_element_by_id("flexRadioDefault2").click()
    cadastro.click()
    assert driver.current_url != "http://localhost:4200/"
    print("\n\n\n\tTeste 2 realizado com sucesso - Campo confirmação diferente do campo original\n\n\n")

"campo de confirmação igual"
def teste3():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("emailpTeste3@email.com")
    nome.send_keys("Teste 3")
    senha.send_keys("12345678")
    confSenha.send_keys("12345678")
    driver.find_element_by_id("flexRadioDefault2").click()
    cadastro.click()
    time.sleep(3)
    assert driver.current_url == "http://localhost:4200/"
    print("\n\n\n\tTeste 3 realizado com sucesso - Campos iguais\n\n\n")

teste1()
teste2()
teste3()

driver.close()