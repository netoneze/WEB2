from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import warnings

from app.components.initial.register.testsemail import teste4

warnings.filterwarnings("ignore", category=DeprecationWarning) 

driver = webdriver.Chrome()
driver.get("http://localhost:4200/register")

email = driver.find_element_by_id("email")
nome = driver.find_element_by_id("name")
senha = driver.find_element_by_id("password")
confSenha = driver.find_element_by_id("passwordConfirm")
cadastro = driver.find_element_by_id("cadastrarReg")

def teste1():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("testeCadArquivad1a@email.com")
    nome.send_keys("Teste 1")
    senha.send_keys("12345678")
    confSenha.send_keys("12345678")
    driver.find_element_by_id("flexRadioDefault1").click()
    cadastro.click()
    driver.find_element_by_id("btnCad").click()
    assert driver.current_url != "http://localhost:4200/"
    print("\n\n\n\tTeste 1 realizado com sucesso - Campo vazio para sala\n\n\n")

def teste2():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("testeCadArquivad1a@email.com")
    nome.send_keys("Teste 1")
    senha.send_keys("12345678")
    confSenha.send_keys("12345678")
    driver.find_element_by_id("flexRadioDefault1").click()
    cadastro.click()
    driver.find_element_by_id("inpTurma").send_keys("12345")
    driver.find_element_by_id("btnCad").click()
    assert driver.current_url != "http://localhost:4200/"
    print("\n\n\n\tTeste 2 realizado com sucesso - Sala arquivada\n\n\n")

def teste3():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("testeCadArquivad1a@email.com")
    nome.send_keys("Teste 2")
    senha.send_keys("12345678")
    confSenha.send_keys("12345678")
    driver.find_element_by_id("flexRadioDefault1").click()
    cadastro.click()
    driver.find_element_by_id("inpTurma").send_keys("11245125125123412")
    driver.find_element_by_id("btnCad").click()
    assert driver.current_url != "http://localhost:4200/"
    print("\n\n\n\tTeste 3 realizado com sucesso - Turma inexistente\n\n\n")

def teste4():
    email.clear()
    nome.clear()
    senha.clear()
    confSenha.clear()
    email.send_keys("testeCadArquivad1a@email.com")
    nome.send_keys("Teste 3")
    senha.send_keys("12345678")
    confSenha.send_keys("12345678")
    driver.find_element_by_id("flexRadioDefault1").click()
    cadastro.click()
    driver.find_element_by_id("inpTurma").send_keys("abc1234")
    driver.find_element_by_id("btnCad").click()
    assert driver.current_url != "http://localhost:4200/"
    print("\n\n\n\tTeste 4 realizado com sucesso - Turma existente\n\n\n")

teste1()
teste2()
teste3()
teste4()

driver.close()